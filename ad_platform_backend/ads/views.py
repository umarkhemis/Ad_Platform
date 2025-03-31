from django.shortcuts import render
from django.contrib.auth import authenticate, update_session_auth_hash
from rest_framework.response import Response
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from .serializer import UserSerializer, RegisterSerializer, LoginSerializer, AdSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Ads
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
import re
import json

# User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         return Response(serializer.validated_data)
    
    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid()
    #     return Response(serializer.validated_data)
    #         # return Response(serializer.validated_data, status=status.HTTP_200_OK)
    #     # return Response({"error": "Invalid username or password"}, status=status.HTTP_400_BAD_REQUEST)
    
# @api_view(["POST"])
# def register_user(request):
#     username = request.data.get("username")
#     email = request.data.get("email")
#     password = request.data.get("password")

#     # Check if all fields are provided
#     if not username or not email or not password:
#         return Response({"error": "All fields (username, email, password) are required."}, status=status.HTTP_400_BAD_REQUEST)

#     # Validate email format
#     email_regex = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
#     if not re.match(email_regex, email):
#         return Response({"error": "Invalid email format."}, status=status.HTTP_400_BAD_REQUEST)

#     # Check if the email is already registered
#     if User.objects.filter(email=email).exists():
#         return Response({"error": "Email already registered."}, status=status.HTTP_400_BAD_REQUEST)

#     # Check if the username is already taken
#     if User.objects.filter(username=username).exists():
#         return Response({"error": "Username already taken."}, status=status.HTTP_400_BAD_REQUEST)

#     # Create and save the new user
#     user = User.objects.create_user(username=username, email=email, password=password)
#     return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)

    
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)

   

    
@api_view(["POST"])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can create ads
def create_ad(request):
    if request.method == "POST":
        data = request.data
        image = request.FILES.get("image", None)
        video = request.FILES.get("video", None)

        title = data.get("title", "").strip()
        description = data.get("description", "").strip()
        # contact_info = data.get("contact_info", "").strip()

        # if not title or not description or not contact_info:
        #     return Response({"error": "All fields (title, description, contact_info) are required."}, status=400)

        # Assign the currently logged-in user as the owner
        owner = request.user 
        contact_info = owner.email 

        ad = Ads.objects.create(
            title=title,
            description=description,
            contact_info=contact_info,
            owner=owner,  # Assign the authenticated user
            image=image,
            video=video,
        )

        return Response({
            "message": "Ad uploaded successfully!",
            "ad_id": ad.id,
            "created_at": ad.created_at.strftime("%Y-%m-%d %H:%M:%S")
        })

    
class AdListView(generics.ListAPIView):
    queryset = Ads.objects.all().order_by('-created_at')
    serializer_class = AdSerializer
    permission_classes = [AllowAny]
    
    
# User = get_user_model()

class UserAdsView(generics.ListAPIView):
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ads.objects.filter(owner=self.request.user) 
    
# class AdDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Ads.objects.all()
#     serializer_class = AdSerializer
#     permission_classes = [IsAuthenticated]
    
#     def get_queryset(self):
#         return Ads.objects.filter(owner=self.request.user)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_delete_ad(request, ad_id):
    ad = get_object_or_404(Ads, id=ad_id, owner=request.user)  # Ensure only the owner can modify

    if request.method == 'PUT':
        serializer = AdSerializer(ad, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        ad.delete()
        return Response({"message": "Ad deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

    
class AdDetailsView(generics.RetrieveAPIView):
    queryset = Ads.objects.all()
    serializer_class = AdSerializer
    permission_classes= [AllowAny]
    lookup_field = "id"  
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_ad_view(request, pk):
    try:
        ads  = Ads.objects.get(pk=pk)
        ads.views += 1
        ads.save()
        return Response({'message': 'Views Recorded', 'views': ads.views})
    
    except Ads.DoesNotExist:
        return Response({'error':'Ad Not Found'}, status=404)
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_ad_clicks(request, pk):
    try:
        ads = Ads.objects.get(pk=pk)
        ads.clicks += 1
        ads.save()
        return Response({'message':'Clicks Recorded', 'clicks':ads.clicks})
    except Ads.DoesNotExist:
        return Response({'error':'Ad Not Found'}, status=404)
    
@api_view(["GET"])
def search_ads(request):
    query = request.GET.get("q", "")
    ads = Ads.objects.filter(title__icontains=query)
    serializer = AdSerializer(ads, many=True)
    return Response(serializer.data)

@csrf_exempt
@login_required
def update_profile(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = request.user
        user.username = data.get('username', user.username)
        user.email = data.get('email', user.email)
        user.save()
        return JsonResponse({'message': 'User Profile Updated Successfully'}, status=200)
    

# @api_view(['POST'])
# def reset_password(request):
#     username = request.data.get('username')
#     new_password = request.data.get('new_password')

#     if not username or not new_password:
#         return Response({"error": "Username and new password are required!"}, status=status.HTTP_400_BAD_REQUEST)

#     try:
#         user = User.objects.get(username=username)
#         user.password = make_password(new_password)
#         user.save()  

#         return Response({'message': 'Password changed successfully!'}, status=status.HTTP_200_OK)
#     except User.DoesNotExist:
#         return Response({"error": "User doesn't exist!"}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    username = request.data.get('username')
    new_password = request.data.get('new_password')
    try:
        user = User.objects.get(username=username)
        user.password = make_password(new_password)
        user.save()
        return JsonResponse({'message': 'Password Changed Successfully!!'}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return JsonResponse({"message": "User Doesn't Exist!!"}, status=404)

        
# @csrf_exempt
# @login_required
# def delete_account(request):
#     if request.method == 'POST':
#         user = request.user
#         user.delete()
#         return JsonResponse({'message': 'Account Deleted Successfully!!'}, status= 200)
    
    
@api_view(['GET'])
def about_us(request):
    return Response({
        "message": "Welcome to Our Ad Platform!",
        "description": "We connect businesses and users through effective advertising."
    })
    
@api_view(['DELETE'])
@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_account(request):
    user = request.user
    user.delete()
    return Response({"message": "Account deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)



# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def toggle_dark_mode(request):
#     user_profile = get_object_or_404(UserProfile, user=request.user)
#     user_profile.dark_mode = not user_profile.dark_mode
#     user_profile.save()
#     return Response({"message": "Dark mode toggled successfully!", "dark_mode": user_profile.dark_mode})

