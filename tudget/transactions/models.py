from django.db import models
from django.db.models.signals import post_save
from django.conf import settings

from accounts.models import Account
from groupings.models import Category
from budgets.models import CurrencyBudget, TransactionBudget


class Transaction(models.Model):
    """
    Model for the users transactions.
    This is a abstract model, so can only be inherited from, not created.
    """
    name = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    account = models.ForeignKey('accounts.Account', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    category = models.ForeignKey(
        'groupings.Category', on_delete=models.CASCADE, blank=True,  null=True)
    tags = models.ManyToManyField('groupings.Tag', blank=True)
    spendOn = models.DateField(auto_now_add=True)
    _createdOn = models.DateTimeField(auto_now=True)

    # Owner
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="%(class)s", on_delete=models.CASCADE)

    class Meta:
        abstract = True

    def __str__(self):
        return f'Transaction: {self.amount}'


class Expense(Transaction):
    """
    Type of transactions, an expense is per definition negative.
    """
    type = models.CharField(
        default='expense', editable=False, max_length=10)  # Auto add type


class Income(Transaction):
    """
    Type of transaction, an expense is per definition negative.
    """
    type = models.CharField(
        default='income', editable=False, max_length=10)  # Auto add type

# SIGNAL handling
# We use signals to update the balance of the account after an expense or income has been created/updated, aka saved.


def update_balance(sender, instance,  **kwargs):
    # Run the static method on the Account model that calculated the current account balance
    Account.calculate_balance(instance.account.pk)


def check_and_update_budget(sender, instance, **kwargs):
    # Check if the expense has an category attached, otherwise it cannot be part of a budget
    if instance.category:
        # Check if there are budgets attached (should not assume so)
        budgets_attached = instance.category.has_budget_attached()
        # Has budgets attached returns Bool[1], the first item (0) is true if there are currency budgets
        # Therefore we check it
        if budgets_attached[0]:
            for budget in instance.category.currencybudget_set.all():
                budget.update_used_budget()
        # The second item [1], is related to the transactionbuget_set
        if budgets_attached[1]:
            for budget in instance.category.transactionbudget_set.all():
                budget.update_used_budget()


# Connect both expense and income models to the post_save signal.
post_save.connect(update_balance, sender=Expense)
post_save.connect(check_and_update_budget, sender=Expense)

post_save.connect(update_balance, sender=Income)
