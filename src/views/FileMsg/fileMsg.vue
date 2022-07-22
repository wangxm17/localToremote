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
      <li @click="test1" class="el-icon-view" v-show="operationObj.type == 'file'"><span>预览</span></li> <!--1.是文件才能预览-->
      <li @click="reName" class="el-icon-edit"><span>重命名</span></li>
      <li @click="fileDel" class="el-icon-delete"><span>删除</span></li>
    </Contextmenu>
    <!--点击空白，出现右击菜单-->
    <Contextmenu ref="nullRightMenu" class="context-menu">
      <li @click="selectByFatherId(fatherId)" class="el-icon-refresh"><span>刷新</span></li>
      <li @click="addDirSubmit" class="el-icon-folder-add"><span>新建文件夹</span></li>
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
              this.$set(newData[item], 'icon', require('@/assets/file/' + icon));//图标
              this.$set(newData[item], 'isChecked', false) //是否选中状态
              this.$set(newData[item], 'isReName', false) //是否选中状态
            }
          }
        }
        return newData;
      },
      //右侧--点击空白
      async cleanChecked() {
        await this.reNameSubmit();
        this.fileList.forEach(item => {
          item.isChecked = false; //是否选中
          item.isReName = false; //重命名
        })
      },
      /***双击文件***/
      //双击---文件夹点进去
      fileDirDblclick(param) {
        if (param.type == "dir") {
          this.selectByFatherId(param.id)
        } else {
          this.$message.warning("不是文件夹");
          return
        }
      },
      /***右击空白***/
      //----右击空白，出现右击菜单
      nullRightMenuShow() {
        this.cleanChecked();
        this.$refs.nullRightMenu.open()
      },
      //----新增文件夹
      addDirSubmit(){
        let params = {
          fatherId: this.fatherId,
          label: "新建文件夹.dir",
          size: "200kb",
          type: "dir",
        }
        file.insert(params).then((res) => {
          // this.operationObj = res.data;//操作对象
          this.selectByFatherId(this.fatherId);//查询
        })
      },
      /***右击文件***/
      //右击文件，出现右击菜单
      fileRightMenuShow(param) {
        this.operationObj = param;//操作对象
        this.$refs.fileRightMenu.open()
        // console.log(this.operationObj,"jgrhgwrjnkdgsn")
      },
      //----重命名输入框显示
      reName(){
        // console.log("打算重命名")
        this.operationObj.isReName = true;//显示重命名下方的输入框
      },
      //--重命名提交
      reNameSubmit(){
        // console.log("提交")
        // console.log(this.operationObj)
        if(!this.operationObj.isReName) return;
        file.updateByPrimaryKey(this.operationObj).then((res) => {
          // this.$message.success("重命名成功！");
          this.selectByFatherId(this.fatherId);//查询
        })
      },
      //--删除文件
      fileDel(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.operationObj)
          file.deleteByPrimaryKey(this.operationObj.id).then((res) => {
            this.$message({type: 'success', message: '删除成功!'});
            this.selectByFatherId(this.fatherId);//查询
          })
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
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
