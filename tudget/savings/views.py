from rest_framework import generics
from rest_framework.views import Response, status

from .models import SavingsAccount
from .serializers import SavingsAccountSerializer


class ListAllSavingAccountsView(generics.ListCreateAPIView):
    """
    List all the saving accounts, and add the ability to create a new savings account
    url: api/savings/
    methods:
        - get: Get all the savings accounts
        - post: Create new savings account
    """
    queryset = SavingsAccount.objects.filter(active=True)
    serializer_class = SavingsAccountSerializer


class UpdateSavingsAccountView(generics.UpdateAPIView):
    """
    Update an savings account with specific primary key (pk)
    url: api/savings/<pk>/
    methods:
        - patch
        - puts
    """

    queryset = SavingsAccount.objects.filter(active=True)
    serializer_class = SavingsAccountSerializer


class DeleteSavingAccountView(generics.RetrieveAPIView):
    """
    Delete a savings accoonts with specific primary key (pk)
    url: api/savings/<pk>/delete/
    methods:
        - get
    """

    queryset = SavingsAccount.objects.filter(active=True)
    serializer_class = SavingsAccountSerializer

    # Override the get method.
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()

        # Return 200.
        return Response(status=status.HTTP_200_OK)