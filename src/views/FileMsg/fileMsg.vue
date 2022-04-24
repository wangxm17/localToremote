<template>
  <div class="fileMsg">
    <!--文件管理抬头-->
    <file-header :fileUrlArr="fileUrlArr" class="header"></file-header>
    <!--左侧树-->
    <el-col :span="4" class="leftTree">
      <left-tree :treeData="treeData" class="leftTreeContent"></left-tree>
    </el-col>
    <!--右侧文件-->
    <el-col :span="20">
      <div @dragover="fileDragover" @drop="fileDrop" class="fileContent" @click="cleanChecked()" @contextmenu.prevent="nullRightMenuShow" >
        <!--图形形式-->
        <right-file-img v-show="imgOrTable" :fileList="fileList" @fileRightMenuShow="fileRightMenuShow" @fileDirDblclick="fileDirDblclick"></right-file-img>
        <!--列表形式-->
        <right-file-table v-show="!imgOrTable" :fileList="fileList" @fileRightMenuShow="fileRightMenuShow" @fileDirDblclick="fileDirDblclick"></right-file-table>
      </div>
    </el-col>

    <!--文件管理转换页尾-->
    <file-footer :imgOrTable="imgOrTable" @imgOrTableSet="imgOrTableSet"></file-footer>

    <!--点击文件，出现右击菜单-->
    <Contextmenu ref="fileRightMenu" class="context-menu">
      <li @click="test1" class="el-icon-view"><span>预览</span></li>
      <li @click="test2" class="el-icon-edit"><span>重命名</span></li>
      <li @click="cleanChecked" class="el-icon-delete"><span>删除</span></li>
    </Contextmenu>
    <!--点击空白，出现右击菜单-->
    <Contextmenu ref="nullRightMenu" class="context-menu">
      <li @click="test2" class="el-icon-refresh"><span>刷新</span></li>
      <li @click="test1" class="el-icon-folder-add"><span>新建文件夹</span></li>
    </Contextmenu>
  </div>
</template>

<script>
import fileHeader from '@/views/FileMsg/components/fileHeader' //抬头
import leftTree from '@/views/FileMsg/components/leftTree' //左侧树
import {fileList,treeList} from '@/api/FileMsg/fileData' //--模拟数据
import rightFileImg from '@/views/FileMsg/components/rightFileImg' //右侧文件--图片展示
import rightFileTable from '@/views/FileMsg/components/rightFileTable' //右侧文件--列表展示
import fileIconKeyValue from '@/api/FileMsg/fileIconKeyValue' //右侧文件--图片图标
import fileFooter from '@/views/FileMsg/components/fileFooter' //页尾
import Contextmenu from 'vue-context-menu'//右键菜单

export default {
  name: 'fileMsg',
  components: {
    fileHeader,leftTree,rightFileImg,rightFileTable,fileFooter,Contextmenu
  },
  data () {
    return {
      //树的数据
      // treeData:[
      //   {label: "我的调研", open: true, children: [{label: "基础信息"}]},
      //   {label: "你的调研", open: true, children: [{label: "采集系统"}, {label: "收集系统",children: [{label: "采集系统"}, {label: "收集系统"}]}]},
      //   {label: "一级 3", open: true, children: [{label: "二级 3-1"}, {label: "二级 3-2"}]}
      //   ],
      treeData:treeList,//树的数据
      fileList: fileList,//文件数据集
      imgOrTable:true,//图形形式|列表形式转换参数(默认是图片形式)
      operationObj:{},//操作对象
      fileUrlArr:[  //文件路径--所有对象
        {id:'1',rightIcon:"el-icon-arrow-right",name:'Users'},
        {id:'2',rightIcon:"el-icon-arrow-right",name:'82060'},
        {id:'3',rightIcon:"el-icon-arrow-right",name:'Desktop'},
        {id:'4',rightIcon:"el-icon-arrow-right",name:'ruoyi-ui'},
      ],
    }
  },
  mounted() {
    // console.log(iconKeyValue);
    this.setFileIcon(this.fileList);//右侧文件--图形形式|列表形式--设置文件图标
  },
  methods:{
    //右侧文件--图形形式|列表形式--设置文件图标
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
      return newData;
    },
    //右侧文件--图形形式--点击空白，置空图片选中状态
    cleanChecked(){
      this.fileList.forEach(item => {
        item.isChecked = false;
      })
    },
    //页尾--图形形式|列表形式转换方法
    imgOrTableSet(param){
      this.imgOrTable = param;
    },
    test1(){console.log("test11111111111111")},
    test2(){console.log("test22222222222222")},

    //双击---文件夹点进去
    fileDirDblclick(param){
      if(param.name.split('.').pop().toLowerCase()=="dir"){
        if(param.children){
          this.fileList = this.setFileIcon(param.children)
        }else {
          this.fileList = [];
        }
      }else {
        this.$message.warning("不是文件夹")
      }
    },
    //点击空白，出现右击菜单
    nullRightMenuShow() {
      this.cleanChecked();
      this.$refs.nullRightMenu.open()
    },
    //点击文件，出现右击菜单
    fileRightMenuShow(param) {
      this.operationObj = param;
      this.$refs.fileRightMenu.open()
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
  .fileMsg{
    padding: 1vh;
    overflow: hidden;
    background-color: #f0f2f5;
    //抬头
    .header{
      background-color: #ffffff;
      padding-bottom: 1vh;
      border-radius: 7px 7px 0px 0px;
    }
    //左侧树
    .leftTree{
      background-color: #ffffff;
      border-radius: 0px 0px 0px 7px;
      border-right: rgba(147, 180, 220, 0.35) solid 0.5px;
      height: 82vh;
      overflow-y: auto;
      .leftTreeContent{
        margin-top: 3vh;
      }
    }
    //文件管理正文
    .fileContent{
      border-radius: 0px 0px 7px 0px;
      overflow-y: auto;
      height: 82vh;
      padding-left: 2vh;
      background-color: #ffffff;
    }
  }

</style>
