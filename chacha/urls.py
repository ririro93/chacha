from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from accounts.views import (
    CustomUserView,
)
from questions.views import (
    QuestionView,
    ChoiceView,
    AnswerView,
)

router = routers.DefaultRouter()
router.register(r'questions', QuestionView, 'questions')
router.register(r'choices', ChoiceView, 'choices')
router.register(r'answers', AnswerView, 'answers')
router.register(r'users', CustomUserView, 'users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/', include(router.urls)),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
