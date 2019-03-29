<template>
  <div class="gameContentList" :class="{haveInput:value!='slot'}">
    <category v-show="value == 'slot'"></category>
    <othergames v-show="value != 'slot'" v-model="value"></othergames>
  </div>
</template>
<script>
  import category from "./components/category"
  import othergames from "./components/othergames"
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
      category,othergames
    },
    watch:{
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .gameContentList{
    margin-top: 8.4rem;
    // margin-bottom: r(100)
  }
  .haveInput{
    margin-top: r(100);
    .slot-game-list{
      min-height: 60vh;
    }
  }
  .slot-game-list {
    margin-top: r(20);
    padding: 0 0.5%;
    color:#fff;
    overflow: hidden;
    min-height: 100vh;
    .slot-game-item {
      position: relative;
      width: 33.3%;
      float: left;
      text-align: center;
      padding: 0 r(20)  ;
      margin-bottom: r(20);
      .playBox {
        display: flex;
        justify-content: space-between;
      }
      .playbtn{
          // width: r(150);
          @include f(24px);
          padding: r(10) r(20);
          margin: 0 auto;
          background:#f4faff;
          color: $iconcl;
          border-radius: r(30);
          outline: none;
          cursor: pointer;
          border: none;
          display: block;
          &.playTry {
            background:#546599;
            color: #f4faff;
          }
        }
    
    }
    .item-operations {
      // background: rgba(0, 0, 0, 0.7);
      background: $body-bg;
      color: $text-cl;
      height: r(48);
      display: flex;
      line-height: r(48);
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    
    .item-view {
      position: relative;
      display: block;
      border-radius: r(20);
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
      height: r(200);
      width: 100%
    }
    .faved{ color:#e21c1d;}
    .item-text{flex:5}
    .iconfont{ flex:1;@include  f(48px); margin-right: r(5)}
    .item-line {
      position: absolute;
      bottom: r(12);
      padding: 0 r(10);
      right: r(8);
      background: #fc4861;
    }
  }
</style>
