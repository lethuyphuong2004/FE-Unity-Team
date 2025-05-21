<template>
  <div v-if="events.length" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
    <div
      v-for="(event, index) in events"
      :key="index"
      @click="goToDetail(event.id)"
      class="border border-gray-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
    >
      <img
        :src="event.image"
        alt="Event Banner"
        class="w-full max-h-[400px] object-cover rounded-xl mb-4"
      />
      <h2 class="text-2xl font-bold mb-4 text-left text-indigo-700">{{ event.title }}</h2>
      <p class="text-gray-600 text-left">{{ event.description }}</p>
    </div>
  </div>

  <div v-else class="text-center p-8 text-gray-500 font-medium">
    Đang tải dữ liệu sự kiện...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ComEvent',
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      try {
        const response = await axios.get('https://682429e865ba058033991d94.mockapi.io/event_api');
        this.events = response.data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu sự kiện:', error);
      }
    },
    goToDetail(id) {
      this.$router.push(`/event/${id}`);
    },
  },
};
</script>
