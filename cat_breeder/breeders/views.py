from rest_framework import viewsets, permissions, status
from rest_framework import viewsets, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Cat
from .serializers import CatSerializer, LoginSerializer, UserRegisterSerializer


class RegisterView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny, ]

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user_data = serializer.data
            return Response({
                'data': user_data,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CatViewSet(viewsets.ModelViewSet):
    serializer_class = CatSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cat.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
