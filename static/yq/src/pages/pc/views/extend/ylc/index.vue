<template>
  <div class="fishBody">
    <annunciate></annunciate>
    <!-- 动画 -->
    <div class="aquarium">
      <div class="fishGroup">
        <div class="fish_wrap left_right_2">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap left_right_2">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap left_right_2">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_1"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap left_right_2">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap right_left_4">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap left_right_3">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_6"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap left_right_3">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fishGroup">
        <div class="fish_wrap left_right_1">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_7"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="fish_wrap left_right_1">
          <div class="x">
            <div class="y">
              <div class="fish_box">
                <div class="fish_7"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fish_wrap right_left_3">
        <div class="x">
          <div class="y">
            <div class="fish_box">
              <div class="fish_8"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="fish_wrap right_left_1">
        <div class="x">
          <div class="y">
            <div class="fish_box">
              <div class="fish_9"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="fish_wrap right_left_2">
        <div class="x">
          <div class="y">
            <div class="fish_box">
              <div class="fish_10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="items">
        <div class="item clear" v-for="item in arr" :key="item.value">
          <div class="item-box clear">
            <div class="box-left">
              <div class="box-demo">
                <img :src="getimg(item.img)" alt>
                <div class="icon" v-if="item.hot"></div>
              </div>
              <div class="mark-box">
                <div class="join-game">
                  <a
                    href="javascript:void(0);"
                    @click="open(item.link, item.name, 900, 640, true, islogin)"
                  >进入游戏</a>
                </div>
              </div>
            </div>
            <div class="box-right">
              <div class="title">
                <img :src="getimg(item.logo)" alt>
                <h1>
                  <span>{{item.name}}</span>
                </h1>
              </div>
              <div class="main-content">
                <p class="little-change">{{item.des}}</p>
                <div class="code-container" v-if="item.download == ''">
                  <div class="clear pt-touch">
                    <img :src="getimg(item.pic)" alt>
                  </div>
                </div>
                <div class="code-container" v-else>
                  <div class="clear">
                    <img src="./images/code.png" alt>
                    <span>扫描下载捕鱼APP</span>
                  </div>
                  <div>
                    <img :src="generateQRCode(item.download,140)" alt>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- DT棋牌 -->
        <div class="item clear">
          <div class="item-box clear">
            <div class="box-left">
              <div class="box-demo">
                <img src="./images/dtqp-pic.jpg" alt>
                <div class="icon"></div>
              </div>
              <div class="mark-box">
                <div class="join-game">
                  <router-link :to="{name:'chessHall',params:{type:'DTQP'}}">进入游戏大厅</router-link>
                </div>
              </div>
            </div>
            <div class="box-right">
              <div class="title">
                <img src="./images/dtqp-logo.jpg" alt>
                <h1>
                  <span>DT棋牌</span>
                </h1>
              </div>
              <div class="main-content">
                <p class="little-change">支持设备：手机电脑网页端</p>
                <div class="code-container">
                  <div class="clear pt-touch">
                    <img src="./images/dtqp-dowm.jpg" alt>
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
import annunciate from "pc/components/annunciate";
import openWindow from "@/util/openWindow";
import { Games, Download } from "@/assets/data";
import { generateQRCode } from "@/api/show";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Games,
      Download,
      arr: [
        // {
        //   name: "AG捕鱼",
        //   value: "AGFISH",
        //   img: './images/ag-fish.jpg',
        //   logo: './images/ag-logo.png',
        //   pic: '',
        //   link: Games.href_fish,
        //   hot: true,
        //   download: Download.ag,
        //   des: '支持设备：手机电脑网页端'
        // },
        // {
        //   name: "大满贯捕鱼",
        //   value: "MW",
        //   img: './images/mw-fish.jpg',
        //   logo: './images/mw-logo.jpg',
        //   pic: './images/mw-down.png',
        //   link: Games.href_fish_mw,
        //   hot: true,
        //   download: '',
        //   des: '支持设备：手机电脑网页端'
        // },
        {
          name: "VR彩票",
          value: "VR",
          img: "./images/vrgame.jpg",
          logo: "./images/vrgame-icon.jpg",
          pic: "./images/vrdown1.jpg",
          link: Games.href_vr,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "IG时时彩",
          value: "IGSSC",
          img: "./images/ssc-game.jpg",
          logo: "./images/ig-logo.jpg",
          pic: "./images/ssc-pic.jpg",
          link: Games.href_ig_ssc,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "IG香港彩",
          value: "IGXKC",
          img: "./images/hkc-game.jpg",
          logo: "./images/ig-logo.jpg",
          pic: "./images/hkc-pic.jpg",
          link: Games.href_ig_hk,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "彩播彩票",
          value: "CBXKC",
          img: "./images/cb-game.jpg",
          logo: "./images/cb-logo.jpg",
          pic: "./images/cb-pic.jpg",
          link: Games.href_cb,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "开元棋牌",
          value: "KYQP",
          img: "./images/kyqpgame.jpg",
          logo: "./images/kyqpgame-icon.jpg",
          pic: "./images/kyqpdown.jpg",
          link: Games.href_kyqp,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "761棋牌",
          value: "CITY761",
          img: "./images/761-game.jpg",
          logo: "./images/761-logo.jpg",
          pic: "./images/761-down.jpg",
          link: Games.href_city761,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "幸运棋牌",
          value: "LGQP",
          img: "./images/lgqp-game.png",
          logo: "./images/lgqp-logo.jpg",
          pic: "./images/lgqp-down.jpg",
          link: Games.href_lgqp,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        },
        {
          name: "BY棋牌",
          value: "BY",
          img: "./images/by-game.jpg",
          logo: "./images/by-logo.jpg",
          pic: "./images/by-down.jpg",
          link: Games.href_by,
          hot: true,
          download: "",
          des: "支持设备：手机电脑网页端"
        }
      ]
    };
  },
  methods: {
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    getimg(url) {
      return require(`${url}`);
    },
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  components: {
    annunciate
  }
};
</script>
<style lang="scss" scoped>
.fishBody {
  position: relative;
  min-height: 1430px;
  max-width: 1920px;
  min-width: 1200px;
  margin: 0 auto;
  padding-top: 90px;
  padding-bottom: 20px;
  background: url(./images/5bj.jpg) no-repeat center top;
  background-size: 100% 100%;
}

.content {
  position: relative;
  width: 1200px;
  overflow: hidden;
  z-index: 5;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.5);
  .items {
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
  }
}

.items .item {
  margin: 20px;
  padding: 20px;
  background: #fff;
  .title {
    overflow: hidden;
    margin-left: 20px;
    img {
      padding-top: 10px;
      float: left;
    }
    h1 {
      float: left;
      color: #333;
      font-size: 24px;
      margin-left: 20px;
      line-height: 1.5;
      span {
        color: #fd4747;
        font-size: 48px;
      }
    }
  }
  .item-box {
  }
  .box-left {
    position: relative;
    float: left;
    width: 56.3%;
    height: 261px;
    .box-demo .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 98px;
      height: 98px;
      background: url(./images/hot.png) no-repeat center top;
    }
  }
}

.mark-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.5);
  .join-game {
    position: absolute;
    bottom: 36%;
    left: 30%;
    z-index: 200;
    width: 36.2%;
    height: 46px;
    line-height: 46px;
    text-align: center;
    background: #fd4747;
    opacity: 1;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
  }
  .try-game {
    background: #9f7340;
    bottom: 60%;
  }
  .try-game1 {
    background: #9f7340;
    bottom: 40%;
  }
  .join-game > a {
    font-size: 16px;
    color: #fff;
    display: block;
    width: 100%;
    height: 100%;
  }
}

.join-game:hover {
  height: 51px;
  background: #a2230b;
  border-bottom: 5px solid #821400;
}

.try-game:hover,
.try-game1:hover {
  height: 51px;
  background: #c6955c;
  border-bottom: 5px solid #9f7340;
}

.items .item {
  .box-left:hover .mark-box {
    opacity: 1;
    transform: translateY(-4px);
    box-shadow: 8px 8px 10px rgba(255, 255, 255, 0.65);
    transition: all 0.3s;
  }
  .item-box {
    .box-right {
      float: left;
      width: 43.7%;
      height: 261px;
      .main-content p {
        padding: 0 0 26px 20px;
        font-size: 14px;
        color: #333;
        &.little-change {
          padding: 0 0 26px 20px;
          font-size: 14px;
          color: #333;
        }
      }
    }
    div.code-container {
      width: 100%;
      height: 136px;
      overflow: hidden;
      &.bitdown {
        margin-left: 20px;
      }
      div {
        position: relative;
        height: 100%;
        display: inline-block;
        overflow: hidden;
        &:first-child {
          width: 350px;
          &.ql {
            width: auto;
            padding-left: 20px;
          }
          span {
            position: absolute;
            top: 0;
            right: 0;
            width: 140px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            background: #fd4747;
          }
        }
        &:last-child {
          text-align: center;
          img {
            padding: 0 20px;
          }
        }
        &:first-child .pt-down {
          position: absolute;
          top: 53px;
          right: 82px;
          width: 140px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          background: #fd4747;
        }
      }
    }
  }
}

.code-container .pt-down > a {
  color: #fff;
  display: block;
  width: 100%;
  height: 100%;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.items .code-container {
  .pt-down:hover a {
    background: #821400;
    /*border-bottom: 5px solid #821400;*/
  }
  .pt-touch {
    img {
      -webkit-transition: all 0.3s;
      -moz-transition: all 0.3s;
      -ms-transition: all 0.3s;
      -o-transition: all 0.3s;
      transition: all 0.3s;
    }
    &:hover img {
      opacity: 0.8;
      transform: scale(0.95);
    }
  }
}

.mark-box .try-game.hygfish {
  bottom: 36%;
}

.item-box .mark-box .join-game.realgame {
  bottom: 60%;
}
.aquarium {
  position: absolute;
  width: 100%;
  height: 95%;
  overflow: hidden;
  z-index: 0;
}

.fish_box {
  display: inline-block;
}

.fishGroup .fish_wrap {
  &:nth-child(2) .fish_box {
    -webkit-transform: translate(-100%, -50%);
    transform: translate(-100%, -50%);
  }
  &:nth-child(3) .fish_box {
    -webkit-transform: translate(-150%, 25%);
    transform: translate(-150%, 25%);
  }
  &:nth-child(4) .fish_box {
    -webkit-transform: translate(-250%, 65%);
    transform: translate(-250%, 65%);
  }
  &:nth-child(5) .fish_box {
    -webkit-transform: translate(-320%, -25%);
    transform: translate(-320%, -25%);
  }
}

.left_right_1 {
  position: absolute;
  width: 100%;
  height: 100%;
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_1_x 70s linear infinite;
    animation: left_right_1_x 70s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_1_y 1.5s ease infinite;
    animation: left_right_1_y 1.5s ease infinite;
  }
}

@-webkit-keyframes left_right_1_x {
  0% {
    left: 0%;
  }

  100% {
    left: 150%;
  }
}

@-webkit-keyframes left_right_1_y {
  0% {
    top: 15%;
  }

  30% {
    top: 16%;
  }

  50% {
    top: 15%;
  }

  70% {
    top: 16%;
  }

  100% {
    top: 15%;
  }
}

.left_right_2 {
  position: absolute;
  width: 100%;
  height: 100%;
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_2_x 25s linear infinite;
    animation: left_right_2_x 25s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_2_y 25s ease-in-out infinite;
    animation: left_right_2_y 25s ease-in-out infinite;
  }
}

@-webkit-keyframes left_right_2_x {
  0% {
    left: 0%;
  }

  100% {
    left: 150%;
  }
}

@-webkit-keyframes left_right_2_y {
  0% {
    top: 25%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  25% {
    -webkit-transform: rotateZ(-20deg);
    transform: rotateZ(-20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  50% {
    top: 0%;
  }

  75% {
    -webkit-transform: rotateZ(10deg);
    transform: rotateZ(10deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  100% {
    top: 50%;
    -webkit-transform: rotateZ(10deg);
    transform: rotateZ(10deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}

.left_right_3 {
  position: absolute;
  width: 100%;
  height: 100%;
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_3_x 60s linear infinite;
    animation: left_right_3_x 60s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: left_right_3_y 60s ease-in-out infinite;
    animation: left_right_3_y 60s ease-in-out infinite;
  }
}

@-webkit-keyframes left_right_3_x {
  0% {
    left: 0%;
  }

  100% {
    left: 150%;
  }
}

@-webkit-keyframes left_right_3_y {
  0% {
    top: 50%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  25% {
    top: 80%;
    -webkit-transform: rotateZ(40deg);
    transform: rotateZ(40deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  38% {
    top: 80%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  50% {
    top: 80%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
  }

  75% {
    -webkit-transform: rotateZ(40deg);
    transform: rotateZ(40deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  100% {
    top: 25%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}

.right_left_1 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_1_x 25s linear infinite;
    animation: right_left_1_x 25s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_1_y 25s ease-in-out infinite;
    animation: right_left_1_y 25s ease-in-out infinite;
  }
}

@-webkit-keyframes right_left_1_x {
  0% {
    left: 0%;
  }

  100% {
    left: 150%;
  }
}

@-webkit-keyframes right_left_1_y {
  0% {
    top: 75%;
  }

  100% {
    top: 75%;
  }
}

.right_left_2 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_2_x 30s linear infinite;
    animation: right_left_2_x 30s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_2_y 30s ease-in-out infinite;
    animation: right_left_2_y 30s ease-in-out infinite;
  }
}

@-webkit-keyframes right_left_2_x {
  0% {
    left: 0%;
  }

  100% {
    left: 100%;
  }
}

@-webkit-keyframes right_left_2_y {
  0% {
    top: 100%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  25% {
    -webkit-transform: rotateZ(-20deg);
    transform: rotateZ(-20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  50% {
    top: 0%;
  }

  75% {
    -webkit-transform: rotateZ(20deg);
    transform: rotateZ(20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  100% {
    top: 100%;
    -webkit-transform: rotateZ(90deg);
    transform: rotateZ(90deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}

.right_left_3 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_3_x 35s linear infinite;
    animation: right_left_3_x 35s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_3_y 35s ease-in-out infinite;
    animation: right_left_3_y 35s ease-in-out infinite;
  }
}

@-webkit-keyframes right_left_3_x {
  0% {
    left: 0%;
  }

  100% {
    left: 100%;
  }
}

@-webkit-keyframes right_left_3_y {
  0% {
    top: 50%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  25% {
    -webkit-transform: rotateZ(20deg);
    transform: rotateZ(20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  50% {
    top: 90%;
  }

  75% {
    -webkit-transform: rotateZ(-20deg);
    transform: rotateZ(-20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  100% {
    top: 50%;
    -webkit-transform: rotateZ(-50deg);
    transform: rotateZ(-50deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}

.right_left_4 {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: scaleX(-1);
  .x {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_4_x 50s linear infinite;
    animation: right_left_4_x 50s linear infinite;
  }
  .y {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    -webkit-animation: right_left_4_y 50s ease-in-out infinite;
    animation: right_left_4_y 50s ease-in-out infinite;
  }
}

@-webkit-keyframes right_left_4_x {
  0% {
    left: 0%;
  }

  100% {
    left: 100%;
  }
}

@-webkit-keyframes right_left_4_y {
  0% {
    top: 50%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  25% {
    -webkit-transform: rotateZ(20deg);
    transform: rotateZ(20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  50% {
    top: 90%;
  }

  75% {
    -webkit-transform: rotateZ(-20deg);
    transform: rotateZ(-20deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }

  100% {
    top: 50%;
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
    -webkit-transform-origin: 0% 0%;
    transform-origin: 0% 0%;
  }
}

.fish_1 {
  background: url(./images/fish1.png) no-repeat 0 0;
  width: 55px;
  height: 37px;
  -webkit-animation: fish_1_play 0.5s steps(4) infinite;
  animation: fish_1_play 0.5s steps(4) infinite;
}

@-webkit-keyframes fish_1_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -148px;
  }
}

.fish_2 {
  background: url(./images/fish2.png) no-repeat 0 0;
  width: 78px;
  height: 64px;
  -webkit-animation: fish_2_play 0.5s steps(4) infinite;
  animation: fish_2_play 0.5s steps(4) infinite;
}

@-webkit-keyframes fish_2_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -256px;
  }
}

.fish_6 {
  background: url(./images/fish6.png) no-repeat 0 0;
  width: 105px;
  height: 79px;
  -webkit-animation: fish_6_play 1.5s steps(8) infinite;
  animation: fish_6_play 1.5s steps(8) infinite;
}

@-webkit-keyframes fish_6_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -632px;
  }
}

.fish_7 {
  background: url(./images/fish7.png) no-repeat 0 0;
  width: 92px;
  height: 151px;
  -webkit-animation: fish_7_play 1s steps(6) infinite;
  animation: fish_7_play 1s steps(6) infinite;
}

@-webkit-keyframes fish_7_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -906px;
  }
}

.fish_8 {
  background: url(./images/fish8.png) no-repeat 0 0;
  width: 174px;
  height: 126px;
  -webkit-animation: fish_8_play 1s steps(8) infinite;
  animation: fish_8_play 1s steps(8) infinite;
}

@-webkit-keyframes fish_8_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -1008px;
  }
}

.fish_9 {
  background: url(./images/fish9.png) no-repeat 0 0;
  width: 166px;
  height: 183px;
  -webkit-animation: fish_9_play 1s steps(8) infinite;
  animation: fish_9_play 1s steps(8) infinite;
}

@-webkit-keyframes fish_9_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -1464px;
  }
}

.fish_10 {
  background: url(./images/fish10.png) no-repeat 0 0;
  width: 178px;
  height: 187px;
  -webkit-animation: fish_10_play 1s steps(6) infinite;
  animation: fish_10_play 1s steps(6) infinite;
}

@-webkit-keyframes fish_10_play {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -1122px;
  }
}
.clear {
  zoom: 1;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
