<template>
  <div class="min-h-screen bg-gray-50 py-8 font-sans">
    <div class="container mx-auto px-4 max-w-5xl">
      <h2 class="text-3xl font-bold text-gray-800 mb-8">Upcoming Events</h2>

      <div v-if="error" class="text-red-600 bg-red-100 p-4 rounded-lg">
        {{ error }}
      </div>

      <div v-else-if="loading" class="text-gray-600 text-center py-4">
        Đang tải danh sách sự kiện...
      </div>

      <div v-else class="flex flex-col gap-8">
        <div v-for="event in events" :key="event.id"
          class="border border-gray-300 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg shadow-md p-6">
          <!-- CARD HIỆN TẠI -->
          <img :src="event.cover_image_url" alt="Event Banner"
            class="w-full max-h-[400px] object-cover rounded-xl mb-4" @click.stop="goToDetail(event.id)" />

          <h2 class="text-2xl font-bold mb-4 text-left text-indigo-700 dark:text-indigo-300 cursor-pointer"
            @click.stop="goToDetail(event.id)">
            {{ event.name }}
          </h2>

          <p class="text-gray-600 dark:text-gray-300 text-left mb-4 line-clamp-4 cursor-pointer"
            @click.stop="goToDetail(event.id)">
            {{ event.description }}
          </p>

          <span @click.stop="goToDetail(event.id)"
            class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
            More Details
          </span>

          <!-- COMPONENT CŨ CHÈN DƯỚI -->
          <div class="mt-8">
            <Event1Card :id="event.id" :day="getDay(event.starts_at)" :month="getMonth(event.starts_at)"
              :title="event.name" :time="formatDateRange(event.starts_at, event.ends_at)" :price="event.price"
              :location="event.in_persion_location" :address="event.address" :mapUrl="event.location_URL"
              :mapImage="event.cover_image_url" :organizer="event.host" :description="event.description"
              :maxParticipants="event.max_attendees" :currentParticipants="event.current_attendees"
              :status="event.status === 'upcoming' ? 'open' : 'closed'" />
            <Event1Layout>
              <Event1List :events="[event]" />
            </Event1Layout>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Event1Card from '../components/Event1Card.vue';
import Event1List from '../components/Event1List.vue';
import Event1Layout from '../components/Event1Layout.vue';

export default {
  name: 'ComEvent',
  components: {
    Event1Card,
    Event1List,
    Event1Layout,
  },
  data() {
    return {
      events: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      try {
        const response = await fetch('https://virtserver.swaggerhub.com/yuu-e71/event-api/1.0.0/events');
        if (!response.ok) throw new Error('Không thể tải dữ liệu sự kiện.');
        this.events = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatDateRange(start, end) {
      return `${start} → ${end}`;
    },
    getDay(dateStr) {
      return new Date(dateStr).getDate();
    },
    getMonth(dateStr) {
      return new Date(dateStr).toLocaleDateString('vi-VN', { month: 'short' });
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
