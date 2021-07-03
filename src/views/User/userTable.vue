<template>
  <el-container class="AppBackground">
    <el-header style="text-align:center;">
      <p style="font-size:24px;">用户管理</p>
    </el-header>
    <!--<el-header style="background-color:#FFFFFF;padding: 5px 0 5px 0px;height:100%;">
      <span style="margin-left:10px;">申报年份：</span>
      <el-date-picker
        type="year"
        style="width:150px;"
        placeholder="选择年"
        value-format="yyyy"
      />
    </el-header>-->
    <el-main style="padding:20px 0px 0px 0px;">
      <el-table
        :data="tableData"
        style="width: 100%"
        size="medium"
      >
        <el-table-column type="index" align="center" label="序号"></el-table-column>
        <el-table-column prop="username" align="center" label="姓名"></el-table-column>
        <el-table-column prop="password" align="center" label="密码"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
            <el-button type="primary" size="small" icon="el-icon-edit" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </el-main>

  </el-container>
</template>

<script>
  import user from "@/api/user";
  export default {
    name: "userTable",
    data() {
      return {
        tableData:[],
        currentPage4: 4,
      }
    },
    mounted() {
      this.getUserAll()
    },
    methods:{
      getUserAll(){
        user.getUserAll({})
          .then((res) => {
            this.tableData = res.data
          })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style scoped>

</style>
