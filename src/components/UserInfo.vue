<template>
  <!-- Hiển thị lỗi -->
  <div
    v-if="error"
    class="max-w-full sm:max-w-md mx-auto mt-6 p-4 sm:p-6 bg-red-100 border border-red-300 rounded-xl text-center shadow"
  >
    <p class="text-red-700 font-medium text-sm sm:text-base">{{ error }}</p>
  </div>

  <!-- Đang tải -->
  <div
    v-else-if="loading"
    class="max-w-full sm:max-w-md mx-auto mt-6 p-4 sm:p-6 bg-white border border-gray-200 rounded-xl text-center shadow"
  >
    <p class="text-gray-500 animate-pulse text-sm sm:text-base">Loading user info...</p>
  </div>

  <!-- Nội dung chính -->
  <div
    v-else
    class="max-w-full sm:max-w-lg lg:max-w-xl mx-auto mt-6 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-xl text-center space-y-4 sm:space-y-6 bg-gradient-to-br from-white via-green-50 to-white border border-gray-200"
  >
    <!-- Avatar -->
    <div class="flex justify-center">
      <div class="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 rounded-full overflow-hidden border-4 border-green-500 shadow-md">
        <img
          :src="user.avtURL"
          @error="handleImageError"
          alt="Avatar người dùng"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>

    <!-- Vai trò -->
    <div>
      <p
        class="inline-block px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-green-800 bg-green-100 rounded-full shadow-sm"
      >
        🧑‍💼 Role: {{ user.role }}
      </p>
    </div>

    <!-- Tên & headline -->
    <div>
      <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 truncate">{{ user.name }}</h2>
      <p class="text-gray-500 mt-1 italic text-sm sm:text-base line-clamp-2">{{ user.headline }}</p>
    </div>

    <!-- Location & Ngày tham gia -->
    <div class="text-sm sm:text-base text-gray-500 space-y-1">
      <p>
        <span class="font-medium text-gray-700">🌍 Location:</span>
        {{ user.location || 'Không rõ' }}
      </p>
      <p>
        <span class="font-medium text-gray-700">🕒 Joined:</span>
        {{ formatDate(user.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      user: {
        memberID: '',
        name: 'Unknown',
        avtURL: 'https://i.pravatar.cc/300',
        createdAt: '',
        location: '',
        headline: 'No headline available',
        role: 'Member'
      },
      loading: true,
      error: null
    };
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/300';
    }
  },
  async created() {
    try {
      const response = await fetch('/about.json');
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const text = await response.text();
      console.log('Response text:', text);
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
      this.user = data[0];
      this.loading = false;
    } catch (err) {
      this.error = `Failed to load user data: ${err.message}`;
      this.loading = false;
      console.error('Error:', err);
    }
  }
};
</script>

<style scoped>

</style>