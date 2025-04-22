from django.utils import timezone
from base.models import UmrahPackage
from datetime import timedelta
from decimal import Decimal

# Get the existing package
package = UmrahPackage.objects.get(slug="program-umrah-ekonomis")

# Set promo details
package.is_promo = True
package.promo_price = int(package.price * Decimal("0.85"))  # 15% discount
package.promo_end_date = timezone.now().date() + timedelta(
    days=30
)  # Promo ends in 30 days

# Save the changes
package.save()

print(f"Updated package: {package.name}")
print(f"Original price: Rp {package.price:,.0f}")
print(f"Promo price: Rp {package.promo_price:,.0f}")
print(f"Promo ends on: {package.promo_end_date}")
