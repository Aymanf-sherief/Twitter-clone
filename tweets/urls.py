from django.contrib import admin
from django.urls import path

from django.urls import include, path
from rest_framework import routers
from .views import TweetViewSet, UserViewSet
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token




app_name = 'tweets'

router = routers.DefaultRouter()
router.register(r'tweets', TweetViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [    
    path('api/', include(router.urls)),
    path('api-token-auth/', obtain_jwt_token),
    path('api-token-refresh/', refresh_jwt_token),
]
