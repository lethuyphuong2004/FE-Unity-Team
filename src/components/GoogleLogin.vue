<template>
  <div class="text-center">
    <button
      @click="signInWithGoogle"
      class="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
    >
      {{ user ? 'Đổi tài khoản' : 'Đăng nhập với Google' }}
    </button>
    <div v-if="user" class="mt-4">
      <p class="text-lg font-semibold">Xin chào, {{ user.displayName }}!</p>
      <img
        :src="user.photoURL"
        alt="Avatar"
        class="w-24 h-24 rounded-full mt-2 shadow"
      />
      <button
        @click="signOut"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
      >
        Đăng xuất
      </button>
    </div>
  </div>
</template>

<script>
import { auth, provider, signInWithPopup, signOut } from "../auth/firebase";

export default {
  data() {
    return {
      user: null
    };
  },
  mounted() {
    this.setupAuthListener();
  },
  methods: {
    async setupAuthListener() {
      try {
        const user = await new Promise((resolve, reject) => {
          const unsubscribe = auth.onAuthStateChanged(
            user => {
              unsubscribe();
              resolve(user);
            },
            error => {
              unsubscribe();
              reject(error);
            }
          );
        });
        
        this.user = user;
        if (user) {
          console.log('User data loaded:', JSON.stringify(this.user));
        }
      } catch (error) {
        console.error('Auth state error:', error);
        this.showErrorNotification('Failed to check authentication status');
      }
    },
    
    async signInWithGoogle() {
      try {
        // Đăng xuất trước khi đăng nhập lại (tuỳ chọn)
        if (this.user) {
          await signOut(auth);
        }
        
        const result = await signInWithPopup(auth, provider);
        this.user = result.user;
        console.log("Đăng nhập thành công:", this.user);
      } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        if (error.code === 'auth/popup-closed-by-user') {
          this.showErrorNotification('Bạn đã đóng cửa sổ đăng nhập');
        }
      }
    },
    
    async signOut() {
      try {
        await signOut(auth);
        this.user = null;
        console.log("Đăng xuất thành công");
      } catch (error) {
        console.error("Lỗi đăng xuất:", error);
      }
    },
    
    showErrorNotification(message) {
      alert(message);
    }
  }
};
</script>