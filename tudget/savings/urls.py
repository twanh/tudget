from django.conf.urls import url
from .views import ListAllSavingAccountsView, UpdateSavingsAccountView, DeleteSavingAccountView
urlpatterns = [
    # api/savings/
    url(r'^$', ListAllSavingAccountsView.as_view(), name="saving-accounts-all"),
    # api/savings/<pk>/
    url(r'^(?P<pk>\d+)/$', UpdateSavingsAccountView.as_view(), name='update-savings-account'),
    # api/savings/<pk>/delete/
    url(r'^(?P<pk>\d+)/delete/$', DeleteSavingAccountView.as_view(), name='delete-savings-account'),
]

