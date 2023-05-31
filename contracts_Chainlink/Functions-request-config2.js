const fs = require("fs")

// Loads environment variables from .env.enc file (if it exists)
require("@chainlink/env-enc").config()


let twitterID = "1458046241644892163"

const Location = {
  Inline: 0,
  Remote: 1,
}

const CodeLanguage = {
  JavaScript: 0,
}

const ReturnType = {
  uint: "uint256",
  uint256: "uint256",
  int: "int256",
  int256: "int256",
  string: "string",
  bytes: "Buffer",
  Buffer: "Buffer",
}

// Configure the request by setting the fields below
const requestConfig = {
  // Location of source code (only Inline is currently supported)
  codeLocation: Location.Inline,
  // Code language (only JavaScript is currently supported)
  codeLanguage: CodeLanguage.JavaScript,
  // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
  walletPrivateKey: process.env["PRIVATE_KEY"],

  secretsURLs: [],
  // String containing the source code to be executed
  source: fs.readFileSync("./TweetValueScript.js").toString(),
  // Secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey). The secrets object can only contain string values.
  // Per-node secrets objects assigned to each DON member. When using per-node secrets, nodes can only use secrets which they have been assigned.
  // Args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
  args: [twitterID],
  // Expected type of the returned value
  expectedReturnType: ReturnType.Buffer,
  // Redundant URLs which point to encrypted off-chain secrets

  secrets: {
    // DON level API Keys
    twitterApiKey: process.env.TWITTER_API_KEY
  },
  // Per-node secrets objects assigned to each DON member.
  // When using per-node secrets, nodes can only use secrets which they have been assigned.
  perNodeSecrets: [],
}

module.exports = requestConfig

