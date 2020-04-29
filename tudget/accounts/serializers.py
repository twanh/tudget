from rest_framework import serializers
from accounts.models import Account

from transactions.serializers import BasicExpenseSerializer, BasicIncomeSerializer


class AccountSerializer(serializers.ModelSerializer):
    """ Serializer for the Account model. """
    # Set the relation w/ the transaction model
    expense_set = BasicExpenseSerializer(many=True)
    income_set = BasicIncomeSerializer(many=True)

    class Meta:
        model = Account
        fields = ['pk', 'name', 'description', 'balance', 'active', '_createdOn', 'expense_set', 'income_set']
        read_only_fields = ['_createdOn', 'income_set', 'expense_set']
