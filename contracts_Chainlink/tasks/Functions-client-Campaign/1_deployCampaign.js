const { types } = require("hardhat/config")
const { BigNumber } = require('ethers');
const { generateRequest } = require("../Functions-client/buildRequestJSON")
const { getDecodedResultLog, getRequestConfig } = require("../../FunctionsSandboxLibrary")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-deploy-campaign", "Deploys the campaign contract")
  .addParam("feedAmount", "Campaign stable coin balance")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate a campaign request locally with "npx hardhat functions-simulate".'
      )
    }

    console.log(`Deploying campaign contract to ${network.name}`)

    const feedAmount = taskArgs.feedAmount
    const oracleAddress = networkConfig[network.name]["functionsOracleProxy"]
    const stcAddress = "0x76661e0c9A35304CF4C69E47abfB6EB44925dF5A"
    const tweetInstructions = "Mention the discovery of America"
    const stcContractFactory = await ethers.getContractFactory("SimpleStableCoin")
    const stcContract = await stcContractFactory.attach(stcAddress)
    const stcDecimals = await stcContract.decimals()
    const feedAmountBigNumber = BigNumber.from(feedAmount);
    const realAmount = feedAmountBigNumber.mul(BigNumber.from(10).pow(stcDecimals));

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const accounts = await ethers.getSigners()


    const unvalidatedRequestConfig = require("../../Functions-request-config.js")
    const requestConfig = getRequestConfig(unvalidatedRequestConfig)
      // doGistCleanup indicates if an encrypted secrets Gist was created automatically and should be cleaned up once the request is complete
      let doGistCleanup = !(requestConfig.secretsURLs && requestConfig.secretsURLs.length > 0)
      const request = await generateRequest(requestConfig, taskArgs)
      doGistCleanup = doGistCleanup && request.secrets
 
    // Deploy campaign
    const clientContractFactory = await ethers.getContractFactory("Campaign")
    const clientContract = await clientContractFactory.deploy(oracleAddress, stcAddress, realAmount, requestConfig.source, request.secrets ?? [], tweetInstructions, 0, 0, 337, 300000)

    console.log(
      `\nWaiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${clientContract.deployTransaction.hash} to be confirmed...`
    )
    await clientContract.deployTransaction.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

    // Verify the campaign Contract
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
     //Feed campaign balance
     const feedCampaignBalance = await stcContract.transfer(clientContract.address, realAmount)
     await feedCampaignBalance.wait(VERIFICATION_BLOCK_CONFIRMATIONS)

     const campaignBalance = await stcContract.balanceOf(clientContract.address)

   

    console.log(`\nCampaign contract deployed to ${clientContract.address} on ${network.name}`)
    console.log(`\nCampaign contract feeds with ${feedAmount}, campaign balance : ${campaignBalance.div(BigNumber.from(10).pow(stcDecimals))} $STC`)

  })
