<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <PasswordLogin v-model:username="username" />
  </div>
</template>

<script setup>
  import PasswordLogin from '../components/PasswordLogin.vue';
</script>