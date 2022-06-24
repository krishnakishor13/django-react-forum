from rest_framework import generics
from rest_framework import filters as search
from django_filters import rest_framework as filters
from .models import Application
from apps.users.mixins import CustomLoginRequiredMixin
from .serializers import ApplicationSerializer, ApplicationListSerializer
from django_filters.rest_framework import DjangoFilterBackend


class ApplicationFilter(filters.FilterSet):
    position = filters.CharFilter(lookup_expr="icontains")
    company_name = filters.CharFilter(lookup_expr="icontains")
    job_description = filters.CharFilter(lookup_expr="icontains")
    start_date = filters.DateFilter(field_name="created_at__date", lookup_expr="gte")
    end_date = filters.DateFilter("created_at__date", lookup_expr="lte")
    status = filters.CharFilter(method="multi_string_filter")

    class Meta:
        model = Application
        fields = [
            "status",
            "user",
            "company_name",
            "start_date",
            "end_date"
        ]

    def multi_string_filter(self, queryset, name, value):
        lookup = "{name}__in".format(name=name)
        return queryset.filter(**{lookup: value.split(',')})

class ApplicationList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Application.objects.exclude(status='deleted').all().order_by('-id')
    serializer_class = ApplicationListSerializer
    filter_backends = [DjangoFilterBackend, search.SearchFilter]
    filterset_class = ApplicationFilter
    search_fields = ['company_name', '^id']


class ApplicationFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationListSerializer

class ApplicationAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer


class ApplicationUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
