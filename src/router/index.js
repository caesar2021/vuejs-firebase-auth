import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/authenticated',
      name: 'authenticated',
      component: () => import('@/views/Authenticated.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from) => {
  const session = useSessionStore();

  const { isAuthenticated } = session;

  if( to.meta.guestOnly && isAuthenticated ){
    return { name: 'home' }
  }

  if(to.meta.requiresAuth && ! isAuthenticated){
    return { name: 'login', query: { redirect: to.fullPath }}
  }

})

export default router
