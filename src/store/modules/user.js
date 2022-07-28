import login from "@/api/system/login";
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],//角色
    permissions: [],//角色权限
    menu:[],//菜单集合
    userInfo:[],//用户基本信息
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      sessionStorage.setItem('token',token);
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      // state.menu = JSON.parse(menu);
      // sessionStorage.setItem('menu',JSON.stringify(menu));
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const params = {
        username:userInfo.username.trim(),
        password:userInfo.password,
        code:userInfo.code
      }
      return new Promise((resolve, reject) => {
        login.login(params).then(res => {
          if(res.code == 0){
            // setToken(res.data)
            // console.log(getToken('Admin-Token'))
            commit('SET_TOKEN', res.data.token);//tokon
            commit('SET_MENU', res.data.userInfo.menu);//菜单
            commit('SET_USER', res.data.userInfo.user);//用户
            commit('SET_ROLES', res.data.userInfo.role);//角色
            commit('SET_NAME', res.data.userInfo.user.userName);//用户名
            resolve()
          }else {
            reject(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      login.getInfo().then(res => {
        resolve(res)
      }).catch(error => {
        // reject(error)
      })
    },

    // 退出系统
    LogOut({ commit, state }) {

    },

    // 前端 登出
    FedLogOut({ commit }) {

    }
  }
}

export default user
