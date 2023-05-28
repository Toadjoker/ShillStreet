// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../dev/functions/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

interface IStableCoin is IERC20 {
  function decimals() external returns (uint8);
}

interface ITweetValue {
  function twitterIDtoTweetValue(string memory twitterID) external view returns (uint256);

  function twitterIDToWalletAddress(string memory twitterID) external view returns (address);
}

contract Campaign is FunctionsClient, ConfirmedOwner, AutomationCompatibleInterface {
  using Functions for Functions.Request;

  //// EVENTS ////
  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
  event RequestTweetCheckSent(string twitterID, string tweetURL, address participationWalletAddress);
  event TweetCreatorPaid(string twitterID, address participationWalletAddress, uint256 amountDue);

  //Stable coin contract address
  address public stableCoinAddress; // SimpleStableCoin address for payouts.

  //Tweet Value contract address
  address public tweetValueAddress; //

  //An array of Campaign's twitterID from a participationID;
  mapping(string => string) public participationIDtoTwitterID;

  //An array of Campaign's participations approved
  mapping(uint256 => Participation) public participationsRewarded;

  uint256 public participationIDcount;
  uint256 public forecastedCampaignBalance;

  // Script that verify the tweet's content
  string public approvalAlgorithm;

  //Secrets
  bytes public secrets;

  //Subscription ID in the billing smart contract
  uint64 public subscriptionId;

  //GAS LIMIT
  uint32 public gasLimit;

  //// HANDLE THE QUEUE ////
  //An array of Campaign's participations registered
  mapping(uint256 => Participation) public participationsRegistered;
  mapping(string => uint256) public participationNumberPerTwitterID;
  uint256 public participationRegisteredIDcount;

  //Counter that says how many participants have been verified;
  uint256 public verifiedCounter;
  //Verification TIME
  uint256 public verificationTime;

  //Tweet Instructions
  string public tweetInstructions;

  //Campaign ID
  uint256 public campaignID;

  struct Participation {
    string twitterID;
    address participationWalletAddress;
    string tweetURL;
    uint256 tweetValue;
    uint256 participationTime;
  }

  constructor(
    address _oracle,
    address _stableCoinAddress,
    address _tweetValueAddress,
    uint256 _forecastedCampaignBalance,
    string memory _approvalAlgorithm,
    bytes memory _secrets,
    string memory _tweetInstructions,
    uint256 _campaignID,
    uint256 _verificationTime,
    uint64 _subscriptionId,
    uint32 _gasLimit,
    address _owner
  ) FunctionsClient(_oracle) ConfirmedOwner(_owner) {
    stableCoinAddress = _stableCoinAddress;
    forecastedCampaignBalance = _forecastedCampaignBalance;
    approvalAlgorithm = _approvalAlgorithm;
    secrets = _secrets;
    tweetInstructions = _tweetInstructions;
    campaignID = _campaignID;
    verificationTime = _verificationTime;
    subscriptionId = _subscriptionId;
    gasLimit = _gasLimit;
    tweetValueAddress = _tweetValueAddress;
  }

  ///// PUBLIC FUNCTIONS ////

  function postTweet(string memory twitterID, string memory tweetURL) public {
    //Check that the sender has the private key corresponding to the twitterID
    //If the twitter ID is confirmed...

    //The user's address can't be null
    require(msg.sender != address(0), "Sender address is null");

    ITweetValue tweetValueInstance = ITweetValue(tweetValueAddress);
    //Verify if the msg.sender address correspond to the twitter ID

    address associatedWalletAddress = tweetValueInstance.twitterIDToWalletAddress(twitterID);
    require(msg.sender == associatedWalletAddress, "The twitter ID is not associated with the message sender address");
    //Get twitterID's tweet Value;
    uint256 tweetValue = tweetValueInstance.twitterIDtoTweetValue(twitterID);

    uint8 stcDecimals = IStableCoin(stableCoinAddress).decimals();
    uint256 amount = (tweetValue * 1 * 10 ** stcDecimals);

    //The forecasted contract's balance should be greater than tweetValue
    require(forecastedCampaignBalance > amount, "Campaign's balance is insufficient for the tweet to be paid");

    //A tweet has already participate in the past...
    require(participationNumberPerTwitterID[twitterID] == 0, "A Campaign tweet is already registered for this profile");

    uint256 participationTime = block.timestamp;

    //Create a participation in the waiting list
    participationsRegistered[participationRegisteredIDcount] = Participation(
      twitterID,
      msg.sender,
      tweetURL,
      tweetValue,
      participationTime
    );
    participationRegisteredIDcount++;

    //Add one participation for this twitterID
    participationNumberPerTwitterID[twitterID] = 1;

    //Update forecasted balance
    forecastedCampaignBalance -= amount;

    //Emit the event RequestTweetCheckSent
    emit RequestTweetCheckSent(twitterID, tweetURL, msg.sender);
  }

  function checkUpkeep(bytes memory) external view override returns (bool upkeepNeeded, bytes memory) {
    //Check if the participationQueue is not empty...
    bool isParticipationRegistered = participationsRegistered[verifiedCounter].participationWalletAddress != address(0);

    upkeepNeeded =
      isParticipationRegistered &&
      ((block.timestamp - participationsRegistered[verifiedCounter].participationTime) > verificationTime);
  }

  function performUpkeep(bytes calldata) external override {
    //Check if the participationQueue is not empty...
    bool isParticipationRegistered = participationsRegistered[verifiedCounter].participationWalletAddress != address(0);

    //We highly recommend revalidating the upkeep in the performUpkeep function
    if (
      ((block.timestamp - participationsRegistered[verifiedCounter].participationTime) > verificationTime) &&
      (isParticipationRegistered)
    ) {
      //Execute the request with tweetValue, tweetURL... in it
      Functions.Request memory req;
      req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, approvalAlgorithm);
      if (secrets.length > 0) {
        req.addRemoteSecrets(secrets);
      }

      // Create a new array with one extra slot for tweetInstructions
      string[] memory argsWithInstructions = new string[](4);
      argsWithInstructions[0] = participationsRegistered[verifiedCounter].tweetURL;
      argsWithInstructions[1] = participationsRegistered[verifiedCounter].twitterID;
      argsWithInstructions[2] = tweetInstructions;
      argsWithInstructions[3] = Strings.toString(verifiedCounter);

      if (argsWithInstructions.length > 0) req.addArgs(argsWithInstructions);

      bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);

      //Increment verified counter
      verifiedCounter++;
    }
  }

  /**
   * @notice Allows the Functions oracle address to be updated
   *
   * @param oracle New oracle address
   */
  function updateOracleAddress(address oracle) public onlyOwner {
    setOracle(oracle);
  }

  function updateStableCoinAddress(address stc) public onlyOwner {
    stableCoinAddress = stc;
  }

  function addSimulatedRequestId(address oracleAddress, bytes32 requestId) public onlyOwner {
    addExternalRequest(oracleAddress, requestId);
  }

  //In order to feed the campaignBalance
  function addForecastedBalance(uint256 amount) public onlyOwner {
    IStableCoin token = IStableCoin(stableCoinAddress);
    require(token.transfer(address(this), amount), "Token transfer failed");
    forecastedCampaignBalance += amount;
  }

  function setTweetInstructions(string memory newTweetInstructions) public onlyOwner {
    tweetInstructions = newTweetInstructions;
  }

  function setVerificationTime(uint256 newVerificationTime) public onlyOwner {
    verficationTime = newVerificationTime;
  }

  //// INTERNAL FUNCTIONS ////

  /**
   * @notice Callback that is invoked once the DON has resolved the request or hit an error
   *
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    emit OCRResponse(requestId, response, err);

    bool nilErr = (err.length == 0);

    if (nilErr) {
      uint256 participationRegisteredID;
      uint256 booleanValue;

      assembly {
        participationRegisteredID := mload(add(response, 32))
        booleanValue := mload(add(response, 64))
      }
      //Get the tweetURL, participationWalletAddress and the tweetValue  from the participationsWaitingList
      address participationWalletAddress = participationsRegistered[participationRegisteredID]
        .participationWalletAddress;
      uint256 tweetValue = participationsRegistered[participationRegisteredID].tweetValue;
      string memory twitterID = participationsRegistered[participationRegisteredID].twitterID;

      uint8 stcDecimals = IStableCoin(stableCoinAddress).decimals();
      uint256 amountDue = (tweetValue * 1 * 10 ** stcDecimals);

      if (booleanValue == 0) {
        //Update forecastedBalance
        forecastedCampaignBalance += amountDue;
        delete participationsRegistered[participationRegisteredID];
        return;
      }

      /// UPDATE CAMPAIGN MAPPING ///

      //Add the participation into the participations list
      participationsRewarded[participationIDcount] = participationsRegistered[participationRegisteredID];
      participationIDcount++;

      // Pay the tweetCreator
      _payTweetCreator(twitterID, participationWalletAddress, amountDue);
      delete participationsRegistered[participationRegisteredID];
    }
  }

  /**
   * @notice Function that triggers the twitter creator payment...
   *
   * @param twitterID twitter user's ID
   * @param participationWalletAddress wallet with which the user participate
   * @param amountDue paid amount in stable coin $STC to the twitter Creator
   */
  function _payTweetCreator(string memory twitterID, address participationWalletAddress, uint256 amountDue) internal {
    IStableCoin token = IStableCoin(stableCoinAddress);
    require(token.transfer(participationWalletAddress, amountDue), "Token transfer failed");
    emit TweetCreatorPaid(twitterID, participationWalletAddress, amountDue);
  }
}
