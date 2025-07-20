<template>
  <div>
    <header :left="leftLayout"/>
    <div>
      <el-table :data="shortMsgList" style="width: 100%">
        <el-table-column prop="content" label="短信内容" />
        <el-table-column prop="receiver" label="接收人" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.status === '正在审核'" type="text" @click="editItem(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status === '正在审核'" type="text" @click="cancelReview(scope.row)">取消</el-button>
            <el-button v-if="scope.row.status !== '正在审核'" type="text" @click="viewItem(scope.row)">查看</el-button>
            <el-button v-if="scope.row.status !== '正在审核'" type="text" @click="submitReview(scope.row)">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog destroy-on-close v-model="dialogVisible" title="新增短信发送请求">
      <el-form :model="newShortMsg" label-width="100px">
        <el-form-item label="短信内容">
          <el-input v-model="newShortMsg.content" />
        </el-form-item>
        <el-form-item label="接收人">
          <el-input v-model="newShortMsg.receiver" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addShortMsg">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="shortMsg" lang="ts">
import {defineAsyncComponent, ref} from 'vue';

const header = defineAsyncComponent(() => import('/@/layout/pageComponents/header.vue'))

interface ShortMsg {
  content: string;
  receiver: string;
  status: string;
}

const leftLayout = [] as HeadButton[];



const shortMsgList = ref<ShortMsg[]>([
  { content: '短信内容1', receiver: '接收人1', status: '已发送' },
  { content: '短信内容2', receiver: '接收人2', status: '审核不通过' },
  { content: '短信内容3', receiver: '接收人3', status: '审核通过待发送' },
  { content: '短信内容4', receiver: '接收人4', status: '正在审核' },
]);

const dialogVisible = ref(false);
const newShortMsg = ref<ShortMsg>({ content: '', receiver: '', status: '审核通过待发送' });

const addShortMsg = () => {
  shortMsgList.value.push({ ...newShortMsg.value });
  dialogVisible.value = false;
  newShortMsg.value = { content: '', receiver: '', status: '审核通过待发送' };
};

const editItem = (item: ShortMsg) => {
  // 编辑逻辑
};

const cancelReview = (item: ShortMsg) => {
  item.status = '审核通过待发送';
};

const viewItem = (item: ShortMsg) => {
  // 查看逻辑
};

const submitReview = (item: ShortMsg) => {
  item.status = '正在审核';
};
</script>

<style scoped lang="scss">

</style>