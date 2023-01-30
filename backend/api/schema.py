import graphene as g
import graphql_jwt
import core.schema as u
from django.contrib.auth import get_user_model

User = get_user_model()

class Query(u.Query):
    pass
    
class Mutation(g.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = g.Schema(query=Query, mutation=Mutation)