# Generated by Django 3.1.1 on 2020-09-15 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_auto_20200915_1444'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='isSavingsAccount',
            field=models.BooleanField(default=False),
        ),
    ]