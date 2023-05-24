// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const twitterID = args[0]

//CHECK FEW THINGS

const tweetValue = await getTweetValue(twitterID)
return Buffer.concat([
  Functions.encodeUint256(parseInt(tweetValue)),
])


// ====================
// Helper Functions
// ====================


/// GET THE TWEET VALUE FROM THE TWITTER ID
async function getTweetValue(twitterID) {
  console.log("\nFetching tweet information...")
  if (!secrets.twitterApiKey) {
    throw new Error('Need to set Twitter API key environment variable')
  }

  const twitterRequestTweetData = Functions.makeHttpRequest({
    url: `https://api.twitter.com/2/users/${twitterID}/tweets?tweet.fields=public_metrics&max_results=5`,
    method: "GET",
    headers: {
        'Authorization': `Bearer ${secrets.twitterApiKey}`
    },
})

const twitterRequestUserData = Functions.makeHttpRequest({
  url: `https://api.twitter.com/2/users/${twitterID}?user.fields=public_metrics`,
  method: "GET",
  headers: {
      'Authorization': `Bearer ${secrets.twitterApiKey}`
  },
})

  const [tweetDataResponse] = await Promise.all([
    twitterRequestTweetData
  ])

  const [userDataResponse] = await Promise.all([
    twitterRequestUserData
  ])

  console.log(tweetDataResponse)

  if (tweetDataResponse.error) {
    throw Error(`Twitter API request failed - ${tweetDataResponse.response.statusText}`)
  }

  if (userDataResponse.error) {
    throw Error((`Twitter API request failed - ${userDataResponse.response.statusText}`));
  }

  let tweetsList = tweetDataResponse.data.data
  let reply_count = 0;
  let retweet_count = 0;
  let impression_count = 0;
  let like_count = 0;
 
  for (let tweet of tweetsList) {
    reply_count += parseInt(tweet.public_metrics.reply_count)
    retweet_count += parseInt(tweet.public_metrics.retweet_count)
    impression_count += parseInt(tweet.public_metrics.impression_count)
    like_count += parseInt(tweet.public_metrics.like_count)
  }

  let reply_average = reply_count / tweetsList.length
  let retweet_average = retweet_count / tweetsList.length
  let impression_average = impression_count / tweetsList.length
  let like_average = like_count / tweetsList.length
  let numberFollowers = userDataResponse.data.data.public_metrics.followers_count
  
  // Calculate the sum of all averages for normalization
  let total_average = reply_average + retweet_average + impression_average + like_average + numberFollowers;

  // Normalizing the values
  let norm_reply_average = reply_average / total_average;
  let norm_retweet_average = retweet_average / total_average;
  let norm_impression_average = impression_average / total_average;
  let norm_like_average = like_average / total_average;
  

  //let tweetCount = userDataResponse.data.data.public_metrics.tweet_count

  // Finally calculate the tweet value
  let tweetValue = (norm_impression_average * 0.4 + norm_like_average * 0.2 + norm_retweet_average * 0.3 + norm_reply_average * 0.1)*numberFollowers;
  console.log(tweetValue)

  return (tweetValue)
}