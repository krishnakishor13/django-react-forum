from apps.students.serializers import StudentOptionSerializer
from apps.users.serializers import UserOptionSerializer
from .models import Application
from django.db import models
from rest_framework import serializers
from config.constants import *


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

class ApplicationListSerializer(serializers.ModelSerializer):
    user = UserOptionSerializer()

    class Meta:
        model = Application
        fields = '__all__'


class ApplicationOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = ('id','company_name')