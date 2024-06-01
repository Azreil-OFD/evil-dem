<template>
  <div class="home-page">
    <applications></applications>
    <div class="form">
      <form @submit.prevent="send_application">
        <div class="form-input">
          <label for="equipment">Оборудование</label>
          <input type="text" v-model="equipment" required>
        </div>
        <div class="form-input">
          <label for="type_of_fault">Тип неисправности</label>
          <input type="text" v-model="type_of_fault" required>
        </div>
        <div class="form-input">
          <label for="problem_description">Описание проблемы</label>
          <input type="text" v-model="problem_description" required>
        </div>
        <button type="submit">Оставить заявку</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import applications from './Home/applications.vue';

const equipment = ref('')
const type_of_fault = ref('')
const problem_description = ref('')

const send_application = () => {
  // smth..
}

</script>

<style>
.home-page {
  margin: 20% 0 200px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>