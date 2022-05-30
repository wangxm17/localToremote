<template>
  <div class="muli-tags" @click='focus'>
<!--    <button class='btn' v-for='(tag, index) in tags' :key='index' @click='delTag(index)'>{{tag}} <span>x</span></button>-->
    <el-tag class="tagSty" v-for="(tag, index) in tags" :key="index" closable type="info" @close='delTag(index)'>{{tag}}</el-tag>
<!--    <input type="text"-->
<!--           ref='input'-->
<!--           @keyup.enter="add"-->
<!--           @keydown.delete="del"-->
<!--           @keydown.188='split'-->
<!--           v-model='current'>-->
    <el-input
      type="text"
      ref='input'
      @keyup.enter.native="add"
      @keydown.delete.native="del"
      @keydown.188='split'
      v-model='current' />
  </div>
</template>

<script>
  export default {
    props: {
      value: Array,
      required: true,
      default: () => []
    },
    methods: {
      focus () {
        this.$refs.input.focus()
      },
      split (e) {
        e.preventDefault()
        this.add(e)
      },
      add (e) {
        const val = e.target.value
        if (!val) return
        if (this.tags.indexOf(val) > -1) return
        this.tags.push(val)
        this.$emit('input', this.tags)
        this.current = ''
      },
      del (e) {
        if (!e.target.value.length) {
          this.tags.pop()
          this.$emit('input', this.tags)
        }
      },
      delTag (index) {
        this.tags.splice(index, 1)
        this.$emit('input', this.tags)
      }
    },
    computed: {
      tags () {
        return this.value.slice()
      }
    },
    data () {
      return {
        current: ''
      }
    }
  }
</script>

<style lang='scss'>
  .muli-tags{
    padding: 5px 10px;
    display: block;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    input{
      background: transparent;
      border: none !important;
    }
    .btn{
      margin: 0 5px 3px 0;
      padding: 4px 5px;
      background: #fff;
      border: 1px solid #eee;
      box-shadow: 0 0 4px;
    }
    .tagSty{
      margin-left: 0.2rem;
    }
  }
</style>
