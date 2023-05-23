const { types } = require("hardhat/config")
const { BigNumber } = require('ethers');
const { generateRequest } = require("../Functions-client/buildRequestJSON")
const { getDecodedResultLog, getRequestConfig } = require("../../FunctionsSandboxLibrary")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-deploy-campaignCF", "Deploys a through the CampaignFactory contract")
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
    const stcAddress = "0x5B6519217BB4cCaf78d87B546d8EDf06858d7f5E"

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const accounts = await ethers.getSigners()


    const unvalidatedRequestConfig = require("../../Functions-request-config.js")
    const requestConfig = getRequestConfig(unvalidatedRequestConfig)
     // doGistCleanup indicates if an encrypted secrets Gist was created automatically and should be cleaned up once the request is complete
     let doGistCleanup = !(requestConfig.secretsURLs && requestConfig.secretsURLs.length > 0)
     const request = await generateRequest(requestConfig, taskArgs)
     doGistCleanup = doGistCleanup && request.secrets

    const stcContractFactory = await ethers.getContractFactory("SimpleStableCoin")
    const stcContract = await stcContractFactory.attach(stcAddress)
    const stcDecimals = await stcContract.decimals()
    const feedAmountBigNumber = BigNumber.from(feedAmount);
    const realAmount = feedAmountBigNumber.mul(BigNumber.from(10).pow(stcDecimals));

    //tweetInstructions
    const tweetInstructions = "Text Instructions : - Shoudn't contain any bad words or any insult - Should contain compliment about Chainlink"
    const campainFactoryContractAddress = "0xa3e842bdDbcfD248a9d8083f0963183159f9F625"
    // Deploy campaign
    const clientContractFactory = await ethers.getContractFactory("CampaignFactory")
    const clientContract = clientContractFactory.attach(campainFactoryContractAddress)
    const deployCampaign = await clientContract.deployCampaign(realAmount, request.secrets ?? [], tweetInstructions, stcAddress, 1, 178, 300000)

    console.log(
      `\nWaiting ${VERIFICATION_BLOCK_CONFIRMATIONS} blocks for transaction ${deployCampaign.hash} to be confirmed...`
    )
    const deployCampaignReceipt = await deployCampaign.wait(VERIFICATION_BLOCK_CONFIRMATIONS)
    const deployCampaignAddress = deployCampaignReceipt.events[1].args[0]
    const deployCampaignID = deployCampaignReceipt.events[1].args[1]
    // Verify the campaignFactory Contract
    const verifyContract = taskArgs.verify

    if (verifyContract && (process.env.POLYGONSCAN_API_KEY || process.env.ETHERSCAN_API_KEY)) {
      try {
        console.log("\nVerifying contract...")
        await deployCampaign.wait(Math.max(6 - VERIFICATION_BLOCK_CONFIRMATIONS, 0))
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

    console.log(`\n A campaign was deployed to ${deployCampaignAddress} with ID ${deployCampaignID} on ${network.name}`)
  })
