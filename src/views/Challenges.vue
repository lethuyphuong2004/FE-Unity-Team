<!-- src/views/Challenges.vue -->
<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challengs For You</h2>
    <div class="event-list space-y-4">
      <EventItem
        title="June Challenge – Post Every Week"
        :reward="{ type: 'points', value: 100 }"
        dueDate="2024-06-30T23:59:59"
        :joined="true"
        :postId="1"
      />

      <EventItem
        title="Positive Comment Challenge"
        :reward="{ type: 'voucher' }"
        status="done"
        :joined="false"
        :postId="2"
      />

      <EventItem
        title="Loading...."
        :reward="{ type: 'points', value: 200 }"
        :loading="true"
      />
    </div>
  </div>
</template>

<script>
import EventItem from '../components/EventItem.vue';

export default {
  name: 'Challenges',
  components: {
    EventItem
  }
};
</script>
