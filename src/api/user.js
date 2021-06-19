import request from '@/api/request';

export default {
  //查询用户
  getUserAll(){
    return request({
      url: `/api/try/getAll`,
      method: 'post'
    })
  }

}
