<template>
  <component :is="layouts[themeConfig.layout]" />
</template>

<script setup lang="ts" name="layout">
import { onBeforeMount, onUnmounted, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { Local } from '/@/utils/storage';
import Emitter from '/@/utils/mitt';

// 引入多种布局组件，可在样式配置文件中切换
const layouts: any = {
  defaults: defineAsyncComponent(() => import('/src/layout/pageDesign/default.vue')),
  // classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
  // transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
  // columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
};

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
  if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 1000) {
    themeConfig.value.isCollapse = false;
    Emitter.emit('layoutMobileResize', {
      layout: 'defaults',
      clientWidth,
    });
  } else {
    Emitter.emit('layoutMobileResize', {
      layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
      clientWidth,
    });
  }
};

// 页面加载前
onBeforeMount(() => {
  onLayoutResize();
  window.addEventListener('resize', onLayoutResize);
});

// 页面卸载时
onUnmounted(() => {
  window.removeEventListener('resize', onLayoutResize);
});
</script>

<style scoped>

</style>