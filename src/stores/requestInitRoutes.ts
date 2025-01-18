import {defineStore} from "pinia";
/**
 * 后端返回原始路由(未处理时)
 * @methods setCacheKeepAlive 设置接口原始路由数据
 */
export const useRequestInitRoutes = defineStore('requestInitRoutes', {
    state: (): RequestInitRoutes => {
        return {
            // 接口原始路由(未处理时)
            requestInitRoutes: []
        }
    },
    actions: {
        async setRequestInitRoutes(route: Array<string>) {
            this.requestInitRoutes = route;
        }
    }
})