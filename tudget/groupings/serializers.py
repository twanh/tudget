from rest_framework import serializers

from groupings.models import Category, Tag
from transactions.serializers import ExpenseSerializer, IncomeSerializer


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the category model"""

    expense_set = ExpenseSerializer(many=true)
    income_set = IncomeSerializer(many=True)

    class Meta:
        model = Category
        fields = ['name', 'description', 'color', 'icon', 'expense_set', 'income_set']
        read_only_fields =['expense_set', 'income_set']

class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model."""

    transactions = serializers.RelatedField(source="transactions.Transaction", many=True)

    class Meta:
        model = Tag
        fields = ['name', 'color']

