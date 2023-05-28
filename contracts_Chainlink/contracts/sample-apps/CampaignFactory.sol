// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "./Campaign.sol";

contract CampaignFactory is ConfirmedOwner {
  //// EVENTS ////
  event CampaignDeployed(address campaign, uint256 campaignID);

  //Campaign ID Count
  uint256 public campaignIDCount;

  //Approval algorithm
  string approvalAlgorithm;

  //Oracle address
  address oracle;

  //// MAPPING ////
  mapping(uint256 => Campaign) public campaignDeployed;

  constructor(address initialOracle, string memory initialApprovalAlgorithm) ConfirmedOwner(msg.sender) {
    oracle = initialOracle;
    approvalAlgorithm = initialApprovalAlgorithm;
  }

  function deployCampaign(
    uint256 forecastedCampaignBalance,
    bytes memory secrets,
    string memory tweetInstructions,
    address stableCoinAddress,
    address tweetValueAddress,
    uint256 verificationTime,
    uint64 subscriptionId,
    uint32 gasLimit
  ) public onlyOwner {
    IStableCoin token = IStableCoin(stableCoinAddress);
    Campaign newCampaign = new Campaign(
      oracle,
      stableCoinAddress,
      tweetValueAddress,
      forecastedCampaignBalance,
      approvalAlgorithm,
      secrets,
      tweetInstructions,
      campaignIDCount,
      verificationTime,
      subscriptionId,
      gasLimit,
      msg.sender
    );

    require(token.transfer(address(newCampaign), forecastedCampaignBalance), "Token transfer failed");
    campaignDeployed[campaignIDCount] = newCampaign;
    emit CampaignDeployed(address(newCampaign), campaignIDCount);
    campaignIDCount++;
  }

  function removeCampaign(uint256 campaignId) public onlyOwner {
    delete campaignDeployed[campaignId];
  }

  function setApprovalAlgorithm(string memory newApprovalAlgorithm) public onlyOwner {
    approvalAlgorithm = newApprovalAlgorithm;
  }

  function setOracle(address newOracle) public onlyOwner {
    oracle = newOracle;
  }
}
