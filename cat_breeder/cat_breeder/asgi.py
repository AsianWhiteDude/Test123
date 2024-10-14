import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from chat.consumers import ChatConsumer  # Ensure this is imported
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cat_breeder.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                path("ws/chat/general/", ChatConsumer.as_asgi()),  # Ensure this matches
            ])
        )
    ),
})