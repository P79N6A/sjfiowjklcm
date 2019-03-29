<template>
  <div class="lotter_contest">
    <div class="lotter_title"></div>
    <div class="lotter_msg">
      <div class="move-box">
        <a class="imgBox" @click="open(Games.href_vr, 'VR彩票', 900, 640, true, islogin)">
          <img class="img" src="./images/vr.jpg" alt>
          <div class="textBox">
            <p>VR彩票</p>
            <p>
              前往投注
              <!-- <img src="./images/right.png" alt> -->
              <i class="iconOkbet iconOkbet-xiangyou-copy"></i>
            </p>
          </div>
        </a>
        <a class="imgBox" @click="open(Games.href_bbcp, 'BBIN彩票', 900, 640, true, islogin)">
          <img class="img" src="./images/bbin.jpg" alt>
          <div class="textBox">
            <p>BBIN彩票</p>
            <p>
              前往投注
              <!-- <img src="./images/right.png" alt> -->
              <i class="iconOkbet iconOkbet-xiangyou-copy"></i>
            </p>
          </div>
        </a>    
        <a class="imgBox" @click="open(Games.href_ig_ssc, 'IG时时彩', 900, 640, true, islogin)">
          <img class="img" src="./images/ig.jpg" alt>
          <div class="textBox">
            <p>IG时时彩</p>
            <p>
              前往投注
              <!-- <img src="./images/right.png" alt> -->
              <i class="iconOkbet iconOkbet-xiangyou-copy"></i>
            </p>
          </div>
        </a>     
        <a class="imgBox" @click="open(Games.href_cb, '彩播彩票', 900, 640, true, islogin)">
          <img class="img" src="./images/cb.jpg" alt>
          <div class="textBox">
            <p>彩播彩票</p>
            <p>
              前往投注
              <!-- <img src="./images/right.png" alt> -->
              <i class="iconOkbet iconOkbet-xiangyou-copy"></i>
            </p>
          </div>
        </a>    
      </div>
    </div>
    <router-link class="playbtn" :to="{name:'lottery'}">
      <span class="playbtn-text">更多彩票游戏</span>
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
.lotter_contest {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 460px;
  background: url(./images/ios_down.png) no-repeat center center/100% 100%;
  .lotter_title {
    margin: 45px auto 0;
    width: 617px;
    height: 46px;
    background: url(./images/title_sports.png) no-repeat;
  }
  .lotter_msg {
    margin:20px auto 70px;
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
      margin: 10px;
      display: block;
      width: 25%;
      position: relative;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.6s;
      box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.5);
      .img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        transform: scale(1.05);
      }
      .textBox {
        position: absolute;
        width: 100%;
        bottom: -52px;
        left: 0;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        background: #fff;
        color: #3286ff;
        padding: 14px 8px;
      }
    }
  }
}
.playbtn {
  position: relative;
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
