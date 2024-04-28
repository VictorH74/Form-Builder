from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import *
import nested_admin

User = get_user_model()

class AlternativeInline(nested_admin.NestedTabularInline):
    model = Alternative
    extra = 0


class ImageInline(nested_admin.NestedTabularInline):
    model = Image
    extra = 0
    fields = [("image", "alt_name"), ("position", "area")]


class QuestionInline(nested_admin.NestedTabularInline):
    model = Question
    extra = 1
    inlines = [AlternativeInline, ImageInline]
    fields = [("number", "type"), ("statement", "open_question_answer")]


class FormAdmin(nested_admin.NestedModelAdmin):
    list_display = (
        "title",
        "created_by",
        "created_at",
    )

    # list_filter = ("create_by", "title")
    search_fields = ("create_by", "title")

    fields = ['created_by', 'title', 'authorized_users']

    inlines = [QuestionInline,]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "created_by":
            kwargs["initial"] = request.user.id
            kwargs["disabled"] = True
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Form, FormAdmin)
admin.site.register(Alternative)
admin.site.register(Question)
