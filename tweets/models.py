from django.db import models
from django.conf import settings

from django.db import models
from django.contrib.auth.models import AbstractUser, AnonymousUser
from typing import Union

import random


# Create your models here.

class User(AbstractUser):
    bio = models.CharField(blank=True, null=True, max_length=250)
    token = models.CharField(blank=True, null=True, max_length=250)

   

class Tweet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(
        blank=True, null=True, max_length=settings.MAX_TWEET_LENGTH)
    image = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        ordering = ['-id']

