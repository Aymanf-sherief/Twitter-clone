import pprint
from .serializers import TweetSerializer, UserSerializer
from rest_framework import viewsets, generics, permissions
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, Http404
from django.utils.http import is_safe_url
from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()
#from django.contrib.auth.models import User, Group


class IsAuthenticatedOrGetTweets(permissions.IsAuthenticated):
    def has_permission(self, request, view):

        request.data['user'] = request.user.id or None

        if request.method == 'GET':
            return True

        if request.method == 'POST':
            return request.data['user'] is not None

        if request.method == 'PUT' or request.method == 'PATCH' or request.method == 'DELETE':
            tweet_id = request.parser_context['kwargs']['pk'] or None
            tweet = Tweet.objects.get(id=tweet_id)
            return request.data['user'] == tweet.user.id

        return super(IsAuthenticatedOrGetTweets, self).has_permission(request, view)


class IsAuthenticatedOrCreateUSer(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        request.data['user'] = request.user.id or None

        if request.method == 'GET' or request.method == 'PUT' or request.method == 'PATCH' or request.method == 'DELETE':
            user_id = request.parser_context['kwargs']['pk'] or None
            return user_id is not None and str(user_id) == str(request.data['user'])

        if request.method == 'POST':
            return True

        return super(IsAuthenticatedOrCreateUSer, self).has_permission(request, view)


class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrGetTweets]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrCreateUSer]

    def retrieve(self, request, pk=None):
        response = super().retrieve(request, pk)
        response.data.pop('password')
        return response
