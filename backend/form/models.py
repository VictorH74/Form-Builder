from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

    
class Form(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=15)
    
    def __str__(self) -> str:
        return self.title
    

QUESTION_TYPES = [
    ("tx", "Text Question"),
    ("MC", "Multiple Choice"),
]


class Question(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="questions")
    question_number = models.PositiveSmallIntegerField(default=1)
    question_text = models.CharField(max_length=200)
    type = models.CharField(max_length=3, choices=QUESTION_TYPES)
    
    def __str__(self) -> str:
        return "{} | Type: {}".format(self.question_text, self.type) #


class Alternative(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='alternatives')
    detail = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    
    
# class TrueFalse(Question):
#     pass


