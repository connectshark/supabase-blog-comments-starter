import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
  .use(autoAnimatePlugin)
  .use(router)
  .mount('#app')
