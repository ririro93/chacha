from rest_framework import serializers
from .models import Question, Choice, Answer

class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.StringRelatedField(many=True)
    class Meta:
        model = Question
        fields = ('id', 'author', 'content', 'main_question', 'created_at', 'updated_at', 'last_main_at', 'choices')

class ChoiceSerializer(serializers.ModelSerializer):
    answers = serializers.StringRelatedField(many=True)
    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at', 'answers')

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'choice', 'like_users', 'comment', 'created_at', 'updated_at')