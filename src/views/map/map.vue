<template>
  <div style="height: 89vh;">
    <!--选择器-->
    <div class="cardBackground">
      <Title titleName="地址选择器" type="type1"></Title>
      <el-cascader size="large" :options="options" v-model="selectedOptions" @change="handleChange"></el-cascader>
    </div>
    <!--省份选择-->
    <div class="cardBackground">
      <Title titleName="省份选择" type="type2"></Title>
      <areas-select></areas-select>
    </div>
    <!--统计图-->
    <div class="cardBackground">
      <Title titleName="统计图" type="type3"></Title>
      <div class="left_center_map" id="main" :style="{height:'40vh',width:'100%'}"></div>
    </div>
    <!--地图-->
    <div class="cardBackground">
      <Title titleName="地图" type="type4"></Title>
      <div id="mapContainer" :style="{height:'40vh',width:'100%'}"></div>
    </div>
    <!--    <div class="left_center_map" id="mapJson" :style="{height:'400px',width:'100%'}"></div>-->
    <!--    <canvas id="canvas"/>-->
    <!--    <canvas id="name"/>-->
  </div>
</template>

<script>
  import AreasSelect from '@/components/common/AreasSelect.vue'
  import Title from '@/components/common/Title.vue'
  import * as d3geo from 'd3-geo'
  // import JSON from '@/assets/jiaxing.json'
  // import JSON from '@/assets/bengbu.json'
  import JSON from '@/assets/zgMap.json'
  import jinan from '@/assets/370100.json'
  import chinaJson from '@/assets/zgMap.json'
  import {provinceAndCityData} from 'element-china-area-data'

  export default {
    name: "maprwqr",
    components: {
      AreasSelect,Title
    },
    data() {
      return {
        options: provinceAndCityData,
        selectedOptions: [],
        //3D地图
        scene: null, // 场景
        camera: null, // 摄像机
        renderer: null, // 渲染器
        map: null, // 地图容器
        bindData:[],
      }
    },
    mounted() {
      // console.log(this.options)
      this.leftCenterMap()
      // this.leftCenterMap2()
      this.leftCenterMap3()

      // 初始化3D环境
      // this.initEnvironment()
      // // 构建光照系统
      // this.buildLightSystem()
      // // 构建辅助系统
      // this.buildAuxSystem()
      // this.initMap()
      // this.loop()
    },
    methods: {
      huoqu(){
        console.log(this.bindData)
      },
      handleChange(value) {
        console.log(value)
      },
      leftCenterMap() {
        var myChart = this.$echarts.init(document.getElementById('main'))
        var option = {
          title: {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              data: [
                {value: 1048, name: '搜索引擎'},
                {value: 735, name: '直接访问'},
                {value: 580, name: '邮件营销'},
                {value: 484, name: '联盟广告'},
                {value: 300, name: '视频广告'}
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        myChart.setOption(option)
      },
      leftCenterMap2() {
        var myChart = this.$echarts.init(document.getElementById('mapJson')) // 拿到一个实例
        this.$echarts.registerMap('map', JSON, {})//引入地图文件
        var option = {
          series: [
            {
              type: 'map',
              mapType: 'map'//地图名称
            }]
        }
        myChart.setOption(option)
      },
      leftCenterMap3() {
        var myChart = this.$echarts.init(document.getElementById('mapContainer')) // 拿到一个实例
        this.$echarts.registerMap('map', jinan, {})//引入地图文件
        var option = {
          series: [
            {
              type: 'map',
              mapType: 'map'//地图名称
            }]
        }
        myChart.setOption(option)
      },
/*************************************3d地图************************/
      // 初始化3D环境
      initEnvironment () {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0)
        // 建一个空对象存放对象
        this.map = new THREE.Object3D()
        // 设置相机参数
        this.setCamera();
        // 初始化
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          canvas: document.querySelector('canvas')
        })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth-200, window.innerHeight - 200)
        // this.renderer.setSize(500, 500)
        document.addEventListener('mousemove', this.onDocumentMouseMove, false)
        window.addEventListener('resize', this.onWindowResize, false)
      },
      initMap () {
        // console.log('json', chinaJson)
        // d3-geo转化坐标
        const projection = d3geo.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);
        // 遍历省份构建模型
        chinaJson.features.forEach(elem => {
          // 新建一个省份容器：用来存放省份对应的模型和轮廓线
          const province = new THREE.Object3D()
          const coordinates = elem.geometry.coordinates
          coordinates.forEach(multiPolygon => {
            multiPolygon.forEach(polygon => {
              // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
              const shape = new THREE.Shape()
              const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
              const linGeometry = new THREE.Geometry()
              for (let i = 0; i < polygon.length; i++) {
                const [x, y] = projection(polygon[i])
                if (i === 0) {
                  shape.moveTo(x, -y)
                }
                shape.lineTo(x, -y);
                linGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01))
              }
              const extrudeSettings = {
                depth: 4,
                bevelEnabled: false
              };
              const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
              const material = new THREE.MeshBasicMaterial({ color: '#d13a34', transparent: true, opacity: 0.6 })
              const mesh = new THREE.Mesh(geometry, material)
              const line = new THREE.Line(linGeometry, lineMaterial)
              province.add(mesh)
              province.add(line)
            })
          })
          // 将geojson的properties放到模型中，后面会用到
          province.properties = elem.properties
          if (elem.properties.centroid) {
            const [x, y] = projection(elem.properties.centroid)
            province.properties._centroid = [x, y]
          }
          this.map.add(province)
        })
        this.scene.add(this.map)
      },
      setCamera () {
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(0, -70, 90);
        this.camera.lookAt(0, 0, 0);
      },
      // 显示名称
      showName () {
        const width = window.innerWidth
        const height = window.innerHeight
        let canvas = document.querySelector('#name')
        if (!canvas) return
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // 新建一个离屏canvas
        const offCanvas = document.createElement('canvas')
        offCanvas.width = width
        offCanvas.height = height
        const ctxOffCanvas = canvas.getContext('2d');
        // 设置canvas字体样式
        ctxOffCanvas.font = '16.5px Arial';
        ctxOffCanvas.strokeStyle = '#FFFFFF';
        ctxOffCanvas.fillStyle = '#1f24b6';
        // texts用来存储显示的名称，重叠的部分就不会放到里面
        const texts = [];
        /**
         * 遍历省份数据，有2个核心功能
         * 1. 将3维坐标转化成2维坐标
         * 2. 后面遍历到的数据，要和前面的数据做碰撞对比，重叠的就不绘制
         * */
        this.map.children.forEach((elem, index) => {
          if (!elem.properties._centroid) return
          // 找到中心点
          const y = -elem.properties._centroid[1]
          const x = elem.properties._centroid[0]
          const z = 4
          // 转化为二维坐标
          const vector = new THREE.Vector3(x, y, z)
          const position = vector.project(this.camera)
          // 构建文本的基本属性：名称，left, top, width, height -> 碰撞对比需要这些坐标数据
          const name = elem.properties.name
          const left = (vector.x + 1) / 2 * width
          const top = -(vector.y - 1) / 2 * height
          const text = {
            name,
            left,
            top,
            width: ctxOffCanvas.measureText(name).width,
            height: 16.5
          }
          // 碰撞对比
          let show = true
          for (let i = 0; i < texts.length; i++) {
            if (
              (text.left + text.width) < texts[i].left ||
              (text.top + text.height) < texts[i].top ||
              (texts[i].left + texts[i].width) < text.left ||
              (texts[i].top + texts[i].height) < text.top
            ) {
              show = true
            } else {
              show = false
              break
            }
          }
          if (show) {
            texts.push(text)
            ctxOffCanvas.strokeText(name, left, top)
            ctxOffCanvas.fillText(name, left, top)
          }
        })
        // 离屏canvas绘制到canvas中
        ctx.drawImage(offCanvas, 0, 0)
      },
      // 构建辅助系统: 网格和坐标
      buildAuxSystem () {
        // let axisHelper = new THREE.AxesHelper(2000)
        // this.scene.add(axisHelper)
        // let gridHelper = new THREE.GridHelper(600, 60)
        // this.scene.add(gridHelper)
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
        controls.enableDamping = true
        // controls.dampingFactor = 0.25
        // controls.rotateSpeed = 0.35
      },
      // 光照系统
      buildLightSystem () {
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
        directionalLight.position.set(300, 1000, 500);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;

        let d = 300;
        const fov = 45 //拍摄距离  视野角值越大，场景中的物体越小
        const near = 1 //相机离视体积最近的距离
        const far = 1000//相机离视体积最远的距离
        const aspect = window.innerWidth / window.innerHeight; //纵横比
        directionalLight.shadow.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        directionalLight.shadow.bias = 0.0001;
        directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
        this.scene.add(directionalLight)

        let light = new THREE.AmbientLight(0xffffff, 0.6)
        this.scene.add(light)

      },
      // 根据浏览器窗口变化动态更新尺寸
      onWindowResize () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      },
      onDocumentMouseMove (event) {
        event.preventDefault();
      },
      // 动画循环
      loop () {
        this.showName()
        this.render()
        requestAnimationFrame(this.loop)
      },
      // 渲染画布
      render () {
        this.renderer.render(this.scene, this.camera);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cardBackground{
    margin: 1vh;
    padding: 1vh 5vh 1vh 5vh;
    background-color: #ffffff;
    border-radius: 7px;
  }
  #canvas {
    width: 70%;
    height: 70%;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
  #name {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
