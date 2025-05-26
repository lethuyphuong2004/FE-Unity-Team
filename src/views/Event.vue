<template>
  <div v-if="events.length" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
    <div v-for="(event, index) in events" :key="index"
      class="border border-gray-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200">

      <img :src="event.image" alt="Event Banner" class="w-full max-h-[400px] object-cover rounded-xl mb-4"
        @click.stop="goToDetail(event.id)" />

      <h2 class="text-2xl font-bold mb-4 text-left text-indigo-700 dark:text-indigo-300 cursor-pointer"
        @click.stop="goToDetail(event.id)">
        {{ event.title }}
      </h2>

      <p class="text-gray-600 dark:text-gray-300 text-left mb-4 line-clamp-4 cursor-pointer"
        @click.stop="goToDetail(event.id)">
        {{ event.description }}
      </p>

      <span @click.stop="goToDetail(event.id)"
        class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
        More Details
      </span>
    </div>
  </div>

  <div v-else class="text-center p-8 text-gray-500 font-medium">
    Loading...
  </div>
</template>

<script>
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
        const response = await fetch('https://682429e865ba058033991d94.mockapi.io/event_api');
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.events = data;
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

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
