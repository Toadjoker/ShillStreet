import tweepy
from .credentials import *
from .models import *

#Create API using credentials file and return the API object
def create_api_client():
    auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True)
    return api

#get tweet by id
def get_tweet_metrics(api, tweet_id):
    tweet = api.get_status(tweet_id)
    retweet_count = tweet.retweet_count
    favorite_count = tweet.favorite_count

    #update total likes and retweets
    total_likes, _ = CombinedMetrics.objects.get_or_create(id=1)
    total_likes.total_likes += favorite_count
    total_likes.save()
    
    return {
        'tweet': tweet,
        'retweet_count': retweet_count,
        'favorite_count': favorite_count,
    }
#get 20 most recent tweets from username
def get_user_tweets(api, username, count=20):
    tweets = api.user_timeline(screen_name=username, count=count)
    return [{'tweet': tweet, 'retweet_count': tweet.retweet_count, 'favorite_count': tweet.favorite_count} for tweet in tweets]

#get 20 most recent tweets by keyword
def get_tweets_by_keyword(api, keyword, count=20):
    tweets = api.search(q=keyword, count=count, tweet_mode='extended')
    return [{'tweet': tweet, 'retweet_count': tweet.retweet_count, 'favorite_count': tweet.favorite_count} for tweet in tweets]

#get tweet by ID
def get_tweet_by_id(api, tweet_id):
    tweet = api.get_status(tweet_id, tweet_mode="extended")
    return {'tweet': tweet, 'retweet_count': tweet.retweet_count, 'favorite_count': tweet.favorite_count}

#get user followers
def get_user_followers(api, username):
    user = api.get_user(screen_name=username)
    return user.followers_count