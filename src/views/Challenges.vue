<!-- src/views/Challenges.vue -->
<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-xl font-bold mb-4">Let's comment on posts to level up</h3>
    <div class="post-list  mb-10">
      <PostItem 
          :post="{
            id: 1,
            title: 'Leave meaningful comments on 10 different posts to earn points and level up',
            author: 'Đức',
            reward: { type: 'points', value: 100 },
            createdAt: new Date().toISOString(),
            excerpt: 'Post excerpt goes here...',
            joined: true,
            tags: ['commenting', 'engagement']
          }"
        />
        <PostItem 
          :post="{   
            id: 2,
            title: 'Leave meaningful comments on 5 different posts to earn points and level up',
            author: 'Community Team',
            reward: { type: 'points', value: 50 },
            createdAt: new Date().toISOString(),
            excerpt: 'Post excerpt goes here...',
            joined: false,
            tags: ['commenting', 'engagement']
          }"
        />
    </div>
    <h3 class="text-xl font-bold mb-4">Join exciting events to gain experience</h3>
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
import PostItem from '../components/PostItem.vue'

export default {
  name: 'Challenges',
  components: {
    EventItem,
    PostItem
  }
};
</script>
