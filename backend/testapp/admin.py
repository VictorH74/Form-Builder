from django.contrib import admin
from .models import *

#
admin.site.register(BaseModelTest)
admin.site.register(ChildrenTestA)
admin.site.register(ChildrenTestB)
admin.site.register(ModelTestMain)