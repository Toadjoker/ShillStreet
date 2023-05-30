import requests
import os
from dotenv import load_dotenv
load_dotenv()


def create_url(tweet_id):
    return "https://api.twitter.com/2/tweets/{}".format(tweet_id)


def bearer_oauth_tweet(r):
    r.headers["Authorization"] = f"Bearer {os.environ.get('BEARER_TOKEN')}"
    r.headers["User-Agent"] = "v2TweetLookupPython"
    return r


def bearer_oauth_user(r):
    r.headers["Authorization"] = f"Bearer {os.environ.get('BEARER_TOKEN')}"
    r.headers["User-Agent"] = "v2UserLookupPython"
    return r


def connect_to_endpoint(url, bearer):
    response = requests.request("GET", url, auth=bearer)
    if response.status_code != 200:
        raise Exception(response.status_code, response.text)
    return response.json()


def readTweet(url):
    tweet_id = url.split('/')[-1]
    url = "https://api.twitter.com/2/tweets/{}?tweet.fields=author_id".format(
        tweet_id)
    json_response = connect_to_endpoint(url, bearer_oauth_tweet)
    twitter_user_id = json_response['data']['author_id']
    tweet_content = json_response['data']['text']
    user_url = "https://api.twitter.com/2/users/{}".format(twitter_user_id)
    json_response = connect_to_endpoint(user_url, bearer_oauth_user)
    twitter_handle = json_response['data']['username']
    return tweet_content, twitter_user_id, twitter_handle

