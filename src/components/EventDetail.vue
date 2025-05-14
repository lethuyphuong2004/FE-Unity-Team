<template>
  <div v-if="event" class="event-detail">
    <div class="event-image-container">
      <img
        :src="event.image"
        alt="Event Banner"
        class="event-image"
      />
    </div>
    <h1 class="event-title">{{ event.title }}</h1>
    <p class="event-description">{{ event.description }}</p>
    <button
      @click="$router.push('/')"
      class="back-button"
    >
      <i class="fas fa-arrow-left"></i> Quay lại danh sách
    </button>
  </div>

  <div v-else class="loading">
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

<style scoped>
.event-detail {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  margin: auto;
  padding: 1rem;
  font-family: sans-serif;
}

.event-image-container {
  overflow: hidden;
  border-radius: 10px;
}

.event-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s;
}

.event-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: left;
}

.event-description {
  font-size: 1.2rem;
  color: #555;
  text-align: left;
}

.back-button {
  margin-top: 1rem;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #006eff;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #0008ff;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: gray;
}
</style>
