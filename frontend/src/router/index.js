import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapComponent from '../components/MapComponent.vue'
import SavedRoutesView from '../views/SavedRoutes.vue' // Правильный путь

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/map',
    name: 'map',
    component: MapComponent
  },
  {
    path: '/saved',
    name: 'saved',
    component: SavedRoutesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
