<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6">
    <div class="bg-white bg-opacity-90 rounded-xl shadow-xl p-12 max-w-lg text-center">
      <h1 class="text-9xl font-extrabold text-indigo-700 mb-6">404</h1>
      <h2 class="text-3xl font-semibold mb-4 text-gray-800">Oops! Không tìm thấy trang</h2>
      <p class="text-gray-600 mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <router-link
        to="/"
        class="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
      >
        Quay về trang chủ
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
}
</script>
