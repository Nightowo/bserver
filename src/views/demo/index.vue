<template>
  <div class="demo-container">
    <div class="demo-top">
      <div class="demo-funcButton">
        <el-button type="primary" icon="el-CirclePlus">add</el-button>
        <el-button type="primary" icon="el-EditPen">edit</el-button>
        <el-button type="primary" icon="el-TopRight">export</el-button>
      </div>
      <div class="demo-searchButton">
        <el-input v-model="state.searchMsg.num" placeholder="请输入查询编号" style="max-width: 200px"></el-input>
        <el-date-picker
            v-model="state.searchMsg.date"
            type="date"
            placeholder="Pick a day"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
        <el-button type="primary" icon="el-Search" />
      </div>
    </div>
    <div class="demo-main">
      <div class="demo-data">
        <el-table v-loading="state.loading" :data="state.demoData" stripe>
          <el-table-column label="编号" prop="id" align="center" />
          <el-table-column label="姓名" prop="name" align="center" />
          <el-table-column label="年龄" prop="age" align="center" />
          <el-table-column label="性别" prop="sex" align="center" />
          <el-table-column label="地址" prop="address" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button type="primary" icon="el-EditPen" size="default" @click="msgEdit(scope.row)">edit</el-button>
              <el-button type="primary" icon="el-Delete" size="default" @click="console.log(scope.row)">delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
          v-model:current-page="state.page.currentPage"
          v-model:page-size="state.page.defaultPageSize"
          size="default"
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="state.page.pageSize"
          :total="state.page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>
    <div class="other">
      <el-dialog destroy-on-close v-model="state.dialogVisible" title="新增短信发送请求">
        <el-form>
          <el-form-item label="编号">
            <el-input v-model="state.msgPane.id" placeholder="请输入查询编号" style="max-width: 200px"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts" name="demo">
import {onMounted, reactive} from "vue";
import { getDemoData } from "/@/utils/testMsg";

const state = reactive({
  searchMsg: {
    num: '',
    date: '',
  },
  loading: false,
  demoData: [],
  dialogVisible: false,
  msgPane: {},
  page: {
    currentPage: 1,
    defaultPageSize: 100,
    pageSize: [100, 200, 300, 400],
    total: 350,
  }
})

const initSearch = () => {
  state.searchMsg = {
    num: null as any,
    date: '',
  }
}

const getData = async () => {
  try {
    state.loading = true;
    const res: any = await getDemoData();
    state.demoData = res.data;
  } catch (err) {
    console.log(err);
  }
  state.loading = false;
}

const msgEdit = (row: any) => {
  state.msgPane = {
    ...row,
  }
  console.log(state.msgPane)
  state.dialogVisible = true;
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

onMounted(() => {
  getData();
})
</script>

<style scoped lang="scss">
.demo-container {
  margin: 5px;
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  background: rgb(255, 255, 255, 0.5);
  .demo-top {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-bottom: 1px solid #d8d8d8;
    .demo-searchButton {
      display: inline-flex;
      gap: 10px;
    }
  }
  .demo-main {
    padding: 5px 15px;
    .demo-data {
      margin-bottom:10px;
      .demo-col {
        text-align: center;
      }
    }
  }
}
</style>