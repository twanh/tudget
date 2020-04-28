from django.db import models


class Category(models.Model):
    """
    A category to be able to categorize transactions.
    A category has many transitions related to it, but a transition can only have one category.
    """
    name = models.CharField(max_length=50)
    description = models.TextField()
    color = models.CharField(max_length=6, blank=True)  # Represented as a hex-code #123456 (hex not counted in len)
    icon = models.CharField(max_length=50, blank=True)  # Allow there to be icons. Not implemented in any way

    # Note: Has a OneToMany relation with a Transactions (this is defined in the Transaction model)
    #       --> One Category has Many Transactions


class Tag(models.Model):
    """
    A tag to be able to tag and sort transactions.
    A tag has many transitions related to it, and a transition can have many tags.
    """
    name = models.CharField(max_length=10)  # Max len = 10 because it should be kept really short
    color = models.CharField(max_length=6)  # Represented as a hex-code #123456 (hex not counted in len)

    # Note: Has a ManyToMany relation w/ transactions (defined in transaction model)
    #       --> A Transaction can have many tags, and a tag can have many transactions.
