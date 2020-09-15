from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings
from django.db import models


class Budget(models.Model):
    """
    Model for the users budgets.
    """
    name = models.CharField(max_length=50)  # The name of the budget
    reason = models.TextField(blank=True)   # Description of the budget
    filterCategory = models.ForeignKey(
        'groupings.Category', on_delete=models.CASCADE)  # Link to the category it
    # needs to keep track of.
    # Transactions are not really nessesary anymore, because we calculate using the category.
    # Link to the transactions that apply to the
    transactions = models.ManyToManyField('transactions.Expense', blank=True)
    # budget
    # If the budget is still in active use
    active = models.BooleanField(default=True)
    # Auto created for easy sorting
    _createdOn = models.DateTimeField(auto_now=True)

    # Owner
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="%(class)s", on_delete=models.CASCADE)

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
    maxAmount = models.DecimalField(
        max_digits=9, decimal_places=2)  # Based on currency
    current = models.DecimalField(
        max_digits=9, decimal_places=2, default=0.00)  # Current amount

    def calc_used_budget(self):
        """
        Calculate the used budget based on all the expenses linked to the budget (the expenses in the filteredCategory).
        :return: int - The current amount of money spend in the budget.
        """
        return sum([exp.amount for exp in self.filterCategory.expense_set.all()])

    def update_used_budget(self):
        """
        Updates it's current property based on how much has been spend.
        :return: None
        """
        self.current = self.calc_used_budget()
        self.save()


class TransactionBudget(Budget):
    """
    A type of budget, this one is based on a maximum number of transactions in a filteredCategory.
    """
    maxTransactions = models.IntegerField()  # Based on number of transactions
    current = models.IntegerField(default=0)  # Current amount of transactions

    def calc_used_budget(self):
        """
        Calculate the amount of transactions done.
        :return: int - The amount of expenses in the filteredCategory
        """
        return len(self.filterCategory.expense_set.all())

    def update_used_budget(self):
        """
        Updates it's current property based on how much has been spend.
        :return: None
        """
        self.current = self.calc_used_budget()
        self.save()
