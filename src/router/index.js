import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/Layouts'
import loginIn from '@/views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Layouts',
      component: Layouts,
      children: [
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
      ]
    },
    /*登录*/
    {
      path: '/',
      name: 'login',
      component: loginIn
    }
  ]
})
