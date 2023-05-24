//This script should check that the TweetURL is a tweet from the Twitter profile corresponding to the twitter ID provided...


// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const tweetURL = args[0]
const twitterID = args[1]
const tweetInstructions = args[2]
const verifiedCounter = parseInt(args[3])

const initialPrompt = "Act like an tweet analyser expert. Does the following Text content follows ALL the following instructions? Say 1 if it follows ALL the following instructions and 0 otherwise. If the text contains other informations that the given instructions, write 0"

//CHECK TWITTER ID CORRESPONDS TO TWEET ID

let tweetInfo = await getTweetInformation();
if (tweetInfo.author_id == twitterID){
  let prompt = initialPrompt + tweetInstructions + "Text content:" + tweetInfo.tweetContent
  console.log(prompt);
  tweetInfo.tweetContent
  const approved = await getGPTweetApproval(prompt)
  return Buffer.concat([
    Functions.encodeUint256(verifiedCounter),
    Functions.encodeUint256(approved)
  ])
}
else {
  console.log("Twitter ID do not own the tweet mentionned...")
  return Buffer.concat([
    Functions.encodeUint256(verifiedCounter),
    Functions.encodeUint256(0)
  ])
}


// ====================
// Helper Functions
// ====================

async function getGPTweetApproval(prompt) {

  console.log("\nFetching GPT answer from API...")
  
  if (!secrets.gptApiKey) {
    throw new Error("Need to set GPT_API_KEY environment variable")
  }

  const openAIRequest = Functions.makeHttpRequest({
    url: "https://api.openai.com/v1/chat/completions",
    method: "POST",
    headers: {
        'Authorization': `Bearer ${secrets.gptApiKey}`
    },
    data: {
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": prompt}]
    }
})

const [openAIResponse] = await Promise.all([
    openAIRequest
])

//console.log("raw response", openAIResponse)

const answer = openAIResponse.data.choices[0].message.content
console.log(answer)

if (answer.includes("0")) {
  return 0
}
else if (answer.includes("1")) {
  return 1
}
else {
  throw new Error("GPT DO NOT RETURNN 1 OR 0")
}
}

async function getTweetInformation() {
  console.log("\nFetching tweet information...")
  if (!secrets.twitterApiKey) {
    throw new Error('Need to set Twitter API key environment variable')
  }

  const twitterRequest = Functions.makeHttpRequest({
    url: `https://api.twitter.com/2/tweets/${tweetURL}?expansions=author_id`,
    method: "GET",
    headers: {
        'Authorization': `Bearer ${secrets.twitterApiKey}`
    },
})
  const [twitterResponse] = await Promise.all([
    twitterRequest
  ])

  //console.log("raw response", twitterResponse)

  let author_id = twitterResponse.data.data.author_id
  let tweetContent = twitterResponse.data.data.text

  return {author_id: author_id, tweetContent: tweetContent}
}