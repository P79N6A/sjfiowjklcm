<template>
  <div class="mc-banner" v-show="value">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="./images/01.jpg">
        <p class="mc_wx_h_tips">
          点击微信
          <span class="mc_wx_red">【钱包】</span>-
          <span class="mc_wx_red">【收付款】</span>页面，使用
          <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
        </p>
      </swiper-slide>
      <swiper-slide>
        <img src="./images/02.jpg">
        <p class="mc_wx_h_tips">
          点击微信
          <span class="mc_wx_red">【钱包】</span>-
          <span class="mc_wx_red">【收付款】</span>页面，使用
          <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
        </p>
      </swiper-slide>
      <swiper-slide>
        <img src="./images/03.jpg">
        <p class="mc_wx_h_tips">
          点击微信
          <span class="mc_wx_red">【钱包】</span>-
          <span class="mc_wx_red">【收付款】</span>页面，使用
          <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
        </p>
      </swiper-slide>
      <swiper-slide>
        <img src="./images/04.jpg">
        <p class="mc_wx_h_tips">
          <span class="mc_wx_red">【请输入我方的收款人姓名和对应的银行卡号，核对无误点击确定】</span>
        </p>
      </swiper-slide>
      <swiper-slide>
        <img src="./images/05.jpg">
        <p class="mc_wx_h_tips">
          输入
          <span class="mc_wx_red">【系统指定的金额】</span>进行转账操作，转账成功后，方可自动到账！
        </p>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- <v-button @click="$emit('input',false)">继续存款</v-button> -->
    <div class="user-personal-update-btn"><button class="btn" @click="$emit('input',false)">继续存款</button></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        helps: [
          "01.jpg",
          "02.jpg",
          "03.jpg",
          "04.jpg",
          "05.jpg",
        ],
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: 3000,
          // direction : 'vertical',
          effect: "coverflow",
          grabCursor: true,
          setWrapperSize: true,
          // autoHeight: true,
          paginationType: "bullets",
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
        },
      }
    },
    props: {
      value: Boolean
    },
    methods: {
      getHelp(url) {
        return require(`./images/${url}`)
      }
    }
  };

</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .mc_wx_helps {
    img {
      display: block;
      width: 100%;
    }
  }

  .user-personal-update-btn {
    width: 100%;
    text-align: center;
    padding-bottom: r(30);
    padding-top: r(30);
    .btn {
      width: 94%;
      display: inline-block;
      background: $cl1;
      color: #fff;
      height: r(94);
      line-height: r(94);
      text-align: center;
      @include f(32px);
      letter-spacing: 2px;
      font-family: PingFangSC-Regular;
      border-radius: 5px;
    }
  }

  .mc_wx_h_tips {
    color: #333;
    margin: 20px 0;
    line-height: 1.2;
    padding: 0 r(20);
    .mc_wx_red {
      color: red;
      font-weight: bold;
    }
  }

  .mc-banner {
    position: absolute;
    padding-top:r(150);
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:#fff;
    min-height: r(71);
    z-index: 100;
    img {
      width: 100%;
    }
    .marquee-info {
      height: r(71);
      line-height: r(71);
      width: 100%;
      padding-left: r(26);
      color: #333333;
      overflow: hidden;
      white-space: nowrap;
      .icon-voice {
        float: left;
        color: #EE9D06;
        @include f(44px);
        margin-right: r(12);
      }
    }
    .swiper-container {
      overflow: hidden;
      position: static;
      // height: 100%;
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
      -webkit-transition: .3s;
      -moz-transition: .3s;
      -o-transition: .3s;
      transition: .3s;
      -webkit-transform: translateZ(0);
      -ms-transform: translateZ(0);
      -o-transform: translateZ(0);
      transform: translateZ(0);
      z-index: 10;
    }
    .swiper-container-horizontal>.swiper-pagination-bullets,
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
      opacity: .2;
      margin: 0 5px;
    }
    .swiper-pagination-bullet-active {
      opacity: 1;
      background: #007aff;
    }
  }

</style>
