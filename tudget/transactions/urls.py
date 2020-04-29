from django.conf.urls import url

from .views import *

urlpatterns = [
    # Currency budget urls:
    url(r'^expenses/$', ListAllExpensesView.as_view(), name='list-expenses'),
    url(r'^expenses/(?P<pk>\d+)/$', UpdateExpenseView.as_view(), name='update-expense'),
    url(r'^expenses/(?P<pk>\d+)/delete/$', DeleteExpenseView.as_view(), name='delete-expense'),

    # Transaction budgets urls:
    url(r'^income/$', ListAllIncomeView.as_view(), name='list-income'),
    url(r'^income/(?P<pk>\d+)/$', UpdateIncomeView.as_view(), name='update-income'),
    url(r'^income/(?P<pk>\d+)/delete/$', DeleteIncomeView.as_view(), name='update-income'),
]
