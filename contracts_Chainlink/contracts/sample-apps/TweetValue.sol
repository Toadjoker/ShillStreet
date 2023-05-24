// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Functions, FunctionsClient} from "../dev/functions/FunctionsClient.sol";
// import "@chainlink/contracts/src/v0.8/dev/functions/FunctionsClient.sol"; // Once published
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Functions Consumer contract
 * @notice This contract is a demonstration of using Functions.
 * @notice NOT FOR PRODUCTION USE
 */
contract TweetValue is FunctionsClient, ConfirmedOwner {
  using Functions for Functions.Request;

  bytes32 public latestRequestId;
  bytes public latestResponse;
  bytes public latestError;
  string lastTwitterIDRequested;

  // Script that verify the tweet's content
  string public source;

  //Secrets
  bytes public secrets;

  //Subscription ID in the billing smart contract
  uint64 public subscriptionId;

  //GAS LIMIT
  uint32 public gasLimit;

  uint256 public tweetValueTest;
  string public twitterIDTest;
  address public participantWalletAddressTest;

  /// STRUCT ///
  struct User {
    string twitterID;
    address participantWalletAddress;
  }

  /// EVENTS ///
  event OCRResponse(bytes32 indexed requestId, bytes result, bytes err);
  event TweetValueRegistered(User userRegistered, uint256 tweetValue);

  /// MAPPING ///

  mapping(string => uint256) public twitterIDtoTweetValue;
  mapping(string => address) public twitterIDToWalletAddress;

  constructor(
    address _oracle,
    string memory _source,
    bytes memory _secrets,
    uint64 _subscriptionId,
    uint32 _gasLimit
  ) FunctionsClient(_oracle) ConfirmedOwner(msg.sender) {
    source = _source;
    secrets = _secrets;
    subscriptionId = _subscriptionId;
    gasLimit = _gasLimit;
  }

  function getTweetValue(string memory twitterID, address participantWalletAddress) public onlyOwner returns (bytes32) {
    Functions.Request memory req;
    req.initializeRequest(Functions.Location.Inline, Functions.CodeLanguage.JavaScript, source);
    if (secrets.length > 0) {
      req.addRemoteSecrets(secrets);
    }
    string[] memory args = new string[](1);
    args[0] = twitterID;
    if (args.length > 0) req.addArgs(args);

    lastTwitterIDRequested = twitterID;
    bytes32 assignedReqID = sendRequest(req, subscriptionId, gasLimit);
    latestRequestId = assignedReqID;

    /// MAPPING ///

    twitterIDToWalletAddress[twitterID] = participantWalletAddress;
    return assignedReqID;
  }

  /**
   * @notice Callback that is invoked once the DON has resolved the request or hit an error
   *
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
    latestResponse = response;
    latestError = err;
    emit OCRResponse(requestId, response, err);
    bool nilErr = (err.length == 0);

    if (nilErr) {
      uint256 tweetValue = abi.decode(response, (uint256));

      // Get the participantWalletAddress
      address participantWalletAddress;
      participantWalletAddress = twitterIDToWalletAddress[lastTwitterIDRequested];

      //Associate tweet value to user
      twitterIDtoTweetValue[lastTwitterIDRequested] = tweetValue;

      // Emit event
      emit TweetValueRegistered(User(lastTwitterIDRequested, participantWalletAddress), tweetValue);
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

  function addSimulatedRequestId(address oracleAddress, bytes32 requestId) public onlyOwner {
    addExternalRequest(oracleAddress, requestId);
  }
}
