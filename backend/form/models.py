from django.db import models
from polymorphic.models import PolymorphicModel
from django.contrib.auth import get_user_model


User = get_user_model()


class Form(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=15)


class Question(PolymorphicModel):
    form = models.ForeignKey("Form", on_delete=models.CASCADE, related_name="questions")
    question_number = models.IntegerField(default=1)
    question_text = models.CharField(max_length=200)


class MultipleChooseQuestion(Question):
    type = models.CharField(max_length=3, default="MC")


class TextQuestion(Question):
    type = models.CharField(max_length=3, default="TX")


class Alternative(models.Model):
    question = models.ForeignKey("MultipleChooseQuestion", on_delete=models.CASCADE, related_name="alternatives")
    detail = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)