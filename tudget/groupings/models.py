from django.db import models
from django.conf import settings


class Category(models.Model):
    """
    A category to be able to categorize transactions.
    A category has many transitions related to it, but a transition can only have one category.
    """
    name = models.CharField(max_length=50)  # The name of the category
    # The description of the category
    description = models.TextField(blank=True)
    # Represented as a hex-code #123456 (hex not counted in len)
    color = models.CharField(max_length=6, blank=True)
    # Allow there to be icons. Not implemented in any way
    icon = models.CharField(max_length=50, blank=True)

    # Owner
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="categories", on_delete=models.CASCADE)

    # Note: Has a OneToMany relation with a Transactions (this is defined in the Transaction model)
    #       --> One Category has Many Transactions

    def __str__(self):
        return f'Category: {self.name}'

    def has_budget_attached(self):
        """
        Check if a category has budgets attached
        :return: Bool[1]
        """
        cur = False
        trans = False

        if self.currencybudget_set and len(self.currencybudget_set.all()) >= 1:
            cur = True

        if self.transactionbudget_set and len(self.transactionbudget_set.all()) >= 1:
            trans = True

        # Cur is True if there are currency budgets attached, and trans is True if there is a transaction budget attached.
        return [cur, trans]


class Tag(models.Model):
    """
    A tag to be able to tag and sort transactions.
    A tag has many transitions related to it, and a transition can have many tags.
    """
    name = models.CharField(
        max_length=10)  # Max len = 10 because it should be kept really short
    # Represented as a hex-code #123456 (hex not counted in len)
    color = models.CharField(max_length=6, blank=True)

    # Owner
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="tags", on_delete=models.CASCADE)

    # Note: Has a ManyToMany relation w/ transactions (defined in transaction model)
    #       --> A Transaction can have many tags, and a tag can have many transactions.

    def __str__(self):
        return f'Tag: {self.name}'
