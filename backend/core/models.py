from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .manager import UserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=50, blank=True)
    username = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(null=True, max_length=11)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    class Meta():
        verbose_name = 'user'
        verbose_name_plural = 'users'

    objects = UserManager()

    def __str__(self):
        return f'{self.name} - {self.email}'