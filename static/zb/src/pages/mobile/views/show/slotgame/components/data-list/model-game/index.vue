<template>
  <div class="model-game" v-show="value">
    <div class="dialog_main">
      <span class="dialog_close" @click='$emit("input",false)'><span class="iconfont icon-close1"></span></span>
      <div class="title_wrap">{{data.name}}</div>
      <div class="dialog_content">
        <p>鸿亚祝您多多盈利！</p>
        <a href="javascript:;" class="btn btn01 btn_real btn-play" v-show="showPlay(data)"  @click="playGame(data,$event, 'mobile')"><span>进入真钱游戏</span></a>
        <a href="javascript:;" v-show="showTry(data)" class="btn  btn_try" style="color: #fff" @click="tryGame(data,$event, 'mobile')">进入免费试玩
        </a>
      </div>
    </div>
  </div>
</template>
<script>
  import {games} from "@/controls/games/game"

  export default {
    // 混合
    mixins: [games],
    data() {
      return {

      };
    },
    props: {
      value: Boolean,
      data: Object  //表示是ITEM
    },
    activated() {
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .model-game {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    .dialog_main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      background: #fff;
      width: 80%;
      border-radius: r(10);
      overflow: hidden;
      text-align: center;

      .dialog_close {
        position: absolute;
        right: r(4);
        top: r(8);
      }
      .title_wrap {
        background: $cl1;
        padding: r(20);
        font-size: 1.8em;
      }
      .dialog_content {
        padding: r(20);
        p {
          color: #000;
          font-size: 1.2em;
        }
        .btn {
          margin-top: r(20);
          color: #fff;
          font-size: 1.3em;
          display: block;
          width: 100%;
          height: r(30*2);
          line-height: r(30*2);
          font-weight: 700;
          background: $cl1;
          border: none;
        }
      }
    }
  }

</style>
