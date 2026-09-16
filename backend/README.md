# pizza-app backend

Бэкенд на Express + PostgreSQL, реализующий тот же контракт, что и эталонный
`pizza-api-demo` (контракт извлечён из `Insomnia_..._export.json`).

## Установка через Docker (одна команда)

Нужен установленный и запущенный Docker.

```
cd backend
docker compose up --build
```

Поднимутся два контейнера — Postgres и сам бэкенд. При первом старте
бэкенд сам применит схему и засеет демо-продукты (только если таблица
`products` пустая — при последующих перезапусках данные не затираются).
API будет доступен на `http://localhost:3001/pizza-api-demo`.

Остановить: `docker compose down` (данные Postgres останутся в volume
`pizza_db_data`). Полностью стереть данные: `docker compose down -v`.

JWT-секрет и CORS-origin можно переопределить через `.env`-файл рядом с
`docker-compose.yml` (те же переменные, что и в `.env.example`) — по
умолчанию используются dev-значения.

## Установка вручную (без Docker)

1. Создать базу Postgres, например:
   ```
   createdb pizza_app
   ```
2. Скопировать `.env.example` в `.env` и при необходимости поменять
   `DATABASE_URL` / `JWT_SECRET`.
3. Установить зависимости:
   ```
   cd backend
   npm install
   ```
4. Применить схему (и при желании засеять демо-продукты):
   ```
   npm run migrate:seed
   ```
5. Запустить сервер:
   ```
   npm run dev
   ```

API отдаётся под `http://localhost:3001/pizza-api-demo` — так же, как
`PREFIX` во фронтенде (`src/Helpers/API.ts`). Чтобы фронтенд ходил в
локальный бэкенд, достаточно указать там этот адрес вместо
`purpleschool.ru`.

## Эндпоинты

| Метод | Путь                        | Авторизация | Тело / query                          |
|-------|-----------------------------|-------------|----------------------------------------|
| POST  | `/auth/register`            | -           | `{ email, name, password }`            |
| POST  | `/auth/login`                | -           | `{ email, password }`                  |
| GET   | `/user/profile`             | JWT         | -                                       |
| GET   | `/products`                 | -           | `?limit=&offset=&name=`                |
| GET   | `/products/:id`             | -           | -                                       |
| POST  | `/order`                    | JWT         | `{ products: [{ id, count }] }`        |

Эндпоинты авторизации и успешное создание заказа возвращают `{ access_token }`
(то же имя поля, которое ожидают фронтендовые типы `LoginResponse` /
`RegisterResponse`). Его нужно передавать обратно в заголовке
`Authorization: Bearer <access_token>`.

## Заметки

- `GET /user/profile` отдаёт `passwordHash` в теле ответа только потому,
  что этого поля ожидает фронтендовый тип `ProfileResponse` (скопированный
  из эталонного demo API) — в реальном продакшен API так делать не стоит.
- Пароли хешируются через bcrypt; в payload JWT лежит `{ id, email }`.
