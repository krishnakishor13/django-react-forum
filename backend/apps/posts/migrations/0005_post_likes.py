# Generated by Django 2.2 on 2022-06-21 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20220620_0352'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likes',
            field=models.IntegerField(default=0, verbose_name='Likes'),
            preserve_default=False,
        ),
    ]
