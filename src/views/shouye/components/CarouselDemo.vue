<template>
  <el-carousel :interval="4000" type="card" height="380px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
        name: "CarouselDemo"
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: rgb(248, 247, 245);
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #abf3e4;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #29f1c7;
  }
</style>
