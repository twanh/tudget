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
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class UpdateExpenseView(generics.UpdateAPIView):
    """
    Update an expense with primary key = pk
    url: api/transactions/expenses/<pk>/
    methods:
        - put
        - patch
    """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class DeleteExpenseView(generics.RetrieveAPIView):
    """
    Delete an expense, using a get method for consistency
    url: api/transactions/expenses/<pk>/delete
    methods:
        - get: Delete expense
        """
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

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

    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class UpdateIncomeView(generics.UpdateAPIView):
    """
    Update an income with primary key = pk
    url: api/transactions/income/<pk>/
    methods:
        - put
        - patch
    """
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer


class DeleteIncomeView(generics.RetrieveAPIView):
    """
    Delete an income, using a get method for consistency
    url: api/transactions/income/<pk>/delete
    methods:
        - get: Delete income
        """
    queryset = Income.objects.all()
    serializer_class = IncomeSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_200_OK)
