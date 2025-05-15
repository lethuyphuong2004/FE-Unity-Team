import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/home.vue';
import Profile from '../views/profile.vue';
import Auth from '../views/auth.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/auth', name: 'Profile', component: Auth },
];

// Create router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
  