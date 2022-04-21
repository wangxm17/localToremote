<template>
  <div>
    <!--左侧树-->
    <el-col :span="4">
      <left-tree></left-tree>
    </el-col>

    <!--右侧文件-->
    <el-col :span="20">
      <div @dragover="fileDragover" @drop="fileDrop">
        <right-file-img :fileList="fileList"></right-file-img>
      </div>
    </el-col>

  </div>
</template>

<script>
import leftTree from '@/views/FileMsg/components/leftTree' //左侧树
import rightFileImg from '@/views/FileMsg/components/rightFileImg' //右侧文件--图片展示
import fileIconKeyValue from '@/api/FileMsg/fileIconKeyValue' //右侧文件--图片图标

export default {
  name: 'fileMsg',
  components: {
    leftTree,rightFileImg
  },
  data () {
    return {
      //文件数据集
      fileList: [
        {id:'0', name:'文件0.zip'},
        {id:'1', name:'文件1.zip'},
        {id:'2', name:'文件2.dir'},
        {id:'3', name:'文件3.doc'},
        {id:'3', name:'文件3.docx'},
        {id:'3', name:'文件3.avi'},
        {id:'3', name:'文件3.chm'},
        {id:'3', name:'文件3.code'},
        {id:'3', name:'文件3.css'},
        {id:'3', name:'文件3.csv'},
        {id:'3', name:'文件3.dmg'},
        {id:'3', name:'文件3.excel'},
        {id:'3', name:'文件3.exe'},
        {id:'3', name:'文件3.gif'},
        {id:'3', name:'文件3.html'},
        {id:'3', name:'文件3.img'},
        {id:'3', name:'文件3.jar'},
        {id:'3', name:'文件3.js'},
        {id:'3', name:'文件3.json'},
        {id:'3', name:'文件3.md'},
        {id:'3', name:'文件3.music'},
        {id:'3', name:'文件3.oa'},
        {id:'3', name:'文件3.open'},
        {id:'3', name:'文件3.pdf'},
        {id:'3', name:'文件3.pic'},
        {id:'3', name:'文件3.ppt'},
        {id:'3', name:'文件3.rar'},
        {id:'3', name:'文件3.rtf'},
        {id:'3', name:'文件3.sql'},
        {id:'3', name:'文件3.svg'},
        {id:'3', name:'文件3.txt'},
      ],
    }
  },
  mounted() {
    // console.log(iconKeyValue);
    this.setFileIcon(this.fileList);
  },
  methods:{
    //设置文件图标
    setFileIcon:function(newData){
      for(let item in newData){
        let fileExtension = newData[item].name.split('.').pop().toLowerCase();//获取文件后缀
        for(let key in fileIconKeyValue){
          if(fileExtension == key){
            let icon =fileIconKeyValue[key]
            this.$set(newData[item],'icon',require('@/assets/file/'+icon))
          }
        }
      }
    },
    // 拖拽上传
    fileDragover (e) {
      e.preventDefault()
    },
    fileDrop (e) {
      e.preventDefault()
      const file = e.dataTransfer.files[0] // 获取到第一个上传的文件对象
      console.log(file)
      console.log('拖拽释放鼠标时')

      if (!file) return
      if (file.size > (10 * 1000 * 1000)) {
        return alert('文件大小不能超过10M')
      }
      console.log(iconKeyValue)
      // this.imgListOne.push({
      //   id:'',
      //   name:file.name,
      //   icon:''
      // })
      // this.batchFile = file
      // this.fileName = file.name
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
