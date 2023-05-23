const { types } = require("hardhat/config")
const { VERIFICATION_BLOCK_CONFIRMATIONS, networkConfig } = require("../../network-config")

task("functions-getApprovalAlgorithm", "Get the approval algorithm")
  .addParam("contract", "Address of the client contract to call")
  .addOptionalParam("verify", "Set to true to verify client contract", false, types.boolean)
  .setAction(async (taskArgs) => {
    if (network.name === "hardhat") {
      throw Error(
        'This command cannot be used on a local hardhat chain.  Specify a valid network or simulate a campaign request locally with "npx hardhat functions-simulate".'
      )
    }
    // Get the required parameters
    const contractAddr = taskArgs.contract

    // Attach to the required contracts
    const clientContractFactory = await ethers.getContractFactory("Campaign")
    const clientContract = clientContractFactory.attach(contractAddr)


    // Get the approval algorithm
    
    const approval_algorithm = await clientContract.approval_algorithm()
    console.log(approval_algorithm)
  })
   
    