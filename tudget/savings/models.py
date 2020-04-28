from django.db import models
from accounts.models import Account


class SavingsAccount(Account):
    """
    A savingsAccount is a special type of account that holds savings money, it is therefore deactivated.
    Also it cotains a TextField for the user to give a reason to save this money.
    """
    reason = models.TextField(blank=True)
