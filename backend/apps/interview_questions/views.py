from pyexpat import model
from django.shortcuts import render
from rest_framework import generics
from apps.users.mixins import CustomLoginRequiredMixin
from .models import InterviewQuestion
from .serializers import InterviewQuestion, InterviewQuestionSerializer, InterviewQuestionListSerializer


from apps.interview_questions.models import InterviewQuestion


# Create your views here.
class Meta:
    model = InterviewQuestion
    fields = [
        "interview",
        "question"
    ]

class InterviewQuestionList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionListSerializer

class InterviewQuestionFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionListSerializer

class InterviewQuestionAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionSerializer


class InterviewQuestionUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionSerializer

class InterviewQuestionDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    queryset = InterviewQuestion.objects.all()
    serializer_class = InterviewQuestionSerializer