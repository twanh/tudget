from rest_framework import generics, permissions
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

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = AccountSerializer

    # Override the queryset so that we only get the users own accounts
    def get_queryset(self):

        # When not active the account is 'deleted', so we do not want to show this to the user
        return Account.objects.filter(owner_id=self.request.user.id, active=True, isSavingAccount=False)
        # return self.request.user.accounts.filter(active=True)

    # Override the create method, so we automaticly can assign the user as owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateAccountView(generics.UpdateAPIView):
    """
    Updates the account
    url: api/accounts/<pk>
    methods:
        - patch
        - put
    """

    permission_classes = [
        permissions.IsAuthenticated
    ]

    # queryset = Account.objects.all()

    serializer_class = AccountSerializer

    # Override the queryset so that we only get the users own accounts
    def get_queryset(self):
        return Account.objects.filter(owner_id=self.request.user.id)
        # return self.request.user.accounts.all()


class DeleteAccountView(generics.RetrieveAPIView):
    """
    Deletes an accounts, accounts do not get deleted, so we just put active=false
    url: api/accounts/<pk>/delete
    methods: get
    """

    # queryset = Account.objects.filter(active=True)
    serializer_class = AccountSerializer

    # Override the queryset so that we only get the users own accounts
    def get_queryset(self):
        return Account.objects.filter(owner_id=self.request.user.id)

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False
        instance.save()

        return Response(status=status.HTTP_200_OK)
