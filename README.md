## Описание / Description

Проект включает в себя бэкенд для приложения Todo list, выполнен с использованием следующих технологий:
- Nest JS
- TypeORM
- PostgreSQL
- Swagger

Он предоставляет API для управления проектами и задачами (CRUD), а также включает функциональность аутентификации и управления ролями.

Project is a backend for a Todo list application. The following technologies have been used:
- Nest JS
- TypeORM
- PostgreSQL
- Swagger

It provides an API for project and task management (CRUD), and also includes authentication and role management functionality.

## Установка  / Installation

1. Клонируйте репозиторий / Clone the repository:

```bash
git clone https://github.com/ElenaSulina/todo-list.git
```

```bash
cd todo-list
```

2. В корневую папку добавьте файл .env и скопируйте туда следующие данные / Add .env file to the root folder and copy the following data there:
```bash
PORT=3000
POSTGRES_HOST=todo-db
POSTGRES_USER=postgres
POSTGRES_DB=todo-list
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=5432
PRIVATE_KEY=Markiz
JWT_KEY=ASAKLKJ35Y3M
```

## Запуск приложения / Running the app

 Убедитесь, что у вас установлены Docker и Docker Compose. / Ensure that you have Docker and Docker Compose installed.

  ```
  docker-compose up --build
  ```

Приложение доступно по адресу / The app is available at [http://localhost:3000](http://localhost:3000)

Документация доступна по адресу / The documentation is available at [http://localhost:3000/api/docs](http://localhost:3000/api/docs)


Для остановки контейнеров выполните команду ниже / To stop the container run the command below:
```bash
docker-compose down
```