from rest_framework import serializers
from .models import User, WaitList


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'walletAddress',
                  'privateString', 'twitter_handle']
        extra_kwargs = {
            'privateString': {'write_only': True},
            'twitter_handle': {'required': False}
        }

    def save(self, **kwargs):
        private_string = self.validated_data.pop('privateString', None)
        user = super().save(**kwargs)
        if private_string is not None:
            user.set_password(private_string)
            user.save()
        return user


class WaitListSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitList
        fields = ('email',)
