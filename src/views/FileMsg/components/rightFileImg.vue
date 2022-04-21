<template>
  <div>
    <el-col :span="2" v-for="item in fileList" :key="item.name" class="fileCard">
      <img :src="item.icon">
      <p>{{item.name}}</p>
    </el-col>
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
