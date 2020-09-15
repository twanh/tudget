from django.conf.urls import url
from .views import ListUsersView, UpdateUserView, DeleteUserView, RegisterUserView

urlpatterns = [
    # api/accounts/
    # url(r'^$', ListUsersView.as_view(), name="users-all"),
    url(r'^create/$', RegisterUserView.as_view(), name='create-user'),
    url(r'^(?P<pk>\d+)/$', UpdateUserView.as_view(), name='update-user'),
    url(r'^(?P<pk>\d+)/delete/$', DeleteUserView.as_view(), name='delete-user'),
]
