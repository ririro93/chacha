from django.urls import path, include

from .views import AnswersForQuestionView

urlpatterns = [
    path('answers-for-question/<int:pk>/', AnswersForQuestionView.as_view()),
]