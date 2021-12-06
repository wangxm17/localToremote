<template>
  <div class="hello" @contextmenu.prevent="showMenuOne()">
    <el-col :span="4">
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </el-col>
    <el-col
      :span="20"
      style="background-color: #42b983"
    >
      <vue-context-menu
        :contextMenuData="contextMenuDataOne"
        @savedata="savedata()"
        @newdata="newdata()"
      ></vue-context-menu>
      <el-col :span="2" v-for="item in imgList" :key="item" style="margin-left: 20px">
        <img
          style="width: 80px;height:80px;text-align: center"
          :src="imgUrl"
          @click="inter()"
          @contextmenu="showMenu(item)"
        >
        <p style="text-align: center">文件名111</p>
        <vue-context-menu
          :contextMenuData="contextMenuData"
          @savedata="savedata(item)"
          @newdata="newdata(item)"
        ></vue-context-menu>
      </el-col>
    </el-col>

  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  },
};
export default {
  name: 'HelloWorld',
  directives: {clickoutside},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl: require('@/assets/dir.png'), //图片地址
      imgList: [0,1,2,3,4],

      clickId:'',
      // contextmenu data (菜单数据)
      contextMenuData: {
        menuName: 'demo',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [{
          fnHandler: 'savedata', // Binding events(绑定事件)
          // icoName: 'fa fa-home fa-fw', // icon (icon图标 )
          btnName: '重命名' // The name of the menu option (菜单名称)
        }, {
          fnHandler: 'newdata',
          // icoName: 'fa fa-home fa-fw',
          btnName: '删除'
        }]
      },
      contextMenuDataOne: {
        menuName: 'demoOne',
        // The coordinates of the display(菜单显示的位置)
        axis: {
          x: null,
          y: null
        },
        // Menu options (菜单选项)
        menulists: [{
          fnHandler: 'savedata', // Binding events(绑定事件)
          // icoName: 'fa fa-home fa-fw', // icon (icon图标 )
          btnName: '重命名111' // The name of the menu option (菜单名称)
        }, {
          fnHandler: 'newdata',
          // icoName: 'fa fa-home fa-fw',
          btnName: '删除111'
        }]
      },

      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods:{
    handleClose(e) {
      this.show = false;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    /*showMenu:function(){
      alert(2);
    },*/
    inter(){
      this.imgList = [0,1]
    },
    retrunShouye(){
      this.imgList = [0,1,2,3,4]
    },
    showMenuOne () {
      // console.log("我运行了！")
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      // Get the current location
      this.contextMenuDataOne.axis = {
        x, y
      }
    },
    showMenu (item) {
      this.clickId = item
      event.preventDefault()
      var x = event.clientX
      var y = event.clientY
      // Get the current location
      this.contextMenuData.axis = {
        x, y
      }
    },
    savedata (id) {
      // alert(id)
      console.log(this.clickId)
    },
    newdata (id) {
      // alert(id)
      console.log(this.clickId)
      console.log('删除了!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
