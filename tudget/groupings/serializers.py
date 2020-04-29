from rest_framework import serializers

from groupings.models import Category, Tag


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for the category model"""

    transactions = serializers.RelatedField(source="transactions.Transaction", many=True)

    class Meta:
        model = Category
        fields = ['name', 'description', 'color', 'icon']


class TagSerializer(serializers.ModelSerializer):
    """Serializer for the Tag model."""

    transactions = serializers.RelatedField(source="transactions.Transaction", many=True)

    class Meta:
        model = Tag
        fields = ['name', 'color']

