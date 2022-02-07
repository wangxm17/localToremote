<template>
  <div id="app">
    <video
      src="../assets/video/video1.mp4"
      :controls="videoOptions.controls"
      class="video-js vjs-big-play-centered vjs-fluid"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="allow"
      x5-playsinline
      style="width: 50%;"
      @play="onPlayerPlay"
      @pause="onPlayerPause"
      @seeking="seeking"
      autoplay="autoplay"
      ref="video">
    </video>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      fileName: '',
      batchFile: '',
      MAX_FILE_SIZE: 10 * 1000 * 1000,
      videoOptions: {
        controls:true,
        src: "../assets/video/video1.mp4", // url地址
      },
      player: null,
      playTime:'',
      seekTime:'',
      current:'',
    }
  },
  methods: {
    // 播放回调
    seeking(player){
      // this.globalSetting = true
      console.log("player play!", player);
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
    },
    // 播放回调
    onPlayerPlay(player){
      // this.globalSetting = true
      console.log("player play!", player);
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
      // document.getElementsByClassName("vjs-control-bar").style.display = "block";
    },
    // 暂停回调
    onPlayerPause(player){
      // this.globalSetting.controls = false;
      // console.log("player pause!", player);
      // var video = document.getElementById("video");
      // video.controls=false;
      // document.getElementsByClassName("vjs-control-bar").style.display = "none";
    },
    // 点击上传
    chooseUploadFile (e) {
      const file = e.target.files.item(0)

      if (!file) return
      if (file.size > this.MAX_FILE_SIZE) {
        return alert('文件大小不能超过10M')
      }

      this.batchFile = file
      this.fileName = file.name

      // 清空，防止上传后再上传没有反应
      e.target.value = ''
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
      if (file.size > this.MAX_FILE_SIZE) {
        return alert('文件大小不能超过10M')
      }

      this.batchFile = file
      this.fileName = file.name
    },
    // 提交
    uploadOk () {
      if (this.batchFile === '') {
        return alert('请选择要上传的文件')
      }

      let data = new FormData()
      data.append('upfile', this.batchFile)
      console.log(this.fileName)
      // ajax
    }
  },
beforeDestroy() {
  if (this.player) {
    this.player.dispose()
  }
},
}
</script>

<style scoped>
  * {
    font-size: 14px;
  }
  .drag-area {
    height: 800px;
    width: 800px;
    background-color: #42b983;
    border: dashed 1px gray;
    margin-bottom: 10px;
    color: #777;
  }
  .uploader-tips {
    text-align: center;
    height: 200px;
    line-height: 200px;
  }
  .file-name {
    text-align: center;
    height: 200px;
    line-height: 200px;
  }
</style>
