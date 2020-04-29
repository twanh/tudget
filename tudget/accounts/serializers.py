from rest_framework import serializers
from accounts.models import Account


class AccountSerializer(serializers.ModelSerializer):
    """ Serializer for the Account model. """
    # Set the relation w/ the transaction model
    transactions = serializers.RelatedField(source='transactions.Transaction', many=True, read_only=True)

    class Meta:
        model = Account
        fields = ['name', 'description', 'balance', 'active']
        read_only_fields = ['_createdOn']
