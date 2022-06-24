from django.contrib import admin
from .models import Application

# Register your models here.

@admin.register(Application)
class ApplicationModel(admin.ModelAdmin):
    fields = ['user', 'status',
              'company_name', 'note']
    list_filter = []
    list_display = ['user', 'status',
              'company_name']
    search_fields = fields
