import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import router from './router/router'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/dist/quasar.css'

createApp(App).use(createPinia()).use(Quasar, {plugins:{}}).use(router).mount('#app')
