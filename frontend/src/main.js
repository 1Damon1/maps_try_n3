import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ymapLoader } from 'vue-yandex-maps'

// Настройки Яндекс.Карт
ymapLoader.settings({
  apiKey: process.env.VUE_APP_YMAPS_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
