<template>
  <div class="register">
    <form @submit.prevent="register" class="register-form">
      <div class="register-input">
        <label for="login">Логин</label>
        <input type="text" v-model="login" id="username" required>
      </div>
      <div class="register-input">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">Войти</button>
      <nuxt-link to="/signup" class="register-link">Зарегистрироваться</nuxt-link>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const password = ref('');
const login = ref('');

const register = () => {
  if (true) {
    navigateTo('/signup')
  }
  console.log(`Вход логин - ${login.value} пароль - ${password.value}`);
}
</script>

<style lang="scss" scoped>

</style>