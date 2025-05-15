<template>
  <footer class="bg-[#121212] text-gray-300 py-10 px-6">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
      <!-- Logo -->
      <div class="col-span-1">
        <img src="/logo.svg" alt="Vietnam is awesome" class="h-10 mb-4" />
        <p class="text-sm">&copy; {{ new Date().getFullYear() }} Vietnam Is Awesome. All rights reserved.</p>
        <p class="text-sm mt-2">
          2nd Floor, 55 To Hien, Thanh My Loi Ward, Thu Duc, Ho Chi Minh City, Vietnam
        </p>
        <p class="text-sm mt-2">
          Call us: <a href="tel:+84969364906" class="text-white font-medium hover:underline">+84 96 936 4906</a>
        </p>
      </div>

      <!-- Community - Load from API -->
      <div>
        <h3 class="text-white font-semibold mb-3">Categories</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="(category, index) in categories" :key="index">
            <a href="#" class="hover:text-white">Explore: {{ category }}</a>
          </li>
        </ul>
      </div>

      <!-- About Us - Static -->
      <div>
        <h3 class="text-white font-semibold mb-3">About Us</h3>
        <ul class="space-y-2 text-sm">
          <li><a href="#" class="hover:text-white">Press & Media</a></li>
          <li><a href="#" class="hover:text-white">Partner With Us</a></li>
          <li><a href="#" class="hover:text-white">Contact Us</a></li>
          <li><a href="#" class="hover:text-white">Careers</a></li>
          <li><a href="#" class="hover:text-white">Reviews</a></li>
          <li><a href="#" class="hover:text-white">Terms of use</a></li>
          <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
        </ul>
      </div>

      <!-- Social Icons -->
      <div class="flex md:justify-end items-start mt-6 md:mt-0">
        <div class="flex space-x-4">
          <a href="#" aria-label="Facebook" class="text-white hover:text-gray-400">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram" class="text-white hover:text-gray-400">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="LinkedIn" class="text-white hover:text-gray-400">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="#" aria-label="YouTube" class="text-white hover:text-gray-400">
            <i class="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const categories = ref([])

onMounted(async () => {
  try {
    const response = await fetch('https://67345ca9a042ab85d119d8eb.mockapi.io/products')
    const data = await response.json()
    // Lấy danh sách category duy nhất
    const uniqueCategories = [...new Set(data.map(item => item.category))]
    categories.value = uniqueCategories
  } catch (error) {
    console.error('Failed to load categories:', error)
  }
})
</script>

<style scoped>
footer {
  background-color: #121212;
  color: #d4d4d4;
  padding: 64px 24px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;
}

footer a {
  text-decoration: none;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 48px;
}

.footer-logo {
  height: 40px;
  margin-bottom: 16px;
}

.footer-contact,
.footer-address {
  font-size: 14px;
  color: #d4d4d4;
  margin-top: 10px;
}

.footer-contact a {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
}

.footer-contact a:hover {
  text-decoration: underline;
}

.footer-section-title {
  color: #ffffff;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 16px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #d4d4d4;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #ffffff;
}

.footer-social {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.footer-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid white;
  border-radius: 50%;
  color: white;
  transition: all 0.3s ease;
  font-size: 14px;
}

.footer-icon:hover {
  background-color: white;
  color: #121212;
  transform: scale(1.05);
}


</style>
