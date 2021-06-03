<template>
  <el-container style="height: 1000px; border: 1px solid #eee">
    <el-aside width="200px" >
      <!--菜单-->
      <Menu style="height: 100%;"></Menu>
    </el-aside>
    <el-container>
      <!--导航标题-->
      <el-header style="text-align: right; font-size: 12px;border: 1px solid #eee" >
        <Header style="margin-top: 20px"/>
      </el-header>
      <!--主内容-->
      <el-main style="padding: 20px">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Menu from '@/components/layoutCom/Menu.vue'
  import Header from '@/components/layoutCom/Header.vue'

    export default {
      name: "Layouts",
      components: {
        Menu,
        Header
      },
      data() {
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          tableData: Array(20).fill(item)
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
</style>
