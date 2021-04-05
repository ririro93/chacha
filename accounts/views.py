from django.shortcuts import render
from rest_framework import viewsets

# Create your views here.
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()