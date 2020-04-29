from django.conf.urls import url

from .views import *

urlpatterns = [
    # Category urls
    # api/groupings/categories/
    url(r'^categories/$', ListAllCategories.as_view(), name='list-categories'),
    # api/groupings/categories/<pk>/
    url(r'^categories/(?P<pk>\d+)/$', UpdateCategory.as_view(), name='update-category'),
    # api/groupings/categories/<pk>/delete/
    url(r'^categories/(?P<pk>\d+)/delete/$', DeleteCategory.as_view(), name='delete-category'),

    # Tag urls
    # api/groupings/tags/
    url(r'^tags/$', ListAllTags.as_view(), name='list-tags'),
    # api/groupings/tags/<pk>/
    url(r'^tags/(?P<pk>\d+)/$', UpdateTag.as_view(), name='update-tag'),
    # api/groupings/tags/<pk>/delete/
    url(r'^tags/(?P<pk>\d+)/delete/$', DeleteTag.as_view(), name='delete-tag'),
]
