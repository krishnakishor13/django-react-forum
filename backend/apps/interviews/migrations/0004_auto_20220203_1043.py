# Generated by Django 3.2.4 on 2022-02-03 10:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interviews', '0003_alter_interview_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='interview',
            name='interview_type',
            field=models.CharField(choices=[('phone_call', 'Phone call'), ('assessment_real_time', 'Assessment Real Time'), ('assessment_submit', 'Assessment Submit'), ('video_call', 'Video Call'), ('onsite_interview', 'Onsite Interview')], max_length=50, verbose_name='Type'),
        ),
        migrations.AlterField(
            model_name='interview',
            name='status',
            field=models.CharField(choices=[('scheduling', 'Scheduling'), ('scheduled', 'Scheduled'), ('working', 'Working'), ('done', 'Done and Waiting for the Result'), ('canceled', 'Canceled Interview by Company'), ('missed', 'Missed Interview by Student'), ('rejected', 'Rejected'), ('passed', 'Passed'), ('offered', 'Offered'), ('deleted', 'Deleted')], max_length=50, verbose_name='Status'),
        ),
    ]
