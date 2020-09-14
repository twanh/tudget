from django.db import models
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist


class Account(models.Model):
    """
    Account model, keep track of details of the account
    """
    name = models.CharField(max_length=50)  # The name of the account
    # Description of the account
    description = models.TextField(blank=True, default="")
    # Current balance, defaults to 0.00
    balance = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)
    # Accounts will be able to deactivated
    active = models.BooleanField(default=True)
    _createdOn = models.DateTimeField(auto_now=True)  # For auto sorting

    # The owner of the accunt
    owner = models.ForeignKey(settings.AUTH_USER_MODEL,
                              related_name="accounts", on_delete=models.CASCADE)

    # Note: Has a ManyToOne relation with transactions, although this is defined in the transaction model.
    #       One account has many transactions.

    def __str__(self):
        return f'Account: {self.name}, balance: {self.balance}'

    @staticmethod
    def calculate_balance(pk):
        """
        Calculates the current balance of the account
        :param pk: int - The primary key of the account to calculate the balance from.
        :return: None
        """
        try:
            # Get the Account with the corresponding primary key (pk)
            account = Account.objects.get(pk=pk)
            # The current balance is needed for easy calculating
            cur_balance = account.balance
            # We need to check if there are expenses added
            if account.expense_set:
                # Calculate the balance minus all the expenses
                cur_balance -= sum([exp.amount for exp in account.expense_set.all()])
            # Need to check if there are income transactions added
            if account.income_set:
                # Calculate the balance w/ all the income added
                cur_balance += sum([exp.amount for exp in account.income_set.all()])
            # Update and save account
            account.balance = cur_balance
            account.save()
        # Catch if the object does not exist, makes it non-fatal.
        except ObjectDoesNotExist:
            print(
                f"[ACCOUNT] Account with pk={pk} does not exist! Could not update balance.")
