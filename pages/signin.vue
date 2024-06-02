<template>
  <div class="form">
    <form @submit.prevent="sign">
      <div class="form-input">
        <label for="login">Логин</label>
        <input type="text" v-model="login" required>
      </div>
      <div class="form-input">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Войти</button>
      <nuxt-link to="/signup" class="form-link">Зарегистрироваться</nuxt-link>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('');
const login = ref('');

const errorMessage = ref('');

const sign = async () => {
  try {
    const responseData = await $fetch('/api/auth/signin', {
      method: "POST",
      body: {
        "login": login.value,
        "password": password.value,
      },
    });
    console.log(responseData);
    if (responseData.data) {
      const keys = responseData.data
      const authToken = useCookie('token');
      const refreshToken = useCookie('refreshToken');
      
      authToken.value = keys.token;
      refreshToken.value = keys.refresh;

      navigateTo('/home')
    } else {
      errorMessage.value = "Введен неверный логин или пароль"
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>

.form {
  margin-top: 70%;
}

.error-message {
  color: rgb(255, 0, 0);
  font-weight: 500;
  text-align: center;
  // animation:  10s linear infinite; // Динамическая смена цвета во время мигания
  margin-top: 25px;
}
</style>