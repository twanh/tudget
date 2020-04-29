from rest_framework import serializers

from budgets.models import TransactionBudget, CurrencyBudget


class CurrencyBudgetSerializer(serializers.ModelSerializer):
    """ The serializer for the CurrencyBudget Model """

    class Meta:
        model = CurrencyBudget
        fields = ['pk', 'name', 'reason', 'filterCategory', 'transactions', 'active', 'maxAmount', 'current']
        # _createdOn and current are readonly
        # Current needs to be read only because we do not want the user to be able to 'cheat'
        read_only_fields = ['pk', '_createdOn', 'current']


class TransactionBudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionBudget
        fields = ['pk', 'pk', 'name', 'reason', 'filterCategory', 'transactions', 'active', 'maxTransactions', 'current']
        # _createdOn and current are readonly
        # Current needs to be read only because we do not want the user to be able to 'cheat'
        read_only_fields = ['pk', '_createdOn', 'current']


