<template>
  <div class="sports_contest">
    <div class="sports_title"></div>
    <div class="sports_msg">
      <div class="move-box">
        <a class="imgBox" @click="open(Games.href_sb_pc, '沙巴体育', 900, 640, true, islogin)">
          <img src="./images/sb.png" alt>
          <!-- <div class="textBox">
            <p>BBIN真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div> -->
        </a>
        <a class="imgBox" @click="open(Games.href_ug_pc, '新皇冠体育', 900, 640, true, islogin)">
          <img src="./images/ug.png" alt>
          <!-- <div class="textBox">
            <p>AG真人</p>
            <p>
              前往投注
              <img src="./images/right.png" alt>
            </p>
          </div> -->
        </a>      
      </div>
    </div>
    <!-- <router-link class="playbtn" :to="{name:'sport'}">
      <span class="playbtn-text">更多体育游戏</span>
    </router-link> -->
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
.sports_contest {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 420px;
  background: url(./images/bg_sports.jpg) no-repeat center center/100% 100%;
  .sports_title {
    margin: 60px auto 0;
    width: 617px;
    height: 46px;
    background: url(./images/title_sports.png) no-repeat;
  }
  .sports_msg {
    margin: 30px auto;
    width: 1280px;
    // overflow: hidden;
    // box-shadow: 0 0 8px -2px #409eff;
    .move-box {
      position: relative;
      display: flex;
      justify-content: space-around;
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
      box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.5);
      img {
        width: 100%;
        height: 100%;
      }
      &:hover {
        transform: scale(1.05);
      }
      .textBox {
        position: absolute;
        width: 250px;
        bottom: 64px;
        left: 45px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
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
