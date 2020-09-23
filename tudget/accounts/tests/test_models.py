from django.contrib.auth import get_user_model
from django.test import TestCase

from accounts.models import Account
from transactions.models import Expense, Income
import random
from decimal import Decimal


class AccountModelTest(TestCase):

    def setUp(self):

        # Create an user
        User = get_user_model()
        self.user = User.objects.create_user(
            username='user1', email='user1@email.com', password='password')

        # Create some accounts
        self.account = Account(
            name=f"Account", description=f"Desc", owner=self.user)
        self.account.save()

    def test_default_setup(self):
        pass

    def _test_calculate_balance(self):
        """
        Test if the balance is calculated (/updated) correctly
        - Currently disabled -- WIP
        """

        # TODO: Finish test

        account = Account(name='test account', owner=self.user)
        account.save()

        # The balance of the account
        total = 0.0
        # Create some random Income/Expenses
        for amnt in range(0, random.randint(4, 10)):
            amount = float(amnt)
            if random.randint(0, 1) == 0:
                total += amount
                exp = Income(
                    name=f"test name {amnt}", amount=amount, account=account, owner=self.user)
                exp.save()
            else:
                total -= float(amnt)
                inc = Expense(
                    name=f"test name {amnt}", amount=amount, account=account, owner=self.user)
                inc.save()

        # Check if the calculated balance equals the expected balance
        Account.calculate_balance(account.pk)
        self.assertEqual(float(self.account.balance), total)
