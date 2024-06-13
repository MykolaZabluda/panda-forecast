import { createRouter, createWebHashHistory } from 'vue-router'
import StartPageView from '../views/StartPageView.vue'
import FavoritePageView from "@/views/FavoritePageView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartPageView
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: FavoritePageView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
