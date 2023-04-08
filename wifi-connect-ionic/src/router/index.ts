import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import WiFiListPage from '../views/WiFiListPage.vue'
import AddWiFiPage from '../views/AddWiFiPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/wifis',
    name: 'WiFiListPage',
    component: WiFiListPage
  },
  {
    path: '/add-wifi',
    name: 'AddWiFiPage',
    component: AddWiFiPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
