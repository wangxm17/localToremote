<template>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import user from "@/api/user";
    export default {
      name: "userTable",
      data() {
        return {
          tableData:[],
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
        }
      }
    }
</script>

<style scoped>

</style>
