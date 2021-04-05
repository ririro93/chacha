from rest_framework import serializers
from .models import Question, Choice, Answer

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'author', 'content', 'created_at', 'updated_at', 'last_main_at')

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'choice', 'like_users', 'comment', 'created_at', 'updated_at')