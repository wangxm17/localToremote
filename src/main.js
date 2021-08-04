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
Vue.use(ElementUI);
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$store = store

new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
