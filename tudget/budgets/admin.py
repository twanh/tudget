from django.contrib import admin
from .models import CurrencyBudget, TransactionBudget

# Register to the admin console.
admin.site.register(CurrencyBudget)
admin.site.register(TransactionBudget)
