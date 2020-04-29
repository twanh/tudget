from django.conf.urls import url
from .views import ListAccountsView, UpdateAccountView, DeleteAccountView

urlpatterns = [
    # api/accounts/
    url(r'^$', ListAccountsView.as_view(), name="accounts-all"),
    # api/accounts/<pk>/
    url(r'^(?P<pk>\d+)/$', UpdateAccountView.as_view(), name='update-account'),
    url(r'^(?P<pk>\d+)/delete/$', DeleteAccountView.as_view(), name='delete-account'),
]
