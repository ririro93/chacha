from django.db import models
from django.conf import settings

CustomUser = settings.AUTH_USER_MODEL

DEFAULT_USER_MODEL_PK = 1

# Create your models here.
class Question(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=DEFAULT_USER_MODEL_PK)

    content = models.CharField(max_length=200)
    main_question = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_main_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.content[:20]

class Choice(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=DEFAULT_USER_MODEL_PK)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')

    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:20]

class Answer(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=DEFAULT_USER_MODEL_PK)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(CustomUser, related_name='like_answers')
    
    comment = models.CharField(max_length=500, blank=True, null=True)  # 얘는 길어질수도 있으니깐 textarea가 나을수도
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:20]