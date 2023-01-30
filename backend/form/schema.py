import graphene as g
import models as m
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required


class FormType(DjangoObjectType):
    class Meta:
        model = m.Form


class Query(g.ObjectType):
    my_forms = g.List(FormType)


class CreateForm(g.Mutation):
    class Arguments:
        title = g.String(required=True)
        
    form = g.Field(FormType)
    
    @login_required
    @classmethod
    def mutate(cls, root, info, title):
        owner = info.context.user
        form = m.Form.objects.create(title=title, created_by=owner)
        return CreateForm(form=form)
