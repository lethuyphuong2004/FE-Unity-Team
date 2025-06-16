<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Let’s comment on posts to level up</h3>

    <div class="post-list mb-10">
      <!-- Loading: hiện nhiều skeleton -->
      <template v-if="isLoadingComments">
        <PostItem v-for="n in 3" :key="'skeleton-comment-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="commentError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <PostItem
        v-else
        v-for="(challenge, index) in commentChallenges"
        :key="challenge.post_challenge_id || index"
        :post="mapCommentToPost(challenge)"
      />
    </div>

    <h3 class="text-lg font-semibold mb-4 text-gray-700">Join exciting events to gain experience</h3>

    <div class="event-list space-y-4">
      <!-- Loading: nhiều skeleton -->
      <template v-if="isLoadingEvents">
        <EventItem v-for="n in 2" :key="'skeleton-event-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="eventError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <EventItem
        v-else
        v-for="(eventChallenge, index) in eventChallenges"
        :key="eventChallenge.post_challenge_id || index"
        :title="eventChallenge.event?.ten_events"
        :reward="{ type: 'points', value: eventChallenge.points_reward }"
        :dueDate="eventChallenge.event?.ends_at"
        :joined="eventChallenge.event?.current_attendees > 0"
        :ticketPurchased="false"
        :location="eventChallenge.event?.in_person_location"
        :postId="eventChallenge.event?.event_id || index + 1"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { fetchCommentChallenges } from '../services/apiService';

export default {
  name: 'Challenges',
  components: {
    PostItem: defineAsyncComponent(() => import('../components/Post_Challenge.vue')),
    EventItem: defineAsyncComponent(() => import('../components/Event_Challenge.vue')),
  },
  data() {
    return {
      commentChallenges: [],
      eventChallenges: [],
      isLoadingComments: true,
      isLoadingEvents: true,
      commentError: null,
      eventError: null,
    };
  },
  created() {
    this.loadAllChallenges();
  },
  methods: {
    async loadAllChallenges() {
      this.isLoadingComments = true;
      this.isLoadingEvents = true;
      try {
        const res = await fetchCommentChallenges();

        // Mapping & sort comment challenges
        const mappedComments = res
          .filter(item => item.type === 'comment')
          .map(challenge => this.mapCommentToPost(challenge))
          .sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? 1 : -1)); // chưa tham gia lên trước

        this.commentChallenges = mappedComments;

        // Event challenges giữ nguyên
        this.eventChallenges = res.filter(item => item.type === 'event');
      } catch (err) {
        this.commentError = true;
        this.eventError = true;
      } finally {
        this.isLoadingComments = false;
        this.isLoadingEvents = false;
      }
    },
    mapCommentToPost(challenge) {
      const post = challenge.post;
      return {
        id: post.post_id,
        title: post.ten_posts || `Comment Challenge #${challenge.post_challenge_id}`,
        author: post.user_name || 'Unknown',
        reward: { type: 'points', value: challenge.points_reward },
        createdAt: post.created_at,
        joined: false, // mặc định chưa tham gia
        requiresComment: true,
        commented: false,
        url: post.url,
        avatar: post.user_avatar_url,
        tags: post.tags || [],
        excerpt: post.excerpt || '',
        status: post.status || '',
        dueDate: post.ends_at || ''
      };
    }
  },
};
</script>
