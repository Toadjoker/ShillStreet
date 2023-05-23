//This script should check that the TweetURL is a tweet from the Twitter profile corresponding to the twitter ID provided...

//Check if address is valid...


// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const twitterID = args[0]

//CHECK FEW THINGS

const tweetValue = await getTweetValue(twitterID)
return Buffer.concat([
  Functions.encodeUint256(tweetValue),
  Functions.encodeString(twitterID)
])


// ====================
// Helper Functions
// ====================


/// GET THE TWEET VALUE FROM THE TWITTER ID
async function getTweetValue(twitterID) {
const tweetValue = 11
return tweetValue
}