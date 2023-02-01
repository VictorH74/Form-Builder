import graphene as g
from .models import *
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required


class AlternativeType(DjangoObjectType):
    class Meta:
        model = Alternative

#
class QuestionType(DjangoObjectType):
    class Meta:
        model = Question
        

class FormType(DjangoObjectType):
    class Meta:
        model = Form


class Query(g.ObjectType):
    forms = g.List(FormType)

    def resolve_forms(self, info, **kwargs):
        return Form.objects.all()
        

class CreateForm(g.Mutation):
    class Arguments:
        title = g.String(required=True)
        questions = g.List(QuestionType)
        
    form = g.Field(FormType)
    
    @login_required
    @classmethod
    def mutate(cls, root, info, title, questions):
        owner = info.context.user
        form = Form.objects.create(title=title, created_by=owner)
        
        question_list = [
            Question(form=form, question_number=q.question_number, question_text=q.question_text, type=q.type)
            for q in questions
            ]
        
        Question.objects.bulk_create(question_list)
        
        return CreateForm(form=form)
