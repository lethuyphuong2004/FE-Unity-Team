<template>
  <div class="challenge-wrapper">
    <!-- Navigation -->
    <nav class="nav-wrapper">
      <router-link to="/" class="nav-button">Home</router-link>
      <router-link to="/about" class="nav-button">About</router-link>
      <router-link to="/challenges" class="nav-button active">Challenges</router-link>
    </nav>

    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <template v-else>
      <!-- Weekly Challenges -->
      <section class="section-wrapper">
        <h2 class="section-title">Post</h2>
        <div class="challenge-list">
          <PostItem
            v-for="(challenge, index) in weeklyChallenges"
            :key="'weekly-' + index"
            :post="challenge"
            class="challenge-item"
          />
        </div>
      </section>

      <!-- All Challenges -->
      <section class="section-wrapper">
        <h2 class="section-title">Event</h2>
        <div class="challenge-list">
          <EventItem
            v-for="(challenge, index) in allChallenges"
            :key="'all-' + index"
            :event="challenge"
            class="challenge-item"
          />
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../composables/api';
import PostItem from '../components/PostItem.vue';
import EventItem from '../components/EventItem.vue';

const weeklyChallenges = ref([]);
const allChallenges = ref([]);
const isLoading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const [posts, events] = await Promise.all([
      api.getPosts(),
      api.getEvents()
    ]);
    
    weeklyChallenges.value = posts.slice(0, 3);
    allChallenges.value = events;
  } catch (err) {
    error.value = 'Failed to load data. Please try again later.';
    // Fallback to mock data
    weeklyChallenges.value = mockPosts.slice(0, 3);
    allChallenges.value = mockEvents;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* Add these new styles */
.loading, .error {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 0.75rem;
  margin: 2rem 0;
}

.error {
  color: #ef4444;
}
.challenge-wrapper {
  padding: 2rem;
  background-color: #f3f4f6;
  min-height: 100vh;
}

.nav-wrapper {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background-color: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-button {
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #374151;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-button:hover {
  background-color: #f9fafb;
  border-color: #d1d5db;
}

.nav-button.active {
  background-color: #ef4444;
  color: white;
  border-color: #ef4444;
}

.section-wrapper {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-title {
  color: #111827;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
}

.challenge-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.challenge-item {
  transition: transform 0.2s;
}

.challenge-item:hover {
  transform: translateY(-2px);
}

.challenge-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
}

.challenge-title {
  color: #111827;
  font-weight: 500;
}

.challenge-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.date, .reward {
  padding: 0.5rem 1rem;
  background-color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  border: 1px solid #e5e7eb;
}
</style>
