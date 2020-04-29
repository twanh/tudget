from rest_framework import  generics

from .models import Account
from .serializers import AccountSerializer


class ListAccountsView(generics.ListAPIView):
    """
    List all accounts
    url: api/accounts/all/
    methods: get
    """

    queryset = Account.objects.all()
    serializer_class = AccountSerializer


