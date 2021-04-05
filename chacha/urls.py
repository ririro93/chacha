from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from rest_framework import routers
from questions import views

router = routers.DefaultRouter()
router.register(r'questions', views.QuestionView, 'questions')
router.register(r'choices', views.ChoiceView, 'choices')
router.register(r'answers', views.AnswerView, 'answers')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]
