const { types } = require("hardhat/config")
const { BigNumber } = require('ethers');
const { getDecodedResultLog, getRequestConfig } = require("../../FunctionsSandboxLibrary")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-deploy-campaignFactory", "Deploys the campaignFactory contract")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate a campaign request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying campaignFactory contract to ${network.name}`)

    const feedAmount = taskArgs.feedAmount
    const oracleAddress = networkConfig[network.name]["functionsOracleProxy"]
    const stcAddress = "0x76661e0c9A35304CF4C69E47abfB6EB44925dF5A"
    const tweetInstructions = "Mention the discovery of America"

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const accounts = await ethers.getSigners()


    const unvalidatedRequestConfig = require("../../Functions-request-config.js")
    const requestConfig = getRequestConfig(unvalidatedRequestConfig)

    // Deploy campaignFactory
    const clientContractFactory = await ethers.getContractFactory("CampaignFactory")
    const clientContract = await clientContractFactory.deploy(oracleAddress, requestConfig.source)

    console.log(
      `\nWaiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${clientContract.deployTransaction.hash} to be confirmed...`
    )
    await clientContract.deployTransaction.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

    // Verify the campaignFactory Contract
    const verifyContract = taskArgs.verify

    if (verifyContract && (process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY)) {
      try {
        console.log("\nVerifying contract...")
        await clientContract.deployTransaction.wait(Math.max(6 - VERIFICATION_BLOCK_CONFIRMATIONS, 0))
        await run("verify:verify", {
          address: clientContract.address,
          constructorArguments: [oracleAddress],
        })
        console.log("campaign verified")
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

    console.log(`\nCampaignFactory contract deployed to ${clientContract.address} on ${network.name}`)
  })
