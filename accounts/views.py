from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import CustomUser
from .serializers import CustomUserSerializer, CustomUserUsernameSerializer

class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

class CustomUserUsernameView(viewsets.ModelViewSet):
    serializer_class = CustomUserUsernameSerializer
    queryset = CustomUser.objects.all()