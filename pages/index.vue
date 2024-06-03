<template>
    <button @click="load">load</button>

    <div>{{ data }}</div>
    <div>{{ error }}</div>
</template>

<script setup lang="ts">
const data: any = ref(null);
const error: any = ref(null);

const load = () => {
    const { data, pending, error, refresh } = useFetch();
    data.value = result.data;
    error.value = result.error;
};
</script>

<style>

</style>
