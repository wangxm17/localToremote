<template>
<div>
  <el-table
    :data="fileList"
    height="82vh"
    class="fileTable"
    @sort-change="tableSort"
    highlight-current-row
    @row-contextmenu="fileRightMenuShow"
  >
    <el-table-column label="名称" prop="name" align="left" :render-header="renderHeader" sortable="custom" width="300">
      <template slot-scope="scope" style="vertical-align: middle;position: relative;">
        <img :src="scope.row.icon" style="width: 20px;margin: 0;position: absolute;top: 6px;">
        <span style="color: #232222;margin-left: 25px;line-height: 24px;position: absolute;top: 6px;">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column label="修改日期" prop="update" align="left" width="160"></el-table-column>
    <el-table-column label="类型" prop="type" align="left" width="150"></el-table-column>
    <el-table-column label="大小" prop="size" align="left" width="130"></el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "rightFileTable",
  props:{
    fileList:{//文件数据
      type:Array,
      default:[]
    }
  },
  mounted() {
    // console.log(this.fileList);
  },
  data () {
    return {
      fileOrTableDataIcon:'el-icon-arrow-up',//
    }
  },
  methods:{
    //右键菜单
    fileRightMenuShow(row,column,event){
      event.stopPropagation();//防止冒泡
      event.preventDefault();//阻止默认事件
      this.$emit('fileRightMenuShow',row);
    },
    //自定义表头
    renderHeader(h){
      return h('div',null,[
        h('span',{
          on:{click: function () {}}
        },[
          h('span','名称'),
          h('span',{class:'caret-wrapper1',on:{click: function () {}}},
            [h('i',{class:this.fileOrTableDataIcon})])
        ])
      ])
    },
    //自定义表格排序
    tableSort({column,prop,order}){
      if(order == 'ascending'){
        this.fileOrTableDataIcon = 'el-icon-arrow-down'
        let list = this.orderOne(this.fileList);
        this.fileList = list;
      }else {
        this.fileOrTableDataIcon = 'el-icon-arrow-up'
        let list = this.orderTwo(this.fileList);
        this.fileList = list;
      }
    },
    orderOne(data){
      for(let i=0;i<data.length-1;i++){
        for(let j=0;j<data.length-1-i;j++){
          let dd = (data[j].name.localeCompare(data[j+1].name),'zh')
          if(dd>0){
            let temp =data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
          }
        }
      }
      return data;
    },
    orderTwo(data){
      for(let i=0;i<data.length-1;i++){
        for(let j=0;j<data.length-1-i;j++){
          let dd = (data[j].name.localeCompare(data[j+1].name),'zh')
          if(dd<0){
            let temp =data[j];
            data[j] = data[j+1];
            data[j+1] = temp;
          }
        }
      }
      return data;
    },
  }
}
</script>

<style lang="scss" scoped>
/deep/ .fileTable{
  font-size: 14px;
  cursor: pointer;
}
/deep/ .fileTable .caret-wrapper{
  display: none !important;
}
/deep/ .fileTable .caret-wrapper1{
  padding-left: 30%;
  position: absolute;
  top:-35%;
}
/deep/ .fileTable td, /deep/ .fileTable th.is-leaf {
  border-bottom: 0px solid #EBEEF5;
}
/deep/ .fileTable td, /deep/ .fileTable th {
  padding: 3px 0;
}
/deep/ .fileTable .el-table__header-wrapper th,/deep/ .fileTable .el-table__fixed-header-wrapper th{
  word-break: break-word;
  background-color: transparent;
  color: #737882;
  height: 40px;
  font-size: 13px;
}
/deep/ .fileTable th>.cell {
  border-right: 1px solid #e0e3e9;
}
/deep/ .fileTable::before{
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
/deep/ .el-table--medium td{
  padding: 0px 0;
}

/deep/ .fileTable .el-table__body tr.current-row>td {
  /*background-color: #114a89;*/
}
</style>
