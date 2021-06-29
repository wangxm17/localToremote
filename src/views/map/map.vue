<template>
  <div>
    <div class="left_center_map" id="main" :style="{height:'400px',width:'100%'}"></div>
    <div class="left_center_map" id="mapJson" :style="{height:'400px',width:'100%'}"></div>
  </div>
</template>

<script>
// import JSON from '@/assets/jiaxing.json'
// import JSON from '@/assets/bengbu.json'
import JSON from '@/assets/zgMap.json'
export default {
  name: "maprwqr",
  data(){
    return{
    }
  },
  mounted(){
    this.leftCenterMap()
    this.leftCenterMap2()
  },
  methods: {

    leftCenterMap () {
      var myChart = this.$echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    leftCenterMap2 () {
      var myChart = this.$echarts.init(document.getElementById('mapJson')) // 拿到一个实例
      this.$echarts.registerMap('map', JSON, {})//引入地图文件
      var option = {
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
