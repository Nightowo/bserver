<template>
  <div class="home-container">
    <div class="home-bg">
      <video :autoplay="true" :muted="true" :loop="true" playsinline>
        <source :src="bg" type="video/mp4" />
      </video>
    </div>
    <div class="home-content">
    </div>
  </div>
</template>

<script setup lang="ts" name="home">
import { onMounted } from "vue";
import bg from '/@/assets/2233bnj.mp4';

onMounted(() => {
  console.log('Home component mounted');
});
</script>

<style scoped>
.home-container {
  width: 100%;
  position: relative;
  .home-bg {
    position: absolute;
    overflow: hidden;
    height: 100vh;
    video {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }
  }

  .home-content {
    position: relative;
    width: 25%;
    height: 25%;
    z-index: 1;
    background-color: rgb(255, 255, 255, 0.8);
  }
}
</style>