from django.urls import path
from .views import LoginView, AdDetailView, AdDetailsView, AdListView, track_ad_clicks, track_ad_view, RegisterView, UserAdsView, search_ads, create_ad
# 
# from django.conf import settings
# from django.conf.urls.static import static

# urlpatterns = [
#     path('register/', views.register, name='register'),
#     path('login/', views.login, name='login')
# ]

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', AdListView.as_view(), name='ad-list'),
    path('create/',create_ad,name='ad-create'),
    path('user-ads/', UserAdsView.as_view(), name='user-ads'),
    path('details/<int:pk>/', AdDetailView.as_view(), name='ad-details'),
    path("ad-details/<int:id>/", AdDetailsView.as_view(), name="ad-detail"),
    path('track_views/<int:pk>/', track_ad_view, name='ad-views'),
    path('track_clicks/<int:pk>/', track_ad_clicks, name='ad-clicks'),
    path("search/", search_ads, name="search_ads"),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
