from rest_framework import serializers

from savings.models import SavingsAccount


class SavingsAccountSerializer(serializers.ModelSerializer):
    """ Serializer for the SavingsAccount model. """

    class Meta:
        model = SavingsAccount
        fields = ['pk', 'name', 'description', 'balance', 'active', 'reason']
        read_only_fields = ['pk', '_createdOn', 'owner']
