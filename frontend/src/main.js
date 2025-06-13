import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueYandexMaps from 'vue-yandex-maps'

// Конфигурация Яндекс.Карт
const yandexMapsConfig = {
  apiKey: process.env.VUE_APP_YMAPS_KEY,
  lang: 'ru_RU',
  version: '2.1',
  coordorder: 'latlong'
}

const app = createApp(App)

// Инициализация плагина
app.use(VueYandexMaps, yandexMapsConfig)
app.use(store)
app.use(router)
app.mount('#app')
