from rest_framework import generics
from rest_framework.views import Response, status

from .models import User
from .serializers import UserSerializer, RegisterUserSerializer


class ListUsersView(generics.ListAPIView):

    # queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user


class UpdateUserView(generics.UpdateAPIView):
    # queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user


class DeleteUserView(generics.DestroyAPIView):

    # queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        return self.request.user


class RegisterUserView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterUserSerializer
