from django.urls import path
from .views import ListAccountsView

urlpatterns = [
    # api/accounts/all
    path('', ListAccountsView.as_view(), name="accounts-all")
]
