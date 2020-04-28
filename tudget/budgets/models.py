from django.db import models


class Budget(models.Model):
    """
    Model for the users budgets.
    """
    name = models.CharField(max_length=50)
    reason = models.TextField()
    filterCategory = models.ForeignKey('groupings.Category', on_delete=models.CASCADE)  # Link to the category it needs to keep track of.
    transactions = models.ManyToManyField('transactions.Transaction')  # TODO: Add Transaction model...
    active = models.BooleanField(default=True)
    _createdOn = models.DateTimeField(auto_now=True)

    class Meta:
        # This is an abstract class/model, meaning it has sub-classes/models - this class/model is not used on its own!
        # It is only used to inherit
        abstract = True

    def __str__(self):
        return f'{self.name} - {self.filterCategory}'


class CurrencyBudget(Budget):
    """
    A type of budget, this one is based on having a maximum amount to spend.
    """
    maxAmount = models.DecimalField(max_digits=9, decimal_places=2)


class TransactionBudget(Budget):
    """
    A type of budget, this one is based on a maximum number of transactions in a filteredCategory.
    """
    maxTransactions = models.IntegerField()

