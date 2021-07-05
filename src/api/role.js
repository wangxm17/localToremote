import request from '@/api/request';

export default {

  //查询角色分页
  page(params){
    return request({
      url: `/api/Role/page`,
      method: 'post',
      data:params
    })
  },

  //角色详情
  selectByPrimaryKey(params){
    return request({
      url: `/api/Role/selectByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //角色新增
  insert(params){
    return request({
      url: `/api/Role/insert`,
      method: 'post',
      data:params
    })
  },

  //角色编辑
  updateByPrimaryKey(params){
    return request({
      url: `/api/Role/updateByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //角色删除
  deleteByPrimaryKey(params){
    return request({
      url: `/api/Role/deleteByPrimaryKey`,
      method: 'post',
      data:params
    })
  }

}
