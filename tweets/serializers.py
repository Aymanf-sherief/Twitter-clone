from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password

from .models import Tweet, User
from rest_framework import serializers



class TweetSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Tweet
        fields = ['id', 'content', 'user', 'username']

    

class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', )

class UserSerializer(serializers.ModelSerializer):
    following = FollowerSerializer(read_only=True, many=True)
    class Meta:
        model = User
        fields = ['id','username','email', 'password', 'bio', 'following']

        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
        
