from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('home-demo-1/', views.home_view, name='home_demo_1'),
    path('home-demo-2/', views.home_demo_2_view, name='home_demo_2'),
    path('home-demo-3/', views.home_demo_3_view, name='home_demo_3'),
    path('home-demo-4/', views.home_demo_4_view, name='home_demo_4'),
    path('home-demo-5/', views.home_demo_5_view, name='home_demo_5'),
    path('home-demo-6/', views.home_demo_6_view, name='home_demo_6'),
    path('home-demo-7/', views.home_demo_7_view, name='home_demo_7'),
    path('home-demo-8/', views.home_demo_8_view, name='home_demo_8'),
    path('coming-soon/', views.coming_soon_view, name='coming_soon'),
    path('terms/', views.terms_view, name='terms'),
    path('privacy/', views.privacy_view, name='privacy'),
    path('api/estimate', views.api_estimate_view, name='api_estimate'),
    path('login', lambda request: redirect('http://localhost:3000/login'), name='login_redirect'),
]
