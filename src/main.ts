import { createApp } from 'vue'
import pinia from "/@/stores";
import App from '/@/App.vue'
import ElementPlus from 'element-plus';
import router from "/@/router";
import '/@/style/index.scss';
import other from '/@/utils/other';

const app = createApp(App);
other.elSvg(app);
app.use(ElementPlus).use(pinia).use(router).mount('#app');
