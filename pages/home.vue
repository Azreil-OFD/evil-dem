<template>
  <div class="home-page">
    <exitButton></exitButton>
    <div class="split">
      <applications></applications>
      <div class="sticky"> 
        <summary style="margin-bottom: 4vh; margin-top: 2vh;">Создать заявку</summary>

          <applicationForm></applicationForm>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import applicationForm from './Home/applicationForm.vue';
import applications from './Home/applications.vue';
import exitButton from './Home/exitButton.vue';
</script>

<style>
.home-page {
  margin-top: 10vh;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.split {
  display: flex;
  flex-direction: row;
  gap: 10vh;
}

.sticky {
  position: sticky;
  top: 10;
}
</style>