import { createRouter, createWebHistory } from 'vue-router';
import ComEvent from '../components/Event.vue';
import ComEventDetail from '../components/EventDetail.vue';

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: ComEvent,
  },
  {
    path: '/event/:id',
    name: 'EventDetail',
    component: ComEventDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
