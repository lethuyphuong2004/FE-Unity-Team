<template>
  <form class="text-center" @submit.prevent="handleLogin">
    <input
      v-model="data.user.username"
      placeholder="Tên đăng nhập"
      class="border border-gray-300 rounded px-4 py-2 mb-4"
    />
    <input
      v-model="data.user.password"
      type="password"
      placeholder="Mật khẩu"
      class="border border-gray-300 rounded px-4 py-2 mb-4"
    />
    <p>{{data.log}}</p>
    <button type="submit" class="px-6 py-3 bg-accent text-white rounded-lg shadow-md hover:bg-yellow-500 transition w-full">Đăng nhập</button>
  </form>
 
</template>

<script setup>
import VueJwtDecode from 'vue-jwt-decode';
import { reactive, ref } from 'vue';

import apiResource from '../composables/apiResource';
const {
  auth_login,
} = apiResource();

const data = reactive({
  user: {
    username: '',
    password: '',
  },
  log: '',
});

const log = reactive({
  text: '',
});

const handleLogin = async () => {
  try {
    const response = await auth_login(data.user);

    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
      const token = localStorage.getItem('access_token');
      if (token) {
        const decodedToken = VueJwtDecode.decode(token);
        if (decodedToken) {
          data.log = JSON.stringify(decodedToken);
        }
      }
    } else {
      data.log = 'Thông tin đăng nhập không đúng'
    }
  } catch (error) { 
    console.error('Login failed', error);
  }
};

</script>