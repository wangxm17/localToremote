<template>
  <div class="hello">
    <el-col :span="4"><!--@contextmenu.stop="showMenu(item)"-->
      <el-tree
        :data="data"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
    </el-col>
    <el-col
      :span="20"
    >
      <div @dragover="fileDragover" @drop="fileDrop" @contextmenu="showMenuOne()" style="background-color: #42b983;height: 500px">
        <vue-context-menu
          :contextMenuData="contextMenuDataOne"
          @savedata="savedata()"
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
          // icoName: 'fa fa-home fa-fw', // icon (icon图标 )
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
          btnName: '测试1' // The name of the menu option (菜单名称)
        }, {
          fnHandler: 'newdata',
          // icoName: 'fa fa-home fa-fw',
          btnName: '测试2'
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
