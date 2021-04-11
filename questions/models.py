from django.db import models
from django.conf import settings

CustomUser = settings.AUTH_USER_MODEL

DEFAULT_USER_MODEL_PK = 1

# Create your models here.
class Question(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=DEFAULT_USER_MODEL_PK)

    content = models.CharField(max_length=200)
    is_main_question = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_main_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.content[:100]

class Choice(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.SET_DEFAULT, default=DEFAULT_USER_MODEL_PK)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    answers = models.ManyToManyField(CustomUser, through='Answer', related_name='answerers')

    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    # updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.content[:100]
    
    def get_ans_count(self):
        return len(self.answers.all())

class Answer(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.author)

class Comment(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    choice = models.ForeignKey(Choice, on_delete=models.CASCADE)
    content = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.author}({self.choice}): {self.content}'