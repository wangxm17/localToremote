<template>
  <div>

    <el-card>
      <div slot="header">
        <span>1、flex-direction属性：决定主轴的方向（即项目的排列方向）</span>
      </div>
      <div>
        <div v-for="item2 in flex_direction" :key="item2.val">
          <div>{{item2.title}}</div>
          <div class="common" :style="{'flex-direction':item2.val}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color}"
              class="commonList"
            >{{item.text }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 1vh;">
      <div slot="header">
        <span>2、flex-wrap属性：一条轴线排不下，如何换行</span>
      </div>
      <div>
        <div v-for="item2 in flex_wrap" :key="item2.val">
          <div>{{item2.title}}</div>
          <div class="common widthShort" :style="{'flex-wrap':item2.val}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color}"
              class="commonList"
            >{{item.text }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 1vh;">
      <div slot="header">
        <span>3、flex-flow属性：flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap</span>
      </div>
      <div>
        <div>flex-flow: row-reverse nowrap</div>
        <div class="common widthShort" style="flex-flow: row-reverse wrap">
          <div v-for="item in contentList" :key="item.text" :style="{'background':item.color}" class="commonList">{{item.text}}
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 1vh;">
      <div slot="header">
        <span>4、justify-content属性：在水平轴的对齐方式</span>
      </div>
      <div>
        <div v-for="item2 in justify_content" :key="item2.val">
          <div>{{item2.title}}</div>
          <div class="common" :style="{'justify-content':item2.val}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color,'width':item.width}"
              class="commonList2"
            >{{item.text }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 1vh;">
      <div slot="header">
        <span>5、align-items属性：在交叉轴上如何对齐</span>
      </div>
      <div>
        <div v-for="item2 in justify_content" :key="item2.val">
          <div>{{item2.title}}</div>
          <div class="common heightSet" :style="{'align-items':item2.val}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color,'height':item.height,'line-height': item.height}"
              class="commonList2"
            >{{item.text }}</div>
          </div>
        </div>
        <div>
          <div>stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。</div>
          <div class="common" style="align-items: stretch">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color,'height':item.height,'line-height': item.height}"
              class="commonList2"
            >{{item.text }}</div>
          </div>
        </div>
      </div>
    </el-card>

    <el-card style="margin-top: 1vh;">
      <div slot="header">
        <span>6 align-content属性：多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用</span>
      </div>
      <div>
        <div>
          <div>stretch（默认值）：轴线占满整个交叉轴。</div>
          <div class="common widthShort" :style="{'align-content':'stretch'}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color}"
              class="commonList"
            >{{item.text }}</div>
          </div>
        </div>
        <div v-for="item2 in align_content" :key="item2.val">
          <div>{{item2.title}}</div>
          <div class="common widthShort heightSet" :style="{'align-content':item2.val,'flex-wrap':'wrap'}">
            <div
              v-for="item in contentList"
              :key="item.text"
              :style="{'background':item.color}"
              class="commonList"
            >{{item.text }}</div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Flex",
    data() {
      return {
        contentList: [
          {text: '红色1', width: '2vw', height: '2vh', color: 'red'},
          {text: '橙色2', width: '3vw', height: '3vh', color: 'orange'},
          {text: '粉色3', width: '4vw', height: '4vh', color: 'pink'},
          {text: '黄色4', width: '5vw', height: '5vh', color: 'yellow'},
          {text: '绿色5', width: '6vw', height: '6vh', color: 'green'},
          {text: '蓝色6', width: '7vw', height: '7vh', color: 'blue'},
          {text: '紫色7', width: '8vw', height: '8vh', color: 'purple'},
          {text: '灰色8', width: '9vw', height: '9vh', color: 'gray'},
          {text: '黑色9', width: '10vw', height: '10vh', color: 'black'},
        ],
        //1、flex-direction属性：决定主轴的方向（即项目的排列方向）
        flex_direction: [
          {val: 'row', title: 'row（默认值）：主轴为水平方向，正向。'},
          {val: 'row-reverse', title: 'row-reverse：主轴为水平方向，反向。'},
          {val: 'column', title: 'column：主轴为垂直方向，正向。'},
          {val: 'column-reverse', title: 'column：主轴为垂直方向，反向。'},
        ],
        //2、flex-wrap属性：一条轴线排不下，如何换行
        flex_wrap: [
          {val: 'nowrap', title: 'nowrap(默认值)：不换行'},
          {val: 'wrap', title: 'wrap：换行，正向'},
          {val: 'wrap-reverse', title: 'wrap-reverse：换行，反向（第一行在最下面）'},
        ],
        //3、flex-flow属性：flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap
        //4、justify-content属性：在水平轴的对齐方式
        justify_content: [
          {val: 'flex-start', title: 'flex-start（默认值）：左对齐'},
          {val: 'flex-end', title: 'flex-end：右对齐'},
          {val: 'center', title: 'center：水平居中'},
          {val: 'space-between', title: 'space-between：两端对齐'},
          {val: 'space-around', title: 'space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的相隔大一倍。'},
        ],
        //5、align-items属性：在交叉轴上如何对齐
        align_items:[
          {val: 'flex-start', title: 'flex-start：起点对齐'},
          {val: 'flex-end', title: 'flex-end：末端对齐'},
          {val: 'center', title: 'center：垂直居中'},
          {val: 'baseline', title: 'baseline：项目的第一行文字的基线对齐'},
          // {val: 'stretch', title: 'stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。'},
        ],
        //6 align-content属性：多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
        align_content:[
          {val: 'flex-start', title: 'flex-start：与交叉轴的起点对齐'},
          {val: 'flex-end', title: 'flex-end：与交叉轴的终点对齐'},
          {val: 'center', title: 'center：与交叉轴的中间对齐'},
          {val: 'space-between', title: 'space-between：与交叉轴两端对齐，轴线之间的间隔平均分布'},
          {val: 'space-around', title: 'space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍'},
        ]
      }
    },
  }
</script>

<style scoped>
  /*.common{display: flex;background: #a8fffe;padding: 2vh;margin-top: 0.5vh;}*/
  .common {
    display: flex;
    background: #a8fffe;
  }

  .heightSet {
    height: 15vh
  }

  .widthShort {
    width: 20vw;
  }

  .commonList {
    height: 3vh;
    width: 3vw;
    line-height: 3vh;
    text-align: center;
    border-radius: 4px;
  }

  .commonList2 {
    text-align: center;
    border-radius: 4px;
  }
</style>
