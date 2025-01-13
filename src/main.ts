import { createApp } from 'vue'
import '/@/style.css'
import pinia from "/@/stores";
import App from '/@/App.vue'
import ElementPlus from 'element-plus';

createApp(App).use(ElementPlus).use(pinia).mount('#app')
