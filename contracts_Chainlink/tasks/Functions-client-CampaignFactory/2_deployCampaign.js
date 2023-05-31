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
    const stcAddress = "0x76661e0c9A35304CF4C69E47abfB6EB44925dF5A"
    const tweetValueAddress = "0xe47ED937bEB276d36f61Faa32822EA95bCBBc0c9"

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
    const tweetInstructions = "Text Instructions : - Shoudn't contain any bad words or any insult - Should be written in french -Should speak about a ancient bat"
    const campainFactoryContractAddress = "0x6Ae2B45BEF3942BD23d51F4036DfE21101235130"
    // Deploy campaign
    const clientContractFactory = await ethers.getContractFactory("CampaignFactory")
    const clientContract = clientContractFactory.attach(campainFactoryContractAddress)
    let verificationTime = 120 //2minutes
    let subscription_ID = 337
    let gasLimit = 300000
    const deployCampaign = await clientContract.deployCampaign(realAmount, request.secrets ?? [], tweetInstructions, stcAddress, tweetValueAddress, verificationTime , subscription_ID)

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
