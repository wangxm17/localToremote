<template>
  <div class="common">
    <span style="width: 20vw">方式一：通过监听事件实现</span>
    <el-select v-model="Value1" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: "ParentSonDataBind",
    props: {
      //父组件传递给子组件的选项数组
      options:{
        type:Array,
        default:[]
      },
    },
    data() {
      return {
        Value1:'',
      }
    },
    methods:{
      change() {
        // console.log('子组件下拉框值发生改变：', this.Value1)
        // 当下拉框中选定的值发生改变后，通过 $emit 回调 update 事件，并将修改后的值返回给父组件
        this.$emit('update', this.Value1) // 触发父组件的 @update 事件
        // 父组件使用子组件时通过 @update 指定回调的处理方法
      }
    }
  }
</script>

<style scoped>
  .common>span {
    width: 15vw;
    /*line-height: 20vh;*/
    /*margin-left: 0.5vw;*/
    /*line-height: 7vh;*/
  }
</style>
