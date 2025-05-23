<template>
  <header class="header">
    <!-- LEFT: Logo + Events -->
    <div class="left-column">
      <div class="dropdown">
        <div class="dropdown-trigger" @click="toggleDropdown">
        <router-link to="/" class="logo-img-link">
  <img src="@/assets/VIA/VN2.png" class="logo-img" alt="VN Logo" />
</router-link>

          <span class="dropdown-icon">▾</span>
        </div>

           <!-- Dropdown -->
        <div v-if="isDropdownOpen" class="absolute mt-12 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50">
          <div @click.stop="openShortcutsModal" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            ⌨️ Keyboard Shortcuts
          </div>
          <div @click.stop="toggleDarkMode" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
            🌙 Switch to {{ isDarkMode ? 'Light' : 'Dark' }} Mode
          </div>
        </div>
      </div>
      </div>

     <!-- Center: Navigation -->
      <nav class="nav-bar hidden md:flex gap-6 font-semibold text-gray-800 dark:text-gray-100">
        <router-link to="/Home" class="hover:text-red-600">Home</router-link>
        <router-link to="/" class="hover:text-red-600">Event</router-link>
        <router-link to="/about" class="hover:text-red-600">About</router-link>
        <router-link to="/Challenges" class="hover:text-red-600">Challenges</router-link>
      </nav>

    <!-- Right: Search + Buttons -->
      <div class="hidden md:flex items-center gap-3">
        <div class="px-3 py-1 border rounded-full text-sm text-gray-600 dark:text-gray-200 dark:border-gray-600">
          🔍 Search
        </div>
        <button class="px-4 py-1 border rounded-full text-sm font-medium">Log in</button>
        <button class="px-4 py-1 bg-red-600 text-white rounded-full text-sm font-medium">Join</button>
      </div>

      <!-- Hamburger (Mobile) -->
<button @click="toggleMobileMenu" class="md:hidden text-gray-800 dark:text-gray-200">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M4 6h16M4 12h16M4 18h16" />
    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>

      <!-- Mobile Menu (ngang, gồm cả điều hướng + login/join) -->
<div v-if="showMobileMenu" class="md:hidden flex flex-wrap justify-center gap-3 mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
  <button class="px-3 py-1 border rounded-full hover:text-red-600">Log in</button>
  <button class="px-3 py-1 bg-red-600 text-white rounded-full">Join</button>
</div>

    <!-- Modal Shortcuts -->
<div
  v-if="showShortcutsModal"
  class="modal-overlay"
  @click.self="closeShortcutsModal"
>
  <div class="modal-box">
    <h2 class="modal-title">⌨️ Keyboard Shortcuts</h2>
    <ul class="shortcut-list">
      <li v-for="item in shortcuts" :key="item.id">
        <strong>{{ item.shortcut }}</strong>: {{ item.action }}
      </li>
    </ul>
    <button @click="closeShortcutsModal" class="modal-close-btn">
      Close
    </button>
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
  align-items: center; /* <-- đảm bảo các phần tử con canh giữa dọc */
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

.events-text {
  font-weight: 600;
  font-size: 14px;
  color: #111;
  margin-top: 2px;
    margin: 0; 
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

.dropdown-icon {
  color: #333;
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
}

.dropdown-item:hover {
  background-color: #f4f4f4;
  cursor: pointer;
}

.icon {
  font-size: 16px;
}

/* Overlay */
.modal-overlay {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0; */
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem; /* tạo khoảng cách khi màn hình nhỏ */
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* nền đen mờ */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
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


/* === Modal === */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.shortcut-list {
  list-style: none;
  padding: 0;
  margin-bottom: 16px;
}

.shortcut-list li {
  margin-bottom: 8px;
  font-size: 14px;
}

.close-btn {
  background-color: #e03a3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 24px;
  cursor: pointer;
}

/* === Bottom Border === */
.bottom-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-color: #e2e7ef;
  margin: 0;
}


/* === DARK MODE === */
:global(.dark) {
  background-color: #111;
  color: #f1f1f1;
}

:global(.dark .header) {
  background-color: #1a1a1a;
}

:global(.dark .nav-bar a) {
  color: #f1f1f1;
}

:global(.dark .dropdown-menu) {
  background-color: #2b2b2b;
}

:global(.dark .dropdown-item:hover) {
  background-color: #3a3a3a;
}

:global(.dark .search-box) {
  border-color: #444;
  background-color: #1e1e1e;
}

:global(.dark .login-btn) {
  border-color: #f1f1f1;
  color: #f1f1f1;
}

:global(.dark .join-btn) {
  background-color: #e03a3c;
}

:global(.dark .modal-content) {
  background-color: #2b2b2b;
  color: white;
}

/* === Responsive (mobile) giữ layout ngang === */
@media (max-width: 768px) {
  .header {
    flex-wrap: nowrap; /* giữ header nằm ngang */
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
    display: none; /* ẩn nút search/login/join */
  }

  .mobile-menu {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background-color: white;
    border-top: 1px solid #eee;
    padding: 8px 16px;
    z-index: 40;
  }

  .mobile-menu a {
    display: block;
    padding: 10px;
    font-size: 16px;
    border-radius: 6px;
    transition: background-color 0.2s;
  }

  .dropdown-menu {
    width: 180px;
    right: auto;
    left: 0;
  }
}



</style>