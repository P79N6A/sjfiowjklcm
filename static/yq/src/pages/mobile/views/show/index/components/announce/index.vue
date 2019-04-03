<template>
<div class="marquee-page">
<div class="marquee-box">
  <div class="marquee-info">
    <div class="mar-ico">
      <!-- <i class="iconay ay-laba"></i> -->
      <img src="./images/icon.png" alt="">
    </div>
    <marquee ref="mq" class="marquee-content" behavior="scroll" direction="left" loop="infinite" scrollamount="3">
      <router-link v-for="(item,i) in announcement" :key="i" :to="{name:'notice'}">
        [{{item.createtime | Date("yyyy年M月dd日")}}]&nbsp;<span style="margin-right:0.3rem">{{item.title}}</span>
      </router-link>
    </marquee>
  </div>
</div>
</div>
</template>
<script>
  import { getNewAnnouncement} from "@/api/show"

  export default {
    data() {
      return {
        announcement:[]
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      getAnnounce(){
        getNewAnnouncement().then(res => {
          this.announcement = res.data;
          // this.$refs.mq.start();
        })
      }
    },
    created() {
      this.getAnnounce({bannerType:1})
    }
  }
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .marquee-page {
    background: $main-bg;
    width: 100%;
    padding-bottom: r(20);
  }
  .marquee-box {
    width:calc(100% - 0.8rem);
    height: r(60);
    position: relative;
    margin: 0 auto;
    // position: absolute;
    // left: 0;
    // bottom: 0;
    .marquee-info {
      // position: absolute;
      // left: 50%;
      // top: r(-6);
      // transform: translateX(-50%);
      height: r(60);
      line-height: r(60);
      z-index: 1;
      padding-left: r(70);
      padding-right: r(20);
      color: #000;
      overflow: hidden;
      white-space: nowrap;
      @include f(24px);
      background: #fff;
      width: 100%;
      border-radius: r(28);
      box-shadow: 0 0 4px 2px rgba(0,0,0,0.1);
      .mar-ico {
        position: absolute;
        top: 0;
        left: r(10);
        width:r(60);
        text-align: center;
        img {
          width: 60%;
          margin-top: r(-5);
        }
        .iconay{
          @include f(48px);
          color: #ff6054;
        }
      }
    }
  }
</style>
