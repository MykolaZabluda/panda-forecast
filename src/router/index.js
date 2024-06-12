import { createRouter, createWebHashHistory } from 'vue-router'
import StartPageView from '../views/StartPageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartPageView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
