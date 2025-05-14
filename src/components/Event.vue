<template>
  <div v-if="events.length" class="event-list">
    <div
      class="event-container"
      v-for="(event, index) in events"
      :key="index"
    >
      <img :src="event.image" alt="Event Banner" class="event-image" />
      <h2 class="event-title">{{ event.title }}</h2>
      <p class="event-description">{{ event.description }}</p>
    </div>
  </div>

  <div v-else class="loading">
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
        const response = await axios.get(
          'https://682429e865ba058033991d94.mockapi.io/event_api'
        );
        this.events = response.data;
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu sự kiện:', error);
      }
    },
  },
};
</script>

<style scoped>
.event-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
}

.event-container {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
}

.event-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.event-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

.event-description {
  font-size: 1rem;
  color: #555;
  text-align: left;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: gray;
}
</style>
