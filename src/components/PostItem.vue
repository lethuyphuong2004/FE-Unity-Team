<template>
  <div class="challenge-card">
    <span class="challenge-title">{{ post.title }}</span>
    <div class="challenge-meta">
      <span class="date">{{ formatDate(post.due_date) }}</span>
      <span class="reward">{{ post.points_reward }} points</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: {
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

.date, .reward {
  padding: 0.25rem 0.75rem;
  background-color: white;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
}
</style>