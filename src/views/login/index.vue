<template>
  <div class="login-container flex">
    <div class="login-dialog flex">
      <div class="login-dialog-warp flex-margin">
        <span class="login-dialog-warp-one"></span>
        <span class="login-dialog-warp-two"></span>
        <div class="login-dialog-warp-main">
          <div class="login-dialog-warp-main-title"> WELCOME</div>
          <div class="login-dialog-warp-main-form">
            <div v-if="!state.isScan">
              <el-tabs v-model="state.tabsActiveName">
                <el-tab-pane  name="account">
                  <Account />
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
import {defineAsyncComponent, reactive} from "vue";
import {onMounted} from "vue-demi";
import {nextLoading} from "/@/utils/loading";

const Account = defineAsyncComponent(() => import('/@/components/account.vue'));
const state = reactive({
  tabsActiveName: 'account',
  isScan: false,
});

// 页面加载时
onMounted(() => {
  nextLoading.done();
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url('../../assets/2233bg.jpg');
  background-size: cover;
  .login-dialog {
    width: 700px;
    margin: 0 auto;
    //opacity: 0.5;
    .login-dialog-warp {
      border: 1px solid var(--el-color-primary-light-3);
      border-radius: 3px;
      width: 500px;
      height: 500px;
      position: relative;
      overflow: hidden;
      background-color: rgb(255, 255, 255, 0.8);
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
          top: 0px;
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
          left: 0px;
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
          .login-content-main-sacn {
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
              top: 0px;
            }
          }
        }
      }
    }
  }
}
</style>