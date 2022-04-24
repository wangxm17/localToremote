<template>
  <el-tree
    :data="treeData"
    ref="tree"
    :props="defaultProps"
    node-key="id"
    @node-click="nodeClick"
    default-expand-all
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
export default {
  name: "leftTree",
  props:{
    treeData:{//树的数据
      type:Array,
      default:[]
    }
  },
  data () {
    return {
      //默认设置
      defaultProps: {
        children: "children",
        label: "label"
      },
    }
  },
  methods:{
    nodeClick(data, checked, node) {
      data.open = !data.open;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
