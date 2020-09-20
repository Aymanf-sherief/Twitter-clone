from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse, Http404
from django.utils.http import is_safe_url
from .models import Tweet
from .forms import TweetForm
from django.conf import settings

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request, 'tweets/home.html')

def tweet_listView(request, *args, **kwargs):
    
    try:
        tweets = Tweet.objects.all()
        if len(tweets) == 0:
            raise Http404
    except:
        data['Error'] = "tweet not found"
        status = 404
        return JsonResponse(data, status=status)

    data = [{'id': t.id, 'content': t.content} for t in tweets]
    status = 200
    return JsonResponse(data, status=status, safe=False)


def tweet_detailView(request, tweet_id, *args, **kwargs):
    data = {'id': tweet_id}
    try:
        tweet = Tweet.objects.get(id=tweet_id)
    except:
        data['Error'] = "tweet not found"
        status = 404
        return JsonResponse(data, status=status)

    data['content'] = tweet.content
    status = 200
    return JsonResponse(data, status=status)

def tweet_createView(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    next_url = request.POST.get('next') or None
    if form.is_valid():
        form.save()
        form = TweetForm()
        
    if next_url is not None and is_safe_url(next_url, settings.ALLOWED_HOSTS):
        return redirect(to=next_url)

    return render(request, 'components/form.html', context={"form": form})

