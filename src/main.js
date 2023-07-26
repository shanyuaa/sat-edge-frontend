import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(VueAxios, axios)
app.mount('#app')

axios.defaults.baseURL = 'http://127.0.0.1:5000'