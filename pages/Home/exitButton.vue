<template>
  <div class="exitContainer">
    <button @click="logout" class="exit">Выход</button>
  </div>
</template>

<script lang="ts" setup>

function logout() {
  const authToken = useCookie('token');
  const refreshToken = useCookie('refreshToken');
  
  authToken.value = null;
  refreshToken.value = null;

  navigateTo('/signup')
}

</script>

<style scoped>
.exitContainer {
  position: absolute;
  top: 3%;
  right: 2%;
}

.exit {
  background: none;
  border: none;
  font-weight: 500;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
}
</style>