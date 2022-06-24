from django.contrib import admin
from .models import User


@admin.register(User)
class UserModel(admin.ModelAdmin):
    fields = ['status', 'user_name', 'email', 'token',
              'token_expires_at', 'role', 'password', 'permission']
    list_filter = []
    list_display = fields
    search_fields = ['status', 'user_name', 'email', 'role', 'permission']
