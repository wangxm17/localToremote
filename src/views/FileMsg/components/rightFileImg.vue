<template>
  <div>
    <div
      :span="2"
      @click.stop="cardChecked(index)"
      @dblclick="fileDirDblclick(item)"
      @contextmenu.prevent.stop="fileRightMenuShow(item,index)"
      v-for="(item,index) in fileList"
      :key="index"
      class="fileCard"
      :class="!item.isChecked ? 'active' : 'fileCardChecked'"
    >
      <img :src="item.icon" >
      <p v-show="!item.isReName">{{item.label}}</p>
      <input v-show="item.isReName" v-model="item.label" ></input>
    </div>
  </div>
</template>

<script>
export default {
  name: "rightFileImg",
  props:{
    fileList:{//文件数据
      type:Array,
      default:[]
    }
  },
  mounted() {},
  data () {
    return {}
  },
  methods:{
    //设置被选中状态
    async cardChecked(index){
      await this.fileList.forEach(item => {
        item.isChecked = false;
        // item.isReName = false;//只能重命名一个文件
      })
      this.fileList[index].isChecked = true;
    },
    //右键菜单
    fileRightMenuShow(row,index){
      this.cardChecked(index);//高亮显示选中
      this.$emit('fileRightMenuShow',row);
    },
    //双击---文件夹点进去
    fileDirDblclick(row){
      this.$emit('fileDirDblclick',row);
    }
  }
}
</script>

<style lang="scss" scoped>
.fileCard{
  text-align: center;
  /*height: 15vh;*/
  border: transparent solid 0.5px;
  width: 8.33333%;
  box-sizing: border-box;
  float: left;
  &:hover{
    border: transparent solid 0.5px;
    background-color: rgba(147, 180, 220, 0.35);
  }
  img{
    width: 80px;
    height:80px;
    margin-top: 2vh;
    text-align: center;
  }
  p{
    text-align: center;
    font-size: 0.8rem;
  }
  input{
    margin-top: 0.8rem;
    width: 7rem;
  }
}
.fileCardChecked{
  border: rgba(147, 180, 220, 0.7) solid 0.5px;
  background-color: rgba(147, 180, 220, 0.35);
}
</style>
