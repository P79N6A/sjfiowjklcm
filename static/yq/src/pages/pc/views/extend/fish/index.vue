<template>
  <div class="fish">
    <div class="title">
      <img src="./images/image_3.png" alt="">
      <p class="txt">捕鱼华丽上线，游戏马上赚钱</p>
    </div>
    <div class="fishBox">
      <div class="fishItem">
        <div class="phoneJDB"></div>
        <div class="info">
          <div class="infoItem">
            <!-- <img src="./images/image_ag.png" alt="" class="logo"> -->
            <div class="logoJDB"></div>
            <div class="name">JDB捕鱼</div>
            <div class="blank"></div>   
          </div>
          <div class="descript">
            支持设备：电脑网页/手机网页
          </div>
          <button class="playBtn" @click="open(Games.href_fish_jdb, 'JDB捕鱼', 900, 640, true, islogin)"><span>开始游戏</span><i
              class="triangle"></i></button>
        </div>
      </div>
      
      <div class="fishItem">
        <div class="phone"></div>
        <div class="info">
          <div class="infoItem">
            <!-- <img src="./images/image_ag.png" alt="" class="logo"> -->
            <div class="logo"></div>
            <div class="name">捕鱼王</div>
            <img :src="generateQRCode(Download.ag,140)" alt="" class="qrcode">
          </div>
          <div class="descript">
            支持设备：电脑网页/手机网页/手机客户端
          </div>
          <button class="playBtn" @click="open(Games.href_fish, 'AG捕鱼', 900, 640, true, islogin)"><span>开始游戏</span><i
              class="triangle"></i></button>
        </div>
      </div>

      <div class="fishItem">
        <div class="phoneMW"></div>
        <div class="info">
          <div class="infoItem">
            <!-- <img src="./images/image_ag.png" alt="" class="logo"> -->
            <div class="logoMW"></div>
            <div class="name">大满贯捕鱼</div>
            <div class="blank"></div>   
          </div>
          <div class="descript">
            支持设备：电脑网页/手机网页
          </div>
          <button class="playBtn" @click="open(Games.href_fish_mw, '大满贯捕鱼', 900, 640, true, islogin)"><span>开始游戏</span><i
              class="triangle"></i></button>
        </div>
      </div>

    </div>
    <div id="bubbles">
      <div class="bubble bubblelarge" style="left:22%;opacity:0.9;transform:scale(1.13);animation-duration:21s;-webkit-animation-duration:21s;-moz-animation-duration:21s;"></div>
      <div class="bubble bubblelarge" style="left:2%;opacity:0.9;transform:scale(1.26);animation-duration:23s;-webkit-animation-duration:23s;-moz-animation-duration:23s;"></div>
      <div class="bubble bubblelarge" style="left:72%;opacity:0.8;transform:scale(1.9);animation-duration:13s;-webkit-animation-duration:13s;-moz-animation-duration:13s;"></div>
      <div class="bubble bubblelarge" style="left:90%;opacity:0.8;transform:scale(1.21);animation-duration:6s;-webkit-animation-duration:6s;-moz-animation-duration:6s;"></div>
      <div class="bubble bubblelarge" style="left:67%;opacity:0.8;transform:scale(1.34);animation-duration:16s;-webkit-animation-duration:16s;-moz-animation-duration:16s;"></div>
      <div class="bubble bubblelarge" style="left:60%;opacity:0.8;transform:scale(1.30);animation-duration:21s;-webkit-animation-duration:21s;-moz-animation-duration:21s; "></div>
      <div class="bubble bubblelarge" style="left:13%;opacity:0.8;transform:scale(1.6);animation-duration:19s;-webkit-animation-duration:19s;-moz-animation-duration:19s;"></div>
      <div class="bubble bubblelarge" style="left:100%;opacity:0.8;transform:scale(1.29);animation-duration:11s;-webkit-animation-duration:11s;-moz-animation-duration:11s;"></div>
      <div class="bubble bubblelarge" style="left:75%;opacity:0.9;transform:scale(1.27);animation-duration:14s;-webkit-animation-duration:14s;-moz-animation-duration:14s;"></div>
      <div class="bubble bubblelarge" style="left:34%;opacity:0.8;transform:scale(1.13);animation-duration:20s;-webkit-animation-duration:20s;-moz-animation-duration:20s;"></div>
      <div class="bubble bubblelarge" style="left:73%;opacity:0.8;transform:scale(1.9);animation-duration:6s;-webkit-animation-duration:6s;-moz-animation-duration:6s;"></div>
    </div>
  </div>
</template>
<script>
  import {
    Games,
    Download
  } from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {
    generateQRCode
  } from "@/api/show"
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games,
        Download
      };
    },
    props: {},
    methods: {
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    created() {},
    components: {}
  };

</script>
<style lang="scss" scoped>
  .fish {
    background-image: url('./images/bj.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    min-height: 1000px;
    // align-items: center;
    // justify-content: center;
    // display: flex;
    position: relative;
    overflow: hidden;
    .title {
      top: 114px;
      width: 100%;
      text-align: center;
      position: absolute;
      img {
        width: 20%;
        -webkit-animation: bounce-down 2s linear infinite;
        animation: bounce-down 2s linear infinite;
      }
      .txt {
        // -webkit-text-stroke: 1px #1f73fe;
        text-shadow: #1f73fe 2px 0 0,#1f73fe 0 2px 0,#1f73fe -2px 0 0,#1f73fe 0 -2px 0;
        -webkit-text-shadow: #1f73fe 2px 0 0,#1f73fe 0 2px 0,#1f73fe -2px 0 0,#1f73fe 0 -2px 0;
        -moz-text-shadow: #1f73fe 2px 0 0,#1f73fe 0 2px 0,#1f73fe -2px 0 0,#1f73fe 0 -2px 0;
        color: #fff;
        font-weight: bolder;
        font-size: 30px;
        font-family: Microsoft Yahei;
        letter-spacing: 2px;
      }
    }
    .fishBox {
      margin: 350px auto 0;
      width: 1000px;
    }
    .fishItem {
      // background: rgba(255,255,255,0.2);
      background-image: url('./images/image_2.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
      display: flex;
      padding: 10px 15px;
      // position: absolute;
      // top: 50%;
      // left: 50%;
      // transform: translate(-50%, -50%);
      width: 1000px;
      text-align: center;
      margin-bottom: 30px;
      .phone {
        background-image: url('./images/image_1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        flex: 3;
      }
      .phoneMW {
        background-image: url('./images/mw.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        flex: 3;
      }
      .phoneJDB {
        background-image: url('./images/jdb.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        flex: 3;
      }
      .info {
        flex: 2;
        .infoItem {
          display: flex;
          padding: 0 10px;
          .logo {
            // flex: 2;
            width: 100px;
            background-image: url('./images/image_ag.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .logoMW {
            // flex: 2;
            width: 100px;
            background-image: url('./images/logoMW.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .logoJDB {
            // flex: 2;
            width: 100px;
            background-image: url('./images/logoJDB.png');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center center;
          }
          .name {
            flex: 3;
            color: #fff;
            font-size: 32px;
            line-height: 113px;
          }
          .blank {
            flex: 1;
          }
          .qrcode {
            flex: 1;
            padding: 10px;
            background: rgba(214, 229, 245, .25);
            border-radius: 5px;
          }
        }

        .descript {
          color: #37bafe;
          font-size: 16px;
          margin-top: 30px;
          width: 100%;
          text-align: center;
        }

        .playBtn {
          color: #37bafe;
          font-size: 26px;
          // height: 60px;
          // line-height: 60px;
          //   background: rgba(255, 255, 255, .05);
          background-image: url('./images/image_Button.png');
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center center;
          //   border: 1px solid #fff;
          margin: 15px auto;
          border-radius: 50px;
          width: 201px;
          height: 64px;
          // padding: 3px 10px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            margin-right: 18px;
          }

          .triangle {
            width: 0;
            height: 0;
            border-width: 12px;
            border-style: solid;
            border-color: transparent transparent transparent #37bafe;
            display: inline-block;
            margin-top: 2px;
          }

          &:hover {
            color: #fff;

            .triangle {
              border-color: transparent transparent transparent #fff;
            }
          }
          &:focus{
            background-color: transparent;
          }
        }
      }
    }

    .bubble {
      position: absolute;
      transition: scale .05s linear;
      -webkit-transition: scale .05s linear;
      -moz-transition: scale 0.05s linear;
    }

    .bubblelarge {
      background: url(./images/bubble_brust01.png) 50% no-repeat;
      width: 50px;
      height: 50px;
      -webkit-animation: bubbleAnimations 10s infinite;
      animation: bubbleAnimations 10s infinite;
    }
  }

  @-webkit-keyframes bubbleAnimations {
    0% {
      top: 100%;
    }

    to {
      top: 10%;
    }
  }


  @keyframes bubbleAnimations {
    0% {
      top: 100%;
    }

    to {
      top: 10%;
    }
  }

  @-webkit-keyframes bounce-down {
    25% {
      -webkit-transform: translateY(10px);
    }

    50%,
    100% {
      -webkit-transform: translateY(0);
    }

    75% {
      -webkit-transform: translateY(-10px);
    }
  }


  @keyframes bounce-down {
    25% {
      -webkit-transform: translateY(10px);
    }

    50%,
    100% {
      -webkit-transform: translateY(0);
    }

    75% {
      -webkit-transform: translateY(-10px);
    }
  }

</style>
