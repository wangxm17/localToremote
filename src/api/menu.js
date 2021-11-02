import request from '@/api/request';

export default {

  //路由
  getPermissionTree(){
    return request({
      url: `/api/Permission/getPermissionTree`,
      method: 'post'
    })
  },

  //路由
  getRouter(){
    // return request({
    //   url: `/api/Permission/getRouter`,
    //   method: 'post'
    // })
    let tset;
    request({
        url: `/api/Permission/getRouter`,
        method: 'post'
    }).then((res) => {
      console.log(res)
      tset = res
      // return res
    })
    return tset
  }
}
