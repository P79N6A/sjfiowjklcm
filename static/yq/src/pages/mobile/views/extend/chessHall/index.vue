<template>
  <div class="chessHall">
    <div class="chess-game-list">
      <div v-if="fliterGames.length>0">
        <div v-for="(item,i) in fliterGames" class="chess-game-item" :key="i+item.id" @click="play(item,$event, 'mobile')">
          <a class="item-view" href="javascript:;">
            <div :class="{'item-hot':item.tag.includes('HOT')}"></div>
            <img class="item-img" v-lazy="getImg(item,'mobile')">
          </a>
          <div class="item-operations">
            <div class="item-text">{{item.name}}</div>
            <!--<i  :class="['iconfont icon-heart-full',{faved:getfaved(item)}]" @click.stop="collect(item)"></i>-->
          </div>         
        </div>
      </div>
      <div class="notfind" style="text-align:center;" v-else-if="!fliterGames.length">
        <img src="./images/gameicon_03.png">
        <p style="color:#bda059;line-height:3;">查询不到游戏</p>
      </div>
      <div v-else>
        <loadiing></loadiing>
      </div>
    </div>
    <!-- 开始游戏弹窗 -->
    <!-- <model-game v-model="showModel" :data="curItem"></model-game> -->
  </div>
</template>
<script>
  // import modelGame from "./model-game"
    import {chessGames} from "@/controls/games/chessGames"
  import loadiing from "mobile/components/loadding"
  import openWindow from "@/util/openWindow";
  export default {
    mixins: [chessGames],
    data() {
      return {
      }
    },
    methods: {
      
    },
    computed: {
    },
    created() {
      if (this.$route.params&&this.$route.params.type) {
          switch (this.$route.params.type) {
              case 'MWQP':
                  this.$bus.$emit("setHeaderTxt",'大满贯棋牌')
                  break;
              case 'DTQP':
                  this.$bus.$emit("setHeaderTxt",'DT棋牌')
                  break;
              default:
                  break;
          }
      }
      this.$store.dispatch("UPDATE_USERDATA");
      this.getGames('pc')
    },
    watch: {

    }
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .chessHall {
    background: $main-bg;

    .chess-game-list {
      // margin-top: r(20);
      padding: r(20) 0.5%;
      color: #fff;
      overflow: hidden;
      min-height: 100vh;

      .chess-game-item {
        position: relative;
        width: 33.3%;
        float: left;
        text-align: center;
        padding: 0 r(20);
        margin-bottom: r(20);

        .playBox {
          display: flex;
          justify-content: space-between;
        }

        .playbtn {
          // width: r(150);
          @include f(24px);
          padding: r(10) r(30);
          margin: 0 auto;
          background: #f4faff;
          color: $iconcl;
          border-radius: r(30);
          outline: none;
          cursor: pointer;
          border: none;
          display: block;

          &.playTry {
            background: #546599;
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
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-view {
        position: relative;
        display: block;
        border-radius: r(20);
        overflow: hidden;
        background: -moz-linear-gradient(90deg,#086DB7 0%,#243057 100%);
        background: -o-linear-gradient(90deg,#086DB7 0%,#243057 100%);
        background: -webkit-linear-gradient(90deg,#086DB7 0%,#243057 100%);
        background: linear-gradient(90deg,#086DB7 0%,#243057 100%);
      }

      .item-hot {
        position: absolute;
        top: 0;
        right: 0;
        height: r(70);
        width: r(70);
        background: url("./images/icon_game_hot.png") no-repeat;
        background-size: 100%;
      }

      .item-img {
        height: r(200);
        width: 100%
      }

      .faved {
        color: #e21c1d;
      }

      .item-text {
        flex: 5
      }

      .iconfont {
        flex: 1;
        @include f(48px);
        margin-right: r(5)
      }

      .item-line {
        position: absolute;
        bottom: r(12);
        padding: 0 r(10);
        right: r(8);
        background: #fc4861;
      }
    }
  }

</style>
