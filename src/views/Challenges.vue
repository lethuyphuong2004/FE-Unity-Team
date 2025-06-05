<!-- src/views/Challenges.vue -->
<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-xl font-bold mb-4">Let's comment on posts to level up</h3>
    <div class="post-list  mb-10">
      <PostItem 
          :post="{
            id: 1,
            title: 'Tran Nguyen Gia Huy 221403 find a lover for rest of life',
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
            title: 'Thien An writes an open letter to Jack and their daughter Sol.',
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
            title: 'Ronaldo nets his 937th career goal.',
            author: 'Community Team',
            reward: { type: 'points', value: 50 },
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
        title="Event at Ho Chi Minh City"
        :reward="{ type: 'points', value: 100 }"
        dueDate="2024-06-30T23:59:59"
        :joined="false"
        :ticketPurchased="false"
        location="Ho Chi Minh City Youth Cultural House"
        :postId="1"
      />

      <EventItem
        title="Event ..."
        :reward="{ type: 'voucher' }"
        status="done"
        :joined="true"
        :postId="2"
      />
      <EventItem
        title="Event...."
        :reward="{ type: 'voucher' }"
        status="done"
        :joined="true"
        :postId="3"
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
