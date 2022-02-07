<template>
  <div class="hello">
    <el-col :span="4"><!--@contextmenu.stop="showMenu(item)"-->
     <!-- //右击菜单
      import VueContextMenu from 'vue-contextmenu'-->
      <!--<el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>-->
      <el-tree
        :data="data"
        ref="tree"
        :props="defaultProps"
        current-node-key="1"
        node-key="id"
        @node-click="nodeClick"
        default-expand-all
      >
        <div class="custom-tree-node" slot-scope="{ node, data}">
          <div>
            <span v-if="!data.children||data.id=='0'">
          <i class="el-icon-document" style="color: #fd7575"></i>
        </span>
            <span v-else>
            <i :class="data.open ?  'el-icon-folder-opened' : 'el-icon-folder' " style="color: #448ac4"></i>
        </span>
            <!-- 名称 -->
            <span>{{ node.label }}</span>
            <i v-show="data.children" :class="data.open ?  'el-icon-caret-bottom' : 'el-icon-caret-top' " style="color: #448ac4;"></i>
          </div>
        </div>
      </el-tree>
    </el-col>
    <el-col
      :span="20"
    >
      <div @dragover="fileDragover" @drop="fileDrop" @contextmenu.prevent="showMenuOne()" style="background-color: #42b983;height: 500px">
        <vue-context-menu
          :contextMenuData="contextMenuDataOne"
          @savedata="createdata()"
          @newdata="newdata()"
        ></vue-context-menu>
        <el-col :span="2" v-for="item in imgListOne" :key="item.name" style="margin-left: 20px" >
          <img
            style="width: 80px;height:80px;text-align: center"
            :src="imgUrl"
            @click="inter()"
            @contextmenu.stop="showMenu(item)"
          >
          <p style="text-align: center">{{item.name}}</p>
          <vue-context-menu
            :contextMenuData="contextMenuData"
            @savedata="savedata(item)"
            @newdata="newdata(item)"
          ></vue-context-menu>
        </el-col>
      </div>

    </el-col>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl: require('@/assets/dir.png'), //图片地址
      imgList: [0,1,2,3,4],
      imgListOne: [
        {
          id:'0',
          name:'文件0',
          icon:''
        },
        {
          id:'1',
          name:'文件1',
          icon:''
        },
        {
          id:'2',
          name:'文件2',
          icon:''
        },
        {
          id:'3',
          name:'文件3',
          icon:''
        }
      ],

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
          icoName: 'fa fa-home fa-fw', // icon (icon图标 )
          btnName: '重命名' // The name of the menu option (菜单名称)
        },
        //   {
        //   fnHandler: 'newdata',
        //   // icoName: 'fa fa-home fa-fw',
        //   btnName: '删除'
        // }
        ]
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
          btnName: '新建目录' // The name of the menu option (菜单名称)
        }, {
          fnHandler: 'newdata',
          // icoName: 'fa fa-home fa-fw',
          btnName: '测试2'
        }]
      },


      defaultOpen: require('@/assets/dir.png'),
      defaultClose: require('@/assets/logo.png'),
      data: [
        {
          label: "我的调研",
          open: true,
          children: [
            {
              label: "基础信息"
            }
          ]
        },
        {
          label: "你的调研",
          open: true,
          children: [
            {
              label: "采集系统"
            },
            {
              label: "收集系统"
            }
          ]
        },
        {
          label: "一级 3",
          open: true,
          children: [
            {
              label: "二级 3-1"
            },
            {
              label: "二级 3-2"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
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
    createdata () {
      this.imgListOne.push({
        id:'',
        name:'新建文件夹('+this.imgListOne.length+')',
        icon:''
      })
    },
    savedata (id) {
      // alert(id)
      console.log(this.clickId)
    },
    newdata (id) {
      // alert(id)
      console.log(this.clickId)
      console.log('删除了!')
    },
    nodeClick(data, checked, node) {
      data.open = !data.open;
    },
    // 拖拽上传
    fileDragover (e) {
      e.preventDefault()
    },
    fileDrop (e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
      console.log(file)
      console.log('拖拽释放鼠标时')

      if (!file) return
      if (file.size > (10 * 1000 * 1000)) {
        return alert('文件大小不能超过10M')
      }
      this.imgListOne.push({
        id:'',
        name:file.name,
        icon:''
      })
      // this.batchFile = file
      // this.fileName = file.name
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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


/deep/ .el-tree {
// 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
   .el-tree-node {
     position: relative;
     padding-left: 10px;
   }
// 子集像右偏移 给数线留出距离
   .el-tree-node__children {
     padding-left: 10px;
   }
//这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }
.el-tree > .el-tree-node:before {
  border-left: none;
}
.el-tree > .el-tree-node:after {
  border-top: none;
}
//这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }
.tree :first-child .el-tree-node:before {
  border-left: none;
}
// 竖线
   /*.el-tree-node:before {
     border-left: 1px solid #e3e3e3;
     bottom: 0px;
     height: 100%;
     top: -25px;
     width: 1px;
   }*/
//横线
 /* .el-tree-node:after {
    border-top: 1px solid #e3e3e3;
    height: 20px;
    top: 14px;
    width: 24px;
  }*/
.el-tree-node__expand-icon.is-leaf {
  width: 8px;
}
//去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
.el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }
//每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
  }
}
//去掉最上级的before  after 即是去电最上层的连接线
  /deep/ .el-tree > div {
&::before {
   display: none;
 }
&::after {
   display: none;
 }
}
</style>
