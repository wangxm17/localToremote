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
      <el-main>
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
      created() {
        this.treeData()
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        treeData(){
          let childrenList = [
            {
              path: '/index',
              name: '系统管理',
              component: () => import('@/components/Layouts'),
              children: [
                {
                  path: 'home',
                  name: 'HelloWorld',
                  component: () => import('@/components/HelloWorld')
                },
                {
                  path: 'user',
                  name: '用户表',
                  component: () => import('@/views/User/userTable')
                },
                {
                  path: 'role',
                  name: '角色表',
                  component: () => import('@/views/Role/roleTable')
                },
                {
                  path: 'map',
                  name: '地图',
                  component: () => import('@/views/map/map')
                }
              ]
            },
            {
              path: '/One',
              name: '一级无子菜单',
              component: () => import('@/components/Layouts'),
              children: [
                {
                  path: 'shouye',
                  name: '首页',
                  component: () => import('@/views/shouye/index')
                }
              ]
            }
          ]
          //动态从后端获取路由
          this.$router.addRoutes(childrenList);
          // this.$store.commit('setChildren', childrenList);
        }
      }
    }
</script>

<style>
  .el-main{
    padding: 0px;
  }
</style>
