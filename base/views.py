from django.shortcuts import render, get_object_or_404
from .models import UmrahPackage


def home(request):
    packages = UmrahPackage.objects.all()
    context = {"packages": packages}
    return render(request, "home_new.html", context)


def package_detail(request, slug):
    package = get_object_or_404(UmrahPackage, slug=slug)
    context = {
        "package": package,
    }
    return render(request, "package_detail.html", context)
