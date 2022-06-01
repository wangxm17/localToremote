<template>
  <div class="fileHeader">
    <!--返回上一级-->
    <i class="el-icon-back" @click="reBack"></i>
    <!--文件路径框-->
    <div class="fileUrl">
      <div v-for="(item,index) in fileUrlArr" :key="index" class="fileUrlItem" @click="textChecked(item,index)"
           :class="item.rightIcon!='el-icon-arrow-down' ? 'active' : 'fileUrlItemChecked'">
        <span>{{item.label}}</span>
        <i :class="item.rightIcon" @click.stop="iconChecked(item,index)"></i>
      </div>
    </div>
    <!--搜索框-->
    <div class="fileSearch"></div>

    <!--出现右击菜单-->
    <Contextmenu ref="fileListMenu" class="context-menu">
      <li class="el-icon-folder"><span>文件夹1</span></li>
      <li class="el-icon-folder"><span>文件夹2</span></li>
      <li class="el-icon-folder"><span>文件夹3</span></li>
      <li class="el-icon-folder"><span>文件夹4</span></li>
    </Contextmenu>
  </div>
</template>

<script>
import Contextmenu from 'vue-context-menu'//菜单
export default {
  name: "fileHeader",
  components: {
    Contextmenu
  },
  props:{
    fileUrlArr:{ //文件路径--所有对象
      type:Array,
      default:[]
    },
  },
  data () {
    return {
      fileUrl:'',//文件路径
      // fileUrlArr:[],//文件路径数组
    }
  },
  mounted() {

  },
  methods:{
    //获取路径
    setFileUrl(){},
    //文字点击
    textChecked(item,index){
      console.log(item);
      this.$emit('selectByFatherId',item.id);
    },
    //图标被选中事件
    async iconChecked(item,index){
      if(this.fileUrlArr[index].rightIcon == "el-icon-arrow-down"){
        await this.fileUrlArr.forEach(item => {
          item.rightIcon = "el-icon-arrow-right";
        })
      }else {
        await this.fileUrlArr.forEach(item => {
          item.rightIcon = "el-icon-arrow-right";
        })
        this.fileUrlArr[index].rightIcon = "el-icon-arrow-down";
        // this.$refs.fileListMenu.open()
      }
    },
    //返回上一级
    reBack(){
      this.$emit('getFatherListById');
    }
  }
}
</script>

<style lang="scss" scoped>
.fileHeader{
  display: flex;
  padding-top: 2vh;
  padding-left: 1vh;
  flex-flow: row nowrap;//row-从左往右一行，nowrap-不换行
  align-items: center;//上下垂直居中
  .el-icon-back{
    font-size: larger;
    color: rgb(137, 137, 137);
    margin-right: 1%;
  }
  .fileUrl{
    border: rgba(173, 173, 173, 0.5) solid 1px;
    display: flex;
    flex-flow: row nowrap;//row-从左往右一行，nowrap-不换行
    height: 4vh;
    width: 80%;
    padding-left: 1vh;
    .fileUrlItem{
      height: 4vh;
      display: flex;
      align-items: center;//上下垂直居中
      border: transparent solid 0.5px;
      border-radius: 3px;
      cursor: pointer;
      span{
        font-size: small;
        border-right: transparent solid 0.5px;
        padding-right:0.5rem;
        height: 4vh;
        display: flex;
        align-items: center;//上下垂直居中
      }
      .el-icon-arrow-right, .el-icon-arrow-right{
        font-size: 12px;
        margin:0 0.1rem;
      }
      &:hover{
        background-color: rgba(121, 175, 241, 0.2);
        border: rgba(121, 175, 241, 0.6) solid 0.5px;
        span{
          border-right: rgba(121, 175, 241, 0.6) solid 0.5px;
          border-radius: 0 3px 3px 0;
        }
      }
    }

    .fileUrlItemChecked{
      background-color: rgba(121, 175, 241, 0.2);
      border: rgba(121, 175, 241, 0.6) solid 0.5px;
      span{
        border-right: rgba(121, 175, 241, 0.6) solid 0.5px;
        border-radius: 0 3px 3px 0;
      }
    }
  }
  .fileSearch{
    border: rgba(173, 173, 173, 0.5) solid 1px;
    display: flex;
    flex-flow: row nowrap;//row-从左往右一行，nowrap-不换行
    align-items: center;//上下垂直居中
    height: 4vh;
    width: 15%;
    margin-left: 1vh;
    padding-left: 1vh;
  }
}

</style>
