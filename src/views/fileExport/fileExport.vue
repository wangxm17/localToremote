<template>
  <section  style="background: #fff;">
    <div style="text-align: right;padding-top:20px;padding-right: 40px;">
      <el-button @click="toChoose()" type="button" class="el-button--primary">返回选择</el-button>
      <el-button @click="exportWord()" type="button" class="el-button--primary">导出Word报告</el-button>
      <el-button @click="exportPdf()" type="button" class="el-button--primary">导出Pdf报告</el-button>
    </div>
    <div class="word" style="width:90%;margin:0 auto;" id="word">
      <p align="center" style="font-size:24px;line-height: 30px;">{{fileName}}月度管理报告</p>
      <p align="center" style="font-size:20px;line-height: 30px;">({{subtitle}})</p>
      <p style="font-size:22px;line-height: 30px;">一、基本情况</p>
      <p style="font-size:16px;line-height: 30px;font-weight: bold;text-indent: 2rem;">1.报告期末资产组合情况 </p>
      <table >
        <thead>
        <th>资产组合</th>
        <th>占基金总资产比例（%）</th>
        </thead>
        <tbody v-if="fundData.length!=0">
        <tr v-for="item of fundData">
          <td>{{item.name}}</td>
          <td>{{(item.proportion*100).toFixed(2)}}</td>
        </tr>
        </tbody>
        <tr v-else style="height: 80px;" >
          <td colspan="2">暂无数据</td>
        </tr>
      </table>
      <p style="font-size:16px;line-height: 30px;font-weight: bold;text-indent: 2rem;">2.报告期末前五大行业配置情况</p>
      <table >
        <thead>
        <th>行业分类</th>
        <th>占基金总资产比例（%）</th>
        </thead>
        <tbody v-if="industryData.length!=0">
        <tr v-for="item of industryData">
          <td>{{item.name}}</td>
          <td>{{(item.proportion*100).toFixed(2)}}</td>
        </tr>
        </tbody>
        <tr v-else style="height: 80px;" >
          <td colspan="2">暂无数据</td>
        </tr>
      </table>
    </div>
  </section >

</template>

<script>
  import wordExport from  '../../../static/htmlToPdfOrWord/htmlToWord/jquery.word.export'
  export default {
    name: "fileExport",
      data(){
        return{
          fundData:[],
          industryData:[],
          returnData:[],
          id:'',
          fileName:'',
          showBtn:true,
          tableArray:[],
          static_date:'2019-04-23',
          subtitle:'2019年4月'
        }
      },
      methods:{
        toChoose(){
          this.$router.push('/index/fileChoose')
        },
        //导出Word
        exportWord(){
          let that = this;
          //设置table的样式
          var rules = "table{" +
            "	border-collapse:collapse;" +
            "	margin:0 auto;" +
            "	text-align:center;" +
            "	width: 90%;" +
            "}" +
            "table td,table th{" +
            "   text-align:center;" +
            "   border:1px solid #cad9ea;" +
            "   color:#666;" +
            "	height:25pt;" +
            "	flex:1;" +
            "}" +
            "table thead th{" +
            "	background-color:#C00000;" +
            "	color:#fff;" +
            " 	flex:1" +
            "}" +
            "table tr{" +
            "	background:#fff;" +
            "}"
          setTimeout(function(){
            $("#word").wordExport(that.fileName , rules);
            // document.getElementById("word").wordExport(that.fileName , rules);
          },300)
        },
        //导出pdf
        exportPdf(){

        },
      },
      components:{

      },
      mounted(){

      }
    }

</script>

<style scoped>
  table{
    border-collapse:collapse;
    margin:0 auto;
    text-align:center;
    width: 90%;
  }
  table td,table th{
    text-align:center;
    border:1px solid #cad9ea;
    color:#666;
    height:30px;
    line-height: 30px;
    flex:1;
  }
  table thead th{
    background-color:#C00000;
    color:#fff;
    flex:1
  }
  table tr{
    background:#fff;
  }

</style>
