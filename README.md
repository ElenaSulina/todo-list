<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Описание / Description

Проект включает в себя бэкенд для приложения Todo list, выполнен с использованием следующих технологий:
- Nest JS
- TypeORM
- PostgreSQL

Он предоставляет API для управления проектами и задачами (CRUD), а также включает функциональность аутентификации и управления ролями.

Project is a backend for a Todo list application. The following technologies have been used:
- Nest JS
- TypeORM
- PostgreSQL

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