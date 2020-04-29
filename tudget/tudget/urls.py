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
from django.contrib import admin
from django.urls import path, include

API_URL_PREFIX = 'api/'

urlpatterns = [
    path('admin/', admin.site.urls),
    # api/accounts/
    path(f'{API_URL_PREFIX}accounts/', include('accounts.urls')),
    # api/budgets/
    path(f'{API_URL_PREFIX}budgets/', include('budgets.urls')),
    # api/groupings/
    path(f'{API_URL_PREFIX}groupings/', include('groupings.urls')),
    # api/savings/
    path(f"{API_URL_PREFIX}savings/", include('savings.urls'))
]
