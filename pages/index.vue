<template>
  <div>{{ data }}</div>
  <div>{{ error }}</div>
</template>

<script lang="ts" setup>
const { data, pending, error, refresh } = useFetch("/api/hello");
</script>

<style></style>
