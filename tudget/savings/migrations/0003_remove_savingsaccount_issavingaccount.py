# Generated by Django 3.1.1 on 2020-09-15 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('savings', '0002_savingsaccount_issavingaccount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='savingsaccount',
            name='isSavingAccount',
        ),
    ]