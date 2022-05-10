<template>
  <div class="shouye-container">
      <!--我是首页!!!!!!!-->
    <div class="topCard">
      <carousel-demo></carousel-demo>
    </div>

    <div class="downCard">
      <div class="downList">
        <map-demo></map-demo>
      </div>
      <div class="downList">
        <line-demo></line-demo>
      </div>
      <div class="downList">
        <pie-demo></pie-demo>
      </div>
    </div>
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
    background-color: #f0f2f5;
    height: 91.4vh;
    overflow: hidden;
    .topCard{
      height: 51.5vh;
      background: #ffffff;
      margin: 1vh;
      border-radius: 7px;
      padding: 1vh 1vh 0vh 1vh;
      /*width: 100%;*/
    }
    .downCard{
      height: 36vh;
      /*background: #ffffff;*/
      margin: 1vh 1vh 1vh 1vh;
      display: flex;
      /*align-items: center;//上下垂直居中*/
      justify-content: space-between;
      /*width: 100%;*/
      .downList{
        background:#fff;
        height: 100%;
        width: 33%;
        border-radius: 7px;
      }
    }
  }

</style>
