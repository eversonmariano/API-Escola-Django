from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from student.api import viewsets as studentviewsets
from student.api import viewsets as courseviewsets

rout = routers.DefaultRouter()
rout.register(r'students', studentviewsets.StudentViewSet, basename= 'Student')
rout.register(r'courses', courseviewsets.CourseViewSet, basename= 'Courses')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(rout.urls))
]
