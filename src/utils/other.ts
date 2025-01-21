import {App, defineAsyncComponent, nextTick} from "vue";
import * as svg from '@element-plus/icons-vue';
import {useThemeConfig} from "/@/router/themeConfig";
import pinia from "/@/stores";
import {storeToRefs} from "pinia";
import router from "/@/router";
import {Local} from "/@/utils/storage";

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
// 引入组件
const SvgIcon = defineAsyncComponent(() => import('/@/components/svgIcon/index.vue'));

export function elSvg(app: App) {
    const icons = svg as any;
    for (const i in icons) {
        app.component(`${icons[i].name}`, icons[i]);
    }
    app.component('SvgIcon', SvgIcon);
}

/**
 * 设置浏览器标题国际化
 * @method const title = useTitle(); ==> title()
 */
export function useTitle() {
    const stores = useThemeConfig(pinia);
    const { themeConfig } = storeToRefs(stores);
    nextTick(() => {
        let webTitle = '';
        let globalTitle: string = themeConfig.value.globalTitle;
        const {path, meta} = router.currentRoute.value;
        if (path === '/login') {
            webTitle = <string>meta.title;
        } else {
            webTitle = <string>meta.title;
            //webTitle = setTagsViewNameI18n(router.currentRoute.value);
        }
        document.title = `${webTitle} - ${globalTitle}` || globalTitle;
    }).then(r => {});
}

/**
 * 对象深克隆
 * @param obj 源对象
 * @returns 克隆后的对象
 */
export function deepClone(obj: EmptyObjectType) {
    let newObj: EmptyObjectType;
    try {
        newObj = obj.push ? [] : {};
    } catch (error) {
        newObj = {};
    }
    for (let attr in obj) {
        if (obj[attr] && typeof obj[attr] === 'object') {
            newObj[attr] = deepClone(obj[attr]);
        } else {
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
}

/**
 * 判断是否是移动端
 */
export function isMobile() {
    return !!navigator.userAgent.match(
        /('phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone')/i
    );
}

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize = (): string => {
    const stores = useThemeConfig(pinia);
    const { themeConfig } = storeToRefs(stores);
    return Local.get('themeConfig')?.globalComponentSize || themeConfig.value?.globalComponentSize;
};

/**
 * 统一批量导出
 * @method elSvg 导出全局注册 element plus svg 图标
 * @method useTitle 设置浏览器标题国际化
 * @method setTagsViewNameI18n 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @method lazyImg 图片懒加载
 * @method globalComponentSize() element plus 全局组件大小
 * @method deepClone 对象深克隆
 * @method isMobile 判断是否是移动端
 * @method handleEmpty 判断数组对象中所有属性是否为空，为空则删除当前行对象
 * @method handleOpenLink 打开外部链接
 */
const other = {
    elSvg: (app: App) => {
        elSvg(app);
    },
    useTitle: () => {
        useTitle();
    },
    deepClone: (obj: EmptyObjectType) => {
        return deepClone(obj);
    },
    isMobile: () => {
        return isMobile();
    },
    globalComponentSize: () => {
        return globalComponentSize();
    },
};

// 统一批量导出
export default other;