<template>
  <el-config-provider :size="getGlobalComponentSize">
    <RouterView />
    <Settings ref="settingsRef"/>
    <CloseFull v-if="!themeConfig.isLockScreen" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useTagsViewRoutes } from "/@/stores/tagsViewRoutes";
import { useRoute, RouterView } from "vue-router";
import { storeToRefs } from "pinia";
import { useThemeConfig } from "/@/router/themeConfig";
import { computed, defineAsyncComponent, nextTick, onBeforeMount, onMounted, onUnmounted, ref, watch } from "vue";
import { Local, Session } from "/@/utils/storage";
import setIntroduction from '/@/utils/setIconfont';
import mittIn from "/@/utils/mitt";
import other from "/@/utils/other";

//import components
const Settings = defineAsyncComponent(() => import('/@/layout/navBars/top/setting.vue'));
const CloseFull = defineAsyncComponent(() => import('/@/layout/navBars/top/closeFull.vue'));

const route = useRoute();
const stores = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const settingsRef = ref();

// 设置全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
})

// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
  // 设置批量第三方 icon 图标
  setIntroduction.cssCdn();
  // 设置批量第三方 js
  setIntroduction.jsCdn();
});

// 页面加载时
onMounted(() => {
  nextTick(() => {
    // 监听布局配'置弹窗点击打开
    mittIn.on('openSettingsDrawer', () => {
      settingsRef.value.openDrawer();
    })
    // 获取缓存中的布局配置
    if (Local.get('themeConfig')) {
      storesThemeConfig.setThemeConfig({ themeConfig: Local.get('themeConfig') });
      document.documentElement.style.cssText = Local.get('themeConfigStyle');
    }
    // 获取缓存中的全屏配置
    if (Session.get('isTagsViewCurrenFull')) {
      stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
    }
  })
});

// 页面销毁时
onUnmounted(() => {
  mittIn.off('openSettingsDrawer', () => {});
});

const test = (route: any) => {
  console.log(route);
}

// 监听路由的变化，设置网站标题
watch(
    () => route.path,
    () => {
      //test(route.path)
      other.useTitle();
    },
    {
      deep: true,
    }
);
</script>

<style scoped>

</style>
