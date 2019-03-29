<template>
  <div class="sports-page ng-scope">
    <div class="container" v-show="showIframe">
      <div class="game-list">
        <div class="saba" :class="{active: sports.nowActive == 'saba'}">
          <div class="line"></div>
          <div class="game-item">
            <div
              class="football"
              :style="{opacity: sports.nowActive == 'saba' ? 0 : 1}"
              style="opacity: 1;"
            ></div>
            <div
              class="comb"
              :style="{opacity: sports.nowActive == 'saba' ? 1 : 0}"
              style="opacity: 0;"
            ></div>
            <div class="item-header">
              <div
                @click="sports.nowActive = 'saba';"
                class="header-touch noOutline"
                role="button"
                tabindex="0"
              >
                <div class="header-left">沙巴体育</div>
                <div class="header-right">亚洲最丰富赛事盘口，365天不停歇，
                  <br>多元化的极致体验
                </div>
              </div>
            </div>
            <div
              v-show="sports.nowActive == 'saba'"
              class="noOutline ng-hide"
              @click="goLobby('saba');"
              role="button"
              tabindex="0"
              aria-hidden="true"
            >
              <div
                class="item-content"
              >沙巴体育是业界最多元化的体育投注平台，每周提供数万场行业最一流的体育赛事盘口，为世界上的每位用户提供最全面的赛事数据与最精准的赔率，以科技感与多样性引领行业风向标，带给全世界博彩爱好者不同的优质娱乐体验。</div>
              <div class="item-action">
                <a href="javascript:void(0);" @click="open(Games.href_sb_pc,'沙巴体育',900,600, true, islogin)">前去游戏</a>
              </div>
            </div>
          </div>
        </div>
        <div class="circle-block">
          <map name="sportsMap" id="sportsMap">
            <area
              class="circle-top"
              alt
              href="javascript:void(0);"
              @click="sports.nowActive = 'saba';"
              :class="{active: sports.nowActive == 'saba'}"
              shape="poly"
              coords="148, 139, 46, 81, 58, 62, 80, 43, 108, 30, 132, 25, 169, 27, 196, 34, 212, 45, 229, 55, 242, 72, 248, 85"
              role="button"
              tabindex="0"
            >
            <area
              class="circle-right active"
              alt
              href="javascript:void(0);"
              @click="sports.nowActive = 'ug';"
              :class="{active: sports.nowActive == 'ug'}"
              shape="poly"
              coords="148, 141, 250, 84, 257, 104, 263, 125, 263, 153, 256, 179, 244, 207, 225, 229, 194, 247, 148, 258"
              role="button"
              tabindex="0"
            >
            <area
              class="circle-left"
              alt
              href="javascript:void(0);"
              @click="sports.nowActive = 'ug';"
              :class="{active: sports.nowActive == 'ug'}"
              shape="poly"
              coords="147, 143, 43, 83, 29, 119, 29, 144, 31, 167, 44, 198, 61, 222, 85, 241, 115, 254, 146, 260"
              role="button"
              tabindex="0"
            >
            <!-- <div class="circle-marker"></div> -->
          </map>
          <!-- <div class="circle-msg">
            <span class="cname">体育游戏</span>
            <br>
            <span class="ename">SPORTS GAMES</span>
          </div>-->
          <img
            src="./images/imgs_2.png"
            usemap="#sportsMap"
            v-show="sports.nowActive == 'ug'"
            aria-hidden="false"
            class
          >
          <span class="shabatxt" @click="sports.nowActive = 'saba';">沙巴体育</span>
          <img
            src="./images/imgs_1.png"
            usemap="#sportsMap"
            v-show="sports.nowActive == 'saba'"
            aria-hidden="true"
            class="ng-hide"
          >
          <span class="ugtxt" @click="sports.nowActive = 'ug';">新皇冠体育</span>
        </div>
        <div class="agp" :class="{active: sports.nowActive == 'ug'}">
          <div class="line"></div>
          <div class="game-item">
            <div
              class="football"
              :style="{opacity: sports.nowActive == 'ug' ? 0 : 1}"
              style="opacity: 0;"
            ></div>
            <div
              class="comb"
              :style="{opacity: sports.nowActive == 'ug' ? 1 : 0}"
              style="opacity: 1;"
            ></div>
            <div class="item-header">
              <div
                @click="sports.nowActive = 'ug';"
                class="header-touch noOutline"
                role="button"
                tabindex="0"
              >
                <div class="header-left">新皇冠体育</div>
                <div class="header-right">即时赛事直播，四种功能UI随心换，
                  <br>人体工学的完美诠释
                </div>
              </div>
            </div>
            <div
              v-show="sports.nowActive == 'ug'"
              class="noOutline"
              @click="goLobby('ug');"
              role="button"
              tabindex="0"
              aria-hidden="false"
            >
              <div
                class="item-content"
              >新皇冠体育是业界公认的滚球专家，每月提供逾万场现场滚球赛事，提供超过400个不同联赛的足球赛事，是无可挑剔的。赔率最高可以比业内高出大约20%，即时动画直播与多种UI为每位钟爱体育的用户提供最佳赔率与最优服务。</div>
              <div class="item-action">
                <a href="javascript:void(0);" @click="open(Games.href_ug_pc,'新皇冠体育',900,600, true, islogin)">前去游戏</a>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="imsport" :class="{active: sports.nowActive == 'imsport'}">
          <div class="line"></div>
          <div class="game-item">
            <div class="football" :style="{opacity: sports.nowActive == 'imsport' ? 0 : 1}" style="opacity: 1;"></div>
            <div class="comb" :style="{opacity: sports.nowActive == 'imsport' ? 1 : 0}" style="opacity: 0;"></div>
            <div class="item-header">
              <div @click="sports.nowActive = 'imsport';" class="header-touch noOutline" role="button" tabindex="0">
                <div class="header-left">美洲体育</div>
                <div class="header-right">经典版面布局，极速投注体验，
                  <br>最高赔率打造最强王者</div>
              </div>
            </div>
            <div v-show="sports.nowActive == 'imsport'" class="noOutline ng-hide" @click="goLobby('imsport');" role="button" tabindex="0"
              aria-hidden="true">
              <div class="item-content">美洲体育是业界最具特色的体育投注平台，每场赛事一贯提供价值最高的在线赔率与最高的投注限额，为每位用户提供最愉悦的服务。盘口赔率即时开出，交易无需等待，最高的赔率与最快的结算速度为用户提供成功的最佳途径。</div>
              <div class="item-action">
                <a href="#">前去游戏</a>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <!-- <div class="mouse-more center">
        <p class="cname">体育赛事分析</p>
        <p class="ename">ANALYSIS OF SPORTS EVENTS</p>
      </div>
      <div class="min-sport-msg">
        <div class="sport-msg-header center">
          <p class="cname">体育赛事分析</p>
          <p class="ename">ANALYSIS OF SPORTS EVENTS</p>
        </div>
        <br>
        <br>
        <br>
        <div class="mouse-more" style="text-align: right">
          <p class="cname">
            <a ui-sref="sports-lobby-message" href="/Sports/LobbyMessage">更多＞＞＞</a>
          </p>
        </div>
      </div>-->
    </div>
    <div class="ifr" v-show="!showIframe">
      <iframe ref="iframe" width="80%" height="755" :src="sportIframeUrl" frameborder="0"></iframe>
    </div>
    <div class="bottom-animate" style="height: 157px;overflow: hidden;">
      <div class="bar" style="left: 20px; animation-duration: 810ms;"></div>
      <div class="bar" style="left: 40px; animation-duration: 798ms;"></div>
      <div class="bar" style="left: 60px; animation-duration: 837ms;"></div>
      <div class="bar" style="left: 80px; animation-duration: 727ms;"></div>
      <div class="bar" style="left: 100px; animation-duration: 983ms;"></div>
      <div class="bar" style="left: 120px; animation-duration: 705ms;"></div>
      <div class="bar" style="left: 140px; animation-duration: 728ms;"></div>
      <div class="bar" style="left: 160px; animation-duration: 943ms;"></div>
      <div class="bar" style="left: 180px; animation-duration: 932ms;"></div>
      <div class="bar" style="left: 200px; animation-duration: 844ms;"></div>
      <div class="bar" style="left: 220px; animation-duration: 935ms;"></div>
      <div class="bar" style="left: 240px; animation-duration: 771ms;"></div>
      <div class="bar" style="left: 260px; animation-duration: 851ms;"></div>
      <div class="bar" style="left: 280px; animation-duration: 569ms;"></div>
      <div class="bar" style="left: 300px; animation-duration: 554ms;"></div>
      <div class="bar" style="left: 320px; animation-duration: 810ms;"></div>
      <div class="bar" style="left: 340px; animation-duration: 902ms;"></div>
      <div class="bar" style="left: 360px; animation-duration: 976ms;"></div>
      <div class="bar" style="left: 380px; animation-duration: 974ms;"></div>
      <div class="bar" style="left: 400px; animation-duration: 926ms;"></div>
      <div class="bar" style="left: 420px; animation-duration: 633ms;"></div>
      <div class="bar" style="left: 440px; animation-duration: 800ms;"></div>
      <div class="bar" style="left: 460px; animation-duration: 533ms;"></div>
      <div class="bar" style="left: 480px; animation-duration: 589ms;"></div>
      <div class="bar" style="left: 500px; animation-duration: 621ms;"></div>
      <div class="bar" style="left: 520px; animation-duration: 836ms;"></div>
      <div class="bar" style="left: 540px; animation-duration: 768ms;"></div>
      <div class="bar" style="left: 560px; animation-duration: 754ms;"></div>
      <div class="bar" style="left: 580px; animation-duration: 952ms;"></div>
      <div class="bar" style="left: 600px; animation-duration: 583ms;"></div>
      <div class="bar" style="left: 620px; animation-duration: 738ms;"></div>
      <div class="bar" style="left: 640px; animation-duration: 615ms;"></div>
      <div class="bar" style="left: 660px; animation-duration: 984ms;"></div>
      <div class="bar" style="left: 680px; animation-duration: 834ms;"></div>
      <div class="bar" style="left: 700px; animation-duration: 955ms;"></div>
      <div class="bar" style="left: 720px; animation-duration: 531ms;"></div>
      <div class="bar" style="left: 740px; animation-duration: 983ms;"></div>
      <div class="bar" style="left: 760px; animation-duration: 862ms;"></div>
      <div class="bar" style="left: 780px; animation-duration: 903ms;"></div>
      <div class="bar" style="left: 800px; animation-duration: 918ms;"></div>
      <div class="bar" style="left: 820px; animation-duration: 771ms;"></div>
      <div class="bar" style="left: 840px; animation-duration: 588ms;"></div>
      <div class="bar" style="left: 860px; animation-duration: 682ms;"></div>
      <div class="bar" style="left: 880px; animation-duration: 664ms;"></div>
      <div class="bar" style="left: 900px; animation-duration: 574ms;"></div>
      <div class="bar" style="left: 920px; animation-duration: 697ms;"></div>
      <div class="bar" style="left: 940px; animation-duration: 970ms;"></div>
      <div class="bar" style="left: 960px; animation-duration: 891ms;"></div>
      <div class="bar" style="left: 980px; animation-duration: 738ms;"></div>
      <div class="bar" style="left: 1000px; animation-duration: 615ms;"></div>
      <div class="bar" style="left: 1020px; animation-duration: 504ms;"></div>
      <div class="bar" style="left: 1040px; animation-duration: 682ms;"></div>
      <div class="bar" style="left: 1060px; animation-duration: 813ms;"></div>
      <div class="bar" style="left: 1080px; animation-duration: 872ms;"></div>
      <div class="bar" style="left: 1100px; animation-duration: 883ms;"></div>
      <div class="bar" style="left: 1120px; animation-duration: 762ms;"></div>
      <div class="bar" style="left: 1140px; animation-duration: 912ms;"></div>
      <div class="bar" style="left: 1160px; animation-duration: 757ms;"></div>
      <div class="bar" style="left: 1180px; animation-duration: 715ms;"></div>
      <div class="bar" style="left: 1200px; animation-duration: 918ms;"></div>
      <div class="bar" style="left: 1220px; animation-duration: 863ms;"></div>
      <div class="bar" style="left: 1240px; animation-duration: 674ms;"></div>
      <div class="bar" style="left: 1260px; animation-duration: 804ms;"></div>
      <div class="bar" style="left: 1280px; animation-duration: 640ms;"></div>
      <div class="bar" style="left: 1300px; animation-duration: 543ms;"></div>
      <div class="bar" style="left: 1320px; animation-duration: 801ms;"></div>
      <div class="bar" style="left: 1340px; animation-duration: 903ms;"></div>
      <div class="bar" style="left: 1360px; animation-duration: 681ms;"></div>
      <div class="bar" style="left: 1380px; animation-duration: 870ms;"></div>
      <div class="bar" style="left: 1400px; animation-duration: 776ms;"></div>
      <div class="bar" style="left: 1420px; animation-duration: 516ms;"></div>
      <div class="bar" style="left: 1440px; animation-duration: 621ms;"></div>
      <div class="bar" style="left: 1460px; animation-duration: 557ms;"></div>
      <div class="bar" style="left: 1480px; animation-duration: 707ms;"></div>
      <div class="bar" style="left: 1500px; animation-duration: 825ms;"></div>
      <div class="bar" style="left: 1520px; animation-duration: 645ms;"></div>
      <div class="bar" style="left: 1540px; animation-duration: 792ms;"></div>
      <div class="bar" style="left: 1560px; animation-duration: 619ms;"></div>
      <div class="bar" style="left: 1580px; animation-duration: 546ms;"></div>
      <div class="bar" style="left: 1600px; animation-duration: 833ms;"></div>
      <div class="bar" style="left: 1620px; animation-duration: 806ms;"></div>
      <div class="bar" style="left: 1640px; animation-duration: 528ms;"></div>
      <div class="bar" style="left: 1660px; animation-duration: 821ms;"></div>
      <div class="bar" style="left: 1680px; animation-duration: 575ms;"></div>
      <div class="bar" style="left: 1700px; animation-duration: 780ms;"></div>
      <div class="bar" style="left: 1720px; animation-duration: 824ms;"></div>
      <div class="bar" style="left: 1740px; animation-duration: 653ms;"></div>
      <div class="bar" style="left: 1760px; animation-duration: 870ms;"></div>
      <div class="bar" style="left: 1780px; animation-duration: 519ms;"></div>
      <div class="bar" style="left: 1800px; animation-duration: 655ms;"></div>
      <div class="bar" style="left: 1820px; animation-duration: 665ms;"></div>
      <div class="bar" style="left: 1840px; animation-duration: 824ms;"></div>
      <div class="bar" style="left: 1860px; animation-duration: 809ms;"></div>
      <div class="bar" style="left: 1880px; animation-duration: 939ms;"></div>
      <div class="bar" style="left: 1900px; animation-duration: 786ms;"></div>
    </div>
  </div>
</template>
<script>
import { Games } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Games,
      sports: {
        nowActive: "saba"
      },
      ctrl: {
        isCarouselReady: true,
        trackStyle: "",
        slidesInTrack: [
          {
            GameDate: "2018/07/01 22:00",
            Title: "西班牙 VS 俄罗斯",
            Describe:
              "世界杯还没开幕，就热议的一个话题：俄罗斯是否会成为“南非第二”？本战对手西班牙将是最好检验的球队，西班牙贵为世界杯欧洲杯双料冠军，本场比赛..."
          }
        ],
        disableArrow: false,
        isClickablePrev: true
      },
      showIframe: true,
      sportIframeUrl: ""
    };
  },
  props: {},
  methods: {
    checkLogin(e) {
      if (!this.$store.getters.islogin) {
        e.preventDefault();
        window.toast("请先登录",'warning');
        this.$store.commit("SHOW_LOGIN", true);
        return false;
      }
    },
    load() {
      alert("loaded");
    },
    play(url, e) {
      if (!this.$store.getters.islogin) {
        e.preventDefault();
        window.toast("请先登录",'warning');
        this.$store.commit("SHOW_LOGIN", true);
        return false;
      }
      this.showIframe = false;
      this.sportIframeUrl = url;
      let ifrm = this.$refs.iframe;
      window.$load.open("加载中...");
      ifrm.onload = ifrm.onreadystatechange = function() {
        if (this.readyState && this.readyState != "complete") return;
        else {
          window.$load.close();
        }
      };
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    goLobby(val) {
      console.log(val);
    },
    getSlideStyle(val) {
      console.log(val);
    },
    prev() {
      console.log("perv");
    },
    next() {
      console.log("next");
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  created() {},
  components: {},
  deactivated() {
    this.showIframe = true;
    this.sportIframeUrl = "";
  }
};
</script>
<style lang="scss" scoped>
.sports-page {
  background: url(./images/background.jpg) no-repeat 50%; // height: 1650px;
  .game-list {
    padding-top: 220px;
    height: 755px;
    .agp,
    .imsport,
    .saba {
      position: absolute;
    }
    .agp .football,
    .imsport .football,
    .saba .football {
      display: block;
      position: absolute;
      width: 42px;
      height: 42px;
      background: url(./images/football.png) no-repeat;
      background-size: 100% 100%;
      margin: 72px 0 0 5px;
    }
    .agp .comb,
    .imsport .comb,
    .saba .comb {
      position: absolute;
      background: url(./images/comb.png) no-repeat;
      width: 352px;
      height: 50px;
      -webkit-animation: sports-comb 4s steps(79) infinite;
      animation: sports-comb 4s steps(79) infinite;
      margin: 22px 0 0 383px;
    }
    .agp .game-item,
    .imsport .game-item,
    .saba .game-item {
      width: 458px;
      height: 277px;
      background: url(./images/frame.png) no-repeat;
      position: absolute;
    }
    .agp .game-item .noOutline,
    .imsport .game-item .noOutline,
    .saba .game-item .noOutline {
      border: none !important;
      border-style: none !important;
      outline: none;
    }
    .agp .game-item .item-header,
    .imsport .game-item .item-header,
    .saba .game-item .item-header {
      padding: 122px 0 0 45px;
    }
    .agp .game-item .item-header .header-touch,
    .imsport .game-item .item-header .header-touch,
    .saba .game-item .item-header .header-touch {
      width: 380px;
      height: 50px;
    }
    .agp .game-item .item-header {
      .header-left,
      .header-right {
        float: left;
      }
    }
    .imsport .game-item .item-header {
      .header-left,
      .header-right {
        float: left;
      }
    }
    .saba .game-item .item-header {
      .header-left,
      .header-right {
        float: left;
      }
    }
    .agp .game-item .item-header .header-left,
    .imsport .game-item .item-header .header-left,
    .saba .game-item .item-header .header-left {
      color: #fff;
      font-size: 24px;
    }
    .agp .game-item .item-header .header-right,
    .imsport .game-item .item-header .header-right,
    .saba .game-item .item-header .header-right {
      color: #e2e2e2;
      border-left: 1px solid #e2e2e2;
      margin-left: 15px;
      padding-left: 15px;
    }
    .agp .game-item .item-content,
    .imsport .game-item .item-content,
    .saba .game-item .item-content {
      clear: both;
      color: #e2e2e2;
      padding: 5px 20px 0 45px;
    }
    .agp .game-item .item-action,
    .imsport .game-item .item-action,
    .saba .game-item .item-action {
      padding: 12px 20px 0 45px;
    }
    .agp .game-item .item-action a,
    .imsport .game-item .item-action a,
    .saba .game-item .item-action a {
      display: block;
      width: 104px;
      height: 32px;
      line-height: 31px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      background: url(./images/go_01.png) no-repeat;
    }
    .agp .game-item .item-action a:hover,
    .imsport .game-item .item-action a:hover,
    .saba .game-item .item-action a:hover {
      background: url(./images/go_02.png) no-repeat;
    }
    .agp.active .game-item,
    .imsport.active .game-item,
    .saba.active .game-item {
      width: 747px;
      height: 372px;
      background: url(./images/frame_in.png) no-repeat;
      -webkit-animation: sport-game-item-ani 0.1s ease-in;
      animation: sport-game-item-ani 0.1s ease-in;
      -webkit-animation-fill-mode: forwards;
      animation-fill-mode: forwards;
    }
    .agp.active .game-item .item-header,
    .imsport.active .game-item .item-header {
      padding: 60px 0 0 50px;
    }
    .saba {
      &.active .game-item .item-header {
        padding: 60px 0 0 50px;
      }
      margin: (-12px) 0 0 143px;
      .football {
        -webkit-animation: tpd-spinner-animation 1.7s infinite;
        animation: tpd-spinner-animation 1.7s infinite;
      }
      .line {
        background: url(./images/line1_01.png) no-repeat;
        width: 271px;
        height: 78px;
      }
      .game-item {
        margin: (-218px) 0 0 234px;
      }
      &.active .line {
        background: url(./images/line1_02.png) no-repeat;
      }
    }
    .agp {
      margin: (-71px) 0 0 169px;
      .football {
        -webkit-animation: tpd-spinner-animation 2s infinite;
        animation: tpd-spinner-animation 2s infinite;
      }
      .game-item {
        margin: (-157px) 0 0 300px;
      }
      .line {
        background: url(./images/line2_01.png) no-repeat;
        width: 327px;
        height: 47px;
      }
      &.active .line {
        background: url(./images/line2_02.png) no-repeat;
      }
    }
    .imsport {
      margin: (-90px) 0 0 40px;
      .football {
        -webkit-animation: tpd-spinner-animation 2.2s infinite;
        animation: tpd-spinner-animation 2.2s infinite;
      }
      .line {
        background: url(./images/line3_01.png) no-repeat;
        width: 182px;
        height: 227px;
      }
      .game-item {
        margin: (-153px) 0 0 143px;
      }
      &.active .line {
        background: url(./images/line3_02.png) no-repeat;
      }
    }
    .circle-block {
      display: block;
      width: 293px;
      height: 289px;
      position: relative;
      z-index: 2;
      map area {
        outline: none;
      }
      .shabatxt {
        position: absolute;
        left: 38%;
        top: 22%;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
      .ugtxt {
        position: absolute;
        left: 34%;
        bottom: 22%;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
      }
      .circle-marker {
        background: url(./images/target.png) no-repeat;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        display: block;
        text-align: center;
        width: 136px;
        height: 136px;
        margin: 72px 78px;
        border-radius: 50%;
        position: absolute;
      }
      .circle-msg {
        display: block;
        text-align: center;
        width: 136px;
        height: 136px;
        margin: 72px 78px;
        border-radius: 50%;
        position: absolute;
      }
      .circle-marker span,
      .circle-msg span {
        display: block;
        color: #fff;
      }
      .circle-marker span.cname,
      .circle-msg span.cname {
        margin-top: 50px;
      }
      .circle-marker span.ename {
        font-size: 12px;
        margin-top: -20px;
      }
      .circle-msg span.ename {
        font-size: 12px;
      }
    }
  }
  .mouse-more {
    height: 46px;
    .cname,
    .ename {
      margin: 0;
      color: #fff;
      text-shadow: 0 0 10px #fff;
    }
    img {
      margin-top: 10px;
      -webkit-animation: sport-mouse-more-ani 1.5s infinite;
      animation: sport-mouse-more-ani 1.5s infinite;
    }
    .ename {
      font-size: 12px;
    }
  }
  .min-sport-msg {
    margin-top: 104px;
    .sport-msg-header {
      .cname,
      .ename {
        margin: 0;
        color: #fff;
        text-shadow: 0 0 10px #fff;
      }
      .cname {
        font-size: 26px;
      }
      .ename {
        margin-top: 5px;
      }
    }
    .msg-list {
      margin-top: 0;
      .carousel-wrapper {
        .track-wrapper {
          width: 100%;
        }
        .slide {
          color: #e2e2e2;
          display: inline-block;
          width: 419px;
          height: 298px;
          padding: 46px 35px 20px 50px;
          &:hover {
            background: url(./images/analysis_frame.png) no-repeat;
          }
          .date {
            border-bottom: 1px solid #1f88e9;
            padding-bottom: 10px;
          }
          .title {
            color: #fff;
            font-size: 16px;
          }
          .describe {
            display: block;
            height: 80px;
            width: 338px;
            word-break: break-all;
          }
          .item-action {
            .white-border-btn {
              display: inline-block;
              padding: 5px 10px;
              color: #e2e2e2;
              border: 1px solid #e2e2e2;
              border-radius: 50px;
            }
            .go-bet-btn {
              display: inline-block;
              width: 104px;
              height: 32px;
              line-height: 31px;
              color: #fff;
              text-align: center;
              background: url(./images/go_01.png) no-repeat;
              margin-left: 15px;
              &:hover {
                background: url(./images/go_02.png) no-repeat;
              }
            }
          }
        }
        .carousel-prev .carousel-btn {
          left: -40px;
        }
        .carousel-next .carousel-btn {
          right: -40px;
        }
        .carousel-btn i {
          &.ui-icon-next,
          &.ui-icon-prev {
            width: 54px;
            height: 82px;
            display: block;
          }
          &.ui-icon-next:before,
          &.ui-icon-prev:before {
            content: "";
          }
          &.ui-icon-next {
            background: url(./images/right_01.png) no-repeat;
          }
          &.ui-icon-prev {
            background: url(./images/left_01.png) no-repeat;
          }
        }
      }
    }
  }
  .bottom-animate {
    height: 157px;
    position: relative;
    .bar {
      background: #1d3444;
      bottom: 1px;
      height: 3px;
      position: absolute;
      width: 5px;
      -webkit-animation: sport-bottom-ani 0ms -0.8s linear infinite alternate;
      animation: sport-bottom-ani 0ms -0.8s linear infinite alternate;
    }
  }
  .ifr {
    iframe {
      margin: 0 auto;
      display: block;
      padding-top: 20px;
      width: 1200px;
    }
  }
}

@-webkit-keyframes sports-comb {
  0% {
    background-position: 0;
  }

  to {
    background-position: -27808px;
  }
}

@keyframes sports-comb {
  0% {
    background-position: 0;
  }

  to {
    background-position: -27808px;
  }
}

@-webkit-keyframes sport-game-item-ani {
  0% {
    width: 458px;
    height: 1px;
  }

  to {
    width: 747px;
    height: 372px;
  }
}

@keyframes sport-game-item-ani {
  0% {
    width: 458px;
    height: 1px;
  }

  to {
    width: 747px;
    height: 372px;
  }
}

@-webkit-keyframes sport-mouse-more-ani {
  0% {
    margin-top: 5px;
  }

  50% {
    margin-top: 10px;
  }

  to {
    margin-top: 10px;
  }
}

@keyframes sport-mouse-more-ani {
  0% {
    margin-top: 5px;
  }

  50% {
    margin-top: 10px;
  }

  to {
    margin-top: 10px;
  }
}

@-webkit-keyframes sport-bottom-ani {
  0% {
    height: 3px;
  }

  to {
    height: 100px;
  }
}

@keyframes sport-bottom-ani {
  0% {
    height: 3px;
  }

  to {
    height: 100px;
  }
}

@-webkit-keyframes tpd-spinner-animation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes tpd-spinner-animation {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}
</style>
