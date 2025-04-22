from django.db import models
from django.utils.text import slugify


class UmrahPackage(models.Model):
    name = models.CharField(max_length=200, verbose_name="Nama Paket")
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField(verbose_name="Deskripsi Paket")
    facilities = models.TextField(
        verbose_name="Fasilitas yang Diperoleh",
        help_text="Masukkan satu fasilitas per baris",
    )
    departure_date = models.DateField(verbose_name="Jadwal Keberangkatan")
    duration = models.PositiveIntegerField(default=10, verbose_name="Durasi (hari)")
    price = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Harga")
    is_promo = models.BooleanField(default=False, verbose_name="Promo Aktif")
    promo_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        null=True,
        blank=True,
        verbose_name="Harga Promo",
    )
    promo_end_date = models.DateField(
        null=True, blank=True, verbose_name="Tanggal Berakhir Promo"
    )
    package_image = models.ImageField(
        upload_to="package_images/",
        verbose_name="Foto Stiker Paket",
        help_text="Unggah gambar dengan rasio 21:30 untuk hasil terbaik",
    )
    poster_filename = models.CharField(
        max_length=255, blank=True, verbose_name="Nama File Poster"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Paket Umroh"
        verbose_name_plural = "Paket Umroh"
        ordering = ["-departure_date"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    @property
    def facilities_list(self):
        """Return facilities as a list, split by newlines"""
        if not self.facilities:
            return []
        return [
            facility.strip()
            for facility in self.facilities.split("\n")
            if facility.strip()
        ]

    @property
    def is_promo_active(self):
        """Check if the promo is currently active"""
        from django.utils import timezone

        if not self.is_promo or not self.promo_price:
            return False

        if self.promo_end_date and self.promo_end_date < timezone.now().date():
            return False

        return True

    @property
    def display_price(self):
        """Return the price to display (promo price if promo is active, otherwise regular price)"""
        if self.is_promo_active:
            return self.promo_price
        return self.price
