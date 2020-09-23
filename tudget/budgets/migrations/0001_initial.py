# Generated by Django 3.1.1 on 2020-09-23 16:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('transactions', '__first__'),
        ('groupings', '__first__'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TransactionBudget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('reason', models.TextField(blank=True)),
                ('active', models.BooleanField(default=True)),
                ('_createdOn', models.DateTimeField(auto_now=True)),
                ('maxTransactions', models.IntegerField()),
                ('current', models.IntegerField(default=0)),
                ('filterCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='groupings.category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactionbudget', to=settings.AUTH_USER_MODEL)),
                ('transactions', models.ManyToManyField(blank=True, to='transactions.Expense')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CurrencyBudget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('reason', models.TextField(blank=True)),
                ('active', models.BooleanField(default=True)),
                ('_createdOn', models.DateTimeField(auto_now=True)),
                ('maxAmount', models.DecimalField(decimal_places=2, max_digits=9)),
                ('current', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('filterCategory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='groupings.category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='currencybudget', to=settings.AUTH_USER_MODEL)),
                ('transactions', models.ManyToManyField(blank=True, to='transactions.Expense')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
