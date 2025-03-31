from django.urls import path
from .views import LoginView, update_delete_ad,about_us, reset_password, update_profile, delete_account, AdDetailsView, AdListView, track_ad_clicks, track_ad_view, RegisterView, UserAdsView, search_ads, create_ad


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('', AdListView.as_view(), name='ad-list'),
    path('create/',create_ad,name='ad-create'),
    path('user-ads/', UserAdsView.as_view(), name='user-ads'),
    path('update-delete/<int:ad_id>/', update_delete_ad, name='update-delete'),
    path("ad-details/<int:id>/", AdDetailsView.as_view(), name="ad-detail"),
    path('track_views/<int:pk>/', track_ad_view, name='ad-views'),
    path('track_clicks/<int:pk>/', track_ad_clicks, name='ad-clicks'),
    path("search/", search_ads, name="search_ads"),
    path('reset_password/', reset_password, name='reset-passord'),
    path('delete_account', delete_account, name='delete-account'),
    path('about-us/', about_us, name='about-us'),
]

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
