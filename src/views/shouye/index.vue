<template>
    <div class="shouye-container">
      <!--我是首页!!!!!!!-->

      <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;height: 45%">
        <carousel-demo></carousel-demo>
      </el-row>
      <el-row style="margin-bottom:32px;height: 40%">
        <el-col :span="8" class="downList">
          <map-demo></map-demo>
        </el-col>
        <el-col :span="8" class="downList" style="margin-left: 2%">
          <line-demo></line-demo>
        </el-col>
        <el-col :span="7" class="downList" style="margin-left: 2%">
          <pie-demo></pie-demo>
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import CarouselDemo from '@/views/shouye/components/CarouselDemo.vue'
  import MapDemo from '@/views/shouye/components/MapDemo.vue'
  import LineDemo from '@/views/shouye/components/LineDemo.vue'
  import PieDemo from '@/views/shouye/components/PieDemo.vue'
    export default {
      name: "index",
      components: {
        CarouselDemo,MapDemo,LineDemo,PieDemo
      },
    }
</script>

<style lang="scss" scoped>
  .shouye-container {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    height: 100%;
  }
  .downList{
    background:#fff;
    padding:16px 16px 0;
    height: 100%;
    float: left;
  }
</style>
