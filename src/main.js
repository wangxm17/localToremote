// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/global.css"  //引入全局样式
import store from './store/index'

// import axios from 'axios'

// Vue.prototype.$http= axios
//element
Vue.use(ElementUI);
//echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
//store
Vue.prototype.$store = store
//右击菜单
import VueContextMenu from 'vue-contextmenu'
Vue.use(VueContextMenu)
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
