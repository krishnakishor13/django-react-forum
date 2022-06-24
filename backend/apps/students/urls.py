from django.urls import path
from . import views

urlpatterns = [
    path("", views.StudentList.as_view(), name="student_list"),
    path("<int:pk>/", views.StudentFind.as_view(), name="student_Find"),
    path("add/", views.StudentAdd.as_view(), name="student_add"),
    path("update/<int:pk>/", views.StudentUpdate.as_view(), name="student_update"),
]
