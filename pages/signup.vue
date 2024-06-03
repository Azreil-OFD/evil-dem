<template>
  <div class="form">
    <form @submit.prevent="register">
      <div class="form-input">
        <label for="fio">ФИО</label>
        <input type="text" v-model="fio" required>
      </div>
      <div class="form-input">
        <label for="organisation">Наименование организации</label>
        <input type="text" v-model="organization" required>
      </div>
      <div class="form-input">
        <label for="login">Логин</label>
        <input type="text" v-model="login" required>
      </div>
      <div class="form-input">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
      <nuxt-link to="/signin" class="form-link">Войти</nuxt-link>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fio = ref('');
const organization = ref('');
const login = ref('');
const password = ref('');

const errorMessage = ref('')

const validateForm = () => {
  if (fio.value.length < 2) {
    return "Поле ФИО должно содержать не менее 2 символов";
  }
  if (organization.value.length < 2) {
    return "Поле Организация должно содержать не менее 2 символов";
  }
  if (login.value.length < 5) {
    return "Поле Логин должно содержать не менее 5 символов";
  }
  if (!/^[a-zA-Z0-9@._-]+$/.test(login.value)) {
    return "Поле Логин должно содержать только английские буквы, цифры и допустимые символы (@._-)"
  }
  if (password.value.length < 8 || !/\d/.test(password.value)) {
    return "Поле Пароль должно содержать не менее 8 символов и минимум одну цифру";
  }
  return null;
}

const register = async () => {
  errorMessage.value = validateForm();

  if (errorMessage.value) {
    return;
  }

  try {
    const responseData = await $fetch('/api/auth/signup', {
      method: "POST",
      body: {
        "fullName": fio.value,
        "organization": organization.value,
        "login": login.value,
        "password": password.value,
      },
    });

    if (responseData.data) {
      const keys = responseData.data
      const authToken = useCookie('token');
      const refreshToken = useCookie('refreshToken');
      
      authToken.value = keys.token;
      refreshToken.value = keys.refresh;

      navigateTo('/home')
    } else {
      errorMessage.value = "Пользователь с данным логином уже существует"
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>

.form {
  margin-top: 50%;
}

.error-message {
  color: rgb(255, 0, 0);
  font-weight: 500;
  text-align: center;
  // animation:  10s linear infinite; // Динамическая смена цвета во время мигания
  margin-top: 25px;
}
</style>