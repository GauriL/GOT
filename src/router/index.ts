import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/houses',
      name: 'houses',
      component: () => import('../views/HousesView.vue')
    },
    {
      path: '/persons',
      name: 'persons',
      component: () => import('../views/PersonsView.vue')
    },
    {
      path: '/quotes',
      name: 'quotes',
      component: () => import('../views/QuotesView.vue')
    },
    {
      path: '/house/:slug',
      name: 'house-profile',
      component: () => import('../views/HouseProfile.vue')
    },
    {
      path: '/person/:slug',
      name: 'person-profile',
      component: () => import('../views/PersonProfiles.vue')
    },
  ]
})

export default router
