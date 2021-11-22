import { createApp } from 'vue'
import store from "/store"

import App from './App.vue'

import "/src/assets/scss/index.scss"

const app = createApp(App)
app.use(store)
app.mount("#app")
