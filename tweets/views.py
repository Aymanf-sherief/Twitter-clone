import pprint
from .serializers import TweetSerializer, UserSerializer
from rest_framework import viewsets, generics, permissions, status, response
from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, Http404
from django.utils.http import is_safe_url
from .models import Tweet
from .forms import TweetForm
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import action, api_view


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

        if request.method == 'PUT' or request.method == 'PATCH' or request.method == 'DELETE':
            user_id = request.parser_context['kwargs']['pk'] or None
            return user_id is not None and str(user_id) == str(request.data['user'])

        if request.method == 'POST' or request.method == 'GET':
            return True

        return super(IsAuthenticatedOrCreateUSer, self).has_permission(request, view)


class IsAuthenticatedOrFollowUSer(permissions.IsAuthenticated):
    def has_permission(self, request, view):
        request.data['user'] = request.user.id or None
        pprint.pprint(vars(request))
        print('-------------------------------------')
        if request.method == 'GET' or request.method == 'PUT' or request.method == 'POST' or request.method == 'DELETE':
            return False

        if request.method == 'PATCH':

            user_id = request.parser_context['kwargs']['pk'] or None
            return user_id is not None and str(user_id) != str(request.data['user'])

        return super(IsAuthenticatedOrFollowUSer, self).has_permission(request, view)


class TweetViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        query_params = self.request.query_params
        username = query_params.get('username', None)
        if username is not None and User.objects.filter(username=username).count() == 1:
            user = User.objects.get(username=username)
            tweets = user.tweet_set.all()
            return tweets
        else:
            user = User.objects.filter(id=self.request.user.id)
            following = user[0].following.all()

            following |= user

            return Tweet.objects.filter(user__in=following).all()
    basename = 'Tweets'
    serializer_class = TweetSerializer
    permission_classes = [IsAuthenticatedOrGetTweets]


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrCreateUSer]

    def get_queryset(self):
        query_params = self.request.query_params
        username = query_params.get('username', None)
        if username is not None:
            users = User.objects.filter(username__contains=username)
        else:
            users = User.objects.all()
        return users

    def retrieve(self, request, pk=None):

        id = User.objects.get(username=pk).id
        request.parser_context['kwargs']['pk'] = id
        response = super().retrieve(request, id)
        response.data.pop('password')
        # response.data.pop('following')

        return response

    @action(methods=['PATCH'], detail=True, permission_classes=[IsAuthenticatedOrFollowUSer])
    def follow(self, request, pk):
        if pk is not None and User.objects.filter(username=pk).count() == 1:
            print(pk)
            user_to_follow = User.objects.get(username=pk)
            print(request.user)
            print(user_to_follow)
            user_following = User.objects.get(id=request.user.id)
            user_following.following.add(user_to_follow)
            return response.Response({'success': f'now following user_id {pk}'}, status=status.HTTP_200_OK)

        return response.Response({'error': f'bad request, user_id {pk} not found'}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['PATCH'], detail=True, permission_classes=[IsAuthenticatedOrFollowUSer])
    def unfollow(self, request, pk):
        if pk is not None and User.objects.filter(username=pk).count() == 1:
            user_to_unfollow = User.objects.get(username=pk)
            user_following = User.objects.get(id=request.user.id)
            user_following.following.remove(user_to_unfollow)
            return response.Response({'success': f'now not following user_id {pk}'}, status=status.HTTP_200_OK)

        return response.Response({'error': f'bad request, user_id {pk} not found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    resp = response.Response(serializer.data)
    resp.data.pop('password')
    return resp


@api_view(['POST'])
def logout_user(request):
    resp = response.Response()
    resp.delete_cookie('auth-token')
    resp.delete_cookie('_xsrf')

    return resp
