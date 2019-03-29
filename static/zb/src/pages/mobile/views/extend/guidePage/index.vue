<template>
  <div class="guidePage">
    <div class="back" @click="back"></div>
    <swiper style="height:100%;" :options="swiperOption">
        <swiper-slide>
            <div class="page1">
                <div class="logos">
                    <img src="./images/logo.png" alt="" class="logo">
                    <p class="title">众博娛樂体育</p>
                    <p class="zanzhu">英超球队哈德斯菲尔德俱乐部</p>
                    <p class="zanzhu1">品牌赞助商</p>
                    <a :href="Download.app" target="_blank" class="btn">APP下载安装</a>
                    <p class="teach">滑动查看教程&nbsp;&nbsp;></p>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic1.png" alt="" class="teachPic">
                <p class="title">01</p>
                <p class="descript">设置-通用-设备管理</p>
                <div class="pagination">
                    <i class="pagecircle active"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic2.png" alt="" class="teachPic">
                <p class="title">02</p>
                <p class="descript">设置-通用-设备管理</p>
                <div class="pagination">
                    <i class="pagecircle"></i>
                    <i class="pagecircle active"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic3.png" alt="" class="teachPic">
                <p class="title">03</p>
                <p class="descript">设置-通用-设备管理</p>
                <div class="pagination">
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle active"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic4.png" alt="" class="teachPic">
                <p class="title">04</p>
                <p class="descript">选择站点</p>
                <div class="pagination">
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle active"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic5.png" alt="" class="teachPic">
                <p class="title">05</p>
                <p class="descript">信任应用</p>
                <div class="pagination">
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle active"></i>
                    <i class="pagecircle"></i>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="page2">
                <img src="./images/pic6.png" alt="" class="teachPic">
                <p class="title">06</p>
                <p class="descript">点击信任</p>
                <div class="pagination">
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle"></i>
                    <i class="pagecircle active"></i>
                </div>
            </div>
        </swiper-slide>
    </swiper>
  </div>
</template>
<script>
    
  import {Download} from "@/assets/data"
  export default {
    data() {
      return {
        Download,
        tabSwiper: {},
        slideDirection: 'slideforward',
        nowPath: '',
        startX: '',
        clwidth: null,
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
        //   autoplay: {
        //     delay:3000,
        //     disableOnInteraction:false
        //   },
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
    methods: {
      back(){
        this.$router.replace({name:"login_register"});
      }
    },
    mounted() {
    },
    watch: {
    },
    created() {
    },
  }

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .guidePage {
    height: 100vh;
    .back{
      background-image: url('./images/back.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      position: fixed;
      height: r(100);
      width: r(130);
      z-index: 999;
      left: r(40);
      top: r(10);
    }
    .page1 {
      height: 100vh;
      background-image: url('./images/bg1.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      position: relative;
      .logos {
        position: absolute;
        transform: translate(-50%, -15%);
        left: 50%;
        top: 50%;
        height: 60vh;
        width: 100vw;
        text-align: center;

        .logo {
          width: 25%;
        }

        .title {
          font-family: PingFangSC-Regular;
          @include f(48px);
          color: #333;
          letter-spacing: 0;
          line-height: r(67);
          margin-top: r(30);
        }

        .zanzhu {
          font-family: PingFangSC-Regular;
          @include f(36px);
          color: #333;
          letter-spacing: 0;
          text-align: center;
          line-height: r(50);
          margin-top: r(50);
        }

        .zanzhu1 {
          font-family: PingFangSC-Medium;
          @include f(36px);
          color: #61258a;
          letter-spacing: 0;
          text-align: center;
          line-height: r(50);
        }

        .btn {
          background-image: linear-gradient(-180deg, #7DD2FF 9%, #6890EC 95%);
          box-shadow: 0 4px 7px 0 rgba(40, 40, 40, 0.50), inset 0 2px 3px 0 rgba(165, 251, 255, 0.50);
          border-radius: 50px;
          color: #fff;
          @include f(48px);
          line-height: r(67);
          letter-spacing: 0;
          font-family: PingFangSC-Regular;
          margin-top: r(80);
          padding: r(20);
          width: 70vw;
          display: inline-block;  
        }

        .teach {
          font-family: PingFangSC-Regular;
          @include f(28px);
          color: #333;
          letter-spacing: 0;
          text-align: center;
          line-height: r(40);
          margin-top: r(80);
        }
      }
    }

    .page2 {
      height: 100vh;
      background-image: url('./images/bg2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      position: relative;
      text-align: center;
      .teachPic{
          width: 65%;
          margin-top: 15%;
      }
      .title{
            font-family: PingFangSC-Regular;
            @include f(60px);
            color: #fff;
            letter-spacing: 0;
            text-align: center;
            line-height: r(84);
            margin-top: r(10);
      }
      .descript{
          font-family: PingFangSC-Regular;
            @include f(36px);
            color: #fff;
            letter-spacing: 0;
            text-align: center;
            margin-top: r(30);
      }
      .pagination{
          width: 100%;
          height: r(30);
          text-align: center;
          position: relative;
          margin-top: r(50);
          .pagecircle{
              width: r(20);
              height: r(20);
              border-radius: 50%;
              background: #6c80e9;
              display: inline-block;
              &.active{
                  background: #fff;
              }
          }
      }
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
</style>
