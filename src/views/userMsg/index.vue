<template>
  <div class="userMsg-container">
    <el-row :gutter="15">
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="用户信息" >
          <div class="cardMsg">
            <div class="userAvatar">
              <el-avatar shape="square" :size="120" fit="cover" :src="state.userInfo.photo" />
            </div>
            <div class="userInfo">
              <el-descriptions :column="1">
                <el-descriptions-item label="用户名">{{ state.userInfo.userName }}</el-descriptions-item>
                <el-descriptions-item label="时间">{{ formatDate(new Date(state.userInfo.time), 'YYYY-mm-dd') }}</el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                <el-descriptions-item label="身份标识">
                  <el-tag v-for="index in state.userInfo.roles" :key="index">{{ index }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
                <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="消息" >
          <el-calendar v-model="state.time">

          </el-calendar>
        </el-card>
      </el-col>
      <el-col :span="8" class="mt15">
        <el-card shadow="hover" header="消息">
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
import { formatDate } from "/@/utils/formatTime"

const stores = useUserInfo();
const userInfo = storeToRefs(stores);

const state = reactive({
  userInfo: {} as any,
  time: new Date(),
})

onMounted(() => {
  state.userInfo = userInfo.userInfos;
})
</script>

<style scoped lang="scss">
@use '../../style/mixins/index.scss';
.userMsg-container {
  padding: 0 10px;
  .cardMsg {
    margin: 0 3px;
    display: flex;
    .userAvatar {
      padding-right: 15px;
    }
    .userInfo {
      width: auto;
      padding-left: 15px;
      border-left: 1px solid var(--el-border-color);
    }
  }
}
</style>