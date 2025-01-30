<template>
  <i class="el-icon" >
    <component :is="getIconName"></component>
  </i>
</template>

<script setup lang="ts" name="simpleIcon">
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: () => 14,
  },
  color: {
    type: String,
  },
});

// 获取 icon 图标名称
const getIconName = computed(() => {
  console.log(props?.name)
  return props?.name;
});

// 设置图标样式
const setIconSvgStyle = computed(() => {
  return `font-size: ${props.size}px;color: ${props.color};`;
});

</script>

<style scoped lang="scss">

</style>