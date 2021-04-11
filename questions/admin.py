from django.contrib import admin
from .models import Question, Choice, Answer, Comment

# Register your models here.
class QuestionAdmin(admin.ModelAdmin):
    model = Question
    list_display = ['id', 'content', 'author', 'get_choices', 'created_at', 'updated_at']
    list_filter = ['author']

    def get_choices(self, obj):
        qs = obj.choices.all()
        choices = [choice.content for choice in qs]
        return choices
    get_choices.short_description = 'Choices'
    

class ChoiceAdmin(admin.ModelAdmin):
    model = Choice
    list_display = ['id', 'question', 'content', 'get_answers']
    list_filter = ['question', 'content']

    def get_answers(self, obj):
        qs = obj.answers.all()
        answers = [str(answer) for answer in qs]
        return answers
    get_answers.short_description = 'Answerers'

class AnswerAdmin(admin.ModelAdmin):
    model = Answer
    list_display = ['id', 'choice', 'author', 'created_at']
    list_filter = ['author']

class CommentAdmin(admin.ModelAdmin):
    model = Comment
    list_display = ['id', 'author', 'choice', 'content']
    list_filter = ['author']

admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(Comment, CommentAdmin)