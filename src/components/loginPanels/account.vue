<template>
  <el-form
      size="large"
      ref="ruleFormRef"
      :rules="rules"
      :model="state.ruleForm"
      class="login-dialog-form"
  >
    <el-form-item class="login-animation1" prop="userName">
      <el-input
        v-model="state.ruleForm.userName"
        placeholder="请输入用户名"
        text
        clearable
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <el-User />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2" prop="password">
      <el-input
        v-model="state.ruleForm.password"
        :type="state.isShowPassword ? 'text' : 'password'"
        placeholder="请输入密码"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon">
            <el-Lock />
          </el-icon>
        </template>
        <template #suffix>
          <i
              class="iconfont el-input__icon login-dialog-password"
              :class="state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
              @click="state.isShowPassword = !state.isShowPassword"
          >
          </i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation3" prop="code">
      <el-col :span="15" >
        <el-input
            text
            maxlength="4"
            placeholder="请输入验证码"
            v-model="state.ruleForm.code"
            clearable
            autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><el-Position /></el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="8">
        <el-button class="login-content-code" v-waves>1234</el-button>
      </el-col>
    </el-form-item>
    <el-form-item class="login-animation4">
      <el-button
          type="primary"
          class="login-dialog-submit"
          icon="el-Promotion"
          @click="confirmData(ruleFormRef)"
          :loading="state.loading.signIn"
          round
          v-waves
      >
        <span>LOGIN</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="account">
import { useThemeConfig } from "/@/router/themeConfig";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { reactive, ref } from "vue";
import { Session } from "/@/utils/storage";
import Cookies from 'js-cookie';
import { initBackEndControlRoutes } from "/@/router/backControl";
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { initFrontEndControlRoutes } from "/@/router/frontControl";
import { nextLoading } from "/@/utils/loading";

const storesThemeConfig = useThemeConfig();
const{ themeConfig } = storeToRefs(storesThemeConfig);
const route = useRoute();
const router = useRouter();
const ruleFormRef = ref<FormInstance>();  // 绑定需验证表单
const state = reactive({
  isShowPassword: false,
  ruleForm: {
    userName: 'admin',
    password: '123456',
    code: '1234',
  },
  loading: {
    signIn: false,
  },
});

// 表单验证规则
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
  ]
})

const confirmData = async(formCheck: FormInstance | undefined) => {
// 校验1：接收参数是否为空
  if (!formCheck) return;
  // 校验2：表单校验
  await formCheck.validate(async (isValid, invalidFields) => {
    if (isValid) {
      await login()
    }else {
      console.log('error submit!', invalidFields)
    }
  })
};

const login = async() => {
  state.loading.signIn = true;
  // 模拟存储 token 到浏览器缓存, 接后台接口时应改为从后台接收token后设置
  Session.set('token', '123456');
  // 模拟数据，对接接口时，记得删除多余代码及对应依赖的引入。用于 `/src/stores/userInfo.ts` 中不同用户登录判断（模拟数据）
  Cookies.set('userName', state.ruleForm.userName);
  if (!themeConfig.value.isRequestRoutes) {
    // 前端控制路由，2、请注意执行顺序
    const isNoPower = await initFrontEndControlRoutes();
    loginSuccess(isNoPower);
  } else {
    // 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
    // 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
    const isNoPower = await initBackEndControlRoutes();
    // 执行完 initBackEndControlRoutes，再执行 signInSuccess
    loginSuccess(isNoPower);
  }
}

const loginSuccess = (isNoPower: boolean | undefined) => {
  if (isNoPower) {
    ElMessage.warning('抱歉，您没有登录权限');
    Session.clear();
  } else {
    // 初始化登录成功时间问候语
    //let currentTimeInfo = currentTime.value;
    // 登录成功，跳到转首页
    // 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
    console.log(router.getRoutes())
    if (route.query?.reredirect) {
      router.push({
        path: <string>route.query?.redirect,
        query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
      })
    } else {
      router.push('/')
    }
    // 登录成功提示
    //const signInText = t('message.signInText');
    //ElMessage.success(`${currentTimeInfo}，${signInText}`);
    // 添加 loading，防止第一次进入界面时出现短暂空白
    nextLoading.start();
  }
  state.loading.signIn = false;
}
</script>

<style lang="scss" scoped>
.login-dialog-form {
  margin-top: 20px;
  @for $i from 1 through 4 {
    .login-animation#{$i} {
      opacity: 0;
      animation-name: error-num;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
      animation-delay: calc($i/10) + s;
    }
  }
  .login-dialog-password {
    display: inline-block;
    width: 20px;
    cursor: pointer;
    &:hover {
      color: #909399;
    }
  }
  .login-content-code {
    width: 100%;
    padding: 0;
    font-weight: bold;
    letter-spacing: 5px;
  }
  .login-dialog-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>