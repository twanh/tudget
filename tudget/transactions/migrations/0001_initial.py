# Generated by Django 3.1.1 on 2020-11-01 14:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('groupings', '0001_initial'),
        ('accounts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Income',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('description', models.TextField(blank=True)),
                ('spendOn', models.DateField(auto_now_add=True)),
                ('_createdOn', models.DateTimeField(auto_now=True)),
                ('type', models.CharField(default='income', editable=False, max_length=10)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.account')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='groupings.category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='income', to=settings.AUTH_USER_MODEL)),
                ('tags', models.ManyToManyField(blank=True, to='groupings.Tag')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, default=0.0, max_digits=9)),
                ('description', models.TextField(blank=True)),
                ('spendOn', models.DateField(auto_now_add=True)),
                ('_createdOn', models.DateTimeField(auto_now=True)),
                ('type', models.CharField(default='expense', editable=False, max_length=10)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.account')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='groupings.category')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expense', to=settings.AUTH_USER_MODEL)),
                ('tags', models.ManyToManyField(blank=True, to='groupings.Tag')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
