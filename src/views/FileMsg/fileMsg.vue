<template>
  <div style="overflow: hidden">
    <!--左侧树-->
    <el-col :span="4">
      <left-tree :treeData="treeData"></left-tree>
    </el-col>

    <!--右侧文件-->
    <el-col :span="20">
      <!--文件管理抬头-->
<!--      <div></div>-->
      <div @dragover="fileDragover" @drop="fileDrop" class="fileContent">
        <!--图形形式-->
        <right-file-img v-show="imgOrTable" :fileList="fileList"></right-file-img>
        <!--列表形式-->
        <right-file-table v-show="!imgOrTable" :fileList="fileList"></right-file-table>
      </div>
      <!--文件管理转换页尾-->
      <div class="fileFooter">
        <i title="在窗口显示每一项的信息。" @click="imgOrTable=false" class="el-icon-s-order btn2" :class="!imgOrTable ? 'active' : 'btn1'"></i>
        <i title="使用大缩略图显示项。" @click="imgOrTable=true" class="el-icon-s-platform btn1" :class="imgOrTable ? 'active' : 'btn1'"></i>
      </div>
    </el-col>
  </div>
</template>

<script>
import leftTree from '@/views/FileMsg/components/leftTree' //左侧树
import rightFileImg from '@/views/FileMsg/components/rightFileImg' //右侧文件--图片展示
import rightFileTable from '@/views/FileMsg/components/rightFileTable' //右侧文件--列表展示
import fileIconKeyValue from '@/api/FileMsg/fileIconKeyValue' //右侧文件--图片图标
import fileList from '@/api/FileMsg/fileList' //右侧文件--图片图标

export default {
  name: 'fileMsg',
  components: {
    leftTree,rightFileImg,rightFileTable
  },
  data () {
    return {
      //树的数据
      treeData:[
        {label: "我的调研", open: true, children: [{label: "基础信息"}]},
        {label: "你的调研", open: true, children: [{label: "采集系统"}, {label: "收集系统"}]},
        {label: "一级 3", open: true, children: [{label: "二级 3-1"}, {label: "二级 3-2"}]}
        ],
      //文件数据集
      fileList: fileList,
      imgOrTable:true,//图形形式|列表形式转换参数(默认是图片形式)
    }
  },
  mounted() {
    // console.log(iconKeyValue);
    this.setFileIcon(this.fileList);
  },
  methods:{
    //设置文件图标
    setFileIcon:function(newData){
      for(let item in newData){
        let fileExtension = newData[item].name.split('.').pop().toLowerCase();//获取文件后缀
        for(let key in fileIconKeyValue){
          if(fileExtension == key){
            let icon =fileIconKeyValue[key]
            this.$set(newData[item],'icon',require('@/assets/file/'+icon))
          }
        }
      }
    },
    // 拖拽上传
    fileDragover (e) {
      e.preventDefault()
    },
    fileDrop (e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
      console.log(file)
      console.log('拖拽释放鼠标时')

      if (!file) return
      if (file.size > (10 * 1000 * 1000)) {
        return alert('文件大小不能超过10M')
      }
      console.log(iconKeyValue)
      // this.imgListOne.push({
      //   id:'',
      //   name:file.name,
      //   icon:''
      // })
      // this.batchFile = file
      // this.fileName = file.name
    },
  }
}
</script>

<style lang="scss" scoped>
  //文件管理正文
  .fileContent{
    overflow-y: auto;
    height: 90vh;
  }
  //文件管理转换页尾
  .fileFooter{
    position: fixed;
    right: 4vh;
    bottom: 3vh;

    i{
      border: transparent solid 0.5px;
      color: rgba(119, 119, 119, 0.35);
      &:hover{
        border: rgba(121, 175, 241, 1) solid 0.5px;
        color: rgba(121, 175, 241, 1);
      }
    }
    .btn1.active, .btn2.active {
      border: rgba(121, 175, 241, 1) solid 0.5px;
      color: rgba(121, 175, 241, 1);
    }
  }
</style>
