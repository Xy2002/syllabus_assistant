import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import i18n from './locale'
import '@/mock'
import '@/api/interceptor'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import './index.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App)

app
  .use(router)
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(ArcoVueIcon)
  .use(i18n)
  .mount('#app')
