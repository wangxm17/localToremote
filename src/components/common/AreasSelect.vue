<template>
  <div>
    <!--地区组件-->
    <el-tabs type="border-card">
      <el-tab-pane v-for="(item,index) in Areas" :label="item.key" :key="index">
        <el-button type="text" @click="addConcernAreasArr(item.arr)">全部</el-button>
        <el-button
          type="text"
          v-for="(item2,index2) in item.arr"
          :key="index2"
          style="margin-left: 2rem"
          @click="addConcernAreas(item2)"
        >{{item2}}</el-button>
      </el-tab-pane>
    </el-tabs>
    <!--输入框-->
    <tags-input v-model='bindData' style="margin-top: 1rem"/>
  </div>
</template>

<script>
  import TagsInput from './TagsInput.vue'

  export default {
    name: "AreasSelect",
    components: {
      TagsInput
    },
    // props:{
    //   bindData:{//输入框数据
    //     type:Array,
    //     default:[]
    //   }
    // },
    data() {
      return {
        Areas: [
          {
            key: '全国',
            arr: ['北京', '天津', '河北', '山西', '内蒙古', '黑龙江', '吉林', '辽宁', '山东', '江苏', '安徽', '浙江', '福建', '上海', '台湾', '湖北', '湖南', '河南', '江西', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆']
          },
          {key: '华北', arr: ['北京', '天津', '河北', '山西', '内蒙古']},
          {key: '东北', arr: ['黑龙江', '吉林', '辽宁']},
          {key: '华东', arr: ['山东', '江苏', '安徽', '浙江', '福建', '上海', '台湾']},
          {key: '华中', arr: ['湖北', '湖南', '河南', '江西']},
          {key: '华南', arr: ['广东', '广西', '海南']},
          {key: '西南', arr: ['重庆', '四川', '贵州', '云南', '西藏']},
          {key: '西北', arr: ['陕西', '甘肃', '青海', '宁夏', '新疆']},
        ],
        // bindData:[],
      }
    },
    methods: {
      addConcernAreasArr(areasArr){ //点击全部
        for(let key in areasArr){
          this.addConcernAreas(areasArr[key])
        }
      },
      addConcernAreas(areas){ //单独点击
        //判断是否存在
        if(this.bindData.findIndex(item => item === areas) == -1){
          this.bindData.push(areas);
        }
        console.log(this.bindData)
      }
    }
  }
</script>

<style scoped>

</style>
