from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Question,
    Choice,
    Answer,
)
from .serializers import (
    QuestionSerializer,
    ChoiceSerializer,
    AnswerSerializer,
)

# Create your views here.
class QuestionView(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class ChoiceView(viewsets.ModelViewSet):
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()

class AnswerView(viewsets.ModelViewSet):
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()