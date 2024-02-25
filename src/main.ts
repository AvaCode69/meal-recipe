import BaseSpinner from './components/ui/BaseSpinner.vue'
import BaseCard from './components/ui/BaseCard.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.css'

import App from './App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('base-card', BaseCard)
app.component('base-spinner', BaseSpinner)

app.mount('#app')
