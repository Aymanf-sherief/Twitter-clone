from django.db import models
from django.conf import settings

import random
# Create your models here.
class Tweet(models.Model):
    content = models.TextField(blank=True, null=True, max_length=settings.MAX_TWEET_LENGTH)
    image = models.FileField(upload_to='images/', blank=True, null=True)

    class Meta:
        ordering= ['-id']
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0,100)
        }