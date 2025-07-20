<template>
  <div class="head-main">
    <div class="head-left">
      <slot name="left"></slot>
      <el-button v-for="(item, index) in leftHeader" :key="index" :type="item.type" :icon="item.icon"></el-button>
    </div>
    <div class="head-right">

    </div>
  </div>
</template>

<script setup name="header" lang="ts">
import { computed } from "vue";

const props = defineProps({
  left: {
    type: Array<HeadButton>,
    default: () => []
  },
  right: {
    type: Array<RightComponents>,
    default: () => []
  }
})

const leftHeader = computed(() => {
  return props.left as HeadButton[];
})
</script>

<style scoped lang="scss">
.head-main {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #d8d8d8;
  .head-right {
    display: inline-flex;
    gap: 10px;
  }
}
</style>