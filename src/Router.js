import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import SignupPage from '@/views/SignupPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import ContactPage from '@/views/ContactPage.vue';

const isAuthenticated = () => !!localStorage.getItem('authToken'); // Simulate auth check

const routes = [
  { path: '/', name: 'Home', component: MainPage, meta: { requiresAuth: true } },
  { path: '/signup', name: 'Signup', component: SignupPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/contact', name: 'Contact', component: ContactPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;

