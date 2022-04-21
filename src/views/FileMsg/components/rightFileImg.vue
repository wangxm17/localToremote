<template>
  <div>
    <div :span="2" @click="cardChecked(index)" v-for="(item,index) in fileList"  :key="index" class="fileCard" :class="!item.isChecked ? 'active' : 'fileCardChecked'">
      <img :src="item.icon" >
      <p>{{item.name}}</p>
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
  mounted() {
    // console.log(this.fileList);
  },
  data () {
    return {}
  },
  methods:{
    //设置被选中状态
    async cardChecked(index){
      await this.fileList.forEach(item => {
        item.isChecked = false;
      })
      this.fileList[index].isChecked = true;
    },
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
}
.fileCardChecked{
  border: rgba(147, 180, 220, 0.7) solid 0.5px;
  background-color: rgba(147, 180, 220, 0.35);
}
</style>
