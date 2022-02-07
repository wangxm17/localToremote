import request from '@/utils/request';
import axios from 'axios'

export default {

  //登录
  login(params){
    return request({
      url: `/api/login`,
      method: 'post',
      data:params
    })
  },

  //注册
  register(){

  },

  //获取用户详细信息
  getInfo(){
    return request({
      url: '/api/getInfo',
      method: 'get'
    })
  },

  //退出方法
  logout(){

  },

  //获取验证码
  getCodeImg(){
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
