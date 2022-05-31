<template>
  <el-tree
    :data="treeData"
    ref="tree"
    :props="defaultProps"
    node-key="id"
    @node-click="nodeClick"
    default-expand-all
    :expand-on-click-node="false"
    :load="loadNode"
    :lazy="isLazy"
  >
    <div class="custom-tree-node" slot-scope="{ node, data}">
      <div>
        <img src="@/assets/dir.png" style="height: 20px;width: 20px;">
        <!-- 名称 -->
        <span>{{ node.label }}</span>
      </div>
    </div>
  </el-tree>
</template>

<script>
  import file from "@/api/FileMsg/file";//接口文件
  export default {
    name: "leftTree",
    props: {
      treeData: {//树的数据
        type: Array,
        default: []
      }
    },
    data() {
      return {
        isLazy: true,
        leafDate: [],
        //默认设置
        defaultProps: {
          children: "children",
          name: "label",
          isLeaf: 'isLeaf'
        },
      }
    },
    methods: {
      //节点点击事件
      nodeClick(data, checked, node) {
        this.$emit('selectByFatherId',data.id);
      },
      //懒加载
      async loadNode(node, resolve) {
        if (node.level == 0) {
          return;
        } else {
          await this.selectByFatherId(node.data.id);
          return resolve(this.leafDate);
        }
      },
      async selectByFatherId(fatherId) {
        this.leafDate = [];//置空
        await file.selectByFatherId(fatherId).then((res) => {
          let newData = res.data;
          for (let item in newData) {  //(只显示文件夹)
            if (newData[item].type == 'dir') {
              this.leafDate.push(newData[item])
            }
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>
