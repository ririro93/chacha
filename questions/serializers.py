from rest_framework import serializers
from .models import Question, Choice, Answer

class QuestionSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    choices = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ('id', 'author', 'content', 'main_question', 'created_at', 'updated_at', 'last_main_at', 'choices')
        # fields = ('id', 'author', 'content', 'main_question', 'created_at', 'updated_at', 'last_main_at')

class ChoiceSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    question = serializers.StringRelatedField()
    answers = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at', 'answers')

    # # 이렇게 해도 문제가 없을지 살짝 걱정 왜냐면 상위 클래스 보면 self.field_name 이런 속성도 있음
    # # 참고 : https://stackoverflow.com/questions/28988814/conditional-fields-in-a-modelform-meta
    # def __init__(self, *args, **kwargs):
    #     self.answer = kwargs.get('answer', True)
    #     if not self.answer:
    #         kwargs.pop('answer')
    #     super().__init__(*args, **kwargs)
    #     if not self.answer:
    #         del self.fields['answers']

class ChoiceSerializerAnswer(serializers.ModelSerializer):
    # 처음에 메인 질문 불러올 때 상세 답은 안 보내고 답한 수만 보내기 위해
    author = serializers.StringRelatedField(read_only=True)
    question = serializers.StringRelatedField()

    class Meta:
        model = Choice
        fields = ('id', 'author', 'question', 'content', 'created_at', 'get_ans_count')


class AnswerSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    choice = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Answer
        fields = ('id', 'author', 'choice', 'like_users', 'comment', 'created_at', 'updated_at')