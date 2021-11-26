import request from '@/utils/request';
import axios from 'axios'

export default {

  //登录
  login(){

  },

  //注册
  register(){

  },

  //获取用户详细信息
  getInfo(){

  },

  //退出方法
  logout(){

  },

  //获取验证码
  getCodeImg(){
    // return request({
    //   url: `/api/captchaImage`,
    //   method: 'get',
    //   responseType: 'blob'
    // })
    return axios.get(
      '/api/captchaImage',
      {responseType: 'blob'}
      )
  },

  captchaImageOne(){
    return request({
      url: `/api/captchaImageOne`,
      method: 'get'
    })
  },


}
