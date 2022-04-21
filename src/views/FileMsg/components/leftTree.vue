<template>
  <el-tree
    :data="treeData"
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
      }
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
