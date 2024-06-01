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
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('');
const login = ref('');

const sign = () => {
  if (true) {
    navigateTo('/home')
  }
  console.log(`Вход логин - ${login.value} пароль - ${password.value}`);
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 70%;
}
</style>