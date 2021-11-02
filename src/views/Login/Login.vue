<template>
  <div class="login-container">
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
      </div>
      <el-form-item>
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.name"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          prefix-icon="el-icon-lock"
          v-model="loginForm.password"
          id="tubiao1"
          :type="pwdType"
        ></el-input>
        <img
          :src="seen?openeye:nopeneye"
          class="eye"
          alt=""
          @click="changeType()"
          id="tubiao2"
        >
      </el-form-item>
      <el-form>
        <el-button @click.prevent="toIndex">登录</el-button>
        <el-button @click.prevent="toIndex">注册</el-button>
      </el-form>
    </el-form>

  </div>
</template>

<script>
  import request from '@/api/request';
  export default {
    name: "LoginIn",
    data() {
      return {
        otherQuery: "",
        loginForm: {
          name: '',
          password: '',
        },
        passwordIcon: 'el-icon-view',
        seen: '',
        pwdType: 'password', // 密码类型
        openeye: require('@/assets/view.png'), //图片地址
        nopeneye: require('@/assets/view_off.png'), //图片地址
        userToken: ''
      };
    },
    methods: {
      //点击小眼睛，密码显示与否
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
        this.seen = !this.seen;//小眼睛的变化
      },
      toIndex() {
        this.userToken = 'Bearer ' + 'yitoewhoitfho'
        this.$store.commit('setToken', JSON.stringify(this.userToken));//设置tokon
        let childrenList = [
          {
            path: '/index',
            name: '系统管理',
            component: () => import('@/components/Layouts'),
            children: [
              {
                path: 'home',
                name: 'HelloWorld',
                component: () => import('@/components/HelloWorld')
              },
              {
                path: 'user',
                name: '用户表',
                component: () => import('@/views/User/userTable')
              },
              {
                path: 'role',
                name: '角色表',
                component: () => import('@/views/Role/roleTable')
              },
              {
                path: 'map',
                name: '地图',
                component: () => import('@/views/map/map')
              }
            ]
          },
          {
            path: '/One',
            name: '一级无子菜单',
            component: () => import('@/components/Layouts'),
            children: [
              {
                path: 'shouye',
                name: '首页',
                component: () => import('@/views/shouye/index')
              }
            ]
          }
        ]
        //动态从后端获取路由
        this.$router.addRoutes(childrenList);
        this.$store.commit('setChildren', childrenList);
        console.log()
        this.$router.push({path: '/One/shouye', query: this.otherQuery})
      }
    }
  }
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  #tubiao1 {
    position: relative;
  }

  #tubiao2 {
    position: absolute;
    right: 5px;
    top: 10px;
    z-index: 5;
    background-repeat: no-repeat;
    background-position: 0px 0px;
    width: 20px;
    height: 20px;
  }

  .login-container {
    width: 100%;
    background-color: $bg;
    height: 910px;
    overflow: hidden;
    overflow-y: hidden;

    .login-form {
      position: relative;
      width: 20%;
      max-width: 100%;
      padding: 10% 0 0;
      margin: 0 auto;
      text-align: center;

      .title-container {
        text-align: center;

        .title {
          font-size: 26px;
          color: $light_gray;
        }
      }

    }
  }


</style>
