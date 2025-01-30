<template>
  <template v-for="val in childList">
    <el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
      <template #title>
        <SvgIcon :name="val.meta.icon" />
        <span>{{ val.meta.title }}</span>
      </template>
      <sub-item :chil="val.children" />
    </el-sub-menu>
    <template v-else>
      <el-menu-item :index="val.path" :key="val.path">
        <template v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
          <SvgIcon :name="val.meta.icon" />
          <span>{{ val.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { RouteRecordRaw } from 'vue-router';

// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  child: {
    type: Array<RouteRecordRaw>,
    default: () => [],
  },
});

// 获取父级菜单数据
const childList = computed(() => {
  console.log(props?.child)
  return <RouteItems>props.child;
});

</script>

<style scoped>

</style>