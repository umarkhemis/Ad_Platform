from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Ads
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import re

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'username', 'password', 'email']
#         extra_kwargs = {'password': {'write_only':True}}
        
    
#     def create(self, validated_data):
#         user = User.objects.create_user(**validated_data)
#         return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        extra_kwargs = {'password': {'write_only': True}}
        
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            refresh = RefreshToken.for_user(user)
            return {'refresh': str(refresh), 'access': str(refresh.access_token)}
        raise serializers.ValidationError("Invalid credentials")
    
class AdSerializer(serializers.ModelSerializer):
    owner_name = serializers.CharField(source="owner.username", read_only=True)
    class Meta:
        model = Ads
        fields = ['id', 'owner_name', 'title', 'description', 'views', 'clicks', 'image', 'video', 'created_at', 'contact_info']
        read_only_fields = ['id', 'owner_name', 'views', 'clicks', 'ad_type', 'image', 'video', 'created_at']