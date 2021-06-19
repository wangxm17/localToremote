import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/Layouts.vue'
import loginIn from '@/views/login/login.vue'

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
