<template>
  <div>
    <el-card>
      <div slot="header">
        <span>1.debounce 防抖（等你触发完事件 n 秒内不再触发事件，我才执行）(3秒)</span>
        <!--      防抖:当用户输入内容时,还没有输入完就频繁的触发事件,所以需要使用防抖来减少服务器压力-->
      </div>
      <div>
        <el-input placeholder="请输入搜索内容" @input="getDebounceVal" v-model="DebounceVal" style="width: 20vw"></el-input>
        <span style="margin-left: 2vw">输入框内容：{{DebounceValShow}}</span>
      </div>
    </el-card>
    <el-card style="margin-top: 0.2vh">
      <div slot="header">
        <span>2.throttle 节流（在一定时间之内，被节流函数修饰的函数只会触发一次）(3秒) </span>
        <!--      节流:当用户频繁的发起请求时,导致请求的次数太多,会给服务器造成压力,需要限制请求时间来减少服务器的压力-->
      </div>
      <div>
        <!--        <el-input type="text" v-model="ThrottleVal"/>-->
        <el-button @click="reset">重置</el-button>
        <el-button @click="toSearch">展示内容</el-button>
        <span style="margin-left: 2vw">按钮点击了{{clickNum}}次</span>
        <span style="margin-left: 2vw">内容：{{ThrottleValShow}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "DebounceAndThrottle",
    data() {
      return {
        DebounceTime: null,//防抖时间
        DebounceVal: '',//防抖内容
        DebounceValShow: '',//防抖内容展示
        Throttle: false, //节流
        ThrottleValShow: '',//节流展示
        clickNum: 0,//节流按钮点击次数
        showNum: 0,//节流内容展示次数
      }
    },
    mounted() {

    },
    methods: {
      getDebounceVal() {
        if (this.DebounceTime != null) {
          clearTimeout(this.DebounceTime);
        }
        this.DebounceTime = setTimeout(() => {
          this.DebounceValShow = this.DebounceVal;
        }, 3000)
      },
      toSearch() {
        this.clickNum = this.clickNum + 1;
        if (this.Throttle) return
        this.Throttle = true
        let t = setTimeout(() => {
          this.showNum = this.showNum + 1;
          this.ThrottleValShow = '展示了' + this.showNum + "次";
          this.Throttle = false;
        }, 3000)
      },
      reset() {
        this.ThrottleValShow = '';
        this.clickNum = 0;
        this.showNum = 0;
      },
    }
  }
</script>

<style scoped>

</style>
