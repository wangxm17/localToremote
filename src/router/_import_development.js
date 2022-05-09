//字符串转为component组件辅助类
module.exports = (file) => require('@/views' + file + '.vue').default
