<template>
  <el-container class="onlyOneBackground">
    <el-header style="text-align:center;">
      <p style="font-size:24px;">用户管理</p>
    </el-header>
    <el-header>
      <el-form :inline="true" :model="selectFrom" class="demo-form-inline">
        <el-form-item label="用户名:">
          <el-input v-model="selectFrom.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-tooltip content="查询" placement="top">
            <el-button type="primary" @click="page()" circle><i class="el-icon-search"></i></el-button>
          </el-tooltip>
          <el-tooltip content="置空" placement="top">
            <el-button type="info" @click="reset()" circle><i class="el-icon-brush"></i></el-button>
          </el-tooltip>
          <el-tooltip content="新增" placement="top">
            <el-button type="success" @click="addOpen" circle><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main style="padding:20px 0px 0px 0px;">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        size="medium"
      >
        <el-table-column type="index" align="center" label="序号"  width="60"></el-table-column>
        <el-table-column prop="userName" align="center" label="姓名"></el-table-column>
        <el-table-column prop="password" align="center" label="密码"></el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-popconfirm style="margin-right: 10px" title="确认删除？" @confirm="deleteByPrimaryKey(scope.row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" circle></el-button>
            </el-popconfirm>
            <el-button @click="editOpen(scope.row)" type="primary" size="small" icon="el-icon-edit" circle ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-main>
    <el-dialog :title="addOrEditTitle" :visible.sync="addOrEditVisible" @close="addOrEditClose()" :close-on-click-modal="false" width="35%">
      <el-form :inline="true" :model="addOrEditFrom" class="demo-form-inline" size="mini">
        <el-form-item label="用户名:">
          <el-input v-model="addOrEditFrom.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="addOrEditFrom.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="addOrEditFrom.roleIds" multiple placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addOrEditSubmit" size="mini">保存</el-button>
          <el-button @click="addOrEditClose" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
  import user from "@/api/user";
  export default {
    name: "userTable",
    data() {
      return {
        //分页参数
        pageNum: 1, //当前页
        pageSize: 5, //每页条数
        total: 0,  //总数
        //表格参数
        tableData:[],
        //查询参数
        selectFrom:{
          userName:''
        },
        //新增|修改参数
        addOrEditTitle: '新增',  //弹窗标题
        addOrEditVisible: false,  //弹窗是否显示
        addOrEditFrom:{   //新增|修改参数
          id: '',
          userName:'',
          password:'',
          createTime:'',
          updateTime:'',
          roleIds:[],
        },
        roleList:[],//角色字典
        options: [{
          id: '1',
          roleName: '普通用户'
        }, {
          id: '227e6710-1666-4c90-9303-e5a0a0c7548e',
          roleName: '超级管理员'
        }],
      }
    },
    created() {
      this.roleDict()
    },
    mounted() {
      this.page()
    },
    methods:{
      roleDict(){
        user.roleDict({}).then((res) => {
          this.roleList = res.data
        })
      },
      page(pageNum){
        if (pageNum == null || pageNum == '') {
          pageNum = 1
        }
        this.pageNum = pageNum
        user.page({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          userName: this.selectFrom.userName
        }).then((res) => {
          this.tableData = res.data
          this.total = res.total
        })
      },
      reset(){
        this.selectFrom = {
          userName:''
        }
        this.page()
      },
      addOpen(){
        this.addOrEditTitle = '新增'
        this.addOrEditVisible = true
      },
      editOpen(row){
        user.selectByPrimaryKey({
          id:row.id
        }).then((res) => {
          this.addOrEditFrom = res.data
          this.addOrEditTitle = '编辑'
          this.addOrEditVisible = true
        })
      },
      addOrEditSubmit(){
        if(this.addOrEditTitle == '新增'){
          user.insert(this.addOrEditFrom).then((res) => {
            this.$message.success('新增成功！');
            this.addOrEditClose()
            this.page()
          })
        }
        else if(this.addOrEditTitle == '编辑'){
          user.updateByPrimaryKey(this.addOrEditFrom).then((res) => {
            this.$message.success('编辑成功！');
            this.addOrEditClose()
            this.page()
          })
        }else {}
      },
      addOrEditClose(){
        this.addOrEditVisible = false
        this.addOrEditFrom ={
          id: '',
          userName:'',
          password:'',
          createTime:'',
          roleIds:[],
        }
      },
      deleteByPrimaryKey(row){
        user.deleteByPrimaryKey({
          id:row.id
        }).then((res) => {
          this.$message.success('已删除！');
          this.page()
        })
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pageSize = val
        this.handleCurrentChange()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.page(val)
      }
    }
  }
</script>

<style scoped>

</style>
