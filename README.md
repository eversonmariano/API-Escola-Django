# API School

Este repositório contém uma aplicação web para uma escola, desenvolvida com um backend em Django/Django REST Framework (Python) e frontend em TypeScript e React.

## Descrição

A API School é uma aplicação destinada a gerenciar informações relacionadas a uma escola, incluindo alunos, professores, disciplinas, notas, entre outros. A API oferece endpoints para realizar operações CRUD (Create, Read, Update, Delete) em diferentes entidades do sistema.

O frontend é construído em React utilizando TypeScript para garantir maior robustez e segurança durante o desenvolvimento.

## Tecnologias Utilizadas

- Backend:
  - Django
  - Django REST Framework
  - Python
  
- Frontend:
  - React
  - TypeScript

## Instalação e Configuração

### Backend (Django/Django REST Framework)

1. Clone este repositório.
2. Navegue até o diretório `backend`.
3. Crie um ambiente virtual Python: (`python -m venv .venv`).
4. Ative o ambiente virtual: (`.\.venv\Scripts\activate`).
5. Execute as migrações do Django: (`python manage.py migrate`).
6. Inicie o servidor Django: (`python manage.py runserver`).

   ## Utilização

- Acesse a interface do backend através do navegador, normalmente disponível em `http://localhost:8000`.
- Utilize os endpoints da API REST disponíveis no backend para realizar operações CRUD na aplicação.

### Frontend (React)

1. Navegue até o diretório `frontend`.
2. Instale as dependências do Node.js utilizando npm ou yarn: `npm install` ou `yarn install`.
3. Inicie o servidor de desenvolvimento React: `npm start` ou `yarn start`.

## Utilização

- Acesse a interface do frontend através do navegador, normalmente disponível em `http://localhost:3000`.
- Utilize os endpoints da API REST disponíveis no backend para realizar operações CRUD na aplicação.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
