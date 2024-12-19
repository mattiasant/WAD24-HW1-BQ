import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import AddPost from '../views/AddPost.vue'
import PostPage from '../views/PostPage.vue'
import ContactUs from '../views/ContactUs.vue'
import LoginPage from '../views/LoginPage.vue'
import SignupPage from '../views/SignupPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost,
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage
  },
  {
    path: '/contact-us', // Route for the Contact Us page
    name: 'ContactUsPage',
    component: ContactUs
  },
  {
    path: '/login', // Route for the Contact Us page
    name: 'LoginPage',
    component: LoginPage
  },

  {
    path: '/post',
    name: 'PostPage',
    component: PostPage,
    meta: { requiresAuth: true }
  }

];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
      next('/login');
  } else {
      next();
  }
});

export default router
