<template>
  <div>
    <!--文件路径-->
    <div>
      {{fileUrlArr}}
    </div>
    <!--搜索-->
    <div></div>
  </div>
</template>

<script>
export default {
  name: "fileHeader",
  props:{
    fileUrlArr:{ //文件路径--所有对象
      type:String,
      default:''
    }
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
    setFileUrl(){

    }
  }
}
</script>

<style scoped>

</style>
