from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("package/<slug:slug>/", views.package_detail, name="package_detail"),
]
