<template>
  <div class="left_center_map" id="main" :style="{height:'400px',width:'100%'}"></div>
</template>

<script>
    export default {
      name: "PieDemo",
      data(){
        return{
        }
      },
      mounted(){
        this.leftCenterMap()
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
            toolbox: {
              show: true,
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
              }
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
                roseType: 'area',
                data: [
                  {value: 40, name: 'rose 1'},
                  {value: 38, name: 'rose 2'},
                  {value: 32, name: 'rose 3'},
                  {value: 30, name: 'rose 4'},
                  {value: 28, name: 'rose 5'},
                  {value: 26, name: 'rose 6'},
                  {value: 22, name: 'rose 7'},
                  {value: 18, name: 'rose 8'}
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
      }
    }
</script>

<style scoped>

</style>
