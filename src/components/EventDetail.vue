<template>
  <div v-if="event" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
    <div class="overflow-hidden rounded-xl">
      <img
        :src="event.image"
        alt="Event Banner"
        class="w-full max-h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
      />
    </div>
    <h1 class="text-3xl font-bold text-left">{{ event.title }}</h1>
    <p class="text-lg text-gray-600 text-left">{{ event.description }}</p>
    <button
      @click="$router.push('/')"
      class="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
    >
      <i class="fas fa-arrow-left"></i> Quay lại danh sách
    </button>
  </div>

  <div v-else class="text-center p-8 text-gray-500 font-medium">
    Đang tải chi tiết sự kiện...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ComEventDetail',
  data() {
    return {
      event: null,
    };
  },
  mounted() {
    this.fetchEventDetail();
  },
  methods: {
    async fetchEventDetail() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`https://682429e865ba058033991d94.mockapi.io/event_api/${id}`);
        this.event = response.data;
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sự kiện:', error);
      }
    },
  },
};
</script>
