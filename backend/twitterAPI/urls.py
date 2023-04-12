from django.urls import path
from . import views

urlpatterns = [
    path('tweet_metrics/<str:tweet_id>', views.tweet_metrics, name='tweet_metrics'),
    path('user_tweets/<str:username>', views.user_tweets, name='user_tweets'),
    path('tweets_by_keyword/<str:keyword>', views.tweets_by_keyword, name='tweets_by_keyword'),
    path('tweet_by_id/<str:tweet_id>', views.tweet_by_id, name='tweet_by_id'),
    path('user_followers/<str:username>', views.user_followers, name='user_followers'),
    path('graph/', views.graph, name='graph'),
]