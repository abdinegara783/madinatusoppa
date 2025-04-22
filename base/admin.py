from django.contrib import admin
from .models import UmrahPackage


class UmrahPackageAdmin(admin.ModelAdmin):
    list_display = ("name", "price", "departure_date", "duration")
    list_filter = ("departure_date",)
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(UmrahPackage, UmrahPackageAdmin)
