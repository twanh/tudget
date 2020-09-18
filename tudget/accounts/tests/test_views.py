# from django.test import TestCase
import json

from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from accounts.models import Account
from accounts.serializers import AccountSerializer
from savings.models import SavingsAccount
from rest_framework.renderers import JSONRenderer


class AccountViewTest(APITestCase):

    def setUp(self):
        # Create an user
        self.user1 = self.setup_user()
        # Create another user, this user will also have accounts
        # and these accounts should not show up when getting all acounts for user 1
        self.user2 = self.setup_user(username="Test User 2")

        # Create an access token
        self.refresh_token = RefreshToken.for_user(self.user1)
        self.access_token = self.refresh_token.access_token

        # Create some accounts
        self.user1_accounts = []
        self.user1_serialized_accounts = []
        for i in range(0, 3):
            accnt = Account(
                name=f"Account #{i}", description=f"Desc #1{i}", owner=self.user1)
            accnt.save()
            serialized = AccountSerializer(accnt)
            self.user1_accounts.append(accnt)
            self.user1_serialized_accounts.append(serialized.data)

        # Create some accounts for user2 -- these accounts shouls not show up in user1s accounts
        self.user2_account = accnt = Account(
            name="Account user2", description="Desc user2 #1", owner=self.user2)
        self.user2_account.save()
        # Create a saving accounts -- should not show up either!
        self.savings_account = SavingsAccount(
            name="Saving Account #1", description="Test Description", isSavingAccount=True, reason="...", owner=self.user1)
        self.savings_account.save()

    @ staticmethod
    def setup_user(username='testingUser', email="testinguser@test.com", password="testinguser"):
        """Creates a user used for

        Returns:
            User: The created user
        """

        User = get_user_model()
        return User.objects.create_user(username=username, email=email, password=password)

    def test_list(self):
        """ Test if the ListAccountsView correctly returns all the accounts """

        headers = {
            "HTTP_AUTHORIZATION": f"Bearer {self.access_token}"
        }

        # Get request to endpoint
        req = self.client.get(reverse(
            "accounts-all"),  **headers)

        self.assertEqual(req.status_code, status.HTTP_200_OK,
                         f'Expected status code to be 200 (OK) got {req.status_code} instead.')

        # Check if the response content matches the expected content
        # If they match that automaitcly means, there are no savings accounts or accounts from other users present
        rendered_response = JSONRenderer().render(
            self.user1_serialized_accounts)
        self.assertEqual(req.content, rendered_response)

    def test_list_unauthorized(self):
        """
        Test if the ListAccountsView correctly handles un authorized requests

        Correct response
            - status code: 401
            - detail field on the json response
        """

        # Without token
        req = self.client.get(reverse("accounts-all"))
        self.assertEqual(req.status_code, status.HTTP_401_UNAUTHORIZED,
                         f'Expected status code to be 401 got {req.status_code} instead.')

        jsonContent = json.loads(req.content)
        self.assertEqual(
            jsonContent['detail'], "Authentication credentials were not provided.")
        # Wrong token

        wrongHeaders = {
            "HTTP_AUTHORIZATION": f"Bearer {self.access_token}aer"

        }

        reqWrong = self.client.get(reverse('accounts-all'), **wrongHeaders)
        self.assertEqual(reqWrong.status_code, status.HTTP_401_UNAUTHORIZED,
                         f'Expected status code to be 401 got {req.status_code} instead.')
        jsonContent = json.loads(reqWrong.content)
        self.assertEqual(jsonContent['detail'],
                         "Given token not valid for any token type")

    def test_create(self):
        """ 
        Test the creation of an account 

        - Correct status code - 201 (CREATED)
        - Account should have the correct owner assigned
        - No account can be made without a name
        Note: The authorization for this route is already tested by: `test_list_unauthorized`

        """

        headers = {
            "HTTP_AUTHORIZATION": f"Bearer {self.access_token}"
        }

        account_data = {
            "name": "Test create new account",
            "description": "Test desc"
        }

        wrong_account_data = {
            'description': "test "
        }

        req = self.client.post(reverse("accounts-all"),
                               account_data, **headers)

        # # Status code 201 (created)
        self.assertEqual(req.status_code, status.HTTP_201_CREATED)

        # Owner pk should be self.user1.pk
        # But the owner field is not visible to the api, so we have to check in the databse
        created_account = Account.objects.filter(pk=req.data['pk'])[0]
        self.assertEqual(created_account.owner.pk, self.user1.pk)

        # Accounts should not be able to be created without a name field
        req = self.client.post(reverse('accounts-all'),
                               wrong_account_data, **headers)

        self.assertEqual(req.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update(self):
        """
        Test the updating of an account

        - Should only be able to update own accounts (should return 404, if accessing other users account)
        - Should return the new account (with all the fields)
        - Should return with status code 200
        """

        headers = {
            "HTTP_AUTHORIZATION": f"Bearer {self.access_token}"
        }

        new_data = {
            "name": "I am updated"
        }

        # The account to update
        pk = self.user1_accounts[0].pk

        req = self.client.patch(
            reverse('update-account', kwargs={'pk': pk}), new_data, **headers)

        self.assertEqual(req.status_code, status.HTTP_200_OK)

        # Check if the account is updated in the database
        updated_account = Account.objects.filter(pk=pk)[0]
        self.assertEqual(
            updated_account.name, new_data['name'], f'Expected the account\'s name to be {new_data["name"]} but got {updated_account.name} instead.')

        # Check if the response data is correct
        ser_account = AccountSerializer(updated_account)
        rendered_account = JSONRenderer().render(ser_account.data)

        self.assertEqual(req.content, rendered_account)

        # Unauthorized request

        # Make the request
        unauth_req = self.client.patch(
            reverse('update-account', kwargs={'pk': pk}), new_data)

        self.assertEqual(unauth_req.status_code, status.HTTP_401_UNAUTHORIZED)
        jsonContent = json.loads(unauth_req.content)
        self.assertEqual(
            jsonContent['detail'], "Authentication credentials were not provided.")

        # Try to update an account from an other user (should no be allowed)

        # Get the pk from another users post
        another_pk = self.user2_account.pk

        # Make the request
        another_req = req = self.client.patch(
            reverse('update-account', kwargs={'pk': another_pk}), new_data, **headers)

        # Expect 404
        self.assertEqual(another_req.status_code, status.HTTP_404_NOT_FOUND)

        # Check if the account actually is not modified
        user_2_account = self.user2_account
        self.assertNotEqual(user_2_account.name, new_data['name'])

    def test_delete(self):
        pass
