<template>
  <section  style="background: #fff;">
    <div style="text-align: right;padding-top:20px;padding-right: 40px;">
      <el-button @click="toChoose()" type="button" class="el-button--primary">返回选择</el-button>
      <el-button @click="exportWord()" type="button" class="el-button--primary">导出Word报告</el-button>
      <el-button @click="exportPdf()" type="button" class="el-button--primary">导出Pdf报告</el-button>
    </div>
    <div class="word" style="width:90%;margin:0 auto;" id="word" ref="orderForm1">
      <p class="bigTitle">{{fileName}}</p>
      <p class="bigTitle">({{subtitle}})</p>
      <!--文字-->
      <div v-for="(item,index) in textData" :key="index" v-show="item.isShow">
        <p class="subtitle">{{item.label}}</p>
        <p class="content">{{item.content}}</p>
        <div v-for="(item2,index2) in item.children" :key="index2" v-show="item2.isShow">
          <p class="subSubtitle">{{item2.label}} </p>
          <p class="Subcontent">{{item2.content}}</p>
        </div>
      </div>
      <!--表格-->
      <div v-show="tableData.isShow">
        <p class="subtitle">{{tableData.label}}</p>
        <div v-show="tableData.children[0].isShow">
          <p class="subSubtitle">{{tableData.children[0].label}} </p>
          <table >
            <thead>
            <th>资产组合</th>
            <th>占基金总资产比例（%）</th>
            </thead>
            <tr style="height: 80px;" >
              <td colspan="2">暂无数据</td>
            </tr>
          </table>
        </div>
        <div v-show="tableData.children[1].isShow">
          <p class="subSubtitle">{{tableData.children[1].label}}</p>
          <table >
            <thead>
            <th>行业分类</th>
            <th>占基金总资产比例（%）</th>
            </thead>
            <tbody v-if="(tableData.children[1].content).length!=0">
            <tr v-for="item of tableData.children[1].content">
              <td>{{item.name}}</td>
              <td>{{(item.proportion*100).toFixed(2)}}</td>
            </tr>
            </tbody>
            <tr v-else style="height: 80px;" >
              <td colspan="2">暂无数据</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section >

</template>

<script>
  import wordExport from  '../../../static/htmlToPdfOrWord/htmlToWord/jquery.word.export'
  import JsPDF from 'jspdf'
  import html2canvas from "html2canvas";
  export default {
    name: "fileExport",
    components:{},
    data(){
      return{
        fileName:'报告标题',
        subtitle:'2019年4月（副标题）',
        allData:[],//全部数据
        textData:[],//上方的文字数据
        tableData:{},//下方表格数据
        //选中数组
        getCheckedKeys:[],
        }
      },
    mounted () {
      //接收传参
      // console.log('参数传过来了')
      this.allData = this.$route.query.treeData;//获取传过来的推送记录对象
      this.getData();
      this.getCheckedKeys = this.$route.query.getCheckedKeys;//获取传过来的推送记录对象
    },
    methods:{
      getData(){
        let length = this.allData.length;
        this.textData = this.allData.slice(0, length-1);//文字数据
        this.tableData = this.allData[this.allData.length-1]//表格数据
      },
      toChoose(){
        this.$router.push({
          path: '/index/fileChoose',
          query: {
            treeData: this.allData,
            getCheckedKeys: this.getCheckedKeys,
          }
        })
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
          let _this = this
          let myBox = this.$refs.orderForm1; //获取ref里面的内容
          html2canvas(myBox, {
            useCORS: true, //是否尝试使用CORS从服务器加载图像
            allowTaint: true,
            dpi: 300, //解决生产图片模糊
            scale: 3, //清晰度--放大倍数
          }).then(function (canvas) {
            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89 // 一页pdf显示html页面生成的canvas高度;
            let leftHeight = contentHeight //未生成pdf的html页面高度
            let position = 0 //pdf页面偏移
            //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
            // let imgWidth = 595.28
            let imgWidth = 560.28  //宽度
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')

            // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
            //当内容未超过pdf一页显示的范围，无需分页
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 20, 20, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save('食堂利用明细' + '.pdf')//下载标题
          });
        },
    },

  }

</script>

<style scoped>
  .bigTitle{
    font-size:24px;line-height: 30px;text-align: center;
  }
  .subtitle{
    font-size:22px;line-height: 30px;
  }
  .subSubtitle{
    font-size:16px;line-height: 30px;font-weight: bold;text-indent: 2rem;
  }
  .content{
    text-indent: 2em;line-height: 30px;
  }
  .Subcontent{
    text-indent: 4em;line-height: 30px;
  }
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
