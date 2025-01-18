<template>
  <el-config-provider size="large">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import {useTagsViewRoutes} from "/@/stores/tagsViewRoutes";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
import {useThemeConfig} from "/@/router/themeConfig";
import {nextTick, onBeforeMount, watch} from "vue";
import setIntroduction from '/@/utils/setIconfont';
import {onMounted, onUnmounted} from "vue-demi";
import {Local, Session} from "/@/utils/storage";

const route = useRoute();
const stores = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

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
  //mittBus.off('openSetingsDrawer', () => {});
});

// 监听路由的变化，设置网站标题
watch(
    () => route.path,
    () => {
      //other.useTitle();
    },
    {
      deep: true,
    }
);
</script>

<style scoped>

</style>
