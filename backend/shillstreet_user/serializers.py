from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'walletAddress',
                  'privateString', 'twitter_handle']
        extra_kwargs = {
            'privateString': {'write_only': True},
            'twitter_handle': {'required': False}
        }

    def create(self, validated_data):
        privateString = validated_data.pop('privateString', None)
        instance = self.Meta.model(**validated_data)
        if privateString is not None:
            instance.set_password(privateString)
        instance.save()
        return instance
