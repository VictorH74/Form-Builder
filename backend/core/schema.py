import graphene as g
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required
import re

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
    
class CreateUser(g.Mutation):
    class Arguments:
        name = g.String(required=True)
        username = g.String(required=True)
        password = g.String(required=True)
        phone = g.String()
        email = g.String(required=True)
    
    created = g.Boolean()
    
    def mutate(self, info, **user_data):
        if User.objects.filter(username=user_data.get("username")).exists():
            raise Exception('Username already exists.')
        
        if User.objects.filter(username=user_data.get("email")).exists():
            raise Exception('Email already exists.')
        
        phone = user_data.get('phone')
        if phone:
            user_data.update({"phone": re.sub("[^0-9]*", "", phone)})
                
        password = user_data.pop("password")
        user=User(**user_data)
        user.set_password(password)
        user.save()
                
        return CreateUser(created=True)