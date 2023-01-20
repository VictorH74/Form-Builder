from django.db import models
from polymorphic.models import PolymorphicModel

# Create your models here.
class BaseModelTest(PolymorphicModel):
    content = models.CharField(max_length=100)
    main = models.ForeignKey('ModelTestMain', related_name="testings", on_delete=models.CASCADE)
    
    # class Meta:
    #     abstract = True
        
        
class ChildrenTestA(BaseModelTest):
    children_a_content = models.CharField(max_length=100)
        
        
class ChildrenTestB(BaseModelTest):
    children_b_content = models.CharField(max_length=100)
        
        
class ModelTestMain(models.Model):
    id = models.IntegerField(primary_key=True)
    create_at = models.DateTimeField(auto_now=True)