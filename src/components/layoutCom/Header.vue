<template>
  <div>
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="LoginOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span v-if="name">{{name}}</span>
    <span v-else>王小虎</span>
  </div>

</template>

<script>
  import login from "@/api/system/login";
  import { mapGetters } from "vuex";
    export default {
      name: "Header",
      computed: {
        ...mapGetters({
          name: "name" //获取菜单数据
        }),
      },
      data() {
        return {
          otherQuery: "",
        };
      },
      methods: {
        //登出
        LoginOut() {
          login.loginOut().then(res => {
            this.$message.success(res.data)
            //清除缓存，跳转至登录页
            sessionStorage.removeItem('token')
            this.$router.push({ path: '/', query: this.otherQuery })
          })
        }
      }
    }
</script>

<style scoped>

</style>
