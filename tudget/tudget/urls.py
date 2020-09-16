"""tudget URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include

# For the docs
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


# Docs setup
schema_view = get_schema_view(
    openapi.Info(
        title="Tudget API",
        default_version="v1",
        description="Tudget API",
        contact=openapi.Contact(email="huiskenstwan@gmail.com"),
    ),
    public=True,  # ! Set false in prod
    permission_classes=(permissions.AllowAny,)
)


API_URL_PREFIX = 'api/'

urlpatterns = [
    # Documentatien routes
    url(r'^swagger(?P<format>\.json|\.yaml)$',
        schema_view.without_ui(cache_timeout=0), name='schema-json'),
    url(r'^swagger/$', schema_view.with_ui('swagger',
                                           cache_timeout=0), name='schema-swagger-ui'),
    url(r'^redoc/$', schema_view.with_ui('redoc',
                                         cache_timeout=0), name='schema-redoc'),
    # Admin routes
    path('admin/', admin.site.urls),
    # api/accounts/
    path(f'{API_URL_PREFIX}accounts/', include('accounts.urls')),
    # api/budgets/
    path(f'{API_URL_PREFIX}budgets/', include('budgets.urls')),
    # api/groupings/
    path(f'{API_URL_PREFIX}groupings/', include('groupings.urls')),
    # api/savings/
    path(f"{API_URL_PREFIX}savings/", include('savings.urls')),
    # api/transactions/
    path(f"{API_URL_PREFIX}transactions/", include('transactions.urls')),
    # api/token/refresh/ --> lets the user refresh it's token
    path(f"{API_URL_PREFIX}token/refresh/", TokenRefreshView.as_view()),
    # api/token --> lets the user obtain it's token (log in)
    path(f"{API_URL_PREFIX}token/", TokenObtainPairView.as_view()),
    # api/users
    path(f"{API_URL_PREFIX}users/", include("users.urls"))
]
