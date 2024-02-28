from django.db import models
from uuid import uuid4
# Create your models here.

#Cursos
class Course(models.Model):
   id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
   name = models.CharField(max_length=40, unique = True, null=False)
   hours = models.PositiveIntegerField()

class Student(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=250)
    age = models.PositiveIntegerField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    registrationDate = models.DateField(auto_now_add=True)
