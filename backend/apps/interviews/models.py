from django.db.models.deletion import CASCADE
from django.db import models
from apps.students.models import Student
from apps.applications.models import Application
from config.constants import INTERVIEW_STATUS, INTERVIEW_TYPE, INTERVIEW_STUDENT_TIMEZONE

# Create your models here.


class Interview(models.Model):
    class Meta:
        db_table = "interview"

    student = models.ForeignKey(Student, on_delete=CASCADE, db_index=True)
    application = models.ForeignKey(Application, on_delete=CASCADE, db_index=True)
    status = models.CharField("Status", max_length=50, choices=INTERVIEW_STATUS)
    interview_type = models.CharField("Type", max_length=50, choices=INTERVIEW_TYPE)
    round = models.IntegerField("Round")
    support_tutor = models.CharField("Support Tutor", blank=True, null=True, max_length=50)
    student_scheduled_at = models.DateTimeField("Student Scheduled at", blank=True, null=True)
    student_timezone = models.CharField(
        "Student TimeZone", blank=True, null=True, choices=INTERVIEW_STUDENT_TIMEZONE, max_length=50
    )
    submission_date = models.DateTimeField("Submission Date", blank=True, null=True)
    ist_scheduled_at = models.DateTimeField("IST Scheduled at", blank=True, null=True)
    note = models.TextField("Note", blank=True, null=True)
    recording_url = models.URLField("Recording URL", blank=True, null=True)
    created_at = models.DateTimeField("Created at", auto_now_add=True)
    updated_at = models.DateTimeField("Updated at", auto_now=True)

    @property
    def interview_questions(self):
        return self.related_interview.order_by('-id').all()
