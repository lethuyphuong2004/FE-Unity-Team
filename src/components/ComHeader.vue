<template>
  <header class="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow">
    <!-- Grid layout -->
    <div class="grid grid-cols-3 items-center px-6 py-3">
      <!-- LEFT: Logo + Dropdown -->
      <div class="flex items-center gap-2">
        <div class="relative flex items-center cursor-pointer" @click="toggleDropdown">
          <router-link to="/" class="mr-1">
            <img src="@/assets/VIA/VN2.png" class="h-10 w-auto" alt="VN Logo" />
          </router-link>
          <span class="text-xl">▾</span>

          <!-- Dropdown -->
          <div v-if="isDropdownOpen" class="absolute top-14 left-0 w-60 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
            <div @click.stop="openShortcutsModal" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <span class="w-6 text-center">⌨️</span>
              <span class="ml-2">Keyboard Shortcuts</span>
            </div>
            <div @click.stop="toggleDarkMode" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <span class="w-6 text-center">🌙</span>
              <span class="ml-2">Switch to {{ isDarkMode ? 'Light' : 'Dark' }} Mode</span>
            </div>
          </div>
        </div>
      

      <!-- Hamburger Button (Mobile only) -->
    <button 
  @click="toggleMobileMenu" 
  class="md:hidden text-gray-800 dark:text-gray-200 absolute right-7 top-0 m-5"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16" />
    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>


</div>
    

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex justify-center gap-6 font-semibold text-gray-800 dark:text-gray-100">
      <router-link to="/Home" class="hover:text-red-600">Home</router-link>
      <router-link to="/" class="hover:text-red-600">Event</router-link>
      <router-link to="/about" class="hover:text-red-600">About</router-link>
      <router-link to="/Challenges" class="hover:text-red-600">Challenges</router-link>
    </nav>

    <!-- Desktop Auth Buttons -->
    <div class="hidden md:flex items-center justify-end gap-3 px-6 py-3">
      <div class="px-3 py-1 border rounded-full text-sm text-gray-600 dark:text-gray-200 dark:border-gray-600">
        🔍 Search
      </div>
      <button class="px-4 py-1 border rounded-full text-sm font-medium">Log in</button>
      <button class="px-4 py-1 bg-red-600 text-white rounded-full text-sm font-medium">Join</button>
    </div>

    <div>
    <!-- Mobile Menu (Vertical) -->
   <transition name="slide-down">
  <div
    v-if="showMobileMenu"
    class="md:hidden fixed top-16 right-4 w-48 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg px-3 py-3 shadow-xl z-50 space-y-2"
  >
    <router-link to="/Home" class="block text-gray-800 dark:text-gray-100 hover:text-red-600 font-medium">Home</router-link>
    <router-link to="/" class="block text-gray-800 dark:text-gray-100 hover:text-red-600 font-medium">Event</router-link>
    <router-link to="/about" class="block text-gray-800 dark:text-gray-100 hover:text-red-600 font-medium">About</router-link>
    <router-link to="/Challenges" class="block text-gray-800 dark:text-gray-100 hover:text-red-600 font-medium">Challenges</router-link>

    <div class="pt-4 border-t dark:border-gray-700">
      <button class="w-full text-left px-3 py-2 border rounded-full text-sm hover:text-red-600">Log in</button>
      <button class="w-full mt-2 px-3 py-2 bg-red-600 text-white rounded-full text-sm">Join</button>
    </div>
  </div>
</transition>
</div>

    <!-- Modal Shortcuts -->
    <div
      v-if="showShortcutsModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeShortcutsModal"
    >
      <div class="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 w-80 rounded-xl shadow-xl">
        <h2 class="text-lg font-bold mb-4">⌨️ Keyboard Shortcuts</h2>
        <ul class="space-y-2 text-sm">
          <li v-for="item in shortcuts" :key="item.id">
            <strong>{{ item.shortcut }}</strong>: {{ item.action }}
          </li>
        </ul>
        <button @click="closeShortcutsModal" class="mt-4 px-4 py-2 bg-red-600 text-white rounded-full text-sm">Close</button>
      </div>
    </div>
    </div>
  </header>
</template>


<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'

const isDropdownOpen = ref(false)
const showMobileMenu = ref(false)
const showShortcutsModal = ref(false)
const isDarkMode = ref(false)
const shortcuts = ref([])

const toggleDropdown = () => isDropdownOpen.value = !isDropdownOpen.value
const toggleMobileMenu = () => showMobileMenu.value = !showMobileMenu.value
const openShortcutsModal = () => showShortcutsModal.value = true
const closeShortcutsModal = () => showShortcutsModal.value = false

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

onMounted(async () => {
  try {
    const res = await axios.get('https://67345ca9a042ab85d119d8eb.mockapi.io/shortcuts')
    shortcuts.value = res.data
  } catch (err) {
    console.error('Failed to fetch shortcuts:', err)
  }

  const savedMode = localStorage.getItem('darkMode') === 'true'
  if (savedMode) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

watchEffect(() => {
  localStorage.setItem('darkMode', isDarkMode.value)
})
</script>


<style scoped>
/* === Header Layout === */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Canh giữa dọc */
  padding: 0 24px;
  height: 72px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.left-column {
  display: flex;
  align-items: center;
  gap: 6px;
}

.logo-img {
  height: 58px;
  width: auto;
}

.nav-bar {
  display: flex;
  gap: 24px;
  font-weight: 600;
  font-size: 15px;
}

.nav-bar a {
  color: #111;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease-in-out;
}

.nav-bar a:hover {
  color: #e03a3c;
}

.right-side {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* === Buttons & Search === */
.search-box {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 24px;
  font-size: 14px;
  background-color: #fff;
  color: #111;
}

.login-btn {
  padding: 6px 14px;
  border: 1px solid #111;
  background: transparent;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
}

.join-btn {
  padding: 6px 14px;
  background-color: #e03a3c;
  color: white;
  border: none;
  border-radius: 24px;
  font-weight: 600;
  cursor: pointer;
}

/* === Dropdown === */
.dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 200px;
  z-index: 100;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  font-size: 14px;
  color: #111;
  transition: background-color 0.2s;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f4f4f4;
}

/* Overlay for modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* nền đen mờ */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem; /* khoảng cách khi màn hình nhỏ */
}

.modal-box {
  background-color: #ffffff;
  color: #111111;
  padding: 24px;
  width: 320px;
  max-width: 90%;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  font-family: 'Segoe UI', sans-serif;
  transition: all 0.3s ease;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
}

.shortcut-list {
  list-style: none;
  padding-left: 0;
  margin-bottom: 16px;
}

.shortcut-list li {
  font-size: 14px;
  margin-bottom: 8px;
}

.modal-close-btn {
  margin-top: 12px;
  padding: 8px 16px;
  background-color: #e03a3c;
  color: white;
  border: none;
  border-radius: 9999px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-close-btn:hover {
  background-color: #c53030;
}

/* === Dark Mode === */
:global(.dark) {
  background-color: #111 !important;
  color: #f1f1f1 !important;
}

:global(.dark .header) {
  background-color: #1a1a1a;
}

:global(.dark .dropdown-menu),
:global(.dark .dropdown-item) {
  background-color: #2b2b2b;
  color: #f1f1f1;
}

:global(.dark .dropdown-item:hover) {
  background-color: #3a3a3a;
}

:global(.dark .nav-bar a) {
  color: #f1f1f1;
}

:global(.dark .nav-bar a:hover) {
  color: #ff4b4d;
}

:global(.dark .modal-box) {
  background-color: #2b2b2b;
  color: white;
}

:global(.dark .login-btn) {
  border-color: #f1f1f1;
  color: #f1f1f1;
}

:global(.dark .join-btn) {
  background-color: #e03a3c;
}

/* === Mobile Responsive === */
@media (max-width: 768px) {
  .header {
    flex-wrap: nowrap;
    padding: 12px 16px;
    height: auto;
  }

  .logo-img {
    height: 20px;
  }

  .nav-bar {
    flex-wrap: nowrap;
    overflow-x: auto;
    white-space: nowrap;
  }
  
  .nav-bar a {
    flex-shrink: 0;
  }

  .right-side {
    display: none; /* ẩn nút search/login/join trên mobile */
  }

  .dropdown-menu {
    width: 180px;
    left: 0;
  }
}

/* Slide down transition for mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}



</style>