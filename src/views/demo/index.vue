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
        <el-table stripe >
          <el-table-column label="Num" />
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
  </div>
</template>

<script setup lang="ts" name="demo">
import {reactive} from "vue";

const state = reactive({
  searchMsg: {
    num: '',
    date: '',
  },
  demoData: [],
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

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

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
    }
  }
}
</style>