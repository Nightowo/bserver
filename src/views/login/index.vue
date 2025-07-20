<template>
  <div class="login-container flex">
    <div class="login-bg">
      <video ref="video" :autoplay="true" :muted="true" :loop="true" playsinline>
        <source :src="bg" type="video/mp4" />
      </video>
    </div>
    <div class="login-dialog flex">
      <div class="login-dialog-warp flex-margin">
        <span class="login-dialog-warp-one"></span>
        <span class="login-dialog-warp-two"></span>
        <div class="login-dialog-warp-main">
          <div class="login-dialog-warp-main-title"> WELCOME</div>
          <div class="login-dialog-warp-main-form">
            <div v-if="!state.isScan">
              <el-tabs v-model="state.tabsActiveName">
                <el-tab-pane label="用户名登录" name="account">
                  <Account />
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="mobile">
                  <Mobile />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import { nextLoading } from "/@/utils/loading";
import bg from '/@/assets/2233bnj.mp4'
import {useTestApi} from "/@/api/test";
import {userMenu} from "/@/api/menu";

const Account = defineAsyncComponent(() => import('/src/components/loginPanels/account.vue'));
const Mobile = defineAsyncComponent(() => import('/src/components/loginPanels/mobile.vue'))

const state = reactive({
  tabsActiveName: 'account',
  isScan: false,
});

const video = ref<HTMLVideoElement>();

console.log('env', import.meta.env)

console.log('/api/123')

const test = async() => {
  try {
    let params = {
      userName: '22',
      password: 'skBili'
    }
    let res = await useTestApi().getTest(params);
    console.log(res)
  }catch (e){
    console.log(e)
    nextLoading.done();
  }
}


const test02 = async() => {
  try {
    let res = await userMenu().getAdminMenu();
    console.log(res)
  }catch (e){
    console.log(e)
    nextLoading.done();
  }
}
// 页面加载时
onMounted(() => {
  video.value?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  })
  test02();
  nextLoading.done();
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-bg {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    z-index: 0;
    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .login-dialog {
    z-index: 1;
    width: 700px;
    margin: 0 auto;
    position: absolute;
    //opacity: 0.5;
    .login-dialog-warp {
      border: 1px solid var(--el-color-primary-light-3);
      border-radius: 8px;
      width: 500px;
      height: 500px;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(5px);
      .login-dialog-warp-one,
      .login-dialog-warp-two {
        position: absolute;
        display: block;
        width: inherit;
        height: inherit;
        &::before,
        &::after {
          content: '';
          position: absolute;
          z-index: 1;
        }
      }
      .login-dialog-warp-one {
        &::before {
          filter: hue-rotate(0deg);
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--el-color-primary));
          animation: loginLeft 3s linear infinite;
        }
        &::after {
          filter: hue-rotate(60deg);
          top: -100%;
          right: 2px;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, transparent, var(--el-color-primary));
          animation: loginTop 3s linear infinite;
          animation-delay: 0.7s;
        }
      }
      .login-dialog-warp-two {
        &::before {
          filter: hue-rotate(120deg);
          bottom: 2px;
          right: -100%;
          width: 100%;
          height: 3px;
          background: linear-gradient(270deg, transparent, var(--el-color-primary));
          animation: loginRight 3s linear infinite;
          animation-delay: 1.4s;
        }
        &::after {
          filter: hue-rotate(300deg);
          bottom: -100%;
          left: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(360deg, transparent, var(--el-color-primary));
          animation: loginBottom 3s linear infinite;
          animation-delay: 2.1s;
        }
      }
      .login-dialog-warp-main {
        display: flex;
        flex-direction: column;
        height: 100%;
        .login-dialog-warp-main-title {
          height: 130px;
          line-height: 130px;
          font-size: 27px;
          text-align: center;
          letter-spacing: 3px;
          animation: logoAnimation 0.3s ease;
          animation-delay: 0.3s;
          color: var(--el-text-color-primary);
        }
        .login-dialog-warp-main-form {
          flex: 1;
          padding: 0 50px 50px;
          .login-content-main-scan {
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            overflow: hidden;
            cursor: pointer;
            transition: all ease 0.3s;
            color: var(--el-color-primary);
            &-delta {
              position: absolute;
              width: 35px;
              height: 70px;
              z-index: 2;
              top: 2px;
              right: 21px;
              background: var(--el-color-white);
              transform: rotate(-45deg);
            }
            &:hover {
              opacity: 1;
              transition: all ease 0.3s;
              color: var(--el-color-primary) !important;
            }
            i {
              width: 47px;
              height: 50px;
              display: inline-block;
              font-size: 48px;
              position: absolute;
              right: 1px;
              top: 0;
            }
          }
        }
      }
    }
  }
}
</style>