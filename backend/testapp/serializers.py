from rest_framework import serializers
from .models import *
from rest_polymorphic.serializers import PolymorphicSerializer


class BaseModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseModelTest
        fields = ("content", "main")


class ChildrenTestASerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildrenTestA
        fields = ("content", "main", "children_a_content")
        
        
class ChildrenTestBSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildrenTestB
        fields = ("content", "main", "children_b_content")        
        

class TestPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        BaseModelTest: BaseModelSerializer,
        ChildrenTestA: ChildrenTestASerializer,
        ChildrenTestB: ChildrenTestBSerializer,
    }


class MainModelSerializer(serializers.ModelSerializer):
    testings = TestPolymorphicSerializer(many=True, read_only=True)
    
    class Meta:
        model = ModelTestMain
        fields = ['id', 'create_at', 'testings']