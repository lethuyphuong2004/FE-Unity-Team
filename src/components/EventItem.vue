<template>
  <div class="challenge-card">
    <span class="challenge-title">{{ event.ten_events }}</span>
    <div class="challenge-meta">
      <span class="starts_at">{{ formatDate(event.starts_at) }}</span>
      <span class="ends_at">{{ formatDate(event.ends_at) }}</span>
      <span class="price">{{ event.price }}</span>
      <span class="location">{{ event.location_URL }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  event: {
    type: Object,
    required: true
  }
});
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
</script>

<style scoped>
.challenge-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F3F4F6;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

.challenge-title {
  color: #374151;
}

.challenge-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.starts_at, .ends_at, .location {
  padding: 0.25rem 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}
</style>