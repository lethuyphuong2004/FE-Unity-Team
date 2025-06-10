<template>
  <div v-if="event" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
    <div class="overflow-hidden rounded-xl">
      <img :src="event.cover_image_url" :alt="event.title"
        class="w-full max-h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-105" />
    </div>
    <h1 class="text-3xl font-bold text-left dark:text-white">{{ event.name }}</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 text-left">{{ event.description }}</p>

    <!-- Responsive Button -->
    <div class="mt-4">
      <button
        @click="$router.push('/')"
        class="w-full sm:w-auto flex justify-center sm:inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        <font-awesome-icon icon="arrow-left" />
        Back
      </button>
    </div>
  </div>

  <div v-else class="text-center p-8 text-gray-500 dark:text-gray-300 font-medium">
    Loading...
  </div>
</template>



<script>
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
        const response = await fetch(`https://virtserver.swaggerhub.com/yuu-e71/event-api/1.0.0/events/${id}`);
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.event = data;
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sự kiện:', error);
      }
    },
  },
};
</script>
