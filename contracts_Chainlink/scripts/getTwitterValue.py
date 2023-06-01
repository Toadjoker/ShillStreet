from web3 import Web3
import json
from eth_account import Account
import requests


def getTweetValue(faceut_privateKey, twitterID, address):
    infura_url = "https://sepolia.infura.io/v3/b72c182a206247f3b3a7f80c32696594"
    web3 = Web3(Web3.HTTPProvider(infura_url))
    PRIVATE_KEY = faceut_privateKey
    mainWallet = Account.from_key(PRIVATE_KEY).address
    nonce = web3.eth.getTransactionCount(mainWallet)
    token_abi = json.loads(
        '[{ "inputs": [ { "internalType": "string", "name": "twitterID", "type": "string" }, { "internalType": "address", "name": "participantWalletAddress", "type": "address" } ], "name": "getTweetValue", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "nonpayable", "type": "function" }]')
    contract_address = "0xe47ED937bEB276d36f61Faa32822EA95bCBBc0c9"
    contract = web3.eth.contract(contract_address, abi=token_abi)
    getTweet = contract.functions.getTweetValue(twitterID, address).buildTransaction(
        {
            "chainId": 11155111,
            'from': mainWallet,
            'nonce': nonce,
            'gas': 700000,
            'gasPrice': web3.toWei(3.5, "gwei"),
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


if __name__ == "__main__":
    print("please enter your private key:")
    privateKey = input()
    print("please enter the wallet address you want to check:")
    walletaddress = input()
    twitter_user_id = getTwtterIdFromAddress(
        address=walletaddress)
    getTweetValue(faceut_privateKey=privateKey,
                  twitterID=twitter_user_id, address=walletaddress)
