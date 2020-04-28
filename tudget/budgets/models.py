from django.db import models


class Budget(models.Model):
    """
    Model for the users budgets.
    """
    name = models.CharField(max_length=50)  # The name of the budget
    reason = models.TextField(blank=True)   # Description of the budget
    filterCategory = models.ForeignKey('groupings.Category', on_delete=models.CASCADE)  # Link to the category it
    # needs to keep track of.
    transactions = models.ManyToManyField('transactions.Expense')  # Link to the transactions that apply to the
    # budget
    active = models.BooleanField(default=True)  # If the budget is still in active use
    _createdOn = models.DateTimeField(auto_now=True)  # Auto created for easy sorting

    class Meta:
        # This is an abstract class/model, meaning it has sub-classes/models - this class/model is not used on its own!
        # It is only used to inherit
        abstract = True

    def __str__(self):
        return f'{self.name} - {self.filterCategory}'

    # TODO: Create signal that checks if a transaction adds to a budget.


class CurrencyBudget(Budget):
    """
    A type of budget, this one is based on having a maximum amount to spend.
    """
    maxAmount = models.DecimalField(max_digits=9, decimal_places=2)  # Based on currency
    current = models.DecimalField(max_digits=9, decimal_places=2, default=0.00)  # Current amount


class TransactionBudget(Budget):
    """
    A type of budget, this one is based on a maximum number of transactions in a filteredCategory.
    """
    maxTransactions = models.IntegerField()  # Based on number of transactions
    current = models.IntegerField(default=0)  # Current amount of transactions

