from django.db import models


class Transaction(models.Model):
    """
    Model for the users transactions.
    This is a abstract model, so can only be inherited from, not created.
    """
    name = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    category = models.ForeignKey('grouping.Category', on_delete=models.CASCADE, blank=True,)
    tags = models.ManyToManyField('groupings.Tag', blank=True)
    spendOn = models.DateField(auto_now_add=True)
    _createdOn = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

# TODO: Create signals to update the balance!!!


class Expense(Transaction):
    """
    Type of transactions, an expense is per definition negative.
    """
    type = models.CharField(default='expense', editable=False)  # Auto add type


class Income(Transaction):
    """
    Type of transaction, an expense is per definition negative.
    """
    type = models.CharField(default='income', editable=False)  # Auto add type


