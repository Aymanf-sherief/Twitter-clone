from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password

from .models import Tweet, User
from rest_framework import serializers



class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email', 'password', 'bio']

        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
        
