import request from '@/utils/request';

export default {
  //通过父级id获取
  selectByFatherId(fatherId){
    return request({
      url: `/api/File/selectByFatherId?fatherId=`+fatherId,
      method: 'get'
    })
  },

//通过id,获取父级文件的子集
  getFatherListById(id){
    return request({
      url: `/api/File/getFatherListById?id=`+id,
      method: 'get'
    })
  },

  //通过id,获取路径
  getPathById(id){
    return request({
      url: `/api/File/getPathById?id=`+id,
      method: 'get'
    })
  },

}
