import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Toast from 'vue-toastification'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'

import './assets/index.css'
import './utils/zodLocale'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
  })
  .use(Toast)

router.isReady().then(() => {
  app.mount('#app')
})
