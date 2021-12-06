import router from './router'
// import { Message } from 'element-ui'
import axios from 'axios'
// const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layouts from '@/components/Layouts'


var getRouter //用来获取后台拿到的路由

// 假装fakeRouter是通过后台接口请求回来的数据
let fakeRouter = {
  "router": [
    {
      "path": "",
      "component": "Layout",
      "redirect": "dashboard",
      "children": [{
        "path": "dashboard",
        "component": "dashboard/index",
        "meta": {
          "title": "首页",
          "icon": "dashboard"
        }
      }]
    },
    {
      "path": "/example",
      "component": "Layout",
      "redirect": "/example/table",
      "name": "Example",
      "meta": {
        "title": "案例",
        "icon": "example"
      },
      "children": [{
        "path": "table",
        "name": "Table",
        "component": "table/index",
        "meta": {
          "title": "表格",
          "icon": "table"
        }
      },
        {
          "path": "tree",
          "name": "Tree",
          "component": "tree/index",
          "meta": {
            "title": "树形菜单",
            "icon": "tree"
          }
        }
      ]
    },
    {
      "path": "/form",
      "component": "Layout",
      "children": [{
        "path": "index",
        "name": "Form",
        "component": "form/index",
        "meta": {
          "title": "表单",
          "icon": "form"
        }
      }]
    },
  ],
  "routerOne": [
    {
      path: '/index',
      name: '系统管理',
      component: '@/components/Layouts',
      children: [
        {
          path: 'home',
          name: 'HelloWorld',
          component: '@/components/HelloWorld'
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
          path: 'map',
          name: '地图',
          component: '@/views/map/map'
        }
      ]
    },
    {
      path: '/One',
      name: '一级无子菜单',
      component: '@/components/Layouts',
      children: [
        {
          path: 'shouye',
          name: '首页',
          component: '@/views/shouye/index'
        }
      ]
    }
  ]
}
router.beforeEach((to, from, next) => {
  console.log('----------ffffffffffff-----------------')
  // console.log(getRouter)
  if (!getRouter) { //不加这个判断，路由会陷入死循环
    if (!getObjArr('router')) {
      getRouter = fakeRouter.routerOne //假装模拟后台请求得到的路由数据
      console.log(getRouter)
      saveObjArr('router', getRouter) //存储路由到localStorage
      routerGo(to, next) //执行路由跳转方法
      // })
    } else { //从localStorage拿到了路由
      getRouter = getObjArr('router') //拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }

  // next()
})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({...to, replace: true})
  console.log(getRouter)
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === '@/components/Layouts') { //Layout组件特殊处理
        route.component = Layouts
      } else {
        route.component = resolve => require([`${route.component}`],resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
