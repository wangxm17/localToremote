<template>
  <el-menu
    :default-openeds="['1', '3']"
    @select="menuSelect"
  >
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-menu"></i>导航一</template>
      <el-menu-item index="/index/shouye">首页</el-menu-item>
      <el-menu-item index="/index/home">文本</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-message"></i>导航二</template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i>导航三</template>
    </el-submenu>
  </el-menu>
</template>

<script>
    export default {
      name: "Menu",
      data() {
        return {
          isCollapse: true
        };
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        //菜单选择【点击事件】
        menuSelect(index, indexPath) {
          this.$router.push(index)
        },
      }
    }

</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
