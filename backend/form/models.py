from django.db import models
from polymorphic.models import PolymorphicModel
from django.contrib.auth import get_user_model


User = get_user_model()


class Alternative(models.Model):
    detail = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    
    
class Form(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=15)


class Question(PolymorphicModel):
    form = models.ForeignKey("Form", on_delete=models.CASCADE, related_name="questions")
    question_number = models.IntegerField(default=1)
    question_text = models.CharField(max_length=200)


class MultipleChoice(Question):
    type = models.CharField(max_length=3, default="MC")


class FillBlank(Question):
    type = models.CharField(max_length=3, default="TX")
    alternatives = models.ManyToManyField(Alternative)

    
class TrueFalse(Question):
    type = models.CharField(max_length=3, default="TF")
    alternatives = models.ManyToManyField(Alternative)
