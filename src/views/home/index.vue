<template>
  <div class="home-container">
    <div class="home-head">
      <el-carousel trigger="click" :interval="2500" height="600px" class="carousel">
        <el-carousel-item v-for="item in state.img" :key="item.id">
          <el-image :src="item.url" fit="cover" alt="none" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onBeforeMount, onMounted, reactive } from "vue";
import { getImages } from "/@/utils/testMsg";

const state = reactive({
  img: [] as any[],
});

const getImg = async () => {
  const res: any = await getImages();
  state.img = res.data;
};

onBeforeMount(() => {
  getImg();
});

onMounted(() => {

  console.log(state.img)
});
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  position: relative;
  display: flex;
  .home-head {
    position: relative;
    width: 100%;
    margin: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    //flex-direction: column;
    .carousel {
      width: 600px;
      border-radius: 15px;
    }
  }
}
</style>