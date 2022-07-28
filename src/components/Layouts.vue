<template>
  <el-container style="border: 1px solid #eee">
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
      <el-main class="CardBackground">
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
        return {

        };
      },
      created() {},
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
      }
    }
</script>

<style>
  .CardBackground{
    padding: 0px;
    background-color: #f0f2f5;
  }
</style>
