<template>
  <header class="header">
    <!-- LEFT: Logo + Events -->
    <div class="left-column">
      <div class="dropdown">
        <div class="dropdown-trigger" @click="toggleDropdown">
          <img src="@/assets/VIA/VN2.png" class="logo-img" alt="VN Logo" />
          <span class="dropdown-icon">▾</span>
        </div>

        <div v-if="isDropdownOpen" class="dropdown-menu">
          <div class="dropdown-item" @click.stop="openShortcutsModal">
            <span class="icon">⌨️</span>
            <span>Keyboard shortcuts</span>
          </div>
          <div class="dropdown-item" @click.stop="toggleDarkMode">
            <span class="icon">🌙</span>
            <span>Switch to {{ isDarkMode ? 'light' : 'dark' }} mode</span>
          </div>
        </div>
      </div>
    </div>

    <!-- CENTER: Navigation -->
    <nav class="nav-bar">
      <router-link to="/Home">Home</router-link>
      <router-link to="/">Event</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/Challenges">Challenges</router-link>
    </nav>

    <!-- RIGHT: Search + Buttons -->
    <div class="right-side">
      <div class="search-box">
        🔍 <span>Search</span>
      </div>
      <button class="login-btn">Log in</button>
      <button class="join-btn">Join</button>
    </div>

    <!-- Modal: Keyboard Shortcuts -->
    <div v-if="showShortcutsModal" class="modal-overlay" @click.self="closeShortcutsModal">
      <div class="modal-content">
        <h2>⌨️ Keyboard Shortcuts</h2>
        <ul class="shortcut-list">
  <li v-for="item in shortcuts" :key="item.id">
    <strong>{{ item.shortcut }}</strong>: {{ item.action }}
  </li>
</ul>

        <button class="close-btn" @click="closeShortcutsModal">Close</button>
      </div>
    </div>

    <hr class="bottom-border" />
  </header>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watchEffect } from 'vue'

const shortcuts = ref([])

const fetchShortcuts = async () => {
  try {
    const res = await axios.get('https://67345ca9a042ab85d119d8eb.mockapi.io/shortcuts')
    shortcuts.value = res.data
  } catch (err) {
    console.error('Failed to load shortcuts:', err)
  }
}

onMounted(() => {
  fetchShortcuts()
})

const isDropdownOpen = ref(false)
const isDarkMode = ref(false)
const showShortcutsModal = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

const openShortcutsModal = () => {
  showShortcutsModal.value = true
}

const closeShortcutsModal = () => {
  showShortcutsModal.value = false
}

// Load dark mode from localStorage
onMounted(() => {
  const storedMode = localStorage.getItem('darkMode') === 'true'
  if (storedMode) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

// Save dark mode preference
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
  font-size: 20px;
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
</style>