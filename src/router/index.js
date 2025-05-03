import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import AddPostPage from '@/views/AddPostPage.vue'
import { sessionStore } from '@/stores/session'
import AboutPage from '@/views/AboutPage.vue'
import ContactPage from '@/views/ContactPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import LoginPage from '@/views/LoginPage.vue'
import NotFound from '@/views/NotFound.vue'
import AuthCallback from '@/views/AuthCallback.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'AboutPage',
      component: AboutPage,
    },
    {
      path: '/contact',
      name: 'ContactPage',
      component: ContactPage,
    },
    {
      path: '/user/new',
      name: 'SignUpPage',
      component: SignUpPage,
    },
    {
      path: '/auth/login',
      name: 'LogInPage',
      component: LoginPage,
    },
    {
      path: '/api/post/new',
      name: 'AddPostPage',
      component: AddPostPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/post/:emp',
      name: 'SinglePostPage',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SinglePostPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/:emp',
      name: 'ProfilePage',
      component: () => import('../views/ProfilePage.vue'),
    },
    {
      path: '/search',
      name: 'SearchPage',
      component: () => import('../views/SearchPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/post/update/:emp',
      name: 'UpdatePostPage',
      component: () => import('../views/UpdatePostPage.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login-success?token',
      name: 'AuthCallback',
      component: AuthCallback,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to) => {
  const session = sessionStore()
  await session.fetchSession()
  if (to.meta.requiresAuth && !session.login) {
    return '/'
  }
})

export default router
