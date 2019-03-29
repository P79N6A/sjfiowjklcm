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
                      id="ig_ssc"
                      class="defaultImg lottery_ssc"
                      :class="{action:title=='IG_SSC'}"
                      @click="ChangeTab('IG_SSC')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="ig_hk"
                      class="defaultImg lottery_ig"
                      :class="{action:title=='IG_HK'}"
                      @click="ChangeTab('IG_HK')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <!-- <div id="ebet" class="defaultImg live_ebet" @click="ChangeTab(4)" role="button" tabindex="0"></div> -->
                    <div id="ebet"></div>
                    <div id="opus"></div>
                    <div
                      id="vr"
                      class="defaultImg lottery_vr"
                      :class="{action:title=='VR'}"
                      @click="ChangeTab('VR')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="bbin"
                      class="defaultImg lottery_bbin"
                      :class="{action:title=='BBIN'}"
                      @click="ChangeTab('BBIN')"
                      role="button"
                      tabindex="0"
                    ></div>
                    <div
                      id="cb"
                      class="defaultImg lottery_cb"
                      :class="{action:title=='CB'}"
                      @click="ChangeTab('CB')"
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
                      <span class="live_Content_middle_right_subTitle1">彩票</span>
                      <span class="live_Content_middle_right_subTitle2"></span>
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
        Title: "香港彩",
        subTitle: "人气火爆",
        listTitle1: "多种多样，精彩刺激",
        listTitle2: "玩法简单",
        listTitle3: "专业团队，保障游戏畅快",
        listTitle4: "",
        href: Games.href_ig_hk,
        name: "IG香港彩"
      },
      title: "香港彩",
      isChecked: false
    };
  },
  props: {},
  methods: {
    checkLogin(e) {
      if (!this.$store.getters.islogin) {
        e.preventDefault();
        window.toast("请先登录", "warning");
        this.$store.commit("SHOW_LOGIN", true);
        return false;
      }
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    ChangeTab(val) {
      this.title = val;
      this.isChecked = true;
      switch (val) {
        case "IG_HK":
          this.live = {
            Title: "香港彩",
            subTitle: "人气火爆",
            listTitle1: "多种多样，精彩刺激",
            listTitle2: "玩法简单",
            listTitle3: "专业团队，保障游戏畅快",
            listTitle4: "",
            href: Games.href_ig_hk,
            name: "IG香港彩"
          };
          break;
        case "IG_SSC":
          this.live = {
            Title: "时时彩",
            subTitle: "随时在线进行游戏",
            listTitle1: "完美兼容IOS与安卓，手机在手天下我有",
            listTitle2: "同时在线人数超20000，超高人气成就英雄之巅",
            listTitle3: "完美还原经典",
            listTitle4: "相当丰富的棋牌模式",
            href: Games.href_ig_ssc,
            name: "IG时时彩"
          };
          break;
        case "VR":
          this.live = {
            Title: "VR",
            subTitle: "随时在线进行游戏",
            listTitle1: "游戏品项最齐，玩法多样享不停",
            listTitle2: "个性化定制，尊享奢华体验",
            listTitle3: "完美游戏体验",
            listTitle4: "",
            href: Games.href_vr,
            name: "VR彩票"
          };
          break;
        case "BBIN":
          this.live = {
            Title: "波音",
            subTitle: "至尊游戏体验",
            listTitle1: "非常具有娱乐性",
            listTitle2: "最为欢乐的棋牌游戏合集大厅",
            listTitle3: "完美兼容IOS与安卓，手机在手天下我有",
            listTitle4: "",
            href: Games.href_bbcp,
            name: "波音彩票"
          };
          break;
        case "CB":
          this.live = {
            Title: "彩播",
            subTitle: "真实的对战环境",
            listTitle1: "提供优质的客户服务",
            listTitle2: "专业的技术支持",
            listTitle3: "给予玩家彷佛置身于现场的绝妙体验",
            listTitle4: "",
            href: Games.href_cb,
            name: "彩播彩票"
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
  // background: url(./images/background.jpg);
  width: 100%;
  height: 981px;
  position: relative;
  background: linear-gradient(
    339deg,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9,
    #313de1,
    #2b9cd8,
    #354ee8,
    #2b9dd9
  );
  background-size: 800% 800%;
  overflow: hidden;
  -webkit-animation: ocean-wave 15s ease infinite;
  animation: ocean-wave 15s ease infinite;
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
        color: #1b82ff;
        text-align: center;
        vertical-align: middle;
        // background: url(./images/Button_01.png) no-repeat 0 0;
        background: #fff;
        border-radius: 4px;
        &:hover {
          // background: url(./images/Button_02.png) no-repeat 0 0;
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
    background-size: contain !important;
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
    &.lottery_ssc {
      width: 220px;
      height: 195px;
      background: url(./images/lottery_ssc.png) 50% no-repeat;
      // top: 41px;
      // left: 188px;
      top: -2px;
      left: 191px;
      &:hover {
        background: url(./images/lottery_ssc_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/lottery_ssc_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.lottery_vr {
      width: 220px;
      height: 195px;
      background: url(./images/lottery_vr.png) 50% no-repeat;
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
        background: url(./images/lottery_vr_01.png) 50% no-repeat;
      }
      &.action {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.lottery_bbin {
      width: 220px;
      height: 195px;
      background: url(./images/lottery_bbin.png) 50% no-repeat;
      top: 81px;
      left: 130px;
      &:hover {
        background: url(./images/lottery_bbin_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/lottery_bbin_01.png) 50% no-repeat;
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.lottery_ig {
      width: 220px;
      height: 195px;
      background: url(./images/lottery_ig.png) 50% no-repeat;
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
        background: url(./images/lottery_ig_01.png) 50% no-repeat;
      }
      &.action {
        transform: scale(1);
        -webkit-transform: scale(1);
        -moz-transform: scale(1);
      }
    }
    &.lottery_cb {
      width: 220px;
      height: 195px;
      background: url(./images/lottery_cb.png) 50% no-repeat;
      // top: -83px;
      // left: 132px;
      top: -307px;
      left: 355px;
      &:hover {
        background: url(./images/lottery_cb_01.png) 50% no-repeat;
        transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
      }
      &.action {
        background: url(./images/lottery_cb_01.png) 50% no-repeat;
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
@-webkit-keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }
  50% {
    background-position: 100% 46%;
  }
  to {
    background-position: 0 55%;
  }
}
@keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }
  50% {
    background-position: 100% 46%;
  }
  to {
    background-position: 0 55%;
  }
}
</style>
