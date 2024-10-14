from django.contrib import admin

from .models import User, Cat

# Register your models here.
admin.site.register(User)
admin.site.register(Cat)