from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import path
from twitterAPI import consumers

#Handle DJango channels routing
application = ProtocolTypeRouter(
    {
        "http" : get_asgi_application(),
        "websocket" : URLRouter (
            [
                path('ws/tweet_metrics/<str:tweet_id>', consumers.TweetMetricsConsumer.as_asgi()),
            ]
        )
    })