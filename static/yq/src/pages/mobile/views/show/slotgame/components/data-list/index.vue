<template>
  <div class="gameContentList" :class="{haveInput:value!='slot'}">
    <category v-show="value == 'slot'"></category>
    <othergames v-show="value != 'slot' && value != 'download' " v-model="value"></othergames>
    <download v-show="value == 'download'"></download>
  </div>
</template>
<script>
  import category from "./components/category"
  import othergames from "./components/othergames"
  import download from "./components/download"
  import {games} from "@/controls/games/game"
  export default {
    // 混合
    mixins: [games],
    data() {
      return {
        showModel: false, //显示弹框开始游戏 试玩游戏
        curItem: {},//当前选择的游戏
      };
    },
    methods: {
      tickGanme(game){
        this.showModel=true
        this.curItem=game
      }
    },
    created() {
      // 获取游戏数据
      // this.getGames('mobile');
    },
    // components: {modelGame}
    props:{
      value:String
    },
    components:{
      category,othergames,download
    },
    watch:{
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .haveInput{
    margin-top: r(100);
    .slot-game-list{
      min-height: 60vh;
    }
  }
  .slot-game-list {
    // margin-top: r(20);
    padding: 0 0.5%;
    color:#fff;
    overflow: hidden;
    min-height: 100vh;
    .slot-game-item {
      position: relative;
      width: 50%;
      float: left;
      text-align: center;
      padding: 0 r(20)  ;
      margin-bottom: r(20);
      .playBox {
        display: flex;
        justify-content: space-between;
        border: 1px solid #ddd;
        padding: r(20);
      }
      .playbtn{
          // width: r(150);
          @include f(28px);
          padding: r(20) r(30);
          margin: 0 auto;
          background:#4db7f4;
          color: #ffffff;
          border-radius: r(10);
          outline: none;
          cursor: pointer;
          border: none;
          display: block;
          &.playTry {
            background:#59dbd0;
          }
        }
    
    }
    .item-operations {
      background: rgba(0, 0, 0, 0.4);
      color: #ffffff;
      width: 100%;
      height: r(48);
      line-height: r(48);
      display: flex;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    
    .item-view {
      position: relative;
      display: block;
      // border-radius: r(20);
      overflow: hidden;
    }
    .item-hot {
      position: absolute;
      top: 0;
      right: 0;
      height:r(70);
      width:r(70);
      background: url("./icon_game_hot.png") no-repeat;
      background-size: 100%;
    }
    .item-img {
      height: r(280);
      width: 100%;
    }
    .faved{ color:#e21c1d;}
    .item-text{
      flex:5;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .jionfav {
      flex:5
    }
    .iconfont{ @include  f(32px); margin-right: r(5)}
    .item-line {
      position: absolute;
      bottom: r(12);
      padding: 0 r(10);
      right: r(8);
      background: #fc4861;
    }
  }
</style>
