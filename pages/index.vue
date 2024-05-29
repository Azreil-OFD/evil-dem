<template>
    <button @click="load">load</button>

    <div>{{ data }}</div>
    <div>{{ error }}</div>
</template>

<script lang="ts" setup>
const data: any = ref(null);
const error: any = ref(null);

const load = () => {
    const result = useFetch('/api/hello');
    data.value = result.data;
    error.value = result.error;
};
</script>

<style>


</style>
