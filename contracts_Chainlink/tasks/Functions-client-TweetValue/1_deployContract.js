const { types } = require("hardhat/config")
const { generateRequest } = require("../Functions-client/buildRequestJSON")
const { getDecodedResultLog, getRequestConfig } = require("../../FunctionsSandboxLibrary")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-deploy-tweetValue", "Deploys the campaign contract")
  .addParam("subid", "Billing subscription ID used to pay for the request")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .addOptionalParam(
    "gaslimit",
    "Maximum amount of gas that can be used to call fulfillRequest in the client contract",
    100000,
    types.int
  )
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate a campaign request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying campaign contract to ${network.name}`)

    const oracleAddress = networkConfig[network.name]["functionsOracleProxy"]
    const subscriptionId = taskArgs.subid
    const gasLimit = taskArgs.gaslimit
    if (gasLimit > 300000) {
      throw Error("Gas limit must be less than or equal to 300,000")
    }

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const accounts = await ethers.getSigners()


    const unvalidatedRequestConfig = require("../../Functions-request-config2.js")
    const requestConfig = getRequestConfig(unvalidatedRequestConfig)
      // doGistCleanup indicates if an encrypted secrets Gist was created automatically and should be cleaned up once the request is complete
      let doGistCleanup = !(requestConfig.secretsURLs && requestConfig.secretsURLs.length > 0)
      const request = await generateRequest(requestConfig, taskArgs)
      doGistCleanup = doGistCleanup && request.secrets
 
    // Deploy TweetValue
    const clientContractFactory = await ethers.getContractFactory("TweetValue")
    const clientContract = await clientContractFactory.deploy(oracleAddress, requestConfig.source, request.secrets ?? [], subscriptionId, gasLimit)

    console.log(
      `\nWaiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${clientContract.deployTransaction.hash} to be confirmed...`
    )
    await clientContract.deployTransaction.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

    // Verify the TweetValue Contract
    const verifyContract = taskArgs.verify

    if (verifyContract && (process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY)) {
      try {
        console.log("\nVerifying contract...")
        await clientContract.deployTransaction.wait(Math.max(6 - VERIFICATION_BLOCK_CONFIRMATIONS, 0))
        await run("verify:verify", {
          address: clientContract.address,
          constructorArguments: [oracleAddress],
        })
        console.log("TweetValue verified")
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log("Error verifying contract.  Try delete the ./build folder and try again.")
          console.log(error)
        } else {
          console.log("Contract already verified")
        }
      }
    } else if (verifyContract) {
      console.log("\nPOLYGONSCAN_API_KEY or ETHERSCAN_API_KEY missing. Skipping contract verification...")
    }

    console.log(`\TweetValue contract deployed to ${clientContract.address} on ${network.name}`)
  })
