<template>
  <el-container class="onlyOneBackground">
    <el-header style="text-align:center;">
      <p style="font-size:24px;">菜单管理</p>
    </el-header>
    <el-header>
      <el-form :inline="true" :model="selectFrom" class="demo-form-inline">
        <!--<el-form-item label="菜单名:">
          <el-input v-model="selectFrom.roleName" placeholder="角色名"></el-input>
        </el-form-item>-->
        <el-form-item>
          <!--<el-tooltip content="查询" placement="top">
            <el-button type="primary" @click="page()" circle><i class="el-icon-search"></i></el-button>
          </el-tooltip>
          <el-tooltip content="置空" placement="top">
            <el-button type="info" @click="reset()" circle><i class="el-icon-brush"></i></el-button>
          </el-tooltip>-->
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
        row-key="id"
        default-expand-all
        :tree-props="{children: 'childMenus', hasChildren: 'hasChildren'}">
      >
<!--        <el-table-column type="index" align="center" label="序号"  width="60"></el-table-column>-->
        <el-table-column prop="name" label="菜单名"></el-table-column>
        <el-table-column  align="center" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.iconcls"/>
            <!--<el-tag size="medium" effect="plain">
              <i :class="scope.row.iconcls"/>
            </el-tag>-->
          </template>
        </el-table-column>
        <el-table-column prop="path" align="center" label="路由path"></el-table-column>
        <el-table-column prop="url" align="center" label="文件路径"></el-table-column>
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
    <el-dialog :title="addOrEditTitle" :visible.sync="addOrEditVisible" @close="addOrEditClose()" :close-on-click-modal="false" width="30%">
      <el-form :model="addOrEditFrom" class="demo-form-inline" size="mini" label-width="30%">
        <el-form-item label="菜单名:">
          <el-input v-model="addOrEditFrom.name" placeholder="菜单名"></el-input>
        </el-form-item>
        <el-form-item label="父级:">
          <el-select v-model="addOrEditFrom.fatherid" placeholder="请选择父级">
            <el-option
              v-for="item in fatherList"
              :key="item.id"
              :label="item.fatherName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图标:">
          <el-tag size="medium" v-show="addOrEditFrom.iconcls" @close="addOrEditIconclsClose()" closable>
            <i :class="addOrEditFrom.iconcls"/>
          </el-tag>
          <el-tooltip placement="bottom" effect="light">
            <div slot="content">
              <div style="width: 700px">
                <el-button v-for="item in iconclsList" :key="item" :class="item" size="mini" @click="addOrEditIconcls(item)"></el-button>
              </div>
            </div>
            <el-button >选择图标</el-button>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="路由path:">
          <el-input v-model="addOrEditFrom.path" placeholder="路由path"></el-input>
        </el-form-item>
        <el-form-item label="文件路径:">
          <el-input v-model="addOrEditFrom.url" placeholder="文件路径"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="addOrEditSubmit" size="mini">保存</el-button>
        <el-button @click="addOrEditClose" size="mini">取消</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import role from "@/api/role";
  import menu from "@/api/menu";
  import iconclsList from "../../api/iconcls";
  export default {
    name: "menuTable",
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
          createTime:'',
          updateTime:'',
          name:'',
          fatherid:'',
          iconcls:'',
          path:'',
          url:'',
        },
        tset:'el-icon-s-tools',
        fatherList:[],//父级字典
        iconclsList:[],//图标字典
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
      this.iconclsList = iconclsList
      this.fatherDict()
    },
    mounted() {
      this.page()
    },
    methods:{
      fatherDict(){
        menu.fatherDict({}).then((res) => {
          this.fatherList = res.data
        })
      },
      page(pageNum){
        if (pageNum == null || pageNum == '') {
          pageNum = 1
        }
        this.pageNum = pageNum
        menu.page({
          pageNum: this.pageNum,
          pageSize: this.pageSize
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
      addOrEditIconcls(item){
        this.addOrEditFrom.iconcls = item
      },
      addOrEditIconclsClose(){
        this.addOrEditFrom.iconcls = ''
      },
      editOpen(row){
        menu.selectByPrimaryKey({
          id:row.id
        }).then((res) => {
          this.addOrEditFrom = res.data
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
          menu.insert(this.addOrEditFrom).then((res) => {
            this.$message.success('新增成功！');
            this.addOrEditClose()
            this.page()
          })
        }
        else if(this.addOrEditTitle == '编辑'){
          menu.updateByPrimaryKey(this.addOrEditFrom).then((res) => {
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
          createTime:'',
          updateTime:'',
          name:'',
          fatherid:'',
          iconcls:'',
          path:'',
          url:'',
        }
      },
      deleteByPrimaryKey(row){
        menu.deleteByPrimaryKey({
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
