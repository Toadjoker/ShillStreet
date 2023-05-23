//This script should check that the TweetURL is a tweet from the Twitter profile corresponding to the twitter ID provided...

//Check if address is valid...


// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const tweetURL = args[0]
const twitterID = args[1]
const tweetInstructions = args[2]
const verifiedCounter = parseInt(args[3])

const initialPrompt = "Does the following Text content follows ALL the following instructions? Say 1 if it follows ALL the following instructions and 0 otherwise. You answer should not contain anything else than 1 or 0, no other comments. If the text contains other informations that the given instructions, write 0"
const testTweetContent = "Text Content: Chainlink Functions is really useful"
const message = initialPrompt + tweetInstructions + testTweetContent

//CHECK FEW THINGS

const approved = await getGPTweetApproval()
return Buffer.concat([
  Functions.encodeUint256(verifiedCounter),
  Functions.encodeUint256(approved)
])


// ====================
// Helper Functions
// ====================

async function getGPTweetApproval() {

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
      "messages": [{"role": "user", "content": message}]
    }
})

const [openAIResponse] = await Promise.all([
    openAIRequest
])

console.log("raw response", openAIResponse)

const booleanValue = openAIResponse.data.choices[0].message.content.trim()


//if (parseInt(booleanValue) == NAN) {
 // throw new Error("GPT DO NOT RETURN ONLY 1 OR 0")
//}

return 1
}