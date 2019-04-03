<template>
  <div class="download-page">
    <a class="gameImg" :href="Download.app">
      <img src="./images/down-app.png">
      <div class="div-text">
        <span class="span-text">奇幻城APP</span>
      </div>
    </a>

    <a class="gameImg" :href="Download.dtIos" v-if="isIOS">
      <img src="./images/down-dt.png">
      <div class="div-text">
        <span class="span-text">DT客户端</span>
      </div>
    </a>
    <a class="gameImg" :href="Download.dtAndroid" v-else>
      <img src="./images/down-dt.png">
      <div class="div-text">
        <span class="span-text">DT客户端</span>
      </div>
    </a>

    <!-- <a class="gameImg" :href="Download.ptMobile" v-if="!isIOS">
      <img src="./images/down-pt.png">
      <div class="div-text">
        <span class="span-text">PT客户端</span>
      </div>
    </a> -->
    <a class="gameImg" :href="Download.pt2Mobile" v-if="!isIOS">
      <img src="./images/down-pt.png">
      <div class="div-text">
        <span class="span-text">PT国际版客户端</span>
      </div>
    </a>

    <a class="gameImg" :href="Download.agMobile" v-if="!isIOS">
      <img src="./images/down-ag.png">
      <div class="div-text">
        <span class="span-text">AG客户端</span>
      </div>
    </a>

    <a class="gameImg" :href="Download.ag" v-if="!isIOS">
      <img src="./images/down-agfish.png">
      <div class="div-text">
        <span class="span-text">AG捕鱼客户端</span>
      </div>
    </a>

  </div>
</template>
<script>
import { Download } from "@/assets/data";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Download,
      isIOS: false,
    };
  },
  props: {},
  computed: {
    ...mapGetters(["islogin"])
  },
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
.download-page {
  display: flex;
  flex-flow: row wrap;
  padding: 0 r(20);
  border-radius: r(25);
  .gameImg {
    width: 46%;
    display: block;
    margin: r(20) 2%;
    background: $main-bg;
    img {
      width: 100%;
    }
  }
  .div-text {
    padding: r(20) r(10);
    text-align: center;
    .span-text {
      @include f(28px);
      display: inline-block;
      height: r(50);
      line-height: r(50);
    }
  }
}
</style>