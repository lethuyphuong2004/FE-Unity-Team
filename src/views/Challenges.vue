<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>

    <!-- Comment Challenges -->
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Let’s comment on posts to level up</h3>
    <div class="post-list mb-10">
      <p v-if="isLoadingComments" class="text-gray-500">Loading comment challenges...</p>
      <p v-else-if="commentError" class="text-red-500">{{ commentError }}</p>
      <template v-else>
        <PostItem
          v-for="(post, index) in mappedCommentPosts"
          :key="post.event_id || index"
          :post="post"
        />
        <p v-if="mappedCommentPosts.length === 0" class="text-gray-500">No comment challenges available.</p>
      </template>
    </div>

    <!-- Event Challenges -->
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Join exciting events to gain experience</h3>
    <div class="event-list space-y-4">
      <template v-if="isLoadingEvents">
        <EventItem
          v-for="n in 2"
          :key="'loading-' + n"
          title="Loading..."
          :reward="{ type: 'points', value: 200 }"
          :loading="true"
        />
      </template>

      <p v-else-if="eventError" class="text-red-500">{{ eventError }}</p>

      <template v-else>
        <EventItem
          v-for="(event, index) in events"
          :key="event.event_id || event.event_id || index"
          :title="event.ten_events"
          :reward="{ type: 'points', value: 100 }"
          :dueDate="event.ends_at"
          :joined="event.current_attendees > 0"
          :ticketPurchased="false"
          :location="event.in_persion_location"
          :postId="event.post_id || index + 1"
        />
        <p v-if="events.length === 0" class="text-gray-500">No events available at the moment.</p>
      </template>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { fetchCommentChallenges, fetchEvents } from '../services/challengeService';

export default {
  name: 'Challenges',
  components: {
    PostItem: defineAsyncComponent(() => import('../components/PostItem.vue')),
    EventItem: defineAsyncComponent(() => import('../components/EventItem.vue')),
  },
  data() {
    return {
      events: [],
      commentChallenges: [],
      isLoadingEvents: true,
      isLoadingComments: true,
      eventError: null,
      commentError: null,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.isLoadingComments = true;
      this.isLoadingEvents = true;
      try {
        const [commentRes, eventRes] = await Promise.all([
          fetchCommentChallenges(),
          fetchEvents(),
        ]);
        this.commentChallenges = commentRes;
        this.events = eventRes;
      } catch (err) {
        this.commentError = 'Failed to load comment challenges';
        this.eventError = 'Failed to load events';
      } finally {
        this.isLoadingComments = false;
        this.isLoadingEvents = false;
      }
    },
    mapCommentToPost(post) {
      return {
        id: post.post_id,
        title: `Comment Challenge #${post.event_id}`,
        author: 'Community',
        reward: { type: 'points', value: post.points_reward },
        createdAt: post.created_at,
        excerpt: 'You need to comment on this post to complete the challenge.',
        joined: true,
        requiresComment: true,
        commented: false,
        tags: ['commenting'],
      };
    },
  },
  computed: {
    mappedCommentPosts() {
      return this.commentChallenges.map(this.mapCommentToPost);
    },
  },
};
</script>
