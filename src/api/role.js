import request from '@/api/request';

export default {

  //菜单字典
  menuDict(){
    return request({
      url: `/api/DictType/menuDict`,
      method: 'post',
    })
  },

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
  },
  /*****************************权限配置*****************************/
  //rid查询全部pid
  selectPidByRid(rid){
    return request({
      url: `/api/RolePermission/selectPidByRid?rid=`+rid,
      method: 'post'
    })
  },

  //根据rid权限配置
  editByRid(rid,allPid){
    return request({
      url: `/api/RolePermission/editByRid?rid=`+rid+'&&allPid='+allPid,
      method: 'post'
    })
  },
}
