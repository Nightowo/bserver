<template>

</template>

<script setup lang="ts" name="layoutUser">
import { defineAsyncComponent, ref, unref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage, ClickOutside as vClickOutside } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { useThemeConfig } from '/@/stores/themeConfig';
import message from '/@/i18n/lang/zh-cn';
import other from '/@/utils/other';
import Emitter from '/@/utils/mitt';
import { Session, Local } from '/@/utils/storage';

// 定义变量内容
const userNewsRef = ref();
const userNewsBadgeRef = ref();
const router = useRouter();
const stores = useUserInfo();
const storesThemeConfig = useThemeConfig();
const { userInfos } = storeToRefs(stores);
const { themeConfig } = storeToRefs(storesThemeConfig);
const searchRef = ref();
const state = reactive({
  isScreenfull: false,
  disabledI18n: 'zh-cn',
  disabledSize: 'large',
});

// 设置分割样式
const layoutUserFlexNum = computed(() => {
  let num: string | number = '';
  const { layout, isClassicSplitMenu } = themeConfig.value;
  const layoutArr: string[] = ['defaults', 'columns'];
  if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1';
  else num = '';
  return num;
});

// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
  Emitter.emit('openSettingsDrawer');
};

// 下拉菜单点击时
const onHandleCommandClick = (path: string) => {
  if (path === 'logOut') {
    ElMessageBox({
      closeOnClickModal: false,
      closeOnPressEscape: false,
      title: message.user.logOutTitle,
      message: message.user.logOutMessage,
      showCancelButton: true,
      confirmButtonText: message.user.logOutConfirm,
      cancelButtonText: message.user.logOutCancel,
      buttonSize: 'default',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          instance.confirmButtonText = message.user.logOutExit;
          setTimeout(() => {
            done();
            setTimeout(() => {
              instance.confirmButtonLoading = false;
            }, 300);
          }, 700);
        } else {
          done();
        }
      },
    })
        .then(async () => {
          // 清除缓存/token等
          Session.clear();
          // 使用 reload 时，不需要调用 resetRoute() 重置路由
          window.location.reload();
        })
        .catch(() => {});
  } else if (path === 'wareHouse') {
    window.open('https://gitee.com/lyt-top/vue-next-admin');
  } else {
    router.push(path);
  }
};

// 组件大小改变
const onComponentSizeChange = (size: string) => {
  Local.remove('themeConfig');
  themeConfig.value.globalComponentSize = size;
  Local.set('themeConfig', themeConfig.value);
  //initI18nOrSize('globalComponentSize', 'disabledSize');
  window.location.reload();
};
</script>

<style scoped>

</style>