<template>
  <!--<el-menu
    :default-openeds="['1', '3']"
    @select="menuSelect"
  >
    <el-menu-item index="/index/map">
      <template slot="title">
        <i class="el-icon-menu"></i>
        首页
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-setting"></i>
        系统管理
      </template>
      <el-menu-item index="/index/map">地图</el-menu-item>
      <el-menu-item index="/index/user">用户管理</el-menu-item>
      <el-menu-item index="/index/role">角色管理</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-message"></i>导航二</template>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i>导航三</template>
    </el-submenu>
  </el-menu>-->

  <el-menu @select="menuSelect">
    <template v-for="item in menuListOne">
      <!--       v-if="item.subs" 判断这一项数据是否有子项菜单-->
      <template v-if="item.children.length>0">
        <el-submenu :index="item.index">
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.name}}
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.index" :key="subItem.index">
            <template slot="title">
              <i :class="subItem.icon"></i>
              <span>{{subItem.name}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
      <!--      若不是多级菜单就会走这里生成一级菜单-->
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>

</template>

<script>
  import menu from "@/api/menu";

  export default {
    name: "Menu",
    data() {
      return {
        isCollapse: true,
        menuListOne: [],
        menuList: [
          {
            index: "/One/shouye",
            icon: "el-icon-location",
            name: '首页',
            children: []
          },
          {
            index: "/index",
            icon: "el-icon-location",
            name: '系统管理',
            children: [
              {
                index: "/index/map",
                icon: "el-icon-location",
                name: '地图',
                children: []
              },
              {
                index: "/index/user",
                icon: "el-icon-location",
                name: '用户管理',
                children: []
              },
              {
                index: "/index/role",
                icon: "el-icon-location",
                name: '角色管理',
                children: []
              }
            ]
          },
        ],
      };
    },
    created() {
      this.treeData()
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //菜单选择【点击事件】
      menuSelect(index, indexPath) {

        this.$router.push(index)
      },
      //处理菜单树数据
      treeData(){
        menu.getPermissionTree({}).then((res) => {
          const list = res.data;
          for (let i = 0; i < list.length; i++) {
            if (list[i].name == "一级无子菜单") {
              if (list[i].childMenus.length > 0) {
                for (let j = 0; j < list[i].childMenus.length; j++) {
                  this.menuListOne.push({
                    index: "/" + list[i].path + "/" + list[i].childMenus[j].path,
                    icon: list[i].childMenus[j].iconcls,
                    name: list[i].childMenus[j].name,
                    children: []
                  })
                }
              }
            } else {
              var zhongjian = []
              if (list[i].childMenus.length > 0) {
                for (let j = 0; j < list[i].childMenus.length; j++) {
                  zhongjian.push({
                    index: "/" + list[i].path + "/" + list[i].childMenus[j].path,
                    icon: list[i].childMenus[j].iconcls,
                    name: list[i].childMenus[j].name,
                    children: []
                  })
                }
              }
              this.menuListOne.push({
                index: "/" + list[i].path,
                icon: list[i].iconcls,
                name: list[i].name,
                children: zhongjian
              })
            }
          }
        })
      }
    }
  }

</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
