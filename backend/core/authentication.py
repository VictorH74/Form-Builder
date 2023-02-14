from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
# from django.contrib.auth.models import User
# from api.settings import AUTH_USER_MODEL
from django.contrib.auth import get_user_model


User = get_user_model()


class AuthentificationBackend(ModelBackend):
    """
    Define a new authentification backend for auth with username/password or email/password.
    """
    def authenticate(self, request, username=None, password=None, **kwargs):
        if username is None:
            username = kwargs.get(User.USERNAME_FIELD)

        case_insensitive_username_field = '{}__iexact'.format(User.USERNAME_FIELD)
        users = User._default_manager.filter(
            Q(**{case_insensitive_username_field: username}) | Q(email__iexact=username))

        # Test whether any matched user has the provided password:
        for user in users:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        if not users:
            # Run the default password hasher once to reduce the timing
            # difference between an existing and a non-existing user (see
            # https://code.djangoproject.com/ticket/20760)
            User().set_password(password)