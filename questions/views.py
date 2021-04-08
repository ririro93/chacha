from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets, generics, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

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
    permission_classes = [permissions.AllowAny]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class ChoiceView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()

class AnswerView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

class MainQuestionView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        data = {}
        question = get_object_or_404(Question, main_question=True)
        serializer = QuestionSerializer(question)
        data['question'] = serializer.data

        print('###', question.choices.all())
        for i, choice in enumerate(question.choices.all(), start=1):
            choice_serializer = ChoiceSerializer(choice)
            data[f'choice{i}'] = choice_serializer.data
            
        return Response(data)