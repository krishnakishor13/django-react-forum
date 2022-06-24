# Generated by Django 3.2.4 on 2022-02-01 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0002_alter_application_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='application',
            name='job_post_url',
            field=models.URLField(blank=True, max_length=1000, null=True, verbose_name='Job Post URL'),
        ),
        migrations.AlterField(
            model_name='application',
            name='state',
            field=models.CharField(blank=True, max_length=50, verbose_name='State'),
        ),
    ]
