<template>
  <div id="app">
    <ComHeader />
    <main>
      <!-- Thêm route tạm để test -->
      <router-view />
      <div class="test-container" v-if="$route.path === '/test-event'">
        <h2>Test EventItem Component</h2>
        <div class="event-list">
          <EventItem
            title="Sự kiện tháng 6 - Đăng bài hàng tuần"
            :reward="{ type: 'points', value: 100 }"
            dueDate="2024-06-30T23:59:59"
            :joined="true"
            :postId="1"
          />
          
          <EventItem
            title="Thử thách comment tích cực"
            :reward="{ type: 'voucher' }"
            status="done"
            :joined="false"
            :postId="2"
          />
          
          <EventItem
            title="Sự kiện đang tải"
            :reward="{ type: 'points', value: 200 }"
            :loading="true"
          />
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
/* Giữ nguyên style hiện có */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; 
}

main {
  flex: 1;
  width: 100%; 
}

/* Thêm style cho test container */
.test-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>