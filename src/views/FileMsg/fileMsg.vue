<template>
  <div class="fileMsg">
    <!--文件管理抬头-->
    <file-header :fileUrlArr="fileUrlArr" @selectByFatherId="selectByFatherId" @getFatherListById="getFatherListById" class="header"></file-header>
    <!--左侧树-->
    <el-col :span="4" class="leftTree">
      <left-tree :treeData="treeData" @selectByFatherId="selectByFatherId" class="leftTreeContent"></left-tree>
    </el-col>
    <!--右侧文件-->
    <el-col :span="20">
      <div @dragover="fileDragover" @drop="fileDrop" class="fileContent" @click="cleanChecked()"
           @contextmenu.prevent="nullRightMenuShow">
        <!--图形形式-->
        <right-file-img v-show="imgOrTable" :fileList="fileList" @fileRightMenuShow="fileRightMenuShow"
                        @fileDirDblclick="fileDirDblclick"></right-file-img>
        <!--列表形式-->
        <right-file-table v-show="!imgOrTable" :fileList="fileList" @fileRightMenuShow="fileRightMenuShow"
                          @fileDirDblclick="fileDirDblclick"></right-file-table>
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
  import file from "@/api/FileMsg/file";//接口文件
  import fileHeader from '@/views/FileMsg/components/fileHeader' //抬头
  import leftTree from '@/views/FileMsg/components/leftTree' //左侧树
  import {fileList, treeList} from '@/api/FileMsg/fileData' //--模拟数据
  import rightFileImg from '@/views/FileMsg/components/rightFileImg' //右侧文件--图片展示
  import rightFileTable from '@/views/FileMsg/components/rightFileTable' //右侧文件--列表展示
  import fileIconKeyValue from '@/api/FileMsg/fileIconKeyValue' //右侧文件--图片图标
  import fileFooter from '@/views/FileMsg/components/fileFooter' //页尾
  import Contextmenu from 'vue-context-menu'//右键菜单

  export default {
    name: 'fileMsg',
    components: {
      fileHeader, leftTree, rightFileImg, rightFileTable, fileFooter, Contextmenu
    },
    data() {
      return {
        // treeData: treeList,//树的数据
        // treeData: fileList,//树的数据
        // fileList: fileList,//文件数据集
        treeData: [],//树的数据
        fileList: [],//文件数据集
        fatherId:'',//记录右侧父级id
        imgOrTable: true,//图形形式|列表形式转换参数(默认是图片形式)
        operationObj: {},//操作对象
        fileUrlArr: [], //文件路径--所有对象
        /*fileUrlArr: [  //文件路径--所有对象
          {id: '1', rightIcon: "el-icon-arrow-right", name: 'Users'},
          {id: '2', rightIcon: "el-icon-arrow-right", name: '82060'},
          {id: '3', rightIcon: "el-icon-arrow-right", name: 'Desktop'},
          {id: '4', rightIcon: "el-icon-arrow-right", name: 'ruoyi-ui'},
        ],*/
      }
    },
    watch:{

    },
    mounted() {
      this.selectByFatherId('0');//通过父级id获取
    },
    methods: {
      /******************总体右侧数据|初始化数据*****************/
      //通过父级id获取
      selectByFatherId(fatherId){
        this.fatherId = fatherId;
        file.selectByFatherId(fatherId).then((res) => {
          this.fileList = res.data
          this.setFileIcon(this.fileList);//右侧文件--图形形式|列表形式--设置文件图标
          if(fatherId == '0') this.setFileTree(res.data);//左侧文件--只显示文件夹
          this.getPathById();//获取路径
        })
      },
      /******************头部*****************/
      //通过id,获取路径
      async getPathById(){
        await file.getPathById(this.fatherId).then((res) => {
          let newData = res.data;
          for (let item in newData) {
            this.$set(newData[item], 'rightIcon', "el-icon-arrow-right")
          }
          this.fileUrlArr = newData;
        })
      },
      //返回上一级
      async getFatherListById(){
        if(this.fatherId == "0") return
        file.getFatherListById(this.fatherId).then((res) => {
          this.fatherId = res.data[0].fatherid;
          this.getPathById();//获取路径
          this.fileList = res.data
          this.setFileIcon(this.fileList);//右侧文件--图形形式|列表形式--设置文件图标
        })
      },
      /******************左侧*****************/
      //左侧数据(只显示文件夹)
      setFileTree: function (newData) {
        this.treeData = [];//置空
        for (let item in newData) {
          if(newData[item].type == 'dir'){
            this.treeData.push(newData[item])
            this.$set(this.treeData[item], 'isLeaf', true)
          }
        }
      },
      /******************右侧*****************/
      //右侧文件--图形形式|列表形式--设置文件图标
      setFileIcon: function (newData) {
        for (let item in newData) {
          let fileExtension = newData[item].label.split('.').pop().toLowerCase();//获取文件后缀
          for (let key in fileIconKeyValue) {
            if (fileExtension == key) {
              let icon = fileIconKeyValue[key]
              this.$set(newData[item], 'icon', require('@/assets/file/' + icon))
              this.$set(newData[item], 'isChecked', false) //是否选中状态
            }
          }
        }
        return newData;
      },
      //右侧文件--图形形式--点击空白，置空图片选中状态
      cleanChecked() {
        this.fileList.forEach(item => {
          item.isChecked = false;
        })
      },
      //双击---文件夹点进去
      fileDirDblclick(param) {
        if (param.type == "dir") {
          this.selectByFatherId(param.id)
        } else {
          this.$message.warning("不是文件夹");
          return
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
      /******************页尾*****************/
      //页尾--图形形式|列表形式转换方法
      imgOrTableSet(param) {
        this.imgOrTable = param;
      },
      test1() {
        console.log("test11111111111111")
      },
      test2() {
        console.log("test22222222222222")
      },
      // 拖拽上传
      fileDragover(e) {
        e.preventDefault()
      },
      fileDrop(e) {
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
  .fileMsg {
    padding: 1vh;
    overflow: hidden;
    background-color: #f0f2f5;
    //抬头
    .header {
      background-color: #ffffff;
      padding-bottom: 1vh;
      border-radius: 7px 7px 0px 0px;
    }

    //左侧树
    .leftTree {
      background-color: #ffffff;
      border-radius: 0px 0px 0px 7px;
      border-right: rgba(147, 180, 220, 0.35) solid 0.5px;
      height: 82vh;
      overflow-y: auto;

      .leftTreeContent {
        margin-top: 3vh;
      }
    }

    //文件管理正文
    .fileContent {
      border-radius: 0px 0px 7px 0px;
      overflow-y: auto;
      height: 82vh;
      padding-left: 2vh;
      background-color: #ffffff;
    }
  }

</style>
