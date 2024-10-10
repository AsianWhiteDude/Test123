from django.contrib.auth import authenticate
from .models import User
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed

from .models import Cat

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError("passwords do not match")

        return attrs

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data.get('password'),
        )
        return user


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255, read_only=True)
    email = serializers.EmailField(max_length=155, min_length=6)
    password = serializers.CharField(max_length=68, write_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'access_token', 'refresh_token']

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        tokens = user.tokens()
        return {
            'username': user.username,
            'email': user.email,
            "access_token": str(tokens.get('access')),
            "refresh_token": str(tokens.get('refresh'))
        }
class CatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cat
        fields = ['id', 'name', 'age', 'breed', 'fur_length']
