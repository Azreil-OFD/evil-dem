<template>
  <div class="form">
    <form @submit.prevent="register">
      <div class="form-input">
        <label for="fio">ФИО</label>
        <input type="text" v-model="fio" required>
      </div>
      <div class="form-input">
        <label for="organisation">Наименование организации</label>
        <input type="text" v-model="organisation" required>
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
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fio = ref('');
const organisation = ref('');
const login = ref('');
const password = ref('');

const register = () => {
  navigateTo('/home')
  console.log(`Регистрация организация - ${organisation.value} логин- ${login.value} пароль - ${password.value}`);
}
</script>

<style lang="scss" scoped>
.form {
  margin-top: 50%;
}
</style>