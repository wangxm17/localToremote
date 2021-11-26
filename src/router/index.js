import Vue from 'vue'
import Router from 'vue-router'
import Layouts from '@/components/Layouts'
import loginIn from '@/views/login/login'
// import store from '@/store/index'
import menu from "@/api/menu";

Vue.use(Router)
//公共路由
export const constanRoutes = [
  {
    path: '/',
    name: '登录',
    component: () => import('@/views/login/login')
  }
]


const router = new Router({
  mode:'history',
  // routes:store.state.children
  routes: constanRoutes
});
export default router;

