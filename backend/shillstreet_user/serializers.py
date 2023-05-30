from rest_framework import serializers
from .models import User, WaitList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'walletAddress',
                  'privateString', 'twitter_handle', 'twitter_user_id']
        extra_kwargs = {
            'twitter_handle': {'required': False},
            'twitter_user_id': {'required': False}
        }


class WaitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitList
        fields = ('email',)
