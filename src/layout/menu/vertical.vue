<template>
  <el-menu
      router
      :default-active="state.defaultActive"
      background-color="transparent"
      :collapse="state.isCollapse"
      :unique-opened="getThemeConfig.isUniqueOpened"
      :collapse-transition="false"
  >
    <template v-for="val in menuLists">
      <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
        <template #title>
          <SvgIcon :name="val.meta.icon" />
          <span>{{ val.meta.title }}</span>
        </template>
        <SubItem :child="val.children" />
      </el-sub-menu>
      <template v-else>
        <el-menu-item :index="val.path" :key="val.path">
          <SvgIcon :name="val.meta.icon" />
          <template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
            <span>{{ val.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<script setup lang="ts" name="layoutNavVertical">
import { computed, defineAsyncComponent, reactive, watch, onMounted } from 'vue';
import { useRoute, onBeforeRouteUpdate, RouteRecordRaw } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';

// 引入组件
const SubItem = defineAsyncComponent(() => import('/src/layout/menu/items.vue'));

// 定义父组件传过来的值
const props = defineProps({
  // 菜单列表
  menuList: {
    type: Array<RouteRecordRaw>,
    default: () => [],
  },
});

// 定义变量内容
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const state = reactive({
  // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
  defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
  isCollapse: false,
});

// 获取父级菜单数据
const menuLists = computed(() => {
  return <RouteItems>props.menuList;
});

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value;
});

// 菜单高亮（详情时，父级高亮）
const setParentHighlight = (currentRoute: RouteToFrom) => {
  const { path, meta } = currentRoute;
  const pathSplit = meta?.isDynamic ? meta.isDynamicPath!.split('/') : path!.split('/');
  if (pathSplit.length >= 4 && meta?.isHide) return pathSplit.splice(0, 3).join('/');
  else return path;
};

// 页面加载时
onMounted(() => {
  state.defaultActive = setParentHighlight(route);
});

// 路由更新时
onBeforeRouteUpdate((to) => {
  // 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
  state.defaultActive = setParentHighlight(to);
  const clientWidth = document.body.clientWidth;
  if (clientWidth < 1000) themeConfig.value.isCollapse = false;
});

// 设置菜单的收起/展开
watch(
    () => themeConfig.value.isCollapse,
    (isCollapse) => {
      document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = isCollapse);
    },
    {
      immediate: true,
    }
);
</script>

<style scoped>

</style>