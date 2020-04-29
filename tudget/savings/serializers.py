from rest_framework import serializers

from savings.models import SavingsAccount


class SavingsAccountSerializer(serializers.ModelSerializer):
    """ Serializer for the SavingsAccount model. """
    # Set the relation w/ the transaction model
    transactions = serializers.RelatedField(source='transactions.Transaction', many=True, read_only=True)

    class Meta:
        model = SavingsAccount
        fields = ['name', 'description', 'balance', 'active', 'reason']
        read_only_fields = ['_createdOn']
