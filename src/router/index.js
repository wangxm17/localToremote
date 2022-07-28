import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layouts'
import store from '@/store/index'
// const _import = require('./_import_development.js') //获取组件的方法

Vue.use(Router)
//公共路由11
export const constanRoutes = [
  {
    path: '/',
    name: '登录',
    component: () => import('@/views/login/login')
  }
]
let getRouter = []; //用来获取后台拿到的路由
//新建路由
const router = new Router({
  mode:'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: constanRoutes //默认登录页
});



//路由跳转之前
router.beforeEach((to, from, next) => {
  getRouter = store.getters.defaultRoutes; //获取路由数据
  // let token = store.getters.token  //获取token
  let token = sessionStorage.getItem('token');  //获取token
  if (to.path!='/' && !token) { //不加这个判断，路由会陷入死循环（是否登录）--未登录
    console.log("未登录")
    next('/');//登录页
  }else {
    console.log("已登录")
    if(getRouter.length > 0){ //防止重复添加路由
      next();
    }else {
      // 动态路由，拉取菜单
      loadMenus(next, to)
    }
  }
})

function loadMenus (next, to){
  //写死的数据
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
  router.addRoutes(childrenList) // 添加可访问路由表
  store.commit("SET_DEFAULT_ROUTES",childrenList);//设置默认路由

  // console.log(router)
  // console.log(childrenList);


  //动态路由测试数据
  let childrenListTwo = [
    {
      path: '/index',
      name: '系统管理',
      component: 'Layout',
      children: [
        {
          path: 'fileMsg',
          name: '我的文件',
          component: '@/views/FileMsg/fileMsg'
        },
        {
          path: 'fileChoose',
          name: '目录选择',
          component: '@/views/fileExport/fileChoose'
        },
        {
          path: 'fileExport',
          name: '文件导出',
          component: '@/views/fileExport/fileExport'
        },
        {
          path: 'user',
          name: '用户表',
          component: '@/views/User/userTable'
        },
        {
          path: 'role',
          name: '角色表',
          component: '@/views/Role/roleTable'
        },
        {
          path: 'menu',
          name: '菜单表',
          component: '@/views/Menu/menuTable'
        },
        {
          path: 'map',
          name: '地图',
          component: '@/views/map/map'
        },
        {
          path: 'dynamicBinding',
          name: '参数动态绑定',
          component: '@/views/dynamicBinding/dynamicBinding'
        },
        {
          path: 'testDemo',
          name: 'testDemo',
          component: '@/views/testDemo/testDemo'
        }
      ]
    },
    {
      path: '/One',
      name: '一级无子菜单',
      component: 'Layout',
      children: [
        {
          path: 'shouye',
          name: '首页',
          component: '@/views/shouye/index'
        }
      ]
    }
  ]
  let asyncRouter = filterAsyncRouter(childrenListTwo);//设置动态路由
  // router.addRoutes(asyncRouter) // 动态添加可访问路由表

  // console.log(router)
  // next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
  next()
}

//过滤路由
function filterAsyncRouter (asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component == 'Layout') {
        route.component = Layout
      } else {
        route.component = loadView(route.component) //字符串转为component组件
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

//懒加载
const loadView = (view) => {
  // return () => import(`${view}.vue`);
  // return resolve=>(require([`${view}.vue`],resolve));
}

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   return originalPush.call(this, location).catch(err => err)
// }

export default router;

