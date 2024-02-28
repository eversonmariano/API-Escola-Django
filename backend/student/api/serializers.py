from rest_framework import serializers
from student import models

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = '__all__'

class CourseNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = ['name']



class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Student
        fields = ["id", "name", "age", "course", "registrationDate"]

    def to_representation(self, instance):
        course = CourseNameSerializer()

        representation = super().to_representation(instance)
        representation['courseName'] = instance.course.name
        return representation

    def create(self, validated_data):
        course = serializers.PrimaryKeyRelatedField(queryset=models.Course.objects.all())

        course = validated_data.pop('course')
        aluno = models.Student.objects.create(course=course, **validated_data)
        return aluno

    def update(self, instance, validated_data):
        
        instance.name = validated_data.get('name', instance.name)
        instance.age = validated_data.get('age', instance.age)
        instance.save()
        return instance