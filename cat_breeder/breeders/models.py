from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from .managers import UserManager
from django.utils.translation import gettext_lazy as _
from rest_framework_simplejwt.tokens import RefreshToken


class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True, editable=False)
    username = models.CharField(max_length=100, verbose_name=_("Username"))
    email = models.EmailField(
        max_length=255, verbose_name=_("Email Address"), unique=True
    )
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified=models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh":str(refresh),
            "access":str(refresh.access_token)
        }


    def __str__(self):
        return self.email

    @property
    def get_full_name(self):
        return self.username


class Cat(models.Model):
    owner = models.ForeignKey(User, related_name='cats', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    breed = models.CharField(max_length=100)
    fur_length = models.CharField(max_length=50)

    def __str__(self):
        return self.name
