from django.db import models
from django.db.models.signals import post_save

from accounts.models import Account


class Transaction(models.Model):
    """
    Model for the users transactions.
    This is a abstract model, so can only be inherited from, not created.
    """
    name = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    category = models.ForeignKey('groupings.Category', on_delete=models.CASCADE, blank=True,)
    tags = models.ManyToManyField('groupings.Tag', blank=True)
    spendOn = models.DateField(auto_now_add=True)
    _createdOn = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f'Transaction: {self.amount}'


class Expense(Transaction):
    """
    Type of transactions, an expense is per definition negative.
    """
    type = models.CharField(default='expense', editable=False, max_length=10)  # Auto add type


class Income(Transaction):
    """
    Type of transaction, an expense is per definition negative.
    """
    type = models.CharField(default='income', editable=False, max_length=10)  # Auto add type

# SIGNAL handling
# We use signals to update the balance of the account after an expense or income has been created/updated, aka saved.


def update_balance(sender, instance,  **kwargs):
    # Run the static method on the Account model that calculated the current account balance
    Account.calculate_balance(instance.account.pk)


# Connect both expense and income models to the post_save signal.
post_save.connect(update_balance, sender=Expense)
post_save.connect(update_balance, sender=Income)
