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
    <p class="text-gray-500 animate-pulse text-sm sm:text-base">Đang tải thông tin người dùng...</p>
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

    <!-- Level -->
    <div>
      <p
        class="inline-block px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 text-xs sm:text-sm font-semibold text-green-800 bg-green-100 rounded-full shadow-sm"
      >
         Level: {{ user.level }}
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
        <span class="font-medium text-gray-700">🌍 Địa điểm:</span>
        {{ user.location || 'Không rõ' }}
      </p>
      <p>
        <span class="font-medium text-gray-700">🕒 Tham gia:</span>
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
        level: 'Member'
      },
      loading: true,
      error: null
    };
  },
  methods: {
    formatDate(dateString) {
      if(!dateString) return 'Không rõ';
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
    const userID = this.$route.params.id;
    try {
      const response = await fetch(`https://virtserver.swaggerhub.com/404-aaa/API_USER/1.0.0/${userID}`);
      if(!response.ok){
        throw new Error(`HTTP error! Status : ${response.status}`);
      }
      const result = await response.json();

      // nếu response rỗng hoặc không có dữ liệu cần
      if(!result || !result.data){
        throw new Error('Dữ liệu người dùng trống hoặc không hợp lệ');
      }
      
      const data = result.data;

      this.user = {
        memberID: data.community_member_id || '',
        name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'Unknown',
        avtURL: data.avatar_url && data.avatar_url !== 'string' ? data.avatar_url: 'https://i.pinimg.com/736x/f7/cf/ff/f7cfff1b6a2188e086c497c832b909cb.jpg' ,
        createdAt: data.created_at || '',
        location: data.location || 'Chưa cập nhật',
        headline: data.description || 'Headline không có sẵn',
        level: data.current_level_name || 'Chưa cập nhật'
      }

     
      this.loading = false;

    } catch (error) {
      this.error = `Không thể tải thông tin người dùng: ${error.message}`;
      this.loading = false;
      console.error('Lỗi khi fetch user: ', error);
    }
  }

  // async created() {
  //   try {
  //     const response = await fetch('/about.json');
  //     console.log('Response status:', response.status);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const text = await response.text();
  //     console.log('Response text:', text);
  //     const data = JSON.parse(text);
  //     console.log('Parsed data:', data);
  //     this.user = data[0];
  //     this.loading = false;
  //   } catch (err) {
  //     this.error = `Không thể tải thông tin người dùng: ${err.message}`;
  //     this.loading = false;
  //     console.error('Lỗi:', err);
  //   }
  // }
};
</script>

<style scoped>

</style>