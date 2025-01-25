import { createApp } from 'vue'
import pinia from "/@/stores";
import App from '/@/App.vue'
import ElementPlus from 'element-plus';
import router from "/@/router";
import '/@/style/index.scss';
import other from '/@/utils/other';
import { directive } from "/@/directive";

const app = createApp(App);
directive(app);
other.elSvg(app);
app.use(ElementPlus).use(pinia).use(router).mount('#app');
