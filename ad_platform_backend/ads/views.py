from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework.response import Response
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
import re


# @api_view(['POST'])
# def register(request):
#     serializer = UserSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message': 'User Created Successfully'}, status=201)
#     return Response(serializer.errors, status=404)

# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')
#     user = authenticate(username=username, password=password)
    
#     if user:
#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#             'user': UserSerializer(user).data
#         })
#     return Response({'error': 'Invalid Credentials'}, status=400)


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

    # def post(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid()
    #     return Response(serializer.validated_data)
    #     # return Response(serializer.validated_data, status=status.HTTP_200_OK)
    #     # return Response({"error": "Invalid username or password"}, status=HTTP_400_BAD_REQUEST)
    

# class AdCreateView(generics.CreateAPIView):
#     queryset = Ads.objects.all()
#     serializer_class = AdSerializer
#     permission_classes = [IsAuthenticated]
    
#     def perform_create(self, serializer):
#         user = self.request.user

#         # Debugging: Check if the user is an instance of the custom user model
#         if not isinstance(user, User):
#             raise ValueError(f"Invalid user type: {type(user)}. Expected {User}")

#         serializer.save(owner=user)  # Assign the logged-in user


# @api_view(["POST"])
# def create_ad(request):
#     if request.method == "POST":
#         data = request.data
#         image = request.FILES.get("image", None)
#         video = request.FILES.get("video", None)

#         ad = Ads.objects.create(
#             title=data["title"],
#             description=data["description"],
#             # created_at = data['created_at'],
#             # contact_info = data['contact_info'],
#             image=image,
#             video=video,
#         )

#         return Response({"message": "Ad uploaded successfully!", "ad_id": ad.id})
        
    
    
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
    # def perform_create(self, serializer):
    #     return serializer.save(owner=self.request.user)
    
class AdListView(generics.ListAPIView):
    queryset = Ads.objects.all().order_by('created_at')
    serializer_class = AdSerializer
    permission_classes = [AllowAny]
    
    
# User = get_user_model()

class UserAdsView(generics.ListAPIView):
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Ads.objects.filter(owner=self.request.user) 
    
class AdDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ads.objects.all()
    serializer_class = AdSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Ads.objects.filter(owner=self.request.user)
    
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