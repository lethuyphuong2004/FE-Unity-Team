<template>
  <div id="app" class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
    <ComHeader />
    <main class="flex-1 w-full text-gray-900 dark:text-white">
      <!-- Thêm route tạm để test -->
      <router-view />
      <div class="test-container" v-if="$route.path === '/test-event'">
        <h2>Test EventItem Component</h2>
        <div class="event-list">
          <EventItem title="Sự kiện tháng 6 - Đăng bài hàng tuần" :reward="{ type: 'points', value: 100 }"
            dueDate="2024-06-30T23:59:59" :joined="true" :postId="1" />

          <EventItem title="Thử thách comment tích cực" :reward="{ type: 'voucher' }" status="done" :joined="false"
            :postId="2" />

          <EventItem title="Sự kiện đang tải" :reward="{ type: 'points', value: 200 }" :loading="true" />
        </div>
      </div>
    </main>
    <ComFooter />
  </div>
</template>

<script>
import ComHeader from './components/ComHeader.vue';
import ComFooter from './components/ComFooter.vue';
import EventItem from './components/EventItem.vue'; 

export default {
  name: 'App',
  components: {
    ComHeader,
    ComFooter,
    EventItem
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  flex: 1;
  width: 100%;
}
</style>
