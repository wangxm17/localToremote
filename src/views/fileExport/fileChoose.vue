<template>
    <div>
      <div style="text-align: right;padding-top:20px;padding-right: 40px;">
        菜单选择
        <el-button @click="toPath()" type="button" class="el-button--primary">预览报告</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "fileChoose",
      methods:{
          toPath(){
            this.$router.push('/index/fileExport')
          }
      }
    }
</script>

<style scoped>

</style>
