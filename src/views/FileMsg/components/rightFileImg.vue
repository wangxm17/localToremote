<template>
  <div>
    <el-col :span="2" v-for="item in fileList" :key="item.name" style="" class="fileCard">
      <img :src="item.icon">
      <p>{{item.name}}</p>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "rightFileImg",
  props:{
    fileList:{
      type:Array,
      default:[]
    }
  },
  mounted() {
    console.log(this.fileList);
  },
  data () {
    return {
      imgUrl: require('@/assets/image/dir.png'), //图片地址
    }
  },
  methods:{}
}
</script>

<style lang="scss" scoped>
.fileCard{
  margin-left: 20px;
  img{
    width: 80px;
    height:80px;
    text-align: center;
  }
  p{
    text-align: center;
  }
}
</style>
