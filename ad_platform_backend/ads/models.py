from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth import get_user_model




class User(AbstractUser):
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_user_groups",
        blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_user_permissions",
        blank=True
    )

user = get_user_model()

class Ads(models.Model):
    
    TEXT = 'text'
    IMAGE = 'image'
    VIDEO = 'video'
    
    AD_TYPE_CHOICES = [
        (TEXT, 'Text'),
        (IMAGE, 'Image'),
        (VIDEO, 'Video'),
    ]
    
    owner = models.ForeignKey(user, on_delete=models.CASCADE, related_name='owner')
    title = models.CharField(max_length=100)
    description = models.TextField()
    views = models.PositiveIntegerField(default=0)
    clicks = models.PositiveIntegerField(default=0)
    ad_type = models.CharField(max_length=10, choices=AD_TYPE_CHOICES, default=TEXT)
    image = models.ImageField(upload_to='ads/images/', blank=True, null=True)
    video = models.FileField(upload_to='ads/videos/', blank=True, null=True)
    contact_info = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.title