<template>
{{ state.test }}
</template>

<script setup name="loanCal" lang="ts">
import { onMounted, reactive } from "vue";

const state = reactive({
    test: 'loan name'
})

onMounted(() => {
  setInterval(() => {
    state.test = 'loan name' + Math.random();
  }, 1000)
})
</script>

<style scoped lang="scss">

</style>