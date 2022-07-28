<template>
  <!-- <div class="login-container">
     <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
       <div class="title-container">
         <h3 class="title">
           系统登录
         </h3>
       </div>
       <el-form-item prop="username">
         <el-input
           prefix-icon="el-icon-user"
           v-model="loginForm.username"
         ></el-input>
       </el-form-item>
       <el-form-item prop="password">
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
       <el-form-item prop="code">
         <el-row>
           <el-col :span="16">
             <el-input
               @keyup.enter.native="handleLogin"
               v-model="loginForm.code"
               maxlength="4"
             ></el-input>
           </el-col>
           <el-col :span="8">
             <img
               style="border: cadetblue solid 1px;height: 40px;"
               :src="codeUrl"
               alt=""
               @click="getCode()"
             >
           </el-col>
         </el-row>
       </el-form-item>
       <el-form>
         <el-button @click.prevent="handleLogin">登录</el-button>
         <el-button @click.prevent="toIndex">注册</el-button>
       </el-form>
     </el-form>
   </div>-->

  <div class="snow-container">
    <!--表单1111上传到gitee,再测试一下-->
    <!--表单1111上传到gitee,再测试一下-->
    <!--表单1111上传到gitee,再测试一下-->
    <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules">
      <div class="title-container">
        <h3 class="title">
          系统登录
        </h3>
      </div>
      <el-form-item prop="username">
        <el-input
          prefix-icon="el-icon-user"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
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
      <el-form-item prop="code">
        <el-row>
          <el-col :span="16">
            <el-input
              @keyup.enter.native="handleLogin"
              v-model="loginForm.code"
              maxlength="4"
            ></el-input>
          </el-col>
          <el-col :span="8">
            <img
              style="border: cadetblue solid 1px;height: 40px;"
              :src="codeUrl"
              alt=""
              @click="getCode()"
            >
          </el-col>
        </el-row>
      </el-form-item>
      <el-form>
        <el-button @click.prevent="handleLogin">登录</el-button>
        <el-button @click.prevent="toIndex">注册</el-button>
      </el-form>
    </el-form>
    <!--雪花效果-->
    <div class="snow foreground"></div>
    <div class="snow foreground layered"></div>
    <div class="snow middleground"></div>
    <div class="snow middleground layered"></div>
    <div class="snow background"></div>
    <div class="snow background layered"></div>

  </div>
</template>

<script>
  import login from "@/api/system/login";

  export default {
    name: "LoginIn",
    data() {
      return {
        otherQuery: "",
        loginForm: {
          username: '',//账号
          password: '',//密码
          code: '',//验证码
        },
        loginRules: {
          username: [
            { required: true, trigger: "blur", message: "请输入您的账号" }
          ],
          password: [
            { required: true, trigger: "blur", message: "请输入您的密码" }
          ],
          code: [{ required: true, trigger: "change", message: "请输入验证码" }]
        },
        passwordIcon: 'el-icon-view',
        seen: '',
        pwdType: 'password', // 密码类型
        openeye: require('@/assets/view.png'), //图片地址
        nopeneye: require('@/assets/view_off.png'), //图片地址
        codeUrl: '',//验证码
        userToken: ''
      };
    },
    created() {
      // window.addEventListener('keydown',this.handleLogin);
    },
    mounted() {
      // window.addEventListener('keydown',this.handleLogin);
      this.getCode()
    },
    methods: {
      //点击小眼睛，密码显示与否
      changeType() {
        this.pwdType = this.pwdType === 'password' ? 'text' : 'password';
        this.seen = !this.seen;//小眼睛的变化
      },
      //获取验证码
      getCode() {
        login.getCodeImg().then(response => {
          this.codeUrl = window.URL.createObjectURL(response.data)
        });
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if(valid){
            this.$store.dispatch("Login", this.loginForm).then(() => {
              // this.$router.push({ path: this.redirect || "/" }).catch(()=>{});
              this.$message.success("登录成功");
              this.toIndex()
            }).catch(res => {
              // console.log(res)
              this.$message.error(res);
              this.getCode()
            });
          }

        })
      },
      toIndex() {
        //跳转到首页
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
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    /*z-index: 2;*/
    pointer-events: none;
    background: url("../../assets/loginBg.jpeg");

    .login-form {
      /*z-index: 9;*/
      position: relative;
      width: 20%;
      max-width: 100%;
      padding: 3% 4%;
      margin: 12% 9% 9% 57%;
      text-align: center;
      background: rgba(255,255,255,0.3);
      border-radius: 4px;
      border: cadetblue solid 1px;
      /*opacity: 0.9;*/
      .title-container {
        text-align: center;
        .title {
          font-size: 26px;
          color: $light_gray;
        }
      }
    }
  }


  .snow-container {
    position: absolute;
    height: 100%;
    width: 100%;
    max-width: 100%;
    top: 0;
    left: 0;
    overflow: hidden;
    z-index: 2;
    /*pointer-events: none;*/
    background: url("../../assets/loginBg.jpeg");
    .login-form {
      z-index: 9;
      position: relative;
      width: 20%;
      max-width: 100%;
      padding: 3% 4%;
      margin: 12% 9% 9% 57%;
      text-align: center;
      background: rgba(255,255,255,0.3);
      border-radius: 7%;
      border: cadetblue solid 1px;
      /*opacity: 0.9;*/
      .title-container {
        text-align: center;
        .title {
          font-size: 26px;
          color: $light_gray;
        }
      }
    }
  }
  .snow {
    display: block;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
    -webkit-animation: snow linear infinite;
    animation: snow linear infinite;
    overflow: hidden;
  }
  .snow.foreground {
    background-image: url("../../assets/snow-large-075d267ecbc42e3564c8ed43516dd557.png");
    -webkit-animation-duration: 15s;
    animation-duration: 15s;
  }
  .snow.foreground.layered {
    -webkit-animation-delay: 7.5s;
    animation-delay: 7.5s;
  }
  .snow.middleground {
    background-image: url(../../assets/snow-medium-0b8a5e0732315b68e1f54185be7a1ad9.png);
    -webkit-animation-duration: 20s;
    animation-duration: 20s;
  }
  .snow.middleground.layered {
    -webkit-animation-delay: 10s;
    animation-delay: 10s;
  }
  .snow.background {
    background-image: url(../../assets/snow-small-1ecd03b1fce08c24e064ff8c0a72c519.png);
    -webkit-animation-duration: 25s;
    animation-duration: 25s;
  }
  .snow.background.layered {
    -webkit-animation-delay: 12.5s;
    animation-delay: 12.5s;
  }
  @-webkit-keyframes snow {
    0% {
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      -webkit-transform: translate3d(5%, 100%, 0);
      transform: translate3d(5%, 100%, 0);
    }
  }
  @keyframes snow {
    0% {
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      -webkit-transform: translate3d(5%, 100%, 0);
      transform: translate3d(5%, 100%, 0);
    }
  }

</style>
