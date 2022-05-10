const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,//头像
  name: state => state.user.name,//用户名
  roles: state => state.user.roles,//角色
  permissions: state => state.user.permissions,//权限
  menuListAll: state => state.user.menu,//菜单
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
}
export default getters
