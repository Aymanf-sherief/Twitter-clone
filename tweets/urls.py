from django.contrib import admin
from django.urls import path

from django.urls import include, path
from rest_framework import routers
from .views import TweetViewSet, UserViewSet, current_user, logout_user
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token




app_name = 'tweets'

router = routers.DefaultRouter()
router.register(r'tweets', TweetViewSet, basename = 'Tweets')
router.register(r'users', UserViewSet)



urlpatterns = [    
    path('api/', include(router.urls)),

    path('api/token-auth/', obtain_jwt_token),
    path('api/token-refresh/', refresh_jwt_token),
    path('api/token-verify/', verify_jwt_token),
    path('api/current-user/', current_user),
    path('api/logout-user/', logout_user),
   
]
