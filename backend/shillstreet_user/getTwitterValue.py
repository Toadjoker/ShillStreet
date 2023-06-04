from web3 import Web3
import json
from eth_account import Account
import requests
import os
from dotenv import load_dotenv
load_dotenv()


def getTweetValue(twitterID, address):
    faceut_privateKey = os.environ.get('PRIVATE_KEY')
    infura_url = "https://sepolia.infura.io/v3/b72c182a206247f3b3a7f80c32696594"
    web3 = Web3(Web3.HTTPProvider(infura_url))
    PRIVATE_KEY = faceut_privateKey
    mainWallet = Account.from_key(PRIVATE_KEY).address
    nonce = web3.eth.get_transaction_count(mainWallet)
    token_abi = json.loads(
        '[{ "inputs": [ { "internalType": "string", "name": "twitterID", "type": "string" }, { "internalType": "address", "name": "participantWalletAddress", "type": "address" } ], "name": "getTweetValue", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "function" }]')
    contract_address = "0xe47ED937bEB276d36f61Faa32822EA95bCBBc0c9"
    contract = web3.eth.contract(contract_address, abi=token_abi)
    getTweet = contract.functions.getTweetValue(twitterID, address).build_transaction(
        {
            "chainId": 11155111,
            'from': mainWallet,
            'nonce': nonce,
            'gas': 700000,
            'gasPrice': web3.to_wei(10, "gwei"),
        })
    signed_txn = web3.eth.account.sign_transaction(
        getTweet, private_key=PRIVATE_KEY)
    tran_hash = web3.eth.send_raw_transaction(
        signed_txn.rawTransaction)
    transaction_receipt = web3.eth.wait_for_transaction_receipt(
        tran_hash)
    status = transaction_receipt["status"]
    if status == 1:
        print("Transaction succeeded")
    elif status == 0:
        print("Transaction failed")
    else:
        print("Unknown transaction status")


def getTwtterIdFromAddress(address):
    url = "https://api.shillstreet.com/users/get_twitter_id/"
    post_data = {'walletAddress': f'{address}'}

    response = requests.post(url, data=json.dumps(post_data), headers={
        'Content-Type': 'application/json'})
    twitter_id = ""
    if response.json()['message'] == "found":
        twitter_id = response.json()['twitter_user_id']
    return twitter_id


def bearer_oauth_user(r):
    r.headers["Authorization"] = f"Bearer {os.environ.get('BEARER_TOKEN')}"
    # r.headers["User-Agent"] = "v2UserLookupPython"
    return r


def get_follower_count(user_id):
    bearer_token = os.environ.get('BEARER_TOKEN')

    url = f"https://api.twitter.com/2/users/{user_id}?user.fields=public_metrics"

    headers = {
        'Authorization': f'Bearer {bearer_token}',
        'User-Agent': 'v2UserLookupPython'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:

        user_info = response.json()
        return (user_info['data']['public_metrics']['followers_count'])
    else:
        # Print the error message
        print(f'Error: {response.status_code}, {response.text}')


# if __name__ == "__main__":
#     twitterID = getTwtterIdFromAddress(address)
#     if int(get_follower_count(twitterID)) >= 500:
#         getTweetValue(twitterID, address)
#     else:
#         print("not ok")
