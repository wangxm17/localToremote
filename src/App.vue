<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  export default {
    name: 'App',
    /**
     * 当页面刷新时vuex存储的数据会消失，因此一般使用sessionStorage处理
     */
    mounted() {
      // debugger
      // window.addEventListener("unload", () => {
      //   debugger
      //   console.log(this.$router)
      // });
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
              path: 'fileMsg',
              name: '我的文件',
              component: () => import('@/views/FileMsg/fileMsg')
            },
            {
              path: 'fileChoose',
              name: '目录选择',
              component: () => import('@/views/fileExport/fileChoose')
            },
            {
              path: 'fileExport',
              name: '文件导出',
              component: () => import('@/views/fileExport/fileExport')
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
              path: 'menu',
              name: '菜单表',
              component: () => import('@/views/Menu/menuTable')
            },
            {
              path: 'map',
              name: '地图',
              component: () => import('@/views/map/map')
            },
            {
              path: 'dynamicBinding',
              name: '参数动态绑定',
              component: () => import('@/views/dynamicBinding/dynamicBinding')
            },
            {
              path: 'testDemo',
              name: 'testDemo',
              component: () => import('@/views/testDemo/testDemo')
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
      this.$router.addRoutes(childrenList);
      this.$store.commit("SET_DEFAULT_ROUTES",childrenList);//设置默认路由
      // console.log("我运行了")
      // sessionStorage.removeItem("store");
      // sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      // sessionStorage.setItem('state', JSON.stringify(this.$store.state));
    },
    methods: {},
  }
</script>

<style>
  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
  /*#app{
    background-color: #161e43;
  }*/
</style>
