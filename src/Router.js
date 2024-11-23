import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignupPage from '@/views/SignupPage.vue';

const routes = [
  { path: '/', name: 'Home', component: MainPage }, 
  { path: '/signup', name: 'Signup', component: SignupPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
