<template>
  <div class="left_center_map" id="mapJson" :style="{height:'380px',width:'100%'}"></div>
</template>

<script>
  import JSON from '@/assets/zgMap.json'
    export default {
        name: "MapDemo",
      data(){
        return{
        }
      },
      mounted(){
        this.CenterMap()
      },
      methods: {
        CenterMap () {
          var myChart = this.$echarts.init(document.getElementById('mapJson')) // 拿到一个实例
          this.$echarts.registerMap('map', JSON, {})//引入地图文件
          var option = {
            title: {
              text: '某地方统计展示',
              subtext: '纯属虚构',
              left: 'center'
            },
            series: [
              {
                type: 'map',
                mapType: 'map'//地图名称
              }]
          }
          myChart.setOption(option)
        }
      }
    }
</script>

<style scoped>

</style>
