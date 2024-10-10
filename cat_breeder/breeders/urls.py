from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView

from .views import CatViewSet, LoginUserView, RegisterView

router = DefaultRouter()
router.register(r'cats', CatViewSet, basename='cat')


urlpatterns = [
    path('breeder/', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh'),
    path('login/', LoginUserView.as_view(), name='login-user'),
    path('register/', RegisterView.as_view(), name='register'),
]