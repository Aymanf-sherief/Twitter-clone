from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, Http404
from django.utils.http import is_safe_url
from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()
#from django.contrib.auth.models import User, Group
from rest_framework import viewsets, generics, permissions
from .serializers import   TweetSerializer, UserSerializer

class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer     

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer     