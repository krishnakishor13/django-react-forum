from django.urls import path
from . import views

urlpatterns = [
    path('', views.ApplicationList.as_view(), name='application_list'),
    path('<int:pk>/', views.ApplicationFind.as_view(), name='application_find'),
    path('add/', views.ApplicationAdd.as_view(), name='application_add'),
    path('update/<int:pk>/', views.ApplicationUpdate.as_view(), name='application_update'),
]
