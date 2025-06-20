// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import MapPage from '@/views/MapPage.vue'
import TestPage from '@/views/TestPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/map',
    name: 'MapPage',
    component: MapPage,
  },
  {
    path: '/test',
    name: 'TestPage',
    component: TestPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
