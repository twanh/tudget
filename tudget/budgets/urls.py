from django.conf.urls import url

from .views import ListAllCurrencyBudgets, ListAllTransactionBudgets, UpdateCurrencyBudget, DeleteCurrencyBudget, \
    UpdateTransactionBudget, DeleteTransactionBudget

urlpatterns = [
    # Currency budget urls:
    url(r'^currency/$', ListAllCurrencyBudgets.as_view(), name='list-currency-budgets'),
    url(r'^currency/(?P<pk>\d+)/$', UpdateCurrencyBudget.as_view(), name='update-currency-budgets'),
    url(r'^currency/(?P<pk>\d+)/delete/$', DeleteCurrencyBudget.as_view(), name='delete-currency-budgets'),

    # Transaction budgets urls:
    url(r'^transaction/$', ListAllTransactionBudgets.as_view(), name='list-transaction-budgets'),
    url(r'^transaction/(?P<pk>\d+)/$', UpdateTransactionBudget.as_view(), name='update-currency-budgets'),
    url(r'^transaction/(?P<pk>\d+)/delete/$', DeleteTransactionBudget.as_view(), name='update-currency-budgets'),
]
