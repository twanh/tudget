from rest_framework import generics, status, permissions

from rest_framework.response import Response
from .models import Category, Tag
from .serializers import CategorySerializer, TagSerializer


# Category Views

class ListAllCategoriesView(generics.ListCreateAPIView):
    """
    Lists all the categories and add post method to create a new Category
    url: api/groupings/categories/
    methods:
        - get: Gets all the categories
        - post: Create new category
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    # Override the create method, so we automaticly can assign the user as owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateCategoryView(generics.UpdateAPIView):
    """
        Update the category with specific primary key (<pk>)
        url: api/groupings/categories/<pk>/
        methods:
            - put
            - patch
        """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()


class DeleteCategoryView(generics.RetrieveAPIView):
    """
        Delete the category with specified primary key (<pk>).
        url: api/groupings/categories/<pk>/delete/
        methods:
            - get: We have always used get to destroy so for consistency we do it here too.
        """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return self.request.user.categories.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        # Return 200
        return Response(status=status.HTTP_200_OK

                        )
# Tag views


class ListAllTagsView(generics.ListCreateAPIView):
    """
    Lists all the tags and add post method to create a new tag
    url: api/groupings/tags/
    methods:
        - get: Gets all the tags
        - post: Create new tag
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    serializer_class = TagSerializer

    def get_queryset(self):
        return self.request.user.tags.all()

    # Override the create method, so we automaticly can assign the user as owner
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UpdateTagView(generics.UpdateAPIView):
    """
    Update the specified tag with primary key (pk)
    url: api/groupings/tags/<pk>/
    methods:
        - patch
        - put
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    # queryset = Tag.objects.all()
    serializer_class = TagSerializer

    def get_queryset(self):
        return self.request.user.tags.all()


class DeleteTagView(generics.RetrieveAPIView):
    """
    Delete an  tag with primary key (pk), we use get method for consistency
    url: api/groupings/tags/<pk>/delete/
    methods: - get
    """

    permission_classes = [
        # We already set this as default, but this is as backup.
        permissions.IsAuthenticated
    ]

    
    serializer_class = TagSerializer

    def get_queryset(self):
        return self.request.user.tags.all()

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        Response(status=status.HTTP_200_OK)
