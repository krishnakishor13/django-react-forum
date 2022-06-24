from django import db
from django.db import models
from django.db.models.deletion import CASCADE
from apps.students.models import Student
from apps.users.models import User
from config.constants import APPLIED_BY, APPLICATIONS_STATUS, JOB_PORTAL, STATE
# Create your models here.


class Application(models.Model):
    class Meta(object):
        db_table = 'application'

    user = models.ForeignKey(
        User, on_delete=CASCADE, blank=True, null=True, db_index=True
    )
    status = models.CharField(
        'Status', blank=False, null=False, max_length=50, choices=APPLICATIONS_STATUS, default='applied'
    )
    company_name = models.CharField(
        'Company Name', blank=False, null=False, max_length=100
    )
    note = models.TextField(
        'Note', blank=True, null=True
    )
    created_at = models.DateTimeField(
        'Created at', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated at', blank=True, auto_now=True
    )
