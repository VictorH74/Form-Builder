from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


# TODO: include authorized email list. if empty, the access of form is public
class Form(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=40)
    authorized_users = models.ManyToManyField(
        User, blank=True, related_name="authorized_forms"
    )

    def __str__(self) -> str:
        return self.title


class FormSettings(models.Model):
    form = models.OneToOneField(Form, on_delete=models.CASCADE, primary_key=True)

    question_number_shape = models.CharField(max_length=10)
    question_number_shape_size = models.IntegerField(default=35)  # in pixels
    question_number_shape_type = models.CharField(max_length=10)
    question_number_shape_color = models.CharField(max_length=7)
    question_number_color = models.CharField(max_length=7)
    question_statement_color = models.CharField(max_length=7)
    show_question_bottom_border = models.BooleanField(default=True)
    question_bottom_border_color = models.CharField(max_length=7)

    show_alternative_marker = models.BooleanField(default=True)
    alternative_marker = models.CharField(max_length=10)
    alternative_checkmark = models.CharField(max_length=10)
    question_bottom_border_color = models.CharField(max_length=7)


QUESTION_TYPES = [
    ("TX", "Text Question"),
    ("MC", "Multiple Choice"),
    ("MS", "Multiple Selection"),
]


class Question(models.Model):
    form = models.ForeignKey(Form, on_delete=models.CASCADE, related_name="questions")
    number = models.PositiveSmallIntegerField(default=1)
    statement = models.CharField(max_length=200)
    type = models.CharField(max_length=3, choices=QUESTION_TYPES)
    open_question_answer = models.TextField(blank=True)

    def __str__(self) -> str:
        return "{} | Type: {}".format(self.statement, self.type)


IMAGE_POSITIONS = [
    (1, "left"),
    (2, "center"),
    (3, "right"),
]

IMAGE_AREAS = [(1, "1/3"), (2, "2/3"), (3, "3/3")]


class Image(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="images/", blank=False)
    alt_name = models.CharField(max_length=40)
    position = models.CharField(max_length=7, choices=IMAGE_POSITIONS)
    area = models.PositiveSmallIntegerField(choices=IMAGE_AREAS)


class Alternative(models.Model):
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="alternatives"
    )
    detail = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)


class FormAnswer(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="form_answers"
    )
    form = models.ForeignKey(
        Form, on_delete=models.CASCADE, related_name="user_responses"
    )
