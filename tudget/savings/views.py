from rest_framework import generics
from rest_framework.views import Response, status

from .models import SavingsAccount
from .serializers import SavingsAccountSerializer


class ListAllSavingAccounts(generics.ListCreateAPIView):
    """
    List all the saving accounts, and add the ability to create a new savings account
    url: api/savings/

    """
    queryset = SavingsAccount.objects.filter(active=True)
    serializer_class = SavingsAccountSerializer

class UpdateSavingsAccount(generics.UpdateAPIView):

    queryset = SavingsAccount.objects.filter(active=True)
    serializer_class = SavingsAccountSerializer

class Dele