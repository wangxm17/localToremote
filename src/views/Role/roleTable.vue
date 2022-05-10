<template>
  <el-container class="AppBackground">
    <el-header style="text-align:center;">
      <p style="font-size:24px;">角色管理</p>
<!--      <span>{{products}}</span>-->
    </el-header>
    <el-header>
      <el-form :inline="true" :model="selectFrom" class="demo-form-inline">
        <el-form-item label="角色名:">
          <el-input v-model="selectFrom.roleName" placeholder="角色名"></el-input>
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
        <el-table-column prop="roleName" align="center" label="角色名"></el-table-column>
        <el-table-column prop="describtion" align="center" label="描述"></el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" align="center" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-popconfirm style="margin-right: 10px" title="确认删除？" @confirm="deleteByPrimaryKey(scope.row)">
              <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" circle></el-button>
            </el-popconfirm>
            <el-button @click="editOpen(scope.row)" type="primary" size="small" icon="el-icon-edit" circle ></el-button>
            <el-button @click="keyOpen(scope.row)" type="warning" size="small" icon="el-icon-key" circle ></el-button>
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
    <el-dialog :title="addOrEditTitle" :visible.sync="addOrEditVisible" @close="addOrEditClose()" :close-on-click-modal="false" width="30%">
      <el-form :model="addOrEditFrom" class="demo-form-inline" size="mini" label-width="30%">
        <el-form-item label="角色名:">
          <el-input v-model="addOrEditFrom.roleName" placeholder="角色名" style="width: 70%"></el-input>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input type="textarea" :rows="2" v-model="addOrEditFrom.describtion" placeholder="描述" style="width: 70%"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="addOrEditSubmit" size="mini">保存</el-button>
        <el-button @click="addOrEditClose" size="mini">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="keyTitle" :visible.sync="keyVisible" @close="addOrEditClose()" :close-on-click-modal="false" width="30%">
      <div>
        <el-tree
          :data="menuList"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          check-strictly
          :props="defaultProps">
        </el-tree>
      </div>
      <div style="text-align: center;margin-top: 7%">
        <el-button type="primary" @click="keySubmit" size="mini">保存</el-button>
        <el-button @click="keyClose" size="mini">取消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import role from "@/api/role";
    export default {
      name: "roleTable",
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
            roleName:''
          },
          //新增|修改参数
          addOrEditTitle: '新增',  //弹窗标题
          addOrEditVisible: false,  //弹窗是否显示
          addOrEditFrom:{   //新增参数
            id: '',
            roleName:'',
            describtion:'',
            createTime:'',
            updateTime:''
          },
          //权限配置
          keyTitle:'权限配置', //弹窗标题
          keyVisible: false,  //弹窗是否显示
          keyFromRid:'',//权限配置角色id缓存
          menuList:[],//菜单字典
          defaultProps: { //菜单默认参数
            children: 'childMenus',
            label: 'name'
          }
        }
      },
      computed: {
        products() {
          // return this.$store.state.products
        },
        saleProducts() {
          // return this.$store.getters.saleProducts; // 通过this.$store.getters将函数return出去
        }
      },
      created() {
        this.menuDict()
      },
      mounted() {
        this.page()
        // console.log(this.$store.getters.saleProducts)
        // console.log(this.$store.getters.getToken)
      },
      methods:{
        menuDict(){
          role.menuDict({}).then((res) => {
            this.menuList = res.data
          })
        },
        page(pageNum){
          if (pageNum == null || pageNum == '') {
            pageNum = 1
          }
          this.pageNum = pageNum
          role.page({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            roleName: this.selectFrom.roleName
          }).then((res) => {
            this.tableData = res.data
            this.total = res.total
          })
        },
        reset(){
          this.selectFrom = {
            roleName:''
          }
          this.page()
        },
        addOpen(){
          this.addOrEditTitle = '新增'
          this.addOrEditVisible = true
        },
        editOpen(row){
          role.selectByPrimaryKey({
            id:row.id
          }).then((res) => {
            this.addOrEditFrom ={
              id: res.data.id,
              roleName:res.data.roleName,
              describtion:res.data.describtion,
              createTime:res.data.createTime
            }
            this.addOrEditTitle = '编辑'
            this.addOrEditVisible = true
          })
        },
        addOrEditSubmit(){
          if(!this.addOrEditFrom.id){
            delete this.addOrEditFrom.id
          }
          else if(!this.addOrEditFrom.roleName){
            delete this.addOrEditFrom.roleName
          }
          else if(!this.addOrEditFrom.describtion){
            delete this.addOrEditFrom.describtion
          }else {}
          if(this.addOrEditTitle == '新增'){
            role.insert(this.addOrEditFrom).then((res) => {
              this.$message.success('新增成功！');
              this.addOrEditClose()
              this.page()
            })
          }
          else if(this.addOrEditTitle == '编辑'){
            role.updateByPrimaryKey(this.addOrEditFrom).then((res) => {
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
            roleName:'',
            describtion:'',
          }
        },
        deleteByPrimaryKey(row){
          role.deleteByPrimaryKey({
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
        },
        /*****************************权限管理*****************************/
        keyOpen(row){
          this.keyFromRid = row.id
          role.selectPidByRid(row.id).then((res) => {
            this.keyTitle = '权限配置'
            this.keyVisible = true
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(res.data);
            });
          })
        },
        keySubmit(){
          let allPid = this.$refs.tree.getCheckedKeys()
          role.editByRid(this.keyFromRid,allPid).then((res) => {
            this.keyClose()
            this.$message.success('权限配置成功！');
          })
          // console.log(this.$refs.tree.getCheckedKeys());
        },
        keyClose(){
          this.keyFromRid = ''
          this.$refs.tree.setCheckedKeys([]);
          this.keyVisible = false
        },

      }
    }
</script>

<style scoped>

</style>
