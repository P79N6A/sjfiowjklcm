<template>
  <div id="live" class="live ng-scope">
    <div id="livecontainer" class="container">
      <div class="row">
        <div class="col s12">
          <div class="liveContent">
            <!--===========================中間===========================-->
            <div class="live_Content_middle">
              <div class="row">
                <div class="col s6">
                  <div class="live_Content_middle_left">
                    <div
                      id="sunbet"
                      class="defaultImg live_sunbet"
                      :class="{action:title=='SUNBET'}"
                      @click="ChangeTab('SUNBET')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="og"
                      class="defaultImg live_og"
                      :class="{action:title=='OG'}"
                      @click="ChangeTab('OG')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <!-- <div id="ebet" class="defaultImg live_ebet" @click="ChangeTab(4)" role="button" tabindex="0"></div> -->
                    <div id="ebet"></div>
                    <div id="opus"></div>
                    <div
                      id="ag"
                      class="defaultImg live_ag"
                      :class="{action:title=='AG'}"
                      @click="ChangeTab('AG')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="bbin"
                      class="defaultImg live_bbin"
                      :class="{action:title=='BBIN'}"
                      @click="ChangeTab('BBIN')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="dg"
                      class="defaultImg live_dg"
                      :class="{action:title=='DG'}"
                      @click="ChangeTab('DG')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="bg"
                      class="defaultImg live_bg"
                      :class="{action:title=='BG'}"
                      @click="ChangeTab('BG')"
                      role="button"
                      tabindex="0"
                    ></div>
                  </div>
                </div>
                <div class="col s6">
                  <!--====================================Tabs========================================================-->
                  <div
                    id="live_Content_middle_right"
                    class="live_Content_middle_right slideLeftAni"
                  >
                    <div :class="{'notAG': live.Title != 'AG'}" class="notAG" style>
                      <span class="live_Content_middle_right_title ng-binding">{{live.Title}}</span>
                      <span class="live_Content_middle_right_subTitle1">娱乐场</span>
                      <span class="live_Content_middle_right_subTitle2">Live Casino</span>
                    </div>
                    <div class="live_Content_middle_right_subTitle3 ng-binding">{{live.subTitle}}</div>
                    <div class="live_Content_middle_right_LineStyle"></div>
                    <div class="live_Content_middle_right_subTitle4">平台优势</div>
                    <div
                      class="live_Content_middle_right_ListNum"
                      v-show="live.listTitle1 != ''"
                      aria-hidden="false"
                    >
                      <img src="./images/n_01.png" alt>
                      <span class="ng-binding">{{live.listTitle1}}</span>
                    </div>
                    <div
                      class="live_Content_middle_right_ListNum"
                      v-show="live.listTitle2 != ''"
                      aria-hidden="false"
                    >
                      <img src="./images/n_02.png" alt>
                      <span class="ng-binding">{{live.listTitle2}}</span>
                    </div>
                    <div
                      class="live_Content_middle_right_ListNum"
                      v-show="live.listTitle3 != ''"
                      aria-hidden="false"
                    >
                      <img src="./images/n_03.png" alt>
                      <span class="ng-binding">{{live.listTitle3}}</span>
                    </div>
                    <div
                      class="live_Content_middle_right_ListNum"
                      v-show="live.listTitle4 != ''"
                      aria-hidden="true"
                      style
                    >
                      <img src="./images/n_04.png" alt>
                      <span class="ng-binding">{{live.listTitle4}}</span>
                    </div>
                    <div>
                      <!-- <div class="live_Content_middle_right_btn_StartGame" @click="open(live.href, live.name, 900, 640, true, islogin)"

                      role="button" tabindex="0">开始游戏</div>-->
                      <a
                        :href="live.href"
                        @click="checkLogin($event)"
                        class="live_Content_middle_right_btn_StartGame"
                        target="_blank"
                      >开始游戏</a>
                    </div>
                  </div>
                  <!--====================================END Tabs========================================================-->
                </div>
              </div>
            </div>
            <!--===========================END中間===========================-->
          </div>
        </div>
      </div>
    </div>
    <div id="bubbles">
      <div
        class="bubble bubblelarge"
        style="left:22%;opacity:0.9;transform:scale(1.13);animation-duration:21s;-webkit-animation-duration:21s;-moz-animation-duration:21s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:2%;opacity:0.9;transform:scale(1.26);animation-duration:23s;-webkit-animation-duration:23s;-moz-animation-duration:23s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:72%;opacity:0.8;transform:scale(1.9);animation-duration:13s;-webkit-animation-duration:13s;-moz-animation-duration:13s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:90%;opacity:0.8;transform:scale(1.21);animation-duration:6s;-webkit-animation-duration:6s;-moz-animation-duration:6s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:67%;opacity:0.8;transform:scale(1.34);animation-duration:16s;-webkit-animation-duration:16s;-moz-animation-duration:16s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:60%;opacity:0.8;transform:scale(1.30);animation-duration:21s;-webkit-animation-duration:21s;-moz-animation-duration:21s; "
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:13%;opacity:0.8;transform:scale(1.6);animation-duration:19s;-webkit-animation-duration:19s;-moz-animation-duration:19s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:100%;opacity:0.8;transform:scale(1.29);animation-duration:11s;-webkit-animation-duration:11s;-moz-animation-duration:11s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:75%;opacity:0.9;transform:scale(1.27);animation-duration:14s;-webkit-animation-duration:14s;-moz-animation-duration:14s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:34%;opacity:0.8;transform:scale(1.13);animation-duration:20s;-webkit-animation-duration:20s;-moz-animation-duration:20s;"
      ></div>
      <div
        class="bubble bubblelarge"
        style="left:73%;opacity:0.8;transform:scale(1.9);animation-duration:6s;-webkit-animation-duration:6s;-moz-animation-duration:6s;"
      ></div>
    </div>
  </div>
</template>
<script>
import { Games, Download } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      Games,
      Download,
      href: window.location.href,
      live: {
        Title: "OG",
        subTitle: "亚洲成长最快娱乐场",
        listTitle1: "首家获得Pagcor牌照的娱乐场",
        listTitle2: "多镜显示，全方位洞悉游戏形势",
        listTitle3: "专业团队，保障游戏畅快",
        listTitle4: "",
        href: Games.href_ag,
        name: "OG真人"
      },
      title: "OG",
      isChecked: false
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
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    ChangeTab(val) {
      console.log(val);
      this.title = val;
      this.isChecked = true;
      switch (val) {
        case "OG":
          this.live = {
            Title: "OG",
            subTitle: "亚洲成长最快娱乐场",
            listTitle1: "首家获得Pagcor牌照的娱乐场",
            listTitle2: "多镜显示，全方位洞悉游戏形势",
            listTitle3: "专业团队，保障游戏畅快",
            listTitle4: "",
            href: Games.href_og,
            name: "OG真人"
          };
          break;
        case "AG":
          this.live = {
            Title: "AG",
            subTitle: "亚洲最佳娱乐场",
            listTitle1: "完美兼容IOS与安卓，手机在手天下我有",
            listTitle2: "同时在线人数超20000，超高人气成就英雄之巅",
            listTitle3: "首创百家乐六牌先发，全球抢先体验",
            listTitle4: "VIP尊享奢华体验，包桌、眯牌、飞牌、换靴、换荷官",
            href: Games.href_ag,
            name: "AG真人"
          };
          break;
        case "BBIN":
          this.live = {
            Title: "BBIN",
            subTitle: "亚洲最具人气娱乐场",
            listTitle1: "游戏品项最齐，玩法多样享不停",
            listTitle2: "个性化定制，尊享奢华体验",
            listTitle3: "IOS&安卓全覆盖，空间不再是限制",
            listTitle4: "",
            href: Games.href_bbin,
            name: "BBIN真人"
          };
          break;
        case "SUNBET":
          this.live = {
            Title: "申博",
            subTitle: "亚洲最值得信赖的娱乐场",
            listTitle1: "现场监察，每局游戏公平公正，保障真实性",
            listTitle2: "连续赞助英超球会达5年，影响力极高",
            listTitle3: "PC桌面版使用便捷，移动端全覆盖，完美游戏体验",
            listTitle4: "",
            href: Games.href_sunbet,
            name: "SUNBET真人"
          };
          break;
        case "DG":
          this.live = {
            Title: "DG",
            subTitle: "真实的赌场环境",
            listTitle1: "数百位训练有素的专业荷官",
            listTitle2: "专业的技术支持",
            listTitle3: "给予玩家彷佛置身于现场的绝妙体验",
            listTitle4: "",
            href: Games.href_dg_pc,
            name: "DG真人"
          };
          break;
        case "BG":
          this.live = {
            Title: "BG",
            subTitle: "BG大遊真人视讯厅",
            listTitle1: "专业、稳定、完美融合",
            listTitle2: "专业的技术支持",
            listTitle3: "给予玩家彷佛置身于现场的绝妙体验",
            listTitle4: "",
            href: Games.href_bg,
            name: "BG真人"
          };
          break;
      }
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
.live {
  overflow: hidden;
  background: url(./images/background.jpg);
  width: 100%;
  height: 981px;
  position: relative;
  .live_Content_middle {
    margin-top: 200px;
    .live_Content_middle_left {
      position: relative;
    }
    .live_Content_middle_right {
      padding: 70px 0;
      left: 150px;
      top: -60px;
      position: relative;
      div {
        margin-top: 17px;
      }
      .notAG {
        position: relative;
        left: -5px;
      }
      .live_Content_middle_right_title {
        font-size: 72px;
        color: #fff;
      }
      .live_Content_middle_right_subTitle1 {
        font-size: 24px;
        color: #fff;
        position: relative;
        top: -30px;
        left: 7px;
      }
      .live_Content_middle_right_subTitle2 {
        font-size: 24px;
        color: #fff;
        position: relative;
        left: -70px;
      }
      .live_Content_middle_right_subTitle3 {
        font-size: 24px;
        color: #e7e8ea;
        font-weight: 700;
        margin-top: unset !important;
      }
      .live_Content_middle_right_subTitle4 {
        font-size: 20px;
        color: #e7e8ea;
        font-weight: 700;
      }
      .live_Content_middle_right_ListNum {
        font-size: 14px;
        color: #e7e8ea;
        img {
          vertical-align: middle;
        }
      }
      .live_Content_middle_right_LineStyle {
        width: 100px;
        height: 1px;
        border: 1px solid #efefef;
      }
      .live_Content_middle_right_btn_StartGame {
        cursor: pointer;
        width: 155px;
        display: block;
        height: 46px;
        line-height: 46px;
        outline: none;
        color: #e7e8ea;
        text-align: center;
        vertical-align: middle;
        background: url(./images/Button_01.png) no-repeat 0 0;
        &:hover {
          background: url(./images/Button_02.png) no-repeat 0 0;
        }
      }
    }
  }
  .defaultImg {
    cursor: pointer;
    display: inline-block;
    width: auto;
    height: auto;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    outline: none;
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    transition: 0.5s;
    -webkit-transition: 0.5s;
    -moz-transition: 0.5s;
    img {
      outline: none;
    }
    &.b_star_top {
      top: 103px;
      left: 85%;
      img {
        width: 165px;
        height: 133px;
      }
    }
    &.s_star_top {
      top: 20px;
      left: 90%;
      img {
        width: 98px;
        height: 81px;
      }
    }
    &.live_sunbet {
      width: 220px;
      height: 195px;
      background: url(./images/live_sunbet.png) 50% no-repeat;
      // top: 41px;
      // left: 188px;
      top: -2px;
      left: 191px;
      &:hover {
        background: url(./images/live_sunbet_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/live_sunbet_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_ag {
      width: 220px;
      height: 195px;
      background: url(./images/live_ag.png) 50% no-repeat;
      // top: -175px;
      // left: 191px;
      top: -14px;
      left: 191px;
      &:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action,
      &:hover {
        background: url(./images/live_ag_01.png) 50% no-repeat;
      }
      &.action {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_dg {
      width: 220px;
      height: 195px;
      background: url(./images/live_dg.png) 50% no-repeat;
      top: -307px;
      left: 355px;
      &:hover {
        background: url(./images/live_dg_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/live_dg_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_og {
      width: 220px;
      height: 195px;
      background: url(./images/live_og.png) 50% no-repeat;
      // top: -52px;
      // left: 130px;
      top: -95px;
      left: 130px;
      &:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action,
      &:hover {
        background: url(./images/live_og_01.png) 50% no-repeat;
      }
      &.action {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_opus {
      width: 220px;
      height: 195px;
      background: url(./images/live_opus.png) 50% no-repeat;
      top: -68px;
      left: 132px;
      &:hover {
        background: url(./images/live_opus_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/live_opus_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_bbin {
      width: 220px;
      height: 195px;
      background: url(./images/live_bbin.png) 50% no-repeat;
      // top: -83px;
      // left: 132px;
      top: 81px;
      left: 130px;
      &:hover {
        background: url(./images/live_bbin_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/live_bbin_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.live_bg {
      width: 220px;
      height: 195px;
      background: url(./images/live_bg.png) 50% no-repeat;
      top: -26px;
      right: 34px;
      &:hover {
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action,
      &:hover {
        background: url(./images/live_bg_01.png) 50% no-repeat;
      }
      &.action {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.b_star_bottom {
      top: 1px;
      left: -15%;
      img {
        width: 165px;
        height: 133px;
      }
    }
    &.s_star_bottom {
      top: 1px;
      left: -15%;
      img {
        width: 98px;
        height: 81px;
      }
    }
  }
}
.bubble {
  position: absolute;
  transition: scale 0.05s linear;
  -webkit-transition: scale 0.05s linear;
  -moz-transition: scale 0.05s linear;
}

.bubblelarge {
  background: url(./images/bubble_brust01.png) 50% no-repeat;
  width: 50px;
  height: 50px;
  -webkit-animation: bubbleAnimations 10s infinite;
  animation: bubbleAnimations 10s infinite;
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

@keyframes LiveslideLeft {
  0% {
    left: 1000px;
  }

  to {
    left: 150px;
  }
}

@-webkit-keyframes LiveslideLeft {
  0% {
    left: 1000px;
  }

  to {
    left: 150px;
  }
}

.live_Content_middle_right.slideLeftAni {
  -webkit-animation: LiveslideLeft 1s;
  animation: LiveslideLeft 1s;
}
.live_Content_middle_right.showIt {
  -webkit-animation: LiveslideLeft 1s;
  animation: LiveslideLeft 1s;
}
</style>
