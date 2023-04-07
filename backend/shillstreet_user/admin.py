from django.contrib import admin
from .models import User, WaitList


# Register your models here.
admin.site.register(User)
admin.site.register(WaitList)
