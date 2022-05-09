
const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],//默认路由
    topbarRouters: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      // state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = routes
      // state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      // 顶部导航菜单默认添加统计报表栏指向首页
      // const index = [{
      //   path: 'index',
      //   meta: { title: '统计报表', icon: 'dashboard'}
      // }]
      state.topbarRouters = routes.concat(index);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {

    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {

}

function filterChildren(childrenMap, lastRouter = false) {

}

export const loadView = (view) => {

}

export default permission
