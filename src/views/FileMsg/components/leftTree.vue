<template>
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
</template>

<script>
export default {
  name: "leftTree",
  data () {
    return {
      //树的数据
      data: [{
          label: "我的调研",
          open: true,
          children: [{label: "基础信息"}]
        },{
          label: "你的调研",
          open: true,
          children: [{label: "采集系统"}, {label: "收集系统"}]
        },{
          label: "一级 3",
          open: true,
          children: [{label: "二级 3-1"}, {label: "二级 3-2"}]
        }],
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
