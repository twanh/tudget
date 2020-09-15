from django.contrib.auth import authenticate
from rest_framework import serializers
from users.models import User


# from accounts.serializers import AccountSerializer
# from transactions.serializers import BasicExpenseSerializer, BasicIncomeSerializer
# from budgets.serializers import CurrencyBudgetSerializer, TransactionBudgetSerializer


class UserSerializer(serializers.ModelSerializer):

    # accounts = AccountSerializer(many=True, read_only=True)
    # income = BasicIncomeSerializer(many=True, read_only=True)
    # expenses = BasicExpenseSerializer(many=True, read_only=True)
    # budgets =
    # savings =
    # categories =
    # tags =

    class Meta:
        model = User
        fields = ('id', 'username', 'email')


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        if not "username" in validated_data or not 'email' in validated_data or not 'password' in validated_data:
            raise serializers.ValidationError(
                "Not al required fields were filled in, please provide: username, email and password")
        user = User.objects.create_user(
            validated_data['username'], validated_data["email"], validated_data['password'])

        return user


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Credentials")
