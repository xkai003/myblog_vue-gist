// src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import axios from 'axios' // 导入 axios

const app = createApp(App)
app.use(router)
app.config.globalProperties.$axios = axios // 全局注册 axios
app.mount('#app')