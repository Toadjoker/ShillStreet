from django.http import JsonResponse
from django.shortcuts import render
from .twitter_client import *

#Get General Tweet Metrics from tweet_id
def tweet_metrics(request, tweet_id):
    api = create_api_client()
    tweet_metrics = get_tweet_metrics(api, tweet_id)
    return JsonResponse(tweet_metrics)

#Get 20 Most Recent Tweets From User
def user_tweets(request, username):
    api = create_api_client()
    tweets = get_user_tweets(api, username)
    return JsonResponse(tweets, safe=False)

#Get Tweets By Keyword
def tweets_by_keyword(request, keyword):
    api = create_api_client()
    tweets = get_tweets_by_keyword(api, keyword)
    return JsonResponse(tweets, safe=False)

#Get Tweet By ID
def tweet_by_id(request, tweet_id):
    api = create_api_client()
    tweet = get_tweet_by_id(api, tweet_id)
    return JsonResponse(tweet)

#Get User Total Followers
def user_followers(request, username):
    api = create_api_client()
    followers_count = get_user_followers(api, username)
    return JsonResponse(followers_count, safe=False)

#Load Graph Page -> TEMP
def graph(request):
    return render(request, 'graph.html')