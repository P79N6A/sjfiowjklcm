<template>
  <div class="real_contest">
    <div class="real_title"></div>
    <div class="real_msg">
      <div class="move-box">
        <a class="imgBox" @click="open(Games.href_bbin, 'BBIN真人', 900, 640, true, islogin)">
          <img class="img" src="./images/pic1.png" alt>
          <div class="textBox">
            <p>BBIN真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div>
        </a>
        <a class="imgBox" @click="open(Games.href_ag, 'AG真人', 900, 640, true, islogin)">
          <img class="img" src="./images/pic2.png" alt>
          <div class="textBox">
            <p>AG真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div>
        </a>
        <a class="imgBox" @click="open(Games.href_sunbet, '申博真人', 900, 640, true, islogin)">
          <img class="img" src="./images/pic3.png" alt>
          <div class="textBox">
            <p>申博真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div>
        </a>
        <a class="imgBox" @click="open(Games.href_og, 'OG真人', 900, 640, true, islogin)">
          <img class="img" src="./images/pic4.png" alt>
          <div class="textBox">
            <p>OG真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div>
        </a>
        
      </div>
    </div>
    <router-link class="playbtn" :to="{name:'real'}">
      <span class="playbtn-text">更多真人游戏</span>
    </router-link>
  </div>
</template>
<script>
import { Games } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Games
    };
  },
  methods: {
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    }
  },
  created() {},
  computed: {
    ...mapGetters(["islogin"])
  }
};
</script>
<style lang="scss" scoped>
.real_contest {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 440px;
  background: url(./images/bg_lol.jpg) no-repeat center center/100% 100%;
  .real_title {
    margin: 35px auto 0;
    width: 617px;
    height: 46px;
    background: url(./images/title_sports.png) no-repeat;
  }
  .real_msg {
    margin: 10px auto 20px;
    width: 1280px;
    // overflow: hidden;
    // box-shadow: 0 0 8px -2px #409eff;
    .move-box {
      position: relative;
      display: flex;
      justify-content: space-between;
      // animation: move 20s linear infinite;
      // &:hover {
      //   animation-play-state: paused;
      // }
    }
    .imgBox {
      display: block;
      width: 25%;
      position: relative;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.6s;
      margin: 10px;
      box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.5);
      &:hover {
        transform: scale(1.05);
      }
      .img {
        width: 100%;
        height: 100%;
      }
      .textBox {
        position: absolute;
        width: 300px;
        bottom: -52px;
        left: 0;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        background: #000;
        padding: 14px 20px
      }
    }
  }
}
.playbtn {
  position: relative;
  top: 50px;
  display: block;
  padding-left: 14px;
  padding-right: 10px;
  margin: 0 auto;
  box-sizing: content-box;
  width: 171px;
  height: 43px;
  color: #fff;
  line-height: 40px;
  border-radius: 21.5px;
  text-align: center;
  // border: 1px solid #fff;
  font-size: 14px;
  transition: 0.3s;
  overflow: hidden;
  background: #3286ff;
  background: -moz-linear-gradient(to right, #3286ff, #33cdf8);
  background: -o-linear-gradient(to right, #3286ff, #33cdf8);
  background: -webkit-linear-gradient(to right, #3286ff, #33cdf8);
  background: linear-gradient(to right, #3286ff, #33cdf8);
  &:after {
    left: 50%;
    bottom: 0;
    position: absolute;
    display: block;
    transition: 0.3s;
    content: "";
    width: 0;
    height: 45px;
    background: #fff;
    height: 120%;
    left: -10%;
    transform: skewX(15deg);
  }
  &:hover {
    &:after {
      width: 100%;
      left: -10%;
      width: 120%;
      color: #3ec1fe;
    }
    color: #3ec1fe;
  }
  .playbtn-text {
    position: relative;
    z-index: 1;
    display: inline-block;
    vertical-align: middle;
  }
}
@keyframes move {
  0% {
    left: 0;
  }
  100% {
    left: -1320px;
  }
}
</style>
