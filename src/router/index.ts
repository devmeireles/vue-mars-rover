import { createRouter, createWebHistory } from 'vue-router'
import RoverView from '@/views/RoverView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RoverView
    },
  ]
})

export default router
