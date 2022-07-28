<template>
  <div class="common">
    <span>方式二：通过 v-model 实现</span>
    <el-select v-model="Value2" placeholder="请选择">
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
      ParentSonDataBind_Value2: {
        type: String,
        default: ''
      }
    },
    model: {
      // 需要双向绑定的 props 变量名称，也就是父组件通过 v-model 与子组件双向绑定的变量
      prop: 'ParentSonDataBind_Value2',
      // 定义由 $emit 传递变量的名称
      event: 'newValue'
    },
    data() {
      return {
        Value2:this.ParentSonDataBind_Value2,
      }
    },
    watch: {
      // 监听 sonValue 临时变量，如果临时变量发生变化，那么通过 $emit 将新的值传递给父组件
      Value2(value) {
        // console.log('子组件下拉框值发生改变：', this.Value2)
        // 【注意】newValue x需要和 model.event 定义的值一致
        this.$emit('newValue', this.Value2)
      }
    },
    methods:{}
  }
</script>

<style scoped>
</style>
