from django.db import models


class Account(models.Model):
    """
    Account model, keep track of details of the account
    """
    name = models.CharField(max_length=50)  # The name of the account
    descriptions = models.TextField()  # Description of the account
    balance = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)  # Current balance, defaults to 0.00
    active = models.BooleanField(default=True)
    _createdOn = models.DateTimeField(auto_now=True)

    # Note: Has a ManyToOne relation with transactions, although this is defined in the transaction model.
    #       One account has many transactions.

