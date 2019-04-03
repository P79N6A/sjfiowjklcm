<template>
  <div class="banners" v-if="bannerData" :style="'height:'+height+'px;'">
    <transition-group name="fade" tag="div">
      <a
        v-for="(item,i) in bannerData"
        :key="i"
        :class="['opacity-item',{active:active==i}]"
        v-show="active==i"
        ref="i"
        :href="item.hyperlinkUrl"
        :style="`background-image:url(${item.showUrl})`"
      ></a>
    </transition-group>
    <div class="banner-page">
      <div class="bannerContent">
        <a
          v-for="(item,i) in bannerData"
          :key="i"
          :class="['ban-btn',{active:active==i}]"
          href="javascript:void(0);"
          @click="active=i"
        >{{item.title}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { queryBannerList } from "@/api/show";
export default {
  data() {
    return {
      active: 0,
      id: 0,
      items: [1, 2, 3, 4]
    };
  },
  props: {
    bannerData: {
      type: Array,
      default: [
        {
          hyperlinkUrl: "",
          showUrl: ""
        }
      ]
    },
    height: {
      type: String,
      default: "240px"
    },
    styleControl: {
      type: Object
    }
  },
  computed: {},
  watch: {
    active(cur, old) {
      this.move(cur, old);
    },
    bannerData() {
      let $this = this;
      if (this.bannerData.length > 1) {
        $this.id = window.setInterval(() => {
          $this.next();
        }, 5000);
      }
    }
  },
  methods: {
    move(cur, old) {},
    next() {
      this.active = (this.active + 1) % this.bannerData.length;
    },
    prev() {
      if (this.active == 0) {
        this.active = this.bannerData.length - 1;
      } else {
        this.active--;
      }
    }
  },
  beforeDestroy() {
    window.clearInterval(this.id);
  },
  mounted() {},
  components: {}
};
</script>
<style lang="scss" spcoed>
.banners {
  max-width: 1920px;
  height: 528px;
  // overflow: hidden;
  position: relative;
  margin: 0 auto;
  .opacity-item {
    position: absolute;
    display: block;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    &.active {
      z-index: 1;
    }
  }
  .banner-page {
    width: 100%;
    text-align: center;
    z-index: 2;
    bottom: -42px;
    left: 0;
    position: absolute;
    background: #fff;
    .bannerContent {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      a {
        display: block;
        width: 100%;
        height: 42px;
        line-height: 42px;
        font-size: 16px;
        color: #000;
        cursor: pointer;
        &.active,
        &:hover {
          background: rgb(89, 219, 208); /* Old browsers */
          background: -moz-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* FF3.6-15 */
          background: -webkit-linear-gradient(
            top,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(
            to bottom,
            rgba(89, 219, 208, 1) 0%,
            rgba(77, 183, 244, 1) 100%
          ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */

          color: #fff;
        }
      }
    }
  }
  // 动画
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
