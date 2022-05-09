import Vue from 'vue'
import Vuex from 'vuex'
import menu from "@/api/menu";

Vue.use(Vuex)

const okk = [
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
  },
  {
    path: '/',
    name: '登录',
    component: () => import('@/views/login/login')
  }
];

export default new Vuex.Store({
  state: {
    token: '',  //初始化token
    children: [],  //初始化children
    childrenList: [
      {
        path: 'home',
        component: () => import('@/components/HelloWorld')
      },
      /*首页*/
      {
        path: 'shouye',
        component: () => import('@/views/shouye/index')
      },
      /*用户表*/
      {
        path: 'user',
        component: () => import('@/views/User/userTable')
      },
      /*角色表*/
      {
        path: 'role',
        component: () => import('@/views/Role/roleTable')
      },
      /*地图*/
      {
        path: 'map',
        component: () => import('@/views/map/map')
      }
    ],
    products: [
      {name: "马云", price: 200},
      {name: "马化腾", price: 140},
      {name: "马冬梅", price: 20},
      {name: "马蓉", price: 10},
    ]
  },
  mutations: {
    //存储token方法
    //设置token等于外部传递进来的值
    setToken(state, token) {
      state.token = token
      localStorage.token = token //同步存储token至localStorage
    },
    //设置路由
    setChildren(state, list) {
      // state.children = list
      // console.log(list)
      state.children = list
    },
  },
  getters: {
    //获取token方法
    //判断是否有token,如果没有重新赋值，返回给state的token
    getToken: (state) => {
      /*if (!state.token) {
        state.token = localStorage.getItem('token')
      }*/
      return state.token
    },
    getChildren: (state) => {
      return state.children
    },
    saleProducts: (state) => {
      var saleProducts = state.products.map(product => { // 这里就不需要this.$store了
        return {
          name: "**" + product.name + "**",
          price: product.price / 2
        };
      });
      return saleProducts
    }
  },
  actions: {}
})
