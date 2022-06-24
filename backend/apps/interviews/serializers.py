from apps.students.serializers import StudentOptionSerializer
from apps.applications.serializers import ApplicationOptionSerializer
from apps.interview_questions.serializers import InterviewQuestionListSerializer, InterviewQuestionSerializer
from apps.applications.models import Application
from apps.students.models import Student
from config.constants import INTERVIEW_STATUS
from .models import Interview
from apps.interview_questions.models import InterviewQuestion
from rest_framework import serializers

class InterviewSerializer(serializers.ModelSerializer):
    interview_questions = InterviewQuestionSerializer(many=True)
    class Meta:
        model = Interview
        fields = [
            'student',
            'application',
            'status',
            'interview_type',
            'round',
            'support_tutor',
            'student_scheduled_at',
            'student_timezone',
            'submission_date',
            'ist_scheduled_at',
            'note',
            'recording_url',
            'interview_questions'
        ]

    def create(self, validated_data):
        data = validated_data
        interview_questions = data.pop('interview_questions')
        interview = Interview.objects.create(**data)

        for question in interview_questions:
                InterviewQuestion.objects.create(question=question['question'], interview=interview)
        
        return interview

class InterviewListSerializer(serializers.ModelSerializer):
    student = StudentOptionSerializer()
    application = ApplicationOptionSerializer()
    class Meta:
        model = Interview
        fields = '__all__'


class InterviewFindSerializer(serializers.ModelSerializer):
    student = StudentOptionSerializer()
    application = ApplicationOptionSerializer()
    interview_questions = InterviewQuestionSerializer(many = True)
    class Meta:
        model = Interview
        fields = '__all__'