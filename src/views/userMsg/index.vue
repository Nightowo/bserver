<template>
  <div class="userMsg-container">
    <el-row>
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="用户信息" class="cardMsg">
          <el-avatar shape="square" :size="100" fit="cover" :src="state.userInfo.photo"></el-avatar>
        </el-card>
      </el-col>
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="消息" class="cardMsg">
          111
        </el-card>
      </el-col>
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="消息" class="cardMsg">
          111
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="userMsg">
import { onMounted, reactive } from "vue";
import { useUserInfo } from "/@/stores/userInfo";
import { storeToRefs } from "pinia";

const stores = useUserInfo();
const userInfo = storeToRefs(stores);

const state = reactive({
  userInfo: {} as any,
})

onMounted(() => {
  state.userInfo = userInfo.userInfos;
  console.log(state.userInfo)
})
</script>

<style scoped lang="scss">
.userMsg-container {
  padding: 0 10px;
  .cardMsg {
    margin: 0 3px;
  }
}
</style>