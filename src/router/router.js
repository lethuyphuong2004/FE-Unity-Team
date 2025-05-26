import { createRouter, createWebHistory } from 'vue-router';
import ComEvent from '../views/Event.vue';
import ComEventDetail from '../views/EventDetail.vue';
import NotFound from '../views/404.vue';

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
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
