from rest_framework import serializers
from accounts.models import Account

from transactions.serializers import BasicExpenseSerializer, BasicIncomeSerializer


class AccountSerializer(serializers.ModelSerializer):
    """ Serializer for the Account model. """
    # Set the relation w/ the transaction model
    expense_set = BasicExpenseSerializer(many=True, read_only=True)
    income_set = BasicIncomeSerializer(many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['pk', 'name', 'description', 'balance', 'active', '_createdOn', 'expense_set', 'income_set']
        read_only_fields = ['pk', '_createdOn', 'income_set', 'expense_set']

