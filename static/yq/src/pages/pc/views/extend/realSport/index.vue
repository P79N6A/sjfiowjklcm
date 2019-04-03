<template>
  <div class="gamebody">
    <div class="content_bg">
      <annunciate></annunciate>
      <div class="content">
        <div class="items">
          <!-- <div class="in_banner">
            <ul class="big">
              <li :class="{opa:isshow == '1'}">
                <a href="javascript:void(0)" class="ban1"></a>
              </li>
              <li :class="{opa:isshow == '2'}">
                <a href="javascript:void(0)" class="ban2"></a>
              </li>
            </ul>
            <ul class="btns">
              <li :class="{hover:isshow == '1'}" class=""></li>
              <li :class="{hover:isshow == '2'}"></li>
            </ul>
          </div> -->
          <div class="flexItem">
            <div class="item clear" v-for="item in arr" :key="item.value">
              <div class="item-box clear">
                <div class="item-box-demo">
                  <!-- <img src="./images/ag-demo.png" alt=""> -->
                  <!-- <img :src="getimg(item.img)" alt=""> -->
                  <img :src="getimg1(item.img)" alt="">
                  <span class="icon" v-if="item.ishot"></span>
                </div>
                <ul class="title">
                  <li><img :src="getimg1(item.logo)" alt=""></li>
                  <li>{{item.name}}</li>
                  <li>{{item.des}}</li>
                </ul>
                <div class="mark-box">
                  <div class="qr-code-container" v-if="item.value == 'AGIN'">
                    <div class="client-down">
                      <img :src="generateQRCode(Download.agMobile,140)" alt="">
                      <p>AG客户端下载</p>
                    </div>
                  </div>
                  <div class="join-game-btn" :class="{'join-game-position':item.value != 'AGIN'}">
                    <a href="javascript:void(0);" @click="open(item.link, item.name, 900, 640, true, islogin)">进入游戏</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import annunciate from 'pc/components/annunciate'
  import openWindow from '@/util/openWindow'
  import {
    Games,
    Download
  } from "@/assets/data"
  import {
    generateQRCode
  } from "@/api/show"
  import {
    mapGetters,
  } from "vuex";
  export default {
    data() {
      return {
        Games,
        Download,
        arr: [
          {
            name: "沙巴体育",
            value: "SB",
            img: './images/sb-demo.png',
            logo: './images/sb-logo.png',
            link: Games.href_sb_pc,
            des: '亚洲最大体育平台，提供丰富投注方式和最新赛事'
          },
          {
            name: "皇冠体育",
            value: "UG",
            img: './images/ug-demo.jpg',
            logo: './images/ug-logo.png',
            link: Games.href_ug_pc,
            des: '全球首创6张牌先发百家乐及多种百家乐游戏'
          },
          {
            name: "BTI体育",
            value: "BTI",
            img: './images/bti-demo.jpg',
            logo: './images/bti-logo.png',
            link: Games.href_bti,
            des: '全球首创6张牌先发百家乐及多种百家乐游戏'
          },
          {
            name: "泛亚电竞",
            value: "AVIA",
            img: './images/fanya-demo.jpg',
            logo: './images/fanya-logo2.png',
            link: Games.href_avia,
            des: '2018打造最专业电子竞技平台'
          }
        ],
        isshow: '1'
      }
    },
    methods: {
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
      getimg1(url) {
        return require(`${url}`)
      },
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      },
      changebg() {
        let _this = this
        setInterval(function () {
          if (_this.isshow == '1') {
            _this.isshow = '2'
          } else if (_this.isshow == '2') {
            _this.isshow = '1'
          }
        }, 4000)
      },
    },
    components: {
      annunciate
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {
      // this.changebg();
    },
  }

</script>
<style lang="scss" scoped>
  .gamebody {
    /*height: 1380px;*/
    max-width: 1920px;
    min-width: 1200px;
    margin: 0 auto 20px;
    background: url(./images/bg1.jpg) no-repeat center top, #f1f1f1;
  }

  .content_bg {
    position: relative;
    width: 100%;
    overflow: hidden;

    .content {
      width: 1200px;
      margin: 0 auto;
      margin-bottom: 20px;
      margin-top: 90px;
      padding-top: 20px;
      overflow: hidden;
      background-color: #fff;

      .items {
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
        position: relative;

        .flexItem {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
        }
      }
    }
  }

  .items .item {
    float: left;
    position: relative;
    margin-left: 20px;
    margin-bottom: 20px;

    .item-box {
      width: 570px;

      .item-box-demo {
        position: relative;

        .icon {
          position: absolute;
          left: 0;
          top: 0;
          width: 98px;
          height: 97px;
          background: url(./images/icon-hot.png) no-repeat center;
        }
      }

      .title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        background: #333;

        li {
          float: left;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          font-size: 18px;
          font-weight: bold;
          color: #fff;

          &:nth-child(3) {
            font-size: 14px;
            font-weight: normal;
          }

          img {
            vertical-align: middle;
            max-height: 50px;
          }
        }
      }
    }
  }

  .mark-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 570px;
    height: 300px;
    opacity: 0;

    .qr-code-container {
      width: 59%;
      margin: 0 auto;
      overflow: hidden;
      margin-bottom: 25px;

      .client-down {
        text-align: center;

        img {
          margin: 25px 25px 15px;
        }

        p {
          font-size: 14px;
          color: #fff;
          text-align: center;
        }
      }

      .client-pc-down {
        width: 99%;
        margin: 0 auto;
        padding-top: 30px;
        text-align: center;

        a {
          display: block;
          /*margin: 25px 25px 15px;*/
        }

        p {
          font-size: 14px;
          color: #fff;
          text-align: center;
        }
      }
    }
  }

  .items .item:hover .mark-box {
    opacity: 1;
    background: rgba(0, 0, 0, 0.3);
    transform: translateY(-4px);
    box-shadow: 8px 8px 10px rgba(255, 255, 255, 0.65);
    transition: all .3s;
  }

  .join-game-btn {
    position: absolute;
    bottom: 22%;
    left: 31.9%;
    z-index: 200;
    width: 36.2%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #fd4747;
    opacity: 1;
    -webkit-transition: all .3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all .3s;
  }

  .join-game-position {
    bottom: 45%;
  }

  .join-game-btn {
    a {
      font-size: 16px;
      color: #fff;
      display: block;
      width: 100%;
      height: 100%;
    }

    &:hover {
      height: 51px;
      background: #a2230b;
      border-bottom: 5px solid #821400;
    }
  }

  /*#banner*/

  .sport-carousel {}

  .in_banner {
    position: relative;
    height: 260px;
    overflow: hidden;
    z-index: 998;

    .big {
      overflow: hidden;
      width: 100%;
      height: 260px;

      /*background: #535f46;*/
      li {
        width: 100%;
        height: 260px;
        background-repeat: no-repeat;
        background-position: top center;
        opacity: 0;

        &:first-child {
          background-image: url('./images/banner1.jpg');
          background-repeat: no-repeat;
          background-position: center -5px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 500;
          display: list-item;
          transition: all 1.5s;
        }

        &:last-child {
          background-image: url('./images/banner2.jpg');
          background-repeat: no-repeat;
          background-position: center -5px;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: 499;
          display: list-item;
          transition: all 1.5s;
        }

        &.opa {
          opacity: 1;
          transition: all 1.5s;
        }
      }
    }

    .btns {
      position: absolute;
      left: 45%;
      bottom: 20px;
      width: 130px;
      height: 8px;
      text-align: center;
      z-index: 1000;

      li {
        float: left;
        width: 32px;
        height: 8px;
        margin-right: 10px;
        color: #222;
        font-size: 28px;
        cursor: pointer;
        text-align: center;
        background: #fff;
        border-radius: 4px;

        &.hover {
          background: #fd4747;
        }
      }
    }
  }

  @-webkit-keyframes changebg {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes changebg1 {

    0%,
    50% {
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }

</style>
