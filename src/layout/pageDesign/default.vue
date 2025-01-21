<template>
  <el-container class="layout-container">
    <LayoutAside />
    <el-container class="layout-container-view h100">
      <el-scrollbar ref="layoutScrollbarRef" class="layout-backtop">
        <LayoutHeader />
        <LayoutMain ref="layoutMainRef" />
      </el-scrollbar>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutDefault">
import {defineAsyncComponent, nextTick, ref} from "vue";
import {useRoute} from "vue-router";
import {useThemeConfig} from "/@/router/themeConfig";
import {storeToRefs} from "pinia";

// 引入组件
const LayoutAside = defineAsyncComponent(() => import('/@/layout/pageComponents/aside.vue'));
const LayoutHeader = defineAsyncComponent(() => import('/@/layout/pageComponents/header.vue'));
const LayoutMain = defineAsyncComponent(() => import('/@/layout/pageComponents/main.vue'));

// 定义变量内容
const layoutScrollbarRef = ref<RefType>('');
const layoutMainRef = ref<InstanceType<typeof LayoutMain>>();
const route = useRoute();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

// 重置滚动条高度
const updateScrollbar = () => {
  // 更新父级 scrollbar
  layoutScrollbarRef.value.update();
  // 更新子级 scrollbar
  layoutMainRef.value!.layoutMainScrollbarRef.update();
};

// 重置滚动条高度，由于组件是异步引入的
const initScrollBarHeight = () => {
  nextTick(() => {
    setTimeout(() => {
      updateScrollbar();
      layoutScrollbarRef.value.wrapRef.scrollTop = 0;
      layoutMainRef.value!.layoutMainScrollbarRef.wrapRef.scrollTop = 0;
    }, 500);
  });
};
</script>

<style scoped>

</style>