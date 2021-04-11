from rest_framework import serializers
from .models import Question, Choice, Answer, Comment

class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'author', 'content', 'is_main_question', 'created_at', 'updated_at', 'last_main_at', 'choices')

class ChoiceSerializer(serializers.ModelSerializer):
    answers = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at', 'answers')

class ChoiceSerializerAnswer(serializers.ModelSerializer):
    # 처음에 메인 질문 불러올 때 상세 답은 안 보내고 답한 수만 보내기 위해
    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at', 'get_ans_count')


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ('id', 'author', 'choice', 'created_at')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'author', 'choice', 'content', 'created_at']