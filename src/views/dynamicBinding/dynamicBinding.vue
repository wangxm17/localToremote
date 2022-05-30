<template>
  <el-container class="onlyOneBackground">
    <el-header style="text-align: center;font-size: 18px;">
      参数动态绑定
    </el-header>
    <el-main>
      <!--示例1-->
      <div>
        <el-header style="padding: 0px;">
          <span>示例1</span><el-button type="primary" @click="addBtn('bindForm1')" style="margin-left: 10px;" size="mini">新增</el-button>
        </el-header>
        <el-form :inline="true" size="mini">
          <el-row v-for="(item,index) in bindForm1" :key="index">
            <el-form-item label="标题1">
              <el-input v-model="item.param1" placeholder="标题1"></el-input>
            </el-form-item>
            <el-form-item label="标题2">
              <el-select v-model="item.param2" placeholder="标题2">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="delBtn('bindForm1',index)">删除</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </div>
      <!--示例2-->
      <div>
        <el-header style="padding: 0px;">
          <span>示例2</span><el-button type="primary" @click="addBtn('bindForm2')" style="margin-left: 10px;" size="mini">新增</el-button>
        </el-header>
        <el-collapse>
          <el-form :inline="true" size="mini">
            <el-collapse-item v-for="(item,index) in bindForm2" :key="index" :name="index" title="模块" v-model="activeNames">
              <el-form-item label="标题1">
                <el-input v-model="item.param1" placeholder="标题1"></el-input>
              </el-form-item>
              <el-form-item label="标题2">
                <el-select v-model="item.param2" placeholder="标题2">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="delBtn('bindForm2',index)">删除</el-button>
              </el-form-item>
            </el-collapse-item>
          </el-form>
        </el-collapse>

      </div>

    </el-main>
  </el-container>
</template>

<script>
  export default {
      name: "dynamicBinding",
      data () {
        return {
          activeNames: ['1'],
          bindForm1:[],//绑定数组
          bindForm2:[],//绑定数组
        }
      },
      mounted() {
        this.addBtn('bindForm1');//初始化表单
        this.addBtn('bindForm2');//初始化表单
      },
    methods:{
        //点击新增按钮
        addBtn(formName){
          if(formName == 'bindForm1') this.bindForm1.push({param1:'', param2:'', param3:'', param4:''});
          if(formName == 'bindForm2') this.bindForm2.push({param1:'', param2:'', param3:'', param4:''});
        },
        //点击删除按钮
        delBtn(formName,index){
          if(formName == 'bindForm1') this.bindForm1.splice(index,1);
          if(formName == 'bindForm2') this.bindForm2.splice(index,1);
        },
        //点击提交按钮
        submitBtn(){

        }
      }
  }
</script>

<style scoped>

</style>
