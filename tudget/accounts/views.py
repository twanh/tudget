from rest_framework import generics
from rest_framework.views import Response, status

from .models import Account
from .serializers import AccountSerializer


class ListAccountsView(generics.ListCreateAPIView):
    """
    List all accounts & and allow creation of an new account
    url: api/accounts/
    methods:
        - get: Get all the accounts
        - post: Create new account (required params: name)
    """

    queryset = Account.objects.filter(active=True)
    serializer_class = AccountSerializer


class UpdateAccountView(generics.UpdateAPIView):
    """
    Updates the account
    url: api/accounts/<pk>
    methods:
        - patch
        - put
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class DeleteAccountView(generics.RetrieveAPIView):
    """
    Deletes an accounts, accounts do not get deleted, so we just put active=false
    url: api/accounts/<pk>/delete
    methods: get
    """

    queryset = Account.objects.filter(active=True)
    serializer_class = AccountSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()

        return Response(status=status.HTTP_200_OK)

