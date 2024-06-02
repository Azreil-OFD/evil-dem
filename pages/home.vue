<template>
  <div class="home-page">
    <applications></applications>
    <applicationForm></applicationForm>
    <exitButton></exitButton>
  </div>
</template>

<script lang="ts" setup>
import applicationForm from './Home/applicationForm.vue';
import applications from './Home/applications.vue';
import exitButton from './Home/exitButton.vue';
</script>

<style>
.home-page {
  margin-top: 20%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>