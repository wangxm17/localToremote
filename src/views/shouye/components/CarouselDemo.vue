<template>
  <el-carousel :interval="4000" type="card" height="48.7vh">
    <el-carousel-item v-for="item in imgList" :key="item.id">
      <img :src="item.idView" class="image">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
      name: "CarouselDemo",
      data() {
        return {
          openeye: require('@/assets/view.png'), //图片地址
          //循环参数
          imgList: [
            {id:0,idView:require('@/assets/shouye0.jpg')},
            {id:1,idView:require('@/assets/shouye1.jpg')},
            {id:2,idView:require('@/assets/shouye2.jpg')},
            {id:3,idView:require('@/assets/shouye3.jpg')},
            {id:4,idView:require('@/assets/shouye4.jpg')}
          ]
        }
      },
    }
</script>

<style scoped>
  .el-carousel__item .image {
    font-size: 14px;
    /*opacity: 0.75;*/
    line-height: 35vh;
    margin: 0;
    width: 100%;
    height: 100%;
  }
  .el-carousel__item h3 {
    color: rgb(248, 247, 245);
    font-size: 14px;
    opacity: 0.75;
    line-height: 35vh;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    /*background-color: #abf3e4;*/
    background-color: #e9f1ef;
  }

  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #29f1c7;*/
    background-color: #d0dbd9;
  }
</style>
