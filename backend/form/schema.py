import graphene as g
from .models import *
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required
from django.db.models import Prefetch


# class FormType(DjangoObjectType):
#     class Meta:
#         model = Form
        
class QuestionType(DjangoObjectType):
    class Meta:
        model = Question

# class MultipleChoiceType(DjangoObjectType):
#     class Meta:
#         model = MultipleChoice
#         interfaces = (QuestionType,)

# class TrueFalseType(DjangoObjectType):
#     class Meta:
#         model = TrueFalse
#         interfaces = (QuestionType,)


class FormType(DjangoObjectType):
    questions = g.List(QuestionType)
    
    def resolve_questions(self, info, **kwargs):
        return Question.objects.all()

    class Meta:
        model = Form

class Query(g.ObjectType):
    forms = g.List(FormType)

    def resolve_forms(self, info, **kwargs):
        return Form.objects.all()
        


class CreateForm(g.Mutation):
    class Arguments:
        title = g.String(required=True)
        
    form = g.Field(FormType)
    
    @login_required
    @classmethod
    def mutate(cls, root, info, title):
        owner = info.context.user
        form = Form.objects.create(title=title, created_by=owner)
        return CreateForm(form=form)
