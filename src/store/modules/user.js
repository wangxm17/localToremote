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

    },

    // 获取用户信息
    GetInfo({ commit, state }) {

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
