API de Gerenciamento Escolar com Django e Django REST Framework
Este projeto consiste em uma API de gerenciamento escolar desenvolvida com Python 3.10, Django e Django REST Framework para o backend, e TypeScript e React para o frontend. Posteriormente, a aplicação foi dockerizada para facilitar a implantação e o gerenciamento.

Funcionalidades
A API oferece as seguintes funcionalidades:

Cadastro de Alunos e Cursos:
Os campos do modelo de dados incluem informações como nome, idade, curso, etc.
Utilize os padrões REST para criar, atualizar, listar e excluir registros de alunos e cursos.
Interface Web:
A interface web foi desenvolvida com React e TypeScript.
Permite o cadastro, edição, exclusão e visualização dos dados de alunos e cursos por meio da API.
Configuração do Projeto
Backend (Django/Django REST Framework)
Instale o Django REST Framework:
pip install djangorestframework

Crie um novo projeto Django:
django-admin startproject escola_api

Crie um aplicativo dentro do projeto:
cd escola_api
python manage.py startapp alunos

Defina os modelos de dados no aplicativo alunos e configure as URLs e views.
Execute as migrações:
python manage.py makemigrations
python manage.py migrate

Crie os serializers e viewsets para a API.
Configure as rotas usando routers.
Frontend (React/TypeScript)
Crie um novo projeto React:
npx create-react-app escola-frontend

Acesse o diretório do projeto:
cd escola-frontend

Implemente as telas de cadastro, edição, exclusão e visualização de alunos e cursos.
Consuma a API criada no backend para realizar as operações.
Dockerização
Crie um arquivo Dockerfile na raiz do projeto:
# Dockerfile para o backend Django
FROM python:3.10

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

Crie um arquivo docker-compose.yml:
version: '3'
services:
  backend:
    build: .
    ports:
      - "8000:8000"

Execute o seguinte comando para iniciar os contêineres:
docker-compose up

Executando o Projeto
Acesse a interface web em http://localhost:3000.
Utilize a API em http://localhost:8000.
Lembre-se de adaptar essas instruções conforme suas necessidades específicas e os detalhes do seu projeto. 🚀