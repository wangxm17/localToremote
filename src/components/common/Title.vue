<template>
  <div>
    <div class="type1" v-show="type=='type1'">{{titleName}}</div>
    <div class="type2" v-show="type=='type2'">{{titleName}}</div>
    <div class="type3" v-show="type=='type3'">{{titleName}}</div>
    <div class="type4" v-show="type=='type4'">{{titleName}}</div>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props: {
      titleName: {//标题
        type: String,
        default: ''
      },
      type: {//类型
        type: String,
        default: 'type1'
      },
    },
  }
</script>

<style scoped>
  .type1 {
    /*color: #409EFF;*/
    font-size: 1.5rem;
    padding: 0.5rem;
    color: #fafafa;
    text-shadow: 0px 1px 0px #999,0px 2px 0px #888,0px 3px 0px #777,0px 4px 0px #666,0px 5px 0px #555,0px 6px 0px #444,0px 7px 0px #333,0px 8px 7px #001135;
  }
  .type2{
    font-family: "隶书";
    font-size: 1.5rem;
    padding: 0.5rem;
    font-weight: bold;
    filter: Shadow(Color=#9caebd,Direction=25);
  }
  .type3{
    font-size: 1.5rem;
    padding: 0.5rem;
    background: #EEE url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAHklEQVQImWNkYGBgYGD4//8/A5wF5SBYyAr+//8PAPOCFO0Q2zq7AAAAAElFTkSuQmCC) repeat;
    text-shadow: 5px -5px black, 4px -4px white;
    font-weight: bold;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
  .type4{
    font-size: 1.5rem;
    padding: 0.5rem;
    color: transparent;
    -webkit-text-stroke: 1px black;
    letter-spacing: 0.04em;
  }
</style>
