from email.mime import application
from http.client import HTTPResponse
from sys import stdout
from apps.interview_questions.models import InterviewQuestion
from apps.students.serializers import StudentSerializer
from rest_framework import generics
from django_filters import rest_framework as filters
from .models import Interview
from apps.users.mixins import CustomLoginRequiredMixin
from .serializers import InterviewListSerializer, InterviewSerializer, InterviewFindSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from apps.students.models import Student
from apps.applications.models import Application

# Create your views here.


class InterviewFilter(filters.FilterSet):
    support_tutor = filters.CharFilter(lookup_expr="icontains")
    company_name = filters.CharFilter(field_name="application__company_name", lookup_expr="icontains")
    start_date = filters.DateFilter(field_name="ist_scheduled_at__date", lookup_expr="gte")
    end_date = filters.DateFilter(field_name="ist_scheduled_at__date", lookup_expr="lte")
    status = filters.CharFilter(method="multi_string_filter")
    interview_type = filters.CharFilter(method="multi_string_filter")

    class Meta:
        model = Interview
        fields = ["student", "application", "status", "support_tutor", "interview_type", "round", "submission_date" ,"start_date", "end_date", "company_name"]

    def multi_string_filter(self, queryset, name, value):
        lookup = "{name}__in".format(name=name)
        return queryset.filter(**{lookup: value.split(',')})

    



class InterviewList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Interview.objects.exclude(status='deleted').all().order_by('-id')
    serializer_class = InterviewListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = InterviewFilter


class InterviewFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewFindSerializer



class InterviewAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer



class InterviewUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer

    def put(self, request, pk, format=None):
        interview_questions = request.data.pop('interview_questions')
        
        interview = Interview.objects.filter(pk=pk).update(**request.data)
        for question in interview_questions:
            if 'id' in question:
                InterviewQuestion.objects.filter(pk=question['id']).update(**question)
            else:
                InterviewQuestion.objects.create(question=question['question'], interview=Interview.objects.get(pk=pk))
                
        return Response(interview)
