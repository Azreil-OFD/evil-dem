<template>
  <div class="home-page">
    <applications></applications>
    <applicationForm></applicationForm>
  </div>
</template>

<script lang="ts" setup>
import applicationForm from './Home/applicationForm.vue';
import applications from './Home/applications.vue';

</script>

<style>
.home-page {
  margin: 20% 0 200px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>