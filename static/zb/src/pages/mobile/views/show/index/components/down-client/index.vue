<template>
  <div class="down-client">
    <div class="titleBox">
      <div class="titleText">应用下载</div>
    </div>
    <ul class="down-list">
      <li>
        <a target="_blank" :href="Download.app">
          <img src="./images/app.jpg" style="border-radius:10px;">
          <div class="down-text">APP</div>
        </a>
      </li>
      <li v-if="!isIOS">
        <a target="_blank" :href="Download.agMobile">
          <img src="./images/dl_ag.png">
          <div class="down-text">AG真人</div>
        </a>
      </li>
      <li>
        <a target="_blank" :href="Download.ag">
          <img src="./images/dl_fish.png">
          <div class="down-text">捕鱼王2</div>
        </a>
      </li>

      <li v-if="isIOS">
        <a target="_blank" :href="Download.dtIos">
          <img src="./images/dl_dt.png">
          <div class="down-text">DT苹果版</div>
        </a>
      </li>
      <li v-else>
        <a target="_blank" :href="Download.dtAndroid">
          <img src="./images/dl_dt.png">
          <div class="down-text">DT安卓版</div>
        </a>
      </li>
      <li v-if="!isIOS">
        <a target="_blank" :href="Download.ptMobile">
          <img src="./images/dl_pt.png">
          <div class="down-text">PT安卓版</div>
        </a>
      </li>
      <li>
        <a target="_blank" :href="Download.lg">
          <img src="./images/lg.png">
          <div class="down-text">LG老虎机</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Download } from "@/assets/data";

export default {
  data() {
    return {
      Download,
      isIOS: false
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  created() {
    if (
      window.navigator.userAgent.toString().search(/(iPhone|iPod|ios|iPad)/i) >
      -1
    ) {
      this.isIOS = true;
    }
  },
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.down-client {
  @include f(28px);
  margin-top: r(20);
  text-align: center;
  background: $main-bg;
  border-top: 1px solid rgba($color: #556ebc, $alpha: 0.5);
  border-bottom: 1px solid rgba($color: #556ebc, $alpha: 0.5);
  .titleBox {
    padding: r(20);
    text-align: left;
    @include f(32px);
    // margin-bottom: r(20);
    color: #e6f3ff;
    position: relative;
    border-bottom: 1px solid rgba($color: #556ebc, $alpha: 0.5);
    .titleText {
      padding-left: r(20);
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: r(6);
        height: r(26);
        background: #fd4e5d;
      }
    }
  }
  .down-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    overflow: hidden;
    overflow-x: auto;
    text-align: center;
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: r(20) 0;
      img {
        width: r(120);
        height: r(120);
      }
      .down-text {
        color: #e6f3ff;
        margin-top: r(14);
      }
    }
  }
}
</style>