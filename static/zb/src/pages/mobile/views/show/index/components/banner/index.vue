<template>
  <div class="banner">
    <!-- <div class="indexTop">
      <img src="./images/left.png" alt class="iconleft" @click="value=true">
      <a target="_blank" :href="SETTING.live800">
        <img src="./images/right.png" alt class="iconright">
      </a>
    </div> -->

    <swiper style="height:100%;" :options="swiperOption">
      <swiper-slide v-for="(item,i) in bannerList" :key="i">
        <a :href="item.hyperlinkUrl" class="banner-item">
          <img :src="item.showUrl" :alt="item.title">
        </a>
      </swiper-slide>
    </swiper>
    <!--mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,i) in bannerList" :key="i">
        <a :href="item.hyperlinkUrl" class="banner-item">
          <img :src="item.showUrl" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe-->
    <!-- <announce></announce> -->
    <tool-bar v-model="value"></tool-bar>
  </div>
</template>
<script>
import headernNobackground from "mobile/components/head-nobackground";
import toolBar from "mobile/master/t1/show/components/tool-bar";
import { SETTING } from "@/assets/data";
import { queryBannerList } from "@/api/show";
import announce from "../../components/announce";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      SETTING,
      value: false,
      bannerList: [],
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        // direction : 'vertical',
        effect: "coverflow",
        grabCursor: true,
        setWrapperSize: true,
        // autoHeight: true,
        paginationType: "bullets",
        pagination: ".swiper-pagination",
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      }
    };
  },
  methods: {
    /**
     * bannerType,0-PC,1-H5,2-APP
     */
    getBanner(obj) {
      queryBannerList(obj).then(res => {
        if (res.success) {
          this.bannerList = res.data;
        }
      });
    }
  },
  created() {
    this.getBanner({ bannerType: 1 });
  },
  activated() {},
  components: {
    announce,
    toolBar,
    headernNobackground
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.banner {
  position: relative;
  // height: r(320);
  margin: 0 auto;
  // background:rgba(0,0,0,0.7);
  .banner-item {
    display: block;
    width: 100%;
    img {
      display: block;
      width: 100%;
    }
  }
}
.indexTop {
  position: relative;
  z-index: 9;
  .iconleft {
    position: absolute;
    left: r(20);
    top: r(20);
    width: r(50);
    height: r(50);
  }
  .iconright {
    position: absolute;
    right: r(20);
    top: r(20);
    width: r(60);
    height: r(55);
  }
}
.swiper-container {
  overflow: hidden;
  position: static;
}
.swiper-container-3d {
  -webkit-perspective: 1200px;
  -moz-perspective: 1200px;
  -o-perspective: 1200px;
  perspective: 1200px;
}
.swiper-container-3d .swiper-cube-shadow,
.swiper-container-3d .swiper-slide,
.swiper-container-3d .swiper-slide-shadow-bottom,
.swiper-container-3d .swiper-slide-shadow-left,
.swiper-container-3d .swiper-slide-shadow-right,
.swiper-container-3d .swiper-slide-shadow-top,
.swiper-container-3d .swiper-wrapper {
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.swiper-slide {
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}
.swiper-pagination {
  position: absolute;
  text-align: center;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  z-index: 10;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 10px;
  left: 0;
  width: 100%;
}
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 100%;
  background: #000;
  opacity: 0.2;
  margin: 0 5px;
}
.swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}
</style>
