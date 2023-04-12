from django.contrib import admin
from .models import CombinedMetrics, PosterMetrics, UserMetrics
# Register your models here.

admin.register(CombinedMetrics)
admin.register(PosterMetrics)
admin.register(UserMetrics)
