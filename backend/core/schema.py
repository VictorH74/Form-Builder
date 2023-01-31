import graphene as g
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required

User = get_user_model()


class UserType(DjangoObjectType):
    class Meta:
        model = User
        
class Query(g.ObjectType):
    me = g.Field(UserType)
    user = g.Field(UserType, id=g.Int())
    users = g.List(UserType)
    
    @login_required
    def resolve_me(self, info):
        user = info.context.user
        return user
    
    @login_required
    def resolve_user(self, info, id):
        user = User.objects.get(id=id)
        return user
    
    @login_required
    def resolve_users(self, info):
        return User.objects.all()