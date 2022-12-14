import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Page404 from '../views/Page404.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/:catchAll(.*)',
    name: Page404,
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
