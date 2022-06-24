from logging import NullHandler
from re import T
from django.db import models
from config.constants import GENDER, STATUS, APPLICATION_QUESTIONNAIRE_STATUS, COURSE, RESUME_QUESTIONNAIRE_STATUS, RESUME_STATUS, PORTFOLIO_STATUS, WAKEUP_SERVER_STATUS, GITHUB_STATUS, PARTNER


class Student(models.Model):
    class Meta(object):
        db_table = 'student'
    name = models.CharField(
        'Name', blank=False, null=False, max_length=50, unique=True, db_index=True
    )
    student_id = models.CharField(
        'Student ID', blank=False, null=False, max_length=100, db_index=True, default=""
    )
    email = models.EmailField(
        'Email', blank=False, null=False, unique=True, db_index=True
    )
    phone = models.CharField(
        'Phone Number', blank=False, null=False, max_length=50, db_index=True
    )
    status = models.CharField(
        'Status', blank=False, null=False, max_length=20, choices=STATUS, db_index=True, default='preparing'
    )
    partner = models.CharField(
        'Partner', blank=False, null=False, max_length=20, choices=PARTNER, db_index=True
    )
    entrance_ceremony_date = models.DateTimeField(
        'Entrance Ceremony Date', blank=True, null=True
    )
    graduated_date = models.DateTimeField(
        'Graduated Date', blank=True, null=True
    )
    prepared_by_dev_team_date = models.DateTimeField(
        'Date of Preparation Completed by Developer Team', blank=True, null=True
    )
    application_started_date = models.DateTimeField(
        'Application Started Date', blank=True, null=True
    )
    got_offer_date = models.DateTimeField(
        'Get Offer Date', blank=True, null=True
    )
    course = models.CharField(
        'Course', blank=False, null=False, max_length=50, choices=COURSE, db_index=True
    )
    gender = models.CharField(
        'Gender', blank=False, null=False, max_length=50, choices=GENDER, db_index=True
    )
    certification_url = models.URLField(
        'Certification Url', blank=True, null=True
    )
    resume_questionnaire_status = models.CharField(
        'Resume Questionnaire Status', choices=RESUME_QUESTIONNAIRE_STATUS, max_length=50, default='not_yet'
    )
    application_questionnaire_status = models.CharField(
        'Application Questionnaire Status', choices=APPLICATION_QUESTIONNAIRE_STATUS, max_length=50, default='not_yet'
    )
    resume_url = models.URLField(
        'Resume Url', blank=True, null=True
    )
    resume_status = models.CharField(
        'Resume Status', choices=RESUME_STATUS, max_length=50, default='not_started'
    )
    portfolio_url = models.URLField(
        'Portfolio Url', blank=True, null=True
    )
    portfolio_status = models.CharField(
        'Portfolio Status', choices=PORTFOLIO_STATUS, max_length=50, default='not_started'
    )
    github_url = models.URLField(
        'Github Url', blank=True, null=True
    )
    github_status = models.CharField(
        'Github Status', choices=GITHUB_STATUS, max_length=50, default='not_started'
    )
    wakeupserver_status = models.CharField(
        'WakeupServer Status', choices=WAKEUP_SERVER_STATUS, max_length=50, default='not_yet'
    )
    job_support_email = models.EmailField(
        'Job Support Email', blank=True, null=True, max_length=50
    )
    job_support_email_password = models.CharField(
        'Job Support Password', blank=True, null=True, max_length=50
    )
    linkedin_id = models.EmailField(
        'LinkedIn Email', blank=True, null=True, max_length=50
    )
    linkedin_password = models.CharField(
        'LinkedIn Password', blank=True, null=True, max_length=50
    )
    indeed_id = models.EmailField(
        'Indeed Email', blank=True, null=True, max_length=50
    )
    indeed_password = models.CharField(
        'Indeed Password', blank=True, null=True, max_length=50
    )
    monster_id = models.EmailField(
        'Monster Email', blank=True, null=True, max_length=50
    )
    monster_password = models.CharField(
        'Monster Password', blank=True, null=True, max_length=50
    )
    glassdoor_id = models.EmailField(
        'Glassdoor Email', blank=True, null=True, max_length=50
    )
    glassdoor_password = models.CharField(
        'Glassdoor Password', blank=True, null=True, max_length=50
    )
    dice_id = models.EmailField(
        'Dice Email', blank=True, null=True, max_length=50
    )
    dice_password = models.CharField(
        'Dice Password', blank=True, null=True, max_length=50
    )
    smart_work_id = models.EmailField(
        'Smart Work Email', blank=True, null=True, max_length=50
    )
    smart_work_password = models.CharField(
        'Smart Work Password', blank=True, null=True, max_length=50
    )
    work_day_id = models.EmailField(
        'Work Day Email', blank=True, null=True, max_length=50
    )
    work_day_password = models.CharField(
        'Work Day Password', blank=True, null=True, max_length=50
    )
    created_at = models.DateTimeField(
        'Created Datetime', blank=False, auto_now_add=True
    )
    updated_at = models.DateTimeField(
        'Updated Datetime', blank=False, auto_now=True
    )

    def __str__(self):
        return self.name
