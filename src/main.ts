import { createPinia } from 'pinia'
import { createApp } from 'vue'
import vue3GoogleLogin from 'vue3-google-login'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import './utils/zodLocale'

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(vue3GoogleLogin, {
    clientId: '721536480154-rno70blah5lsqdqncbtak8oe4f2shsq4.apps.googleusercontent.com',
  })

router.isReady().then(() => {
  app.mount('#app')
})
