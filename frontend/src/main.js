import './assets/main.css'
import Notifications from '@kyvg/vue3-notification'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(Notifications)

app.mount('#app')
