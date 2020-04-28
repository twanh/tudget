from django.test import TestCase
from accounts.models import Account
from transactions.models import Expense, Income

from decimal import *
from random import randint

class AccountTestCase(TestCase):

    def setUp(self):
        Account.objects.create(name="Cash", description="All my cash money")
        Account.objects.create(name="Main Debit Card", description="All the money on my debit card")
        Account.objects.create(name="Credit Card", description="All the money on my credit card")

    def test_basic_setup(self):
        """ Both accounts are correctly created """
        # Load the accounts
        cash_accnt = Account.objects.get(name="Cash")
        debit_accnt = Account.objects.get(name="Main Debit Card")
        credit_accnt = Account.objects.get(name="Credit Card")


        # Check if the basic balance is 0
        self.assertEqual(cash_accnt.balance, 0.00)
        self.assertEqual(debit_accnt.balance, 0.00)

        # Check if the balance can go upto 1000000.00
        cash_accnt.balance = 1000000.00
        cash_accnt.save()
        self.assertEqual(cash_accnt.balance, 1000000.00)

    def test_calculate_balance(self):
        cash_accnt = Account.objects.get(name="Cash")
        debit_accnt = Account.objects.get(name="Main Debit Card")

        # Check if expenses are correctly subtracted (no prior transactions)
        Expense.objects.create(name="test1", amount=Decimal(12.00), account=cash_accnt)
        self.assertEqual(cash_accnt.balance, Decimal(-12.00))

        # Check if income is correctly added (no prior transactions)
        Income.objects.create(name='test2', amount=Decimal(12.00), account=debit_accnt)
        self.assertEqual(debit_accnt.balance, Decimal(12.00))

        # Check if the calculations are correct with multiple expenses/incomes
        credit_accnt = Account.objects.get(name='Credit Card')
        total = Decimal(0.00)
        for t in range(10):
            if randint(0, 1) == 0:
                Expense.object.create(name=str(t), amount=Decimal(t), account=credit_accnt)
                print(f"-{Decimal(t)}")
                total -= Decimal(t)
                print(total)
            else:
                Income.object.create(name=str(t), amount=Decimal(t), account=credit_accnt)
                print(f"+{Decimal(t)}")
                total += Decimal(t)
                print(total)

        print(total)
        # self.assertEqual(credit_accnt.balance, total)
