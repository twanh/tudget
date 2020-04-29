from django.conf.urls import url

from .views import *

urlpatterns = [
    # Category urls
    # api/groupings/categories/
    url(r'^categories/$', ListAllCategoriesView.as_view(), name='list-categories'),
    # api/groupings/categories/<pk>/
    url(r'^categories/(?P<pk>\d+)/$', UpdateCategoryView.as_view(), name='update-category'),
    # api/groupings/categories/<pk>/delete/
    url(r'^categories/(?P<pk>\d+)/delete/$', DeleteCategoryView.as_view(), name='delete-category'),

    # Tag urls
    # api/groupings/tags/
    url(r'^tags/$', ListAllTagsView.as_view(), name='list-tags'),
    # api/groupings/tags/<pk>/
    url(r'^tags/(?P<pk>\d+)/$', UpdateTagView.as_view(), name='update-tag'),
    # api/groupings/tags/<pk>/delete/
    url(r'^tags/(?P<pk>\d+)/delete/$', DeleteTagView.as_view(), name='delete-tag'),
]
