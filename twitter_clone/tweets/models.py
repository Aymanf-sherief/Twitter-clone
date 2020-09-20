from django.db import models
from django.conf import settings
# Create your models here.
class Tweet(models.Model):
    content = models.TextField(blank=True, null=True, max_length=settings.MAX_TWEET_LENGTH)
    image = models.FileField(upload_to='images/', blank=True, null=True)