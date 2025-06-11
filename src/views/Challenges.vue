<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-xl font-bold mb-4">Let's comment on posts to level up</h3>

    <div class="post-list mb-10">
      <!-- Các Post mẫu (giữ nguyên như bạn đã có) -->
      <PostItem 
        :post="{
          id: 1,
          title: 'Titile Post 1',
          author: 'Đức',
          reward: { type: 'points', value: 100 },
          createdAt: new Date().toISOString(),
          excerpt: 'Post excerpt goes here...',
          joined: true,
          requiresComment: true,
          commented: false,
          tags: ['commenting', 'engagement']
        }"
      />
      <PostItem 
        :post="{
          id: 2,
          title: 'Titile Post 2',
          author: 'Community Team',
          reward: { type: 'points', value: 50 },
          createdAt: new Date().toISOString(),
          excerpt: 'Post excerpt goes here...',
          joined: false,
          requiresComment: false,
          commented: false,
          tags: ['commenting', 'engagement']
        }"
      />
      <PostItem 
        :post="{
          id: 3,
          title: 'Titile Post 3',
          author: 'Community Team',
          reward: { type: 'points', value: 100 },
          createdAt: new Date().toISOString(),
          excerpt: 'Post excerpt goes here...',
          joined: true,
          requiresComment: true,
          commented: true,
          tags: ['commenting', 'engagement']
        }"
      />
    </div>

    <h3 class="text-xl font-bold mb-4">Join exciting events to gain experience</h3>
    <div class="event-list space-y-4">
      <EventItem
        v-if="loading"
        title="Loading..."
        :reward="{ type: 'points', value: 200 }"
        :loading="true"
      />
      <template v-else-if="error">
        <p class="text-red-500">{{ error }}</p>
      </template>
      <template v-else>
        <EventItem
          v-for="(event, index) in events"
          :key="event.id || index"
          :title="event.name"
          :reward="{ type: 'points', value: 100 }"
          :dueDate="event.ends_at"
          :joined="event.current_attendees > 0"
          :ticketPurchased="false"
          :location="event.in_persion_location"
          :postId="index + 1"
        />
      </template>
    </div>
  </div>
</template>

<script>
import EventItem from '../components/EventItem.vue';
import PostItem from '../components/PostItem.vue';

export default {
  name: 'Challenges',
  components: {
    EventItem,
    PostItem
  },
  data() {
    return {
      events: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch('https://virtserver.swaggerhub.com/yuu-e71/event-api/1.0.0/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        this.events = Array.isArray(data) ? data : (data.events || []);
      } catch (err) {
        this.error = err.message;
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
