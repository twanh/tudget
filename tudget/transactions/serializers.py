from rest_framework import serializers

from transactions.models import Expense, Income


class ExpenseSerializer(serializers):
    """" Serializer for the Expense model """

    class Meta:
        model = Expense
        fields = ['name', 'amount', 'account', 'description', 'category', 'tags', 'spendOn']
        read_only_fields = ['createdOn', 'type']


class IncomeSerializer(serializers):
    """" Income for the Expense model """

    class Meta:
        model = Income
        fields = ['name', 'amount', 'account', 'description', 'category', 'tags', 'spendOn']
        read_only_fields = ['createdOn', 'type']

