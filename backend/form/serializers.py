from rest_framework import serializers
from .models import *
from rest_polymorphic.serializers import PolymorphicSerializer


class AlternativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alternative
        fields = "__all__"

        
class MultipleChooseQuestionSerializer(serializers.ModelSerializer):
    alternatives = AlternativeSerializer(many=True, read_only=True)
    
    class Meta:
        model = MultipleChooseQuestion
        fields = ("id", "type", "question_number", "question_text", "alternatives")
        
        
class TextQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextQuestion
        fields = ("id", "type", "question_number", "question_text")
        
        
class QuestionPolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        MultipleChooseQuestion: MultipleChooseQuestionSerializer,
        TextQuestion: TextQuestionSerializer
    }
        
        
class FormSerializer(serializers.ModelSerializer):
    questions = QuestionPolymorphicSerializer(many=True, read_only=True)
    
    class Meta:
        model = Form
        fields = ("created_by", "created_at", "title", "questions")