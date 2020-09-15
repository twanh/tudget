from rest_framework import generics
from rest_framework.views import Response, status

from .models import Expense, Income
from .serializers import ExpenseSerializer, IncomeSerializer


# Expense views

class ListAllExpensesView(generics.ListCreateAPIView):
    """
    List all expenses and add ability to create a new expense
    url: api/transactions/expenses/
    methods:
        - get: Get all the expenses
        - post: Create new expense
    """
    # queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        # We cannot use `self.request.user.savingsaccounts` because
        # the user model does not recoginze savingsaccounts
        return self.request.user.expense1

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateExpenseView(generics.UpdateAPIView):
    """
    Update an expense with primary key = pk
    url: api/transactions/expenses/<pk>/
    methods:
        - put
        - patch
    """
    # queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return self.request.user.expense


class DeleteExpenseView(generics.RetrieveAPIView):
    """
    Delete an expense, using a get method for consistency
    url: api/transactions/expenses/<pk>/delete
    methods:
        - get: Delete expense
        """
    # queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return self.request.user.expense

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_200_OK)

# Income views


class ListAllIncomeView(generics.ListCreateAPIView):
    """
    List all income and add ability to create a new income
    url: api/transactions/income/
    methods:
        - get: Get all the income
        - post: Create new income
    """

    serializer_class = IncomeSerializer

    def get_queryset(self):
        return self.request.user.income

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateIncomeView(generics.UpdateAPIView):
    """
    Update an income with primary key = pk
    url: api/transactions/income/<pk>/
    methods:
        - put
        - patch
    """

    serializer_class = IncomeSerializer

    def get_queryset(self):
        return self.request.user.income


class DeleteIncomeView(generics.RetrieveAPIView):
    """
    Delete an income, using a get method for consistency
    url: api/transactions/income/<pk>/delete
    methods:
        - get: Delete income
        """

    serializer_class = IncomeSerializer

    def get_queryset(self):
        return self.request.user.income

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_200_OK)
