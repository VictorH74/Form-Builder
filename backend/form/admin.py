from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import *

User = get_user_model()


class AlternativeInline(admin.TabularInline):
    model = Alternative
    extra = 2

class QuestionInline(admin.TabularInline):
    model = Question
    extra = 0
    inlines = [AlternativeInline, ]
    fields = [("question_number", "type"), "question_text"]


class FormAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_by",
        "created_at",
    )

    # list_filter = ("create_by", "title")
    search_fields = ("create_by", "title")

    fields = ['created_by', 'title', ]

    inlines = [QuestionInline,]

    def add_view(self, request, form_url='', extra_context=None):
        try:
            return super(FormAdmin, self).add_view(
                request, form_url, extra_context
            )
        except Exception as e:
            print(e)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "created_by":
            kwargs["initial"] = request.user.id
            kwargs["disabled"] = True
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Form, FormAdmin)
admin.site.register(Alternative)
admin.site.register(Question)
