from django.urls import path
from . import views

urlpatterns = [
    path("", views.InterviewList.as_view(), name="interview_list"),
    path("<int:pk>/", views.InterviewFind.as_view(), name="interview_find"),
    path("add/", views.InterviewAdd.as_view(), name="interview_add"),
    path("update/<int:pk>/", views.InterviewUpdate.as_view(), name="interview_update"),
]
