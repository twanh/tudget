from rest_framework import serializers

from groupings.models import Category, Tag
from transactions.serializers import ExpenseSerializer, IncomeSerializer


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the category model"""

    expense_set = ExpenseSerializer(many=True)
    income_set = IncomeSerializer(many=True)

    class Meta:
        model = Category
        fields = ['pk', 'name', 'description', 'color', 'icon', 'expense_set', 'income_set']
        read_only_fields =['pk', 'expense_set', 'income_set']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model."""

    expense_set = ExpenseSerializer(many=True)
    income_set = IncomeSerializer(many=True)

    class Meta:
        model = Tag
        fields = ['pk', 'name', 'color',  'expense_set', 'income_set']
        read_only_fields = ['pk', 'expense_set', 'income_set']

