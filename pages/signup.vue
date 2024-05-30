<template>
  <div class="register">
    <form @submit.prevent="register" class="register-form">
      <div class="register-input">
        <label for="fio">ФИО</label>
        <input type="text" v-model="fio" id="password" required>
      </div>
      <div class="register-input">
        <label for="organisation">Наименование организации</label>
        <input type="text" v-model="organisation" id="password" required>
      </div>
      <div class="register-input">
        <label for="login">Логин</label>
        <input type="text" v-model="login" id="username" required>
      </div>
      <div class="register-input">
        <label for="password">Пароль</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">Зарегистрироваться</button>
      <nuxt-link to="/signin" class="register-link">Войти</nuxt-link>
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
  navigateTo('/index')
  console.log(`Регистрация организация - ${organisation.value} логин- ${login.value} пароль - ${password.value}`);
}
</script>

<style lang="scss" scoped>

</style>