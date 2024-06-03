# Документация по API Аутентификации

Эта папка содержит три маршрута, связанные с аутентификацией нашего приложения. Эти маршруты расположены по пути `/api/auth/`. Ниже представлено подробное описание каждого маршрута, их принцип работы, как к ним обращаться и возможные ответы.

## Маршруты

### 1. Регистрация

**Эндпоинт:** `/api/auth/signUp`

**Метод:** POST

**Описание:** Этот эндпоинт обрабатывает регистрацию пользователей. Он проверяет предоставленные данные регистрации, создает нового пользователя и генерирует токены доступа и обновления.

**Тело запроса:**
```json
{
    "username": "string",
    "password": "string",
    "email": "string"
}
```

**Ответы:**

- **200 OK:**
  ```json
  {
      "data": {
          "token": "access_token_string",
          "refresh": "refresh_token_string"
      },
      "error": null
  }
  ```
- **400 Bad Request:**
  ```json
  {
      "data": null,
      "error": {
          "code": 400,
          "message": "Сообщение об ошибке валидации"
      }
  }
  ```
- **409 Conflict:**
  ```json
  {
      "data": null,
      "error": {
          "code": 409,
          "message": "Пользователь уже существует или другая ошибка конфликта"
      }
  }
  ```
- **500 Internal Server Error:**
  ```json
  {
      "data": null,
      "error": {
          "code": 500,
          "message": "Внутренняя ошибка сервера"
      }
  }
  ```

### 2. Вход

**Эндпоинт:** `/api/auth/signIn`

**Метод:** POST

**Описание:** Этот эндпоинт обрабатывает вход пользователей. Он проверяет предоставленные данные для входа, аутентифицирует пользователя и генерирует токены доступа и обновления.

**Тело запроса:**
```json
{
    "username": "string",
    "password": "string"
}
```

**Ответы:**

- **200 OK:**
  ```json
  {
      "data": {
          "token": "access_token_string",
          "refresh": "refresh_token_string"
      },
      "error": null
  }
  ```
- **400 Bad Request:**
  ```json
  {
      "data": null,
      "error": {
          "code": 400,
          "message": "Сообщение об ошибке валидации"
      }
  }
  ```
- **409 Conflict:**
  ```json
  {
      "data": null,
      "error": {
          "code": 409,
          "message": "Неверный логин или пароль"
      }
  }
  ```

### 3. Обновление Токена

**Эндпоинт:** `/api/auth/refresh`

**Метод:** POST

**Описание:** Этот эндпоинт обрабатывает обновление токенов. Он проверяет предоставленный токен обновления, подтверждает его и генерирует новые токены доступа и обновления.

**Тело запроса:**
```json
{
    "refreshToken": "string"
}
```

**Ответы:**

- **200 OK:**
  ```json
  {
      "data": {
          "token": "new_access_token_string",
          "refresh": "new_refresh_token_string"
      },
      "error": null
  }
  ```
- **400 Bad Request:**
  ```json
  {
      "data": null,
      "error": {
          "code": 400,
          "message": "Сообщение об ошибке валидации"
      }
  }
  ```
- **401 Unauthorized:**
  ```json
  {
      "data": null,
      "error": {
          "code": 401,
          "message": "Невалидный токен"
      }
  }
  ```

## Как Обращаться к Эндпоинтам

Вы можете обращаться к этим эндпоинтам, используя любой HTTP-клиент, например, `fetch` в JavaScript, Postman или CURL. Ниже приведены примеры использования `fetch`.

### Регистрация
```javascript
fetch('/api/auth/signUp', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'your_username',
        password: 'your_password',
        email: 'your_email'
    })
}).then(response => response.json())
  .then(data => console.log(data));
```

### Вход
```javascript
fetch('/api/auth/signIn', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'your_username',
        password: 'your_password'
    })
}).then(response => response.json())
  .then(data => console.log(data));
```

### Обновление Токена
```javascript
fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        refreshToken: 'your_refresh_token'
    })
}).then(response => response.json())
  .then(data => console.log(data));
```

Эта документация предоставляет исчерпывающий обзор маршрутов аутентификации, их использования и возможных ответов, которые вы можете получить.