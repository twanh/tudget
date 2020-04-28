from django.contrib import admin
from .models import Category, Tag

# Register to admin console.
admin.site.register(Category)
admin.site.register(Tag)