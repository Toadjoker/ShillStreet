from django.db import models

#Model for all data combined from all users
class CombinedMetrics(models.Model):
    total_tweets = models.IntegerField()
    total_retweets = models.IntegerField()
    total_likes = models.IntegerField()
    total_followers = models.IntegerField()

#Model for storing metrics for someone who is posting a tweet
class PosterMetrics(models.Model):
    username = models.CharField(max_length=100)
    total_tweets = models.IntegerField()
    total_retweets = models.IntegerField()
    total_likes = models.IntegerField()

#Model for storing metrics for someone paying to promote a tweet
class UserMetrics(models.Model):
    username = models.CharField(max_length=100)
    total_followers = models.IntegerField()