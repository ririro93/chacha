from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from questions.views import (
    QuestionView,
    ChoiceView,
    AnswerView,
    CommentView,
)

from accounts.views import CustomUserUsernameView

router = routers.DefaultRouter()
router.register(r'questions', QuestionView, 'questions')
router.register(r'choices', ChoiceView, 'choices')
router.register(r'answers', AnswerView, 'answers')
router.register(r'comments', CommentView, 'comments')
router.register(r'users', CustomUserUsernameView, 'users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/accounts/', include('accounts.urls')),
    # re_path('.*', TemplateView.as_view(template_name='index.html')),  # 앞으로 front 확인은 일일이 빌드 안하고 리액트 서버 새로 켜서 봐도 될듯? 
]
