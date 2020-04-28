from django.contrib import admin
from .models import Expense, Income

# Add to admin console.
admin.site.register(Expense)
admin.site.register(Income)