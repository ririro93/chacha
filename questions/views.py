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
    ChoiceSerializerAnswer,
    AnswerSerializer,
)

# Create your views here.
class QuestionView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    @action(detail=False, url_path='main-question')
    def main_question(self, request, *args, **kwargs):
        data = {}
        question = get_object_or_404(Question, main_question=True)
        serializer = QuestionSerializer(question)
        data['question'] = serializer.data

        print('###', question.choices.all())
        data['question']['choices'] = []
        for choice in question.choices.all():
            choice_serializer = ChoiceSerializerAnswer(choice)
            # choice_serializer = ChoiceSerializer(choice, answer=False)
            data['question']['choices'].append(choice_serializer.data)
            
        return Response(data)

class ChoiceView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = ChoiceSerializer
    queryset = Choice.objects.all()


class AnswerView(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()