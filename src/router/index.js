import { createRouter, createWebHistory } from 'vue-router';
import ComEvent from '../components/Event.vue';
import ComEventDetail from '../components/EventDetail.vue';
import NotFound from '../components/404.vue';
import PostComment from '@/components/PostCommentPage.vue'
//http://localhost:8080/test-event dùng để test eventitem
//http://localhost:8080/post/1/comment dùng để test post comment
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
  {
    path: '/post/:postId/comment',
    name: 'PostComment',
    component: PostComment,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
