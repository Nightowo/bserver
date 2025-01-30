<template>
  <div class="layout-navbars-breadcrumb-user pr15" :style="{ flex: layoutUserFlexNum }">
    <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
      <div class="layout-navbars-breadcrumb-user-icon">
        <i class="iconfont icon-ziti" :title="message.user.title0"></i>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="large" :disabled="state.disabledSize === 'large'">{{ message.user.dropdownLarge }}</el-dropdown-item>
          <el-dropdown-item command="default" :disabled="state.disabledSize === 'default'">{{ message.user.dropdownDefault }}</el-dropdown-item>
          <el-dropdown-item command="small" :disabled="state.disabledSize === 'small'">{{ message.user.dropdownSmall }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
      <i class="icon-skin iconfont" :title="message.user.title3"></i>
    </div>
    <div class="layout-navbars-breadcrumb-user-icon mr10" @click="">
      <i
          class="iconfont"
          :title="state.isScreenfull ? message.user.title6 : message.user.title5"
          :class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"
      ></i>
    </div>
    <el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="userInfos.photo" class="layout-navbars-breadcrumb-user-link-photo mr5"  alt=""/>
				{{ userInfos.userName === '' ? 'common' : userInfos.userName }}
				<el-icon class="el-icon--right">
					<el-ArrowDown />
				</el-icon>
			</span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="/home">{{ message.user.dropdown1 }}</el-dropdown-item>
          <el-dropdown-item command="wareHouse">{{ message.user.dropdown6 }}</el-dropdown-item>
          <el-dropdown-item command="/personal">{{ message.user.dropdown2 }}</el-dropdown-item>
          <el-dropdown-item command="/404">{{ message.user.dropdown3 }}</el-dropdown-item>
          <el-dropdown-item command="/401">{{ message.user.dropdown4 }}</el-dropdown-item>
          <el-dropdown-item divided command="logOut">{{ message.user.dropdown5 }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="layoutUser">
import { ref, computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessageBox, ElMessage, ClickOutside as vClickOutside } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useUserInfo } from '/@/stores/userInfo';
import { useThemeConfig } from '/@/stores/themeConfig';
import message from '/@/i18n/lang/zh-cn';
import Emitter from '/@/utils/mitt';
import { Session, Local } from '/@/utils/storage';

// 定义变量内容
// const userNewsRef = ref();
// const userNewsBadgeRef = ref();
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

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &-link {
    height: 100%;
    display: flex;
    align-items: center;
    white-space: nowrap;
    &-photo {
      width: 25px;
      height: 25px;
      border-radius: 100%;
    }
  }
  &-icon {
    padding: 0 10px;
    cursor: pointer;
    color: var(--next-bg-topBarColor);
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    &:hover {
      background: var(--next-color-user-hover);
      i {
        display: inline-block;
        animation: logoAnimation 0.3s ease-in-out;
      }
    }
  }
  :deep(.el-dropdown) {
    color: var(--next-bg-topBarColor);
  }
  :deep(.el-badge) {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  :deep(.el-badge__content.is-fixed) {
    top: 12px;
  }
}
</style>