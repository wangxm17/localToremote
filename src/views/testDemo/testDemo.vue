<template>
  <div style="height: 89vh;">
    <div class="cardBackground">
      <Title titleName="防抖，节流" type="type2"></Title>
      <debounce-and-throttle></debounce-and-throttle>
    </div>
    <div class="cardBackground">
      <Title titleName="父子组件实现数据双向绑定" type="type2"></Title>
      <div class="parentSonDataBind">
        <parent-son-data-bind1 :options="options" @update="update"></parent-son-data-bind1>
        <span>父组件：<el-input placeholder="内容" v-model="ParentSonDataBind_Value1" style="width: 7vw" disabled></el-input></span>
      </div>
      <div class="parentSonDataBind">
        <parent-son-data-bind2 :options="options" v-model="ParentSonDataBind_Value2"></parent-son-data-bind2>
        <span>父组件：<el-input placeholder="内容" v-model="ParentSonDataBind_Value2" style="width: 7vw" disabled></el-input></span>
      </div>
    </div>
    <div class="cardBackground">
      <Title titleName="flex弹性布局(注：设为Flex布局后,子元素的float、clear和vertical-align属性将失效)" type="type2"></Title>
      <Flex></Flex>
    </div>
  </div>
</template>


<script>
  import Title from '@/components/common/Title.vue';//标题
  import DebounceAndThrottle from '@/views/testDemo/components/DebounceAndThrottle.vue';//防抖，节流
  import ParentSonDataBind1 from '@/views/testDemo/components/ParentSonDataBind1.vue';//父子组件实现数据双向绑定
  import ParentSonDataBind2 from '@/views/testDemo/components/ParentSonDataBind2.vue';//父子组件实现数据双向绑定
  import Flex from '@/views/testDemo/components/Flex.vue';//flex布局

  export default {
    name: "testDemo",
    components: {
      ParentSonDataBind1,
      ParentSonDataBind2,
      Title, DebounceAndThrottle, Flex
    },
    data() {
      return {
        /***父子组件数据双向绑定***/
        //父组件传递给子组件的选项数组
        options: [
          {value: '选项1', label: '黄金糕'},
          {value: '选项2', label: '双皮奶'},
          {value: '选项3', label: '蚵仔煎'},
          {value: '选项4', label: '龙须面'},
          {value: '选项5', label: '北京烤鸭'}
        ],
        ParentSonDataBind_Value1: '',//子组件绑定参数1
        ParentSonDataBind_Value2: '',//子组件绑定参数1
      }
    },
    watch: {
      // 下面这个监听只是为了打印显示
      ParentSonDataBind_Value2(newValue) {
        console.log('ParentSonDataBind_Value2 值发生改变：', newValue)
      }
    },
    mounted() {

    },
    methods: {
      update(Value1) {
        this.ParentSonDataBind_Value1 = Value1;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cardBackground {
    margin: 1vh;
    padding: 1vh 5vh 1vh 5vh;
    background-color: #ffffff;
    border-radius: 7px;
  }

  /*.cardBackground:nth-child(2) > div {
    display: flex;
    flex-wrap: nowrap;
  }*/

  .parentSonDataBind {
    display: flex;
    flex-wrap: nowrap;
    margin-left: 2vw;
  }
  .parentSonDataBind:nth-last-child(1) {
    margin-top: 2vh;
  }
</style>
