from rest_framework import generics, status, permissions
from rest_framework.views import Response

from .models import CurrencyBudget, TransactionBudget
from .serializers import CurrencyBudgetSerializer, TransactionBudgetSerializer


# CurrencyBudget Views


class ListAllCurrencyBudgets(generics.ListCreateAPIView):
    """
    Lists all CurrencyBudgets and allows creation of a new CurrencyBudget
    url: api/budgets/currency/
    methods:
        - get: Gets all the currency budgets
        - post: Creates new currency budget
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    serializer_class = CurrencyBudgetSerializer

    # Override the queryset so that we only return the users own budgets
    def get_queryset(self):
        return self.request.user.currencybudget.filter(active=True)

    # Override the create method, so we automaticly can assign the user as owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateCurrencyBudget(generics.UpdateAPIView):
    """
    Updates the currency budget with <pk>.
    url: api/budgets/currency/<pk>/
    methods:
        - put:
        - patch
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    serializer_class = CurrencyBudgetSerializer

    # Override the queryset so that we only return the users own budgets
    def get_queryset(self):
        return self.request.user.currencybudget.all()


class DeleteCurrencyBudget(generics.RetrieveAPIView):
    """
    Deletes a CurrencyBudget by setting it's active property to false
    url: api/budgets/currency/<pk>/delete/
    methods:
        - get: We just need to receive the request and we handle the rest, so get is fine.
    """

    # You can only delete when active=True because otherwise it is already deleted.
    # queryset = CurrencyBudget.objects.filter(active=True)
    serializer_class = CurrencyBudgetSerializer

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # Override the queryset so that we only return the users own budgets
    def get_queryset(self):
        return self.request.user.currencybudget.filter(active=True)

    # Takes over the get method handler so we can delete on request.
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False  # Makes it so it is shown deleted
        instance.save()

        # Return status code: 200 to signal deletion was successful
        return Response(status=status.HTTP_200_OK)


# TransactionBudgets views

class ListAllTransactionBudgetsView(generics.ListCreateAPIView):
    """
    Lists all the transaction budgets and allows you to create a new one.
    url: api/budgets/transaction/
    methods:
        - get: Returns the list of all the budgets
        - post: Creates a new budget
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # Only show active budgets, because otherwise they are deleted
    serializer_class = TransactionBudgetSerializer

    # Override the queryset so that we only return the users own budgets
    def get_queryset(self):
        return self.request.user.transactionbudget.filter(active=True)

    # Override the create method, so we automaticly can assign the user as owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateTransactionBudgetView(generics.UpdateAPIView):
    """
    Update the budget with a specified primary key (pk).
    url: api/budgets/transaction/<pk>/
    methods:
        - put
        - patch
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    serializer_class = TransactionBudgetSerializer

    # Override the queryset so that we only return the users own budgets
    def get_queryset(self):
        return self.request.user.transactionbudget.all()


class DeleteTransactionBudgetView(generics.RetrieveAPIView):
    """
    Deletes an budget by setting its active property to false.
    url: api/budgets/transaction/<pk>/delete
    methods: - get
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # queryset = TransactionBudget.objects.filter(active=False)
    serializer_class = TransactionBudgetSerializer

    def get_queryset(self):
        return self.request.user.transactionbudget.filter(active=True)

    # Takes over the get method handler so we can delete on request.
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.active = False  # Makes it so it is shown deleted
        instance.save()

        return Response(status=status.HTTP_200_OK)
