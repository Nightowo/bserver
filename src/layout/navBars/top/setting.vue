<template>
  <div class="layout-breadcrumb-setting">
    <el-drawer
        :title="message.layout.configTitle"
        v-model="getThemeConfig.isDrawer"
        direction="rtl"
        destroy-on-close
        size="260px"
        @close="onDrawerClose"
    >
      <el-scrollbar class="layout-breadcrumb-setting-bar">
        <!-- 全局主题 -->
        <el-divider content-position="left">{{ message.layout.oneTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange"> </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsDark }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange"></el-switch>
          </div>
        </div>

        <!-- 顶栏设置 -->
        <el-divider content-position="left">{{ message.layout.twoTopTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoTopBar }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBar" size="default" @change="onBgColorPickerChange('topBar')"> </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoTopBarColor }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBarColor" size="default" @change="onBgColorPickerChange('topBarColor')"> </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt10">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoIsTopBarColorGradual }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTopBarColorGradual" size="small" @change="onTopBarGradualChange"></el-switch>
          </div>
        </div>

        <!-- 菜单设置 -->
        <el-divider content-position="left">{{ message.layout.twoMenuTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoMenuBar }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBar" size="default" @change="onBgColorPickerChange('menuBar')"> </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoMenuBarColor }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBarColor" size="default" @change="onBgColorPickerChange('menuBarColor')"> </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoMenuBarActiveColor }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker
                v-model="getThemeConfig.menuBarActiveColor"
                size="default"
                show-alpha
                @change="onBgColorPickerChange('menuBarActiveColor')"
            />
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt14">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoIsMenuBarColorGradual }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorGradual" size="small" @change="onMenuBarGradualChange"></el-switch>
          </div>
        </div>

        <!-- 分栏设置 -->
        <el-divider content-position="left" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">{{ message.layout.twoColumnsTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoColumnsMenuBar }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker
                v-model="getThemeConfig.columnsMenuBar"
                size="default"
                @change="onBgColorPickerChange('columnsMenuBar')"
                :disabled="getThemeConfig.layout !== 'columns'"
            >
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoColumnsMenuBarColor }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-color-picker
                v-model="getThemeConfig.columnsMenuBarColor"
                size="default"
                @change="onBgColorPickerChange('columnsMenuBarColor')"
                :disabled="getThemeConfig.layout !== 'columns'"
            >
            </el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt14" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoIsColumnsMenuBarColorGradual }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isColumnsMenuBarColorGradual"
                size="small"
                @change="onColumnsMenuBarGradualChange"
                :disabled="getThemeConfig.layout !== 'columns'"
            ></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt14" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.twoIsColumnsMenuHoverPreload }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isColumnsMenuHoverPreload"
                size="small"
                @change="onColumnsMenuHoverPreloadChange"
                :disabled="getThemeConfig.layout !== 'columns'"
            ></el-switch>
          </div>
        </div>

        <!-- 界面设置 -->
        <el-divider content-position="left">{{ message.layout.threeTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex" :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeIsCollapse }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isCollapse"
                :disabled="getThemeConfig.layout === 'transverse'"
                size="small"
                @change="onThemeConfigChange"
            ></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout === 'transverse' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeIsUniqueOpened }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isUniqueOpened"
                :disabled="getThemeConfig.layout === 'transverse'"
                size="small"
                @change="setLocalThemeConfig"
            ></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeIsFixedHeader }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFixedHeader" size="small" @change="onIsFixedHeaderChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeIsClassicSplitMenu }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isClassicSplitMenu"
                :disabled="getThemeConfig.layout !== 'classic'"
                size="small"
                @change="onClassicSplitMenuChange"
            >
            </el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeIsLockScreen }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isLockScreen" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt11">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.threeLockScreenTime }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-input-number
                v-model="getThemeConfig.lockScreenTime"
                controls-position="right"
                :min="1"
                :max="9999"
                @change="setLocalThemeConfig"
                size="default"
                style="width: 90px"
            >
            </el-input-number>
          </div>
        </div>

        <!-- 界面显示 -->
        <el-divider content-position="left">{{ message.layout.fourTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsShowLogo }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShowLogo" size="small" @change="onIsShowLogoChange"></el-switch>
          </div>
        </div>
        <div
            class="layout-breadcrumb-setting-bar-flex mt15"
            :style="{ opacity: getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse' ? 0.5 : 1 }"
        >
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsBreadcrumb }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isBreadcrumb"
                :disabled="getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse'"
                size="small"
                @change="onIsBreadcrumbChange"
            ></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsBreadcrumbIcon }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isBreadcrumbIcon" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsTagsview }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsview" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsTagsviewIcon }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsviewIcon" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsCacheTagsView }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCacheTagsView" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15" :style="{ opacity: state.isMobile ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsSortableTagsView }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch
                v-model="getThemeConfig.isSortableTagsView"
                :disabled="!!state.isMobile"
                size="small"
                @change="onSortableTagsViewChange"
            ></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsShareTagsView }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShareTagsView" size="small" @change="onShareTagsViewChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsFooter }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFooter" size="small" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsGrayscale }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isGrayscale" size="small" @change="onAddFilterChange('grayscale')"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fourIsInvert }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isInvert" size="small" @change="onAddFilterChange('invert')"></el-switch>
          </div>
        </div>

        <!-- 其它设置 -->
        <el-divider content-position="left">{{ message.layout.fiveTitle }}</el-divider>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fiveTagsStyle }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="default" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="风格1" value="tags-style-one"></el-option>
              <el-option label="风格4" value="tags-style-four"></el-option>
              <el-option label="风格5" value="tags-style-five"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fiveAnimation }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-select v-model="getThemeConfig.animation" placeholder="请选择" size="default" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="slide-right" value="slide-right"></el-option>
              <el-option label="slide-left" value="slide-left"></el-option>
              <el-option label="opacitys" value="opacitys"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fiveColumnsAsideStyle }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-select
                v-model="getThemeConfig.columnsAsideStyle"
                placeholder="请选择"
                size="default"
                style="width: 90px"
                :disabled="getThemeConfig.layout !== 'columns'"
                @change="setLocalThemeConfig"
            >
              <el-option label="圆角" value="columns-round"></el-option>
              <el-option label="卡片" value="columns-card"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-setting-bar-flex mt15 mb27" :style="{ opacity: getThemeConfig.layout !== 'columns' ? 0.5 : 1 }">
          <div class="layout-breadcrumb-setting-bar-flex-label">{{ message.layout.fiveColumnsAsideLayout }}</div>
          <div class="layout-breadcrumb-setting-bar-flex-value">
            <el-select
                v-model="getThemeConfig.columnsAsideLayout"
                placeholder="请选择"
                size="default"
                style="width: 90px"
                :disabled="getThemeConfig.layout !== 'columns'"
                @change="setLocalThemeConfig"
            >
              <el-option label="水平" value="columns-horizontal"></el-option>
              <el-option label="垂直" value="columns-vertical"></el-option>
            </el-select>
          </div>
        </div>

        <!-- 布局切换 -->
        <el-divider content-position="left">{{ message.layout.sixTitle }}</el-divider>
        <div class="layout-drawer-content-flex">
          <!-- defaults 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">{{ message.layout.sixDefaults }}</p>
              </div>
            </div>
          </div>
          <!-- classic 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('classic')">
            <section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <aside class="el-aside" style="width: 20px"></aside>
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">{{ message.layout.sixClassic }}</p>
              </div>
            </div>
          </div>
          <!-- transverse 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
            <section class="el-container is-vertical el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container">
                <section class="el-container is-vertical">
                  <main class="el-main"></main>
                </section>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">{{ message.layout.sixTransverse }}</p>
              </div>
            </div>
          </div>
          <!-- columns 布局 -->
          <div class="layout-drawer-content-item" @click="onSetLayout('columns')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
              <aside class="el-aside-dark" style="width: 10px"></aside>
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
              <div class="layout-tips-box">
                <p class="layout-tips-txt">{{ message.layout.sixColumns }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-config">
<!--          <el-alert :title="message.layout.tipText" type="warning" :closable="false"> </el-alert>-->
          <el-button size="default" class="copy-config-btn" type="primary" ref="copyConfigBtnRef" @click="onCopyConfigClick">
            <el-icon class="mr5">
              <el-CopyDocument />
            </el-icon>
            {{ message.layout.copyText }}
          </el-button>
          <el-button size="default" class="copy-config-btn-reset" type="info" @click="onResetConfigClick">
            <el-icon class="mr5">
              <el-RefreshRight />
            </el-icon>
            {{ message.layout.resetText }}
          </el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="layoutSetting">
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { reactive, computed, nextTick, onMounted, onUnmounted } from "vue";
import { commonFunctions } from "/@/utils/common";
import { ElMessage } from "element-plus";
import { useChangeColor } from "/@/utils/theme";
import { Local } from "/@/utils/storage";
import Emitter from '/@/utils/mitt';
import other from "/@/utils/other";
import message from '/@/i18n/lang/zh-cn';

// register store
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);
const { copyText } = commonFunctions();
const { getLightColor, getDarkColor } = useChangeColor();

const state = reactive({
  isMobile: false,
});

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value;
});

/**start** 功能设置主函数区 **start**/
// 1. 全局主题配置
const onColorPickerChange = () => {
  if (!getThemeConfig.value.primary) return ElMessage.warning('请选择主题色...');
  // 颜色加深
  document.documentElement.style.setProperty('--el-color-primary-dark-2', `${getDarkColor(getThemeConfig.value.primary, 0.1)}`);
  document.documentElement.style.setProperty('--el-color-primary', getThemeConfig.value.primary);
  // 颜色变浅，css预设9样式，可优化
  for (let i = 1; i <= 9; i++) {
    document.documentElement.style.setProperty(`--el-color-primary-light-${i}`, `${getLightColor(getThemeConfig.value.primary, i / 10)}`);
  }
  // 触发 store 布局配置更新
  setDispatchThemeConfig();
}

// 2. 菜单 / 顶栏
const onBgColorPickerChange = (bg: string) => {
  // !P: 这行不知道干嘛的，需查找--next-bg-的样式确认...
  document.documentElement.style.setProperty(`--next-bg-${bg}`, (themeConfig.value as any)[0]);
  if (bg === 'menuBar') {
    document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, getLightColor(getThemeConfig.value.menuBar, 0.05));
  }
  onTopBarGradualChange();
  onMenuBarGradualChange();
  onColumnsMenuBarGradualChange();
  setDispatchThemeConfig();
}

// 2、分栏设置 ->
const onColumnsMenuHoverPreloadChange = () => {
  setLocalThemeConfig();
};

// 3.1 界面设置 --> 菜单水平折叠
const onThemeConfigChange = () => {
  setDispatchThemeConfig();
};

// 3.2 界面设置 --> 固定 Header
const onIsFixedHeaderChange = () => {
  getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader;
  setLocalThemeConfig();
};

// 3.3界面设置 --> 经典布局分割菜单
const onClassicSplitMenuChange = () => {
  getThemeConfig.value.isBreadcrumb = false;
  setLocalThemeConfig();
  Emitter.emit('getBreadcrumbIndexSetFilterRoutes');
};

// 4.1 界面显示 --> 侧边栏 Logo
const onIsShowLogoChange = () => {
  getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo;
  setLocalThemeConfig();
};

// 4.2 界面显示 --> 面包屑 Breadcrumb
const onIsBreadcrumbChange = () => {
  if (getThemeConfig.value.layout === 'classic') {
    getThemeConfig.value.isClassicSplitMenu = false;
  }
  setLocalThemeConfig();
};

// 4.3 界面显示 --> 开启 TagsView 拖拽
const onSortableTagsViewChange = () => {
  Emitter.emit('openOrCloseSortable');
  setLocalThemeConfig();
};

// 4.4 界面显示 --> 开启 TagsView 共用
const onShareTagsViewChange = () => {
  Emitter.emit('openShareTagsView');
  setLocalThemeConfig();
};

// 4.5 界面显示 --> 灰色模式/色弱模式
const onAddFilterChange = (attr: string) => {
  if (attr === 'grayscale') {
    if (getThemeConfig.value.isGrayscale) getThemeConfig.value.isInvert = false;
  } else {
    if (getThemeConfig.value.isInvert) getThemeConfig.value.isGrayscale = false;
  }
  const cssAttr =
      attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `invert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`;
  const appEle = document.body;
  appEle.setAttribute('style', `filter: ${cssAttr}`);
  setLocalThemeConfig();
};

// 4.6 界面显示 --> 深色模式
const onAddDarkChange = () => {
  const body = document.documentElement as HTMLElement;
  if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark');
  else body.setAttribute('data-theme', '');
};

// 5.1 布局切换
const onSetLayout = (layout: string) => {
  Local.set('oldLayout', layout);
  if (getThemeConfig.value.layout === layout) return false;
  if (layout === 'transverse') getThemeConfig.value.isCollapse = false;
  getThemeConfig.value.layout = layout;
  getThemeConfig.value.isDrawer = false;
  initLayoutChangeFun();
};

// 6. 一键恢复默认
const onResetConfigClick = () => {
  Local.clear();
  window.location.reload();
  // @ts-ignore
  Local.set('version', __NEXT_VERSION__);
};

// 7. 初始化菜单样式等
const initSetStyle = () => {
  // 2、菜单 / 顶栏 --> 顶栏背景渐变
  onTopBarGradualChange();
  // 2、菜单 / 顶栏 --> 菜单背景渐变
  onMenuBarGradualChange();
  // 2、菜单 / 顶栏 --> 分栏菜单背景渐变
  onColumnsMenuBarGradualChange();
};

// 8. 一键复制配置
const onCopyConfigClick = () => {
  let copyThemeConfig = Local.get('themeConfig');
  copyThemeConfig.isDrawer = false;
  copyText(JSON.stringify(copyThemeConfig)).then(() => {
    getThemeConfig.value.isDrawer = false;
  });
};

/**end** 功能设置主函数区 **end**/

/**start** 配置更新逻辑函数区 **start**/
// 触发 store 布局配置更新
const setDispatchThemeConfig = () => {
  setLocalThemeConfig();
  setLocalThemeConfigStyle();
};

// 存储布局配置全局主题样式（html根标签）
const setLocalThemeConfigStyle = () => {
  Local.set('themeConfigStyle', document.documentElement.style.cssText);
};

// 存储布局配置
const setLocalThemeConfig = () => {
  Local.remove('themeConfig');
  Local.set('themeConfig', getThemeConfig.value);
};
/**end** 配置更新逻辑函数区 **end**/

/**start** 菜单模块函数区 **start**/
// 2、菜单 / 顶栏 --> 顶栏背景渐变
const onTopBarGradualChange = () => {
  setGradientFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar);
};

// 2、菜单 / 顶栏 --> 菜单背景渐变
const onMenuBarGradualChange = () => {
  setGradientFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar);
};

// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
const onColumnsMenuBarGradualChange = () => {
  setGradientFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar);
};

// 2、菜单 / 顶栏 --> 背景渐变函数
const setGradientFun = (el: string, bool: boolean, color: string) => {
  nextTick(() => {
    setTimeout(() => {
      let els = document.querySelector(el);
      if (!els) return false;
      document.documentElement.style.setProperty('--el-menu-bg-color', document.documentElement.style.getPropertyValue('--next-bg-menuBar'));
      if (bool) els.setAttribute('style', `background:linear-gradient(to bottom , ${color}, ${getLightColor(color, 0.5)})`);
      else els.setAttribute('style', ``);
      setLocalThemeConfig();
    }, 300);
  });
};
/**end** 菜单模块函数区 **end**/

/**start** 布局切换逻辑函数区 **start**/
// 设置布局切换函数
const initLayoutChangeFun = () => {
  onBgColorPickerChange('menuBar');
  onBgColorPickerChange('menuBarColor');
  onBgColorPickerChange('menuBarActiveColor');
  onBgColorPickerChange('topBar');
  onBgColorPickerChange('topBarColor');
  onBgColorPickerChange('columnsMenuBar');
  onBgColorPickerChange('columnsMenuBarColor');
};

// 关闭弹窗时，初始化变量。变量用于处理 layoutScrollbarRef.value.update() 更新滚动条高度
const onDrawerClose = () => {
  getThemeConfig.value.isFixedHeaderChange = false;
  getThemeConfig.value.isShowLogoChange = false;
  getThemeConfig.value.isDrawer = false;
  setLocalThemeConfig();
};

// 布局配置弹窗打开
const openDrawer = () => {
  getThemeConfig.value.isDrawer = true;
};
/**end** 布局切换逻辑函数区 **end**/

onMounted(() => {
  nextTick(() => {
    // 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
    if (!Local.get('frequency')) initLayoutChangeFun();
    Local.set('frequency', 1);
    // 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
    Emitter.on('layoutMobileResize', (res: LayoutMobileResize) => {
      getThemeConfig.value.layout = res.layout;
      getThemeConfig.value.isDrawer = false;
      initLayoutChangeFun();
      state.isMobile = other.isMobile();
    });
    setTimeout(() => {
      // 默认样式
      onColorPickerChange();
      // 灰色模式
      if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale');
      // 色弱模式
      if (getThemeConfig.value.isInvert) onAddFilterChange('invert');
      // 深色模式
      if (getThemeConfig.value.isIsDark) onAddDarkChange();
      // 语言国际化
      //if (Local.get('themeConfig')) locale.value = Local.get('themeConfig').globalI18n;
      // 初始化菜单样式等
      initSetStyle();
    }, 100);
  });
});

onUnmounted(() => {
  Emitter.off('layoutMobileResize', () => {});
})

// 暴露变量
defineExpose({
  openDrawer,
});
</script>

<style lang="scss" scoped>
.layout-breadcrumb-setting-bar {
  height: calc(100vh - 50px);
  padding: 0 15px;
  :deep(.el-scrollbar__view) {
    overflow-x: hidden !important;
  }
  .layout-breadcrumb-setting-bar-flex {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    &-label {
      flex: 1;
      color: var(--el-text-color-primary);
    }
  }
  .layout-drawer-content-flex {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;
    .layout-drawer-content-item {
      width: 50%;
      height: 70px;
      cursor: pointer;
      border: 1px solid transparent;
      position: relative;
      padding: 5px;
      .el-container {
        height: 100%;
        .el-aside-dark {
          background-color: var(--next-color-setting-header);
        }
        .el-aside {
          background-color: var(--next-color-setting-aside);
        }
        .el-header {
          background-color: var(--next-color-setting-header);
        }
        .el-main {
          background-color: var(--next-color-setting-main);
        }
      }
      .el-circular {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
      }
      .drawer-layout-active {
        border: 1px solid;
        border-color: var(--el-color-primary);
      }
      .layout-tips-warp,
      .layout-tips-warp-active {
        transition: all 0.3s ease-in-out;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        border-color: var(--el-color-primary-light-5);
        border-radius: 100%;
        padding: 4px;
        .layout-tips-box {
          transition: inherit;
          width: 30px;
          height: 30px;
          z-index: 9;
          border: 1px solid;
          border-color: var(--el-color-primary-light-5);
          border-radius: 100%;
          .layout-tips-txt {
            transition: inherit;
            position: relative;
            top: 5px;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 2px;
            white-space: nowrap;
            color: var(--el-color-primary-light-5);
            text-align: center;
            transform: rotate(30deg);
            left: -1px;
            background-color: var(--next-color-setting-main);
            width: 32px;
            height: 17px;
            line-height: 17px;
          }
        }
      }
      .layout-tips-warp-active {
        border: 1px solid;
        border-color: var(--el-color-primary);
        .layout-tips-box {
          border: 1px solid;
          border-color: var(--el-color-primary);
          .layout-tips-txt {
            color: var(--el-color-primary) !important;
            background-color: var(--next-color-setting-main) !important;
          }
        }
      }
      &:hover {
        .el-circular {
          transition: all 0.3s ease-in-out;
          border: 1px solid;
          border-color: var(--el-color-primary);
        }
        .layout-tips-warp {
          transition: all 0.3s ease-in-out;
          border-color: var(--el-color-primary);
          .layout-tips-box {
            transition: inherit;
            border-color: var(--el-color-primary);
            .layout-tips-txt {
              transition: inherit;
              color: var(--el-color-primary) !important;
              background-color: var(--next-color-setting-main) !important;
            }
          }
        }
      }
    }
  }
  .copy-config {
    margin: 10px 0;
    .copy-config-btn {
      width: 100%;
      margin-top: 15px;
    }
    .copy-config-btn-reset {
      width: 100%;
      margin: 10px 0 0;
    }
  }
}
</style>