# Path: Dockerfile
FROM python:3.8-slim as builder

# Set the working directory
WORKDIR /app

# Copy the code from the builder image
COPY . .

RUN pip install --upgrade pip

RUN pip install django-cors-headers

RUN python -m venv /app/.venv

CMD [ "./app/.venv/bin/activate" ]

RUN pip install django djangorestframework

RUN python manage.py makemigrations

RUN python manage.py migrate

# # Expose the port the app runs on
EXPOSE 8000

# # Serve the app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
