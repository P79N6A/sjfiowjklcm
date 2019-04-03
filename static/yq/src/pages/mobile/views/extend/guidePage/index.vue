<template>
  <div class="beforeHome">
    <div class="mainContent">
      <img src="/static/images/base/logo-1.png" alt class="logo">
      <img src="./images/prize2.png" class="prize" alt>
      <div class="btns">
        <a :href="Download.app" class="btn1" target="_blank">
          <img src="./images/btn1b.png" alt>
        </a>
        <router-link :to="{name:'home'}">
          <img src="./images/btn22.png" alt>
        </router-link>
        <router-link :to="{name:'guideMenu'}">
                  <img src="./images/btn3.png" alt="">
        </router-link>
      </div>
      <img src="./images/icon2019.png" alt class="year">
    </div>
    <div class="footer">
      <p>奇幻城国际牌照NO.174</p>
      <p>版权所有奇幻城国际{{WEBCONFIG.location}}</p>
    </div>
  </div>
</template>
<script>
import { Download, WEBCONFIG } from "@/assets/data";
export default {
  data() {
    return {
      Download,
      WEBCONFIG
    };
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.beforeHome {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f3e7;
  opacity: 1;
  transition: all 0.3s ease-in-out;
  .mainContent {
    position: relative;
    z-index: 2;
    text-align: center;
    width: 85%;
    margin: 0 auto;
    padding-top: r(20);
    img {
      max-width: 75%;
      width: 100%;
      height: auto;
      margin-top: r(30);
    }
    .logo {
      width: 60%;
    }
    .prize {
      margin-top: 0;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    z-index: 2;
    width: 100%;
    color: #333;
    text-align: center;
    font-size: 10px;
    line-height: 20px;
    background-color: #fff;
  }
}
</style>
