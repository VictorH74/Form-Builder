import graphene as g
from .models import *
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required


class AlternativeType(DjangoObjectType):
    class Meta:
        model = Alternative


class QuestionType(DjangoObjectType):
    class Meta:
        model = Question


class FormType(DjangoObjectType):
    class Meta:
        model = Form


class Query(g.ObjectType):
    forms = g.List(FormType)

    @login_required
    def resolve_forms(self, info, **kwargs):
        return Form.objects.all().filter(created_by=info.context.user)


class FormInput(g.InputObjectType):
    title = g.String(required=True)
    questions = g.List(lambda: QuestionInput, required=True)


class QuestionInput(g.InputObjectType):
    question_text = g.String(required=True)
    question_number = g.Int(required=True)
    type = g.String(required=True)
    alternatives = g.List(lambda: AlternativeInput)


class AlternativeInput(g.InputObjectType):
    detail = g.String(required=True)
    is_correct = g.Boolean()


class CreateForm(g.Mutation):
    class Arguments:
        form_data = FormInput(required=True)

    form = g.Field(FormType)

    @login_required
    def mutate(self, info, form_data):
        questions_data = form_data.pop('questions')
        form = Form.objects.create(**form_data, created_by=info.context.user)

        question_objs = []
        alternative_objs = []
        
        for question_data in questions_data:
            question_number = question_data.get('question_number')
            if Question.objects.filter(form=form, question_number=question_number).exists():
                raise Exception("Question number already exists for this form")

            alternatives_data = None
            if 'alternatives' in question_data:
                alternatives_data = question_data.pop('alternatives')
                
            question = Question(form=form, **question_data)
            
            question_objs.append(question)

            if alternatives_data:
                for alternative in alternatives_data:
                    alternative_objs.append(Alternative(question=question, **alternative))

        Question.objects.bulk_create(question_objs)
        Alternative.objects.bulk_create(alternative_objs)
        
        return CreateForm(form=form)