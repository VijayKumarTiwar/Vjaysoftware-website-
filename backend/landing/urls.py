from django.urls import path
from django.shortcuts import redirect
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('api/estimate', views.api_estimate_view, name='api_estimate'),
    path('login', lambda request: redirect('http://localhost:3000/login'), name='login_redirect'),
]
