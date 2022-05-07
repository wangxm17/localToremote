<template>
    <div>
      <div style="text-align: right;padding-top:20px;padding-right: 40px;">
        菜单选择
        <el-button @click="toPath()" type="button" class="el-button--primary">预览报告</el-button>
      </div>
      <div class="tree">
        <el-tree
          ref="tree"
          :data="treeData"
          node-key="id"
          show-checkbox
          @check-change="handleCheckChange"
          default-expand-all
          :props="defaultProps">
        </el-tree>
      </div>
    </div>
</template>

<script>
    export default {
      name: "fileChoose",
      data() {
        return {
          //树形数据
          treeData: [
            {
              id:1,isShow:false,label: '一、散文一篇',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',
              children: [
                {id:11,isShow:false,label: '1.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',},
                {id:12,isShow:false,label: '2.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',}
              ]
            },{
              id:2,isShow:false,label: '二、散文一篇',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',
              children: [
                {id:21,isShow:false,label: '1.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',},
                {id:22,isShow:false,label: '2.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',}
              ]
            },{
              id:3,isShow:false,label: '三、散文一篇',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',
              children: [
                {id:31,isShow:false,label: '1.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',},
                {id:32,isShow:false,label: '2.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',}
              ]
            },{
              id:4,isShow:false,label: '四、散文一篇',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',
              children: [
                {id:41,isShow:false,label: '1.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',},
                {id:42,isShow:false,label: '2.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',}
              ]
            },{
              id:5,isShow:false,label: '五、散文一篇',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',
              children: [
                {id:51,isShow:false,label: '1.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',},
                {id:52,isShow:false,label: '2.小标题',content:'清风吹起了女孩的花裙在萧瑟地飘……我知道，如同你们也知道的那样，春季已至。岁末时，绿皮火车载负着一批和又一批国人从高楼林立奔向青砖红瓦',}
              ]
            },{
              id:6,isShow:false,label: '六、表格数据',
              children: [
                {id:61,isShow:false,label: '1.报告期末资产组合情况'},
                {id:62,isShow:false,label: '2.报告期末前五大行业配置情况',content:[{name:'行业1',proportion:'0.2'},{name:'行业2',proportion:'0.4'}]}
              ],
            }],
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          //选中数据
          // getCheckedKeys:[],
        }
      },
      mounted () {
        //接收传参
        // console.log('参数传过来了')
        if(this.$route.query.treeData){
          this.treeData = this.$route.query.treeData;//获取传过来的推送记录对象
          if(this.$route.query.getCheckedKeys) {
            this.setCheckedNodes(this.$route.query.getCheckedKeys);
          }
        }

      },
      methods:{
        //设置默认选中
        setCheckedNodes(row){
          this.$refs.tree.setCheckedKeys(row);
        },
        //选中事件
        handleCheckChange(data, checked, indeterminate) {
          // console.log(data, checked, indeterminate);
          if(checked || indeterminate){
            data.isShow = true;
          }else {
            data.isShow = false;
          }
          // data.isShow = !data.isShow;
        },
        toPath(){
          this.$router.push({
            path: '/index/fileExport',
            query: {
              treeData: this.treeData,
              getCheckedKeys: this.$refs.tree.getCheckedKeys(),
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
