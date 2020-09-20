from django.contrib import admin
from django.urls import path
from .views import home_view, tweet_detailView, tweet_listView, tweet_createView

app_name = 'tweets'

urlpatterns = [
    path('', home_view, name = 'home_view'),
    path('<int:tweet_id>/', tweet_detailView, name = 'tweet_detailView'),
    path('tweets/', tweet_listView, name = 'tweet_listView'),
    path('create-tweet/', tweet_createView, name = 'tweet_createView'),
]
