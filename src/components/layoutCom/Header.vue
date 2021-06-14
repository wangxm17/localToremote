<template>
  <div>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="LoginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>王小虎</span>
  </div>

</template>

<script>
    export default {
      name: "Header",
      data() {
        return {
          otherQuery: "",
        };
      },
      methods: {
        LoginOut() {
          this.$router.push({ path: '/', query: this.otherQuery })
        }
      }
    }
</script>

<style scoped>

</style>
