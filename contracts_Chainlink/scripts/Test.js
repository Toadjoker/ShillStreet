const { ethers } = require("ethers");
const {Functions} = require("../FunctionsSandboxLibrary/Functions.js");
const tweetValue = 11;
const tweetURL = "https://twitter.com/";
const twitterID = 3;
const participationWalletAddress = "0xe219107D01768b4B540F97F85870F676dDf483Ae";
const booleanValue = 1;

const encodedData = ethers.utils.defaultAbiCoder.encode(
  ["uint256", "uint256", "uint256", "string", "string"],
  [tweetValue, twitterID, booleanValue, participationWalletAddress, tweetURL]
);

console.log(encodedData);

let bufferConcatUint = Buffer.concat(
    [
      Buffer.from(tweetValue),
      Buffer.from(twitterID),
      Buffer.from(booleanValue),
     ])
  
  let bufferConcatString = Buffer.concat(
    [Buffer.from(participationWalletAddress),
    Buffer.from(tweetURL)])
    
    
console.log(Buffer.concat(
   [
    bufferConcatUint, bufferConcatString
   ]))

