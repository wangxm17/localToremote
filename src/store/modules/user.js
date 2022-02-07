import login from "@/api/system/login";
import { getToken, setToken, removeToken } from '@/utils/auth'
const user = {
  state: {
    token: '',
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
    }
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
            setToken(res.data)
            console.log(getToken('Admin-Token'))
            commit('SET_TOKEN', res.data)
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
