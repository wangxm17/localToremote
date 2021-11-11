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
    return request({
      url: `/api/Permission/getRouter`,
      method: 'post'
    })
  },

  //父级字典
  fatherDict(){
    return request({
      url: `/api/DictType/fatherDict`,
      method: 'post'
    })
  },

  //查询分页
  page(params){
    return request({
      url: `/api/Permission/pageTwo`,
      method: 'post',
      data:params
    })
  },

  //详情
  selectByPrimaryKey(params){
    return request({
      url: `/api/Permission/selectByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //新增
  insert(params){
    return request({
      url: `/api/Permission/insert`,
      method: 'post',
      data:params
    })
  },

  //编辑
  updateByPrimaryKey(params){
    return request({
      url: `/api/Permission/updateByPrimaryKey`,
      method: 'post',
      data:params
    })
  },

  //删除
  deleteByPrimaryKey(params){
    return request({
      url: `/api/Permission/deleteByPrimaryKey`,
      method: 'post',
      data:params
    })
  }
}
