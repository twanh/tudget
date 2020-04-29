from rest_framework import serializers

from budgets.models import TransactionBudget, CurrencyBudget


class CurrencyBudgetSerializer(serializers.ModelSerializer):
    """ The serializer for the CurrencyBudget Model """

    class Meta:
        model = CurrencyBudget
        fields = ['name', 'description', 'filterCategory', 'transactions', 'active', 'maxAmount']
        # _createdOn and current are readonly
        # Current needs to be read only because we do not want the user to be able to 'cheat'
        read_only_fields = ['_createdOn', 'current']


class TransactionBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionBudget
        fields = ['name', 'description', 'filterCategory', 'transactions', 'active', 'maxTransactions']
        # _createdOn and current are readonly
        # Current needs to be read only because we do not want the user to be able to 'cheat'
        read_only_fields = ['_createdOn', 'current']


