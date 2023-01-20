from rest_framework import viewsets, permissions
from .models import *
from .serializers import *


class BaseModelTestViewSet(viewsets.ModelViewSet):
    queryset = BaseModelTest.objects.all()
    serializer_class = BaseModelSerializer


class MainModelTestViewSet(viewsets.ModelViewSet):
    queryset = ModelTestMain.objects.all()
    serializer_class = MainModelSerializer
    