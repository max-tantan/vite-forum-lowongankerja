import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { useAuth } from './composables/useAuth'
import './style.css'

const { ensureAccounts } = useAuth()
ensureAccounts()

const app = createApp(App)
app.use(router)
app.mount('#app')
