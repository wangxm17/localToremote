import request from '@/api/request';

export default {

  //路由
  page(){
    return request({
      url: `/api/Permission/getPermissionTree`,
      method: 'post'
    })
  }
}
