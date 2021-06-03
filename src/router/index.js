import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/Layouts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layouts',
      component: Layouts,
      children: [
        {
          path: 'home/index',
          component: () => import('@/components/HelloWorld')
        },
        /*首页*/
        {
          path: 'shouye/index',
          component: () => import('@/views/shouye/index')
        }
      ]
    }
  ]
})
