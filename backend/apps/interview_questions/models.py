from django.db.models.deletion import CASCADE
from django.db import models

# Create your models here.
from django.db import models
from apps.interviews.models import Interview


class InterviewQuestion(models.Model):
    class Meta(object):
        db_table = 'interview_questions'

    interview = models.ForeignKey (
        Interview,related_name='related_interview', blank=False, null=False, on_delete=CASCADE, db_index=True
    )
    question = models.CharField(
        'Question', blank=True, null=False, max_length=500, db_index=True
    )
    created_at = models.DateTimeField(
        'Created at', blank=True, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated at', blank=True, auto_now=True
    )
