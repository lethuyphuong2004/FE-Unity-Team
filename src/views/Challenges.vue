<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-xl font-bold mb-4">Let's comment on posts to level up</h3>

    <div class="post-list mb-10">
      <template v-if="loadingComments">
        <p>Đang tải các thử thách bình luận...</p>
      </template>
      <template v-else-if="commentError">
        <p class="text-red-500">{{ commentError }}</p>
      </template>
      <template v-else>
        <PostItem v-for="(post, index) in commentChallenges" :key="post.id || index" :post="{
          id: post.post_id,
          title: 'Comment Challenge #' + post.id,
          author: 'Community',
          reward: { type: 'points', value: post.points_reward },
          createdAt: post.created_at,
          excerpt: 'You need to comment on this post to complete the challenge.',
          joined: true,
          requiresComment: true,
          commented: false,
          tags: ['commenting']
        }" />
      </template>
    </div>


    <h3 class="text-xl font-bold mb-4">Join exciting events to gain experience</h3>
    <div class="event-list space-y-4">
      <EventItem v-if="loading" title="Loading..." :reward="{ type: 'points', value: 200 }" :loading="true" />
      <template v-else-if="error">
        <p class="text-red-500">{{ error }}</p>
      </template>
      <template v-else>
        <EventItem v-for="(event, index) in events" :key="event.id || index" :title="event.name"
          :reward="{ type: 'points', value: 100 }" :dueDate="event.ends_at" :joined="event.current_attendees > 0"
          :ticketPurchased="false" :location="event.in_persion_location" :postId="index + 1" />
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
      commentChallenges: [],
      loading: true,
      loadingComments: true,
      error: null,
      commentError: null
    };
  },
  created() {
    this.fetchEvents();
    this.fetchCommentChallenges();
  },
  methods: {
    async fetchCommentChallenges() {
      try {
        const response = await fetch(
          'https://virtserver.swaggerhub.com/copilothub/challenges123456789/1.0.0/api/challenges'
        );
        if (!response.ok) throw new Error('Không tải được thử thách comment');
        const result = await response.json();
        this.commentChallenges = (result.data || []).filter(ch => ch.type === 'comment');
      } catch (err) {
        this.commentError = err.message;
        console.error(err);
      } finally {
        this.loadingComments = false;
      }
    },
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
