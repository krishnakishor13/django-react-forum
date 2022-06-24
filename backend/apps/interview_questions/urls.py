from django.urls import path
from . import views

urlpatterns = [
    path('', views.InterviewQuestionList.as_view(), name='interviewquestions_list'),
    path('<int:pk>/', views.InterviewQuestionFind.as_view(), name='interviewquestions_find'),
    path('add/', views.InterviewQuestionAdd.as_view(), name='interviewquestions_add'),
    path('update/<int:pk>/', views.InterviewQuestionUpdate.as_view(), name='interviewquestions_update'),
    path('delete/<int:pk>/', views.InterviewQuestionDelete.as_view(), name='interviewquestions_delete'),

]
