from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from rest_framework import viewsets, generics, permissions, status
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

    def create(self, request, *args, **kwargs):
        """
        create 할 때 choice까지 같이 넣도록 customizing 해주기
        """
        print('## request.data', request.data)

        # create new question
        choices = request.data.pop('choices')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # create new choices
        question = Question.objects.get(pk=serializer.data.get('id'))
        for choice in choices:
            Choice.objects.create(
                content=choice,
                question=question,
            )
        
        # return data
        new_serializer = QuestionSerializer(question)
        return Response(new_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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