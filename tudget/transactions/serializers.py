from rest_framework import serializers

from transactions.models import Expense, Income


class ExpenseSerializer(serializers.ModelSerializer):
    """" Serializer for the Expense model """

    class Meta:
        model = Expense
        fields = ['pk', 'name', 'amount', 'account',
                  'description', 'category', 'tags', 'spendOn', 'type']
        read_only_fields = ['pk', 'createdOn', 'type', 'owner']


class IncomeSerializer(serializers.ModelSerializer):
    """" Income for the Expense model """

    class Meta:
        model = Income
        fields = ['pk', 'name', 'amount', 'account',
                  'description', 'category', 'tags', 'spendOn', 'type']
        read_only_fields = ['pk', 'createdOn', 'type', 'owner']


class BasicExpenseSerializer(serializers.ModelSerializer):
    """" Serializer for the Expense model """

    class Meta:
        model = Expense
        fields = ['pk', 'name', 'amount', '_createdOn', 'type', "spendOn"]
        read_only_fields = ['pk', 'createdOn', 'type', 'owner']


class BasicIncomeSerializer(serializers.ModelSerializer):
    """" Income for the Expense model """

    class Meta:
        model = Income
        fields = ['pk', 'name', 'amount', '_createdOn', 'type', 'spendOn']
        read_only_fields = ['pk', 'createdOn', 'type', 'owner']
