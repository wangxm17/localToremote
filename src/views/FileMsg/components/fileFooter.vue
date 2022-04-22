<template>
  <div class="fileFooter">
    <i title="在窗口显示每一项的信息。" @click="imgOrTableSetByParam(false)" class="el-icon-s-order btn2" :class="!imgOrTable ? 'active' : 'btn1'"></i>
    <i title="使用大缩略图显示项。" @click="imgOrTableSetByParam(true)" class="el-icon-s-platform btn1" :class="imgOrTable ? 'active' : 'btn1'"></i>
  </div>
</template>

<script>
export default {
  name: "fileFooter",
  props:{
    imgOrTable:{//图形形式|列表形式转换参数(默认是图片形式)
      type:Boolean,
      default:''
    }
  },
  data () {
    return { }
  },
  mounted() {},
  methods:{
    imgOrTableSetByParam(param) {
      this.$emit('imgOrTableSet',param);
    },
  }
}
</script>

<style lang="scss" scoped>
  //文件管理转换页尾
.fileFooter{
  position: fixed;
  right: 5vh;
  bottom: 4vh;
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
