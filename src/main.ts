import { createApp } from 'vue'
import '/@/style.css'
import pinia from "/@/stores";
import App from '/@/App.vue'
import ElementPlus from 'element-plus';
import router from "/@/router";

const app = createApp(App);

app.use(ElementPlus).use(pinia).use(router).mount('#app');
