
# Token Utilities

Этот модуль содержит утилиты для работы с токенами аутентификации и рефреш токенами. Файлы расположены в папке `utils/server/token`.

## Файлы

### 1. `createAuthToken.ts`

Создает JWT токен для аутентификации пользователя.

**Принцип работы:**
- Принимает объект `TokenData`, содержащий `fullName`, `organization`, `login` и `role`.
- Использует секретный ключ `NUXT_AUTH_TOKEN_SALT` из переменных окружения.
- Возвращает JWT токен, действительный в течение 1 часа.

**Как использовать:**
```typescript
import createAuthToken from './utils/server/token/createAuthToken';

const tokenData = {
    fullName: 'John Doe',
    organization: 'ExampleOrg',
    login: 'john.doe',
    role: 'user'
};

const authToken = createAuthToken(tokenData);
console.log(authToken);
```

**Возможные ответы:**
- Успех: строка с JWT токеном.
- Ошибка: выбрасывает ошибку, если `NUXT_AUTH_TOKEN_SALT` не определен в переменных окружения.

### 2. `createRefreshToken.ts`

Создает рефреш токен для пользователя.

**Принцип работы:**
- Принимает объект `TokenData`, содержащий `fullName`, `organization`, `login` и `role`.
- Использует секретный ключ `NUXT_AUTH_REFRESH_TOKEN_SALT` из переменных окружения.
- Возвращает JWT рефреш токен, действительный в течение 7 дней.

**Как использовать:**
```typescript
import createRefreshToken from './utils/server/token/createRefreshToken';

const tokenData = {
    fullName: 'John Doe',
    organization: 'ExampleOrg',
    login: 'john.doe',
    role: 'user'
};

const refreshToken = createRefreshToken(tokenData);
console.log(refreshToken);
```

**Возможные ответы:**
- Успех: строка с JWT рефреш токеном.
- Ошибка: выбрасывает ошибку, если `NUXT_AUTH_REFRESH_TOKEN_SALT` не определен в переменных окружения.

### 3. `validateRefreshToken.ts`

Проверяет валидность рефреш токена.

**Принцип работы:**
- Принимает объект `RefreshTokenData`, содержащий `refreshToken`.
- Проверяет, что токен существует и является строкой.
- Возвращает объект `ValidationResult` с результатом валидации.

**Как использовать:**
```typescript
import validateRefreshToken from './utils/server/token/validateRefreshToken';

const refreshTokenData = {
    refreshToken: 'some-refresh-token'
};

const validationResult = validateRefreshToken(refreshTokenData);
console.log(validationResult);
```

**Возможные ответы:**
- Успех: объект с `validate: true` и `message: null`.
- Ошибка: объект с `validate: false` и соответствующим сообщением об ошибке.

### 4. `verifyRefreshToken.ts`

Проверяет рефреш токен и возвращает данные пользователя.

**Принцип работы:**
- Принимает строку `refreshToken`.
- Использует секретный ключ `NUXT_AUTH_REFRESH_TOKEN_SALT` из переменных окружения.
- Декодирует токен и извлекает логин пользователя.
- Ищет пользователя в базе данных по логину.
- Возвращает данные пользователя или выбрасывает ошибку, если пользователь не найден или токен недействителен.

**Как использовать:**
```typescript
import verifyRefreshToken from './utils/server/token/verifyRefreshToken';

const refreshToken = 'some-refresh-token';

verifyRefreshToken(refreshToken)
    .then(user => {
        console.log(user);
    })
    .catch(error => {
        console.error(error.message);
    });
```

**Возможные ответы:**
- Успех: объект пользователя из базы данных.
- Ошибка: выбрасывает ошибку, если `NUXT_AUTH_REFRESH_TOKEN_SALT` не определен, токен недействителен или пользователь не найден.