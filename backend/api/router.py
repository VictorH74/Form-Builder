from rest_framework import routers
from core.views import UserViewSet
from testapp.views import BaseModelTestViewSet, MainModelTestViewSet
from form.views import FormViewSet, QuestionViewSet


router = routers.DefaultRouter()

router.register(r"users", UserViewSet, basename="users")
router.register(r"forms", FormViewSet, basename="forms")
router.register(r"questions", QuestionViewSet, basename="questions")
router.register(r"testings", BaseModelTestViewSet, basename="testings")
router.register(r"test", MainModelTestViewSet, basename="test")