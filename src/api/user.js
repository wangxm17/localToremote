import request from '@/utils/request';

export default {

  //角色字典
  roleDict(){
    return request({
      url: `/api/DictType/roleDict`,
      method: 'post'
    })
  },

  //查询用户分页
  page(params){
    return request({
      url: `/api/User/page`,
      method: 'post',
      data:params
    })
  },

  //用户详情
  selectByPrimaryKey(params){
    return request({
      url: `/api/User/selectByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //用户新增
  insert(params){
    return request({
      url: `/api/User/insert`,
      method: 'post',
      data:params
    })
  },

  //用户编辑
  updateByPrimaryKey(params){
    return request({
      url: `/api/User/updateByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //用户删除
  deleteByPrimaryKey(params){
    return request({
      url: `/api/User/deleteByPrimaryKey`,
      method: 'post',
      data:params
    })
  }

}
