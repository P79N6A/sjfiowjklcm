<template>
  <div class="top_nav">
    <div class="wp clear">
      <div class="fl">
        <!--<a class="js-countdown countdown-cont" href="/index.jsp">-->
        <!--</a>-->
        <router-link class="logo-cont" :to="{name:'home'}">
          <img src="/static/images/base/logo-1.png">
        </router-link>
      </div>
      <ul class="fl navbar clear">
        <li class="li">
          <router-link class="home-back" :to="{name:'home'}">
            <i class="bg-home"></i>
          </router-link>
        </li>

        <li class="li">
          <i class="bg-mobile" @click="gotoDown"></i>
          <div class="mobile dropdown inblock_fix j-agent-download">
            <div class="inblock">
              <div class="mb16">
                <p>
                  奇幻城APP二维码
                  <i class="bg-android_icon"></i>
                  <i class="bg-ios_icon"></i>
                </p>
              </div>
              <div class="qr_pic">
                <img src="/static/images/base/qrcode.png" alt>
              </div>
            </div>
          </div>
        </li>

        <li class="li">
          <span>老虎机大厅</span>

          <router-link :to="{name:'gameIndex',params:{type:'PT2TIGER'}}" class="alink">
            <span class="link-spanner"></span>
          </router-link>
          <div class="slot dropdown">
            <ul>
              <li class="ptasia" v-for="item in platformData" :key="item.value">
                <router-link :to="{name:'gameIndex',params:{type:item.value}}">
                  <i class="nav_slot" :class="item.value"></i>
                  {{item.name}}
                  <img
                    src="./images/hot.png"
                    class="hot-icon"
                    alt
                    v-if="item.value == 'PT'||item.value == 'DT'||item.value == 'MG'||item.value == 'PT2TIGER'"
                  >
                </router-link>
              </li>
            </ul>
          </div>
        </li>
        <li class="li">
          <span>真人娱乐厅</span>
          <router-link :to="{name:'real'}" class="alink">
            <span class="link-spanner"></span>
          </router-link>
          <div class="live dropdown">
            <ul>
              <li v-for="item in realData" :key="item.value">
                <a
                  href="javascript:void(0);"
                  @click="open(item.url,item.name, 900, 640, true, islogin)"
                >
                  <i class="nav_live" :class="item.value"></i>
                  {{item.name}}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="li">
          <span>体育电竞厅</span>
          <router-link :to="{name:'realSport'}" class="alink">
            <span class="link-spanner"></span>
          </router-link>
          <div class="sport dropdown">
            <ul>
              <li v-for="item in sportData" :key="item.value">
                <a
                  href="javascript:void(0);"
                  @click="open(item.url,item.name, 900, 640, true, islogin)"
                >
                  <i class="nav_live" :class="item.value"></i>
                  {{item.name}}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="li">
          <span>彩票棋牌</span>
          <router-link :to="{name:'ylc'}" class="alink">
            <span class="link-spanner"></span>
          </router-link>
          <div class="fish ticket dropdown">
            <ul>
              <!-- <li class="qly-chess dtgame" v-for="item in lotteryData" :key="item.value">
                <a
                  href="javascript:void(0);"
                  @click="open(item.url,item.name, 900, 640, true, islogin)"
                >
                  <i class="nav_ticket" :class="item.value"></i>
                  {{item.name}}
                </a>
              </li>-->
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_vr, '开元棋牌', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket VR"></i>VR彩票
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_ig_ssc, 'IG时时彩 ', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket IG"></i>IG时时彩
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_ig_hk, 'IG香港彩', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket IG1"></i>IG香港彩
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_cb, '彩播彩票 ', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket CB"></i>彩播彩票
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_kyqp, '开元棋牌', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket KYQP"></i>开元棋牌
                  <img src="./images/hot.png" class="hot-icon">
                </a>
              </li>
              <li class="qly-chess dtgame">
                <router-link :to="{name:'chessHall',params:{type:'DTQP'}}">
                  <i class="nav_ticket DTQP"></i>DT棋牌
                  <img src="./images/hot.png" class="hot-icon">
                </router-link>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_city761, '761棋牌 ', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket CITY761"></i>761棋牌
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_lgqp, '幸运棋牌 ', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket LGQP"></i>幸运棋牌
                </a>
              </li>
              <li class="qly-chess dtgame">
                <a
                  href="javascript:void(0);"
                  @click="open(Games.href_by, 'BY棋牌', 900, 640, true, islogin)"
                >
                  <i class="nav_ticket BY"></i>BY棋牌
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="li">
          <span>捕鱼游戏</span>
          <router-link :to="{name:'fish'}" class="alink">
            <span class="link-spanner"></span>
          </router-link>
          <div class="fish ticket dropdown">
            <ul>
              <li class="qly-chess dtgame" v-for="item in fishData" :key="item.value">
                <a
                  href="javascript:void(0);"
                  @click="open(item.url,item.name, 900, 640, true, islogin)"
                >
                  <i class="nav_ticket" :class="item.value"></i>
                  {{item.name}}
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li class="li">
          <router-link :to="{name:'promosIndex'}">最新优惠</router-link>
        </li>
        <li class="li">
          <a href="/static/page/girls/pc.html">喜爱夜蒲</a>
        </li>
        <!-- <li class="li">
          <router-link :to="{name:'history'}">奇幻城风采</router-link>
        </li>-->
      </ul>
    </div>
  </div>
</template>
<script>
import { SETTING, Games, platformData } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
import annunciate from "pc/components/annunciate";
export default {
  name: "",
  data() {
    return {
      SETTING,
      Games,
      currentState: "",
      platformData,
      sportData: [
        {
          name: "沙巴体育",
          value: "SHABA",
          url: Games.href_sb_pc
        },
        {
          name: "新皇冠体育",
          value: "UG",
          url: Games.href_ug_pc
        },
        {
          name: "BTI体育",
          value: "BTI",
          url: Games.href_bti
        },
        {
          name: "泛亚电竞",
          value: "AVIA",
          url: Games.href_avia
        }
      ],
      realData: [
        {
          name: "AG真人",
          value: "AG",
          url: Games.href_ag
        },
        {
          name: "申博真人",
          value: "SUNBET",
          url: Games.href_sunbet
        },
        {
          name: "OG真人",
          value: "OG",
          url: Games.href_og
        },
        {
          name: "BBIN真人",
          value: "BBIN",
          url: Games.href_bbin
        },
        {
          name: "DG真人",
          value: "DGLIVE",
          url: Games.href_dg_pc
        }
      ],
      lotteryData: [
        {
          name: "VR彩票",
          value: "VR",
          url: Games.href_vr
        },
        {
          name: "IG时时彩",
          value: "IG",
          url: Games.href_ig_ssc
        },
        {
          name: "IG香港彩",
          value: "IG1",
          url: Games.href_ig_hk
        },
        {
          name: "彩播彩票",
          value: "CB",
          url: Games.href_cb
        },
        {
          name: "开元棋牌",
          value: "KYQP",
          url: Games.href_kyqp
        },
        {
          name: "761棋牌",
          value: "CITY761",
          url: Games.href_city761
        },
        {
          name: "幸运棋牌",
          value: "LGQP",
          url: Games.href_lgqp
        },
        {
          name: "BY棋牌",
          value: "BY",
          url: Games.href_by
        }
      ],
      fishData: [
        {
          name: "JDB捕鱼",
          value: "JDBFISH",
          url: Games.href_fish_jdb
        },
        {
          name: "AG捕鱼",
          value: "AGFISH",
          url: Games.href_fish_ag
        },
        {
          name: "大满贯捕鱼",
          value: "MW",
          url: Games.href_fish_mw
        }
      ]
    };
  },
  props: {},
  computed: {
    ...mapGetters(["islogin"])
  },
  watch: {},
  methods: {
    gotoDown() {
      this.$router.push({
        name: "downloadIndex"
      });
    },
    checkLogin(e) {
      if (!this.$store.getters.islogin) {
        e.preventDefault();
        toast("请先登录");
        this.$store.commit("SHOW_LOGIN", true);
        return false;
      }
    },
    errTips() {
      toast("敬请期待！");
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    }
  },
  created() {},
  activated() {},
  components: {
    annunciate
  }
};
</script>
<style lang="scss" scoped>
.top_nav {
  height: 100px;
  background: #fff;
  ul li:hover .dropdown {
    display: block;
  }
  .logo-cont {
    display: block;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .wp {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .wp > :first-child {
    width: 245px;
    /* padding-top: 19px; */
  }

  .navbar {
    width: 955px;
    height: 100px;

    .li {
      height: 100px;
      float: left;
      padding: 0 13px 0;
      position: relative;
      font-size: 18px;
      color: #000;
      line-height: 100px;
      cursor: pointer;
      &:hover {
        color: #4db7f4;
        background: #d4d4d4;
        background: -moz-linear-gradient(top, #d4d4d4 0%, #f1f1f1 100%);
        background: -webkit-linear-gradient(top, #d4d4d4 0%, #f1f1f1 100%);
        background: linear-gradient(to bottom, #d4d4d4 0%, #f1f1f1 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d4d4d4', endColorstr='#f1f1f1', GradientType=0);
        .mobile {
          display: flex;
        }
      }

      a {
        color: #000;

        &.home-back {
          display: block;
          height: 100%;
        }
      }
    }

    ul li a {
      width: 100%;
      height: 100%;
      display: inline-block;
    }

    .dropdown ul li a {
      position: relative;
      color: #fff;
      display: flex;
      align-items: center;
    }

    .alink {
      width: 0;
      height: 0;
      display: block;
    }

    .navbar .last_item {
      margin: 0 0 0 13px;
    }

    .icon-caidanhot {
      position: absolute;
      top: -19px;
      right: -14px;
      font-size: 30px;
      color: red;
    }

    .icon-viphuangguan {
      position: absolute;
      right: -2px;
      bottom: 18px;
      font-size: 34px;
      color: red;
    }

    .bg-home {
      width: 25px;
      height: 23px;
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background: url(./images/header_nav_sprites.png) -10px -10px;
    }

    .bg-mobile {
      width: 15px;
      height: 25px;
      display: block;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      background: url(./images/header_nav_sprites.png) -100px -10px;
    }

    .mobile {
      width: 200px;
      height: 200px;
      left: -73px;
      align-items: center;
      justify-content: center;
      padding-top: 10px;
      .inblock {
        text-align: center;
        p {
          font-size: 15px;
        }
      }
    }

    .navbar > li {
      &:hover,
      &.active {
        /* border-bottom: 5px solid #59dbd0; */
        color: #4db7f4;
        background: #d4d4d4;
        background: -moz-linear-gradient(top, #d4d4d4 0%, #f1f1f1 100%);
        background: -webkit-linear-gradient(top, #d4d4d4 0%, #f1f1f1 100%);
        background: linear-gradient(to bottom, #d4d4d4 0%, #f1f1f1 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d4d4d4', endColorstr='#f1f1f1', GradientType=0);
      }
    }

    .bg-home {
      &:hover,
      &.active {
        background: url(./images/header_nav_sprites.png) -55px -10px;
      }
    }

    .bg-mobile {
      &:hover,
      &.active {
        background: url(./images/header_nav_sprites.png) -135px -10px;
      }
    }

    .dropdown {
      left: -30px;
      display: none;
      position: absolute;
      top: 100px;
      z-index: 999;
      background: #44a7e0;
      line-height: normal;
      color: #fff;
      font-size: 14px;

      li {
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        width: 165px;
        height: 40px;
        transition: 0.2s all linear;
        a {
          text-align: left;
          margin: 0px 8px;
        }

        &:hover {
          background: #59dbd0;

          .PT {
            background-position: 0 -316px;
            width: 64px;
            height: 24px;
          }

          .PT2TIGER {
            background-position: 0 -316px;
            width: 64px;
            height: 24px;
          }

          .PG {
            background-position: 0 -555px;
            width: 61px;
            height: 23px;
          }

          .DT {
            background-position: 0 -71px;
            width: 76px;
          }

          .RTG {
            background-position: 0 -435px;
          }

          .CQ9 {
            background-position: 0 -495px;
            width: 61px;
            height: 23px;
          }

          .SW {
            background-position: 0 -12px;
            width: 76px;
          }

          .MG {
            background-position: 0 -127px;
          }

          .PNG {
            background-position: 0 -255px;
            width: 64px;
            height: 24px;
          }
          .JDBSLOT {
            background-position: 0 -671px;
            height: 24px;
          }

          .AMEBA {
            background-position: 0 -733px;
            height: 24px;
          }

          .QT {
            background-position: 0 -376px;
          }

          .NT {
            background-position: 0 -190px;
            height: 22px;
          }

          .TGP {
            background-position: 0 -615px;
            width: 61px;
            height: 23px;
          }

          .AG {
            background-position: 0 1px;
          }
          .OG {
            background-position: 0 -66px;
          }
          .BBIN {
            background-position: 0 -301px;
          }
          .SUNBET {
            background: url("./images/sunbet.png") no-repeat top left;
            background-size: contain;
          }
          .DGLIVE {
            background-position: 0 -579px;
          }
          .SHABA {
            background-position: 0 -236px;
          }
          .BTI {
            background-position: 0 -517px;
          }
          .UG {
            background-position: 0 -368px;
          }
          .AVIA {
            background-position: 0 -435px;
          }

          .VR {
            background-position: 0 -203px;
            height: 22px;
          }
          .BBCP {
            background-position: 0 -301px;
            height: 27px;
          }
          .IG {
            background-position: 0 -320px;
          }
          .IG1 {
            background-position: 0 -390px;
          }
          .CB {
            background-position: 0 -461px;
          }
          .CITY761 {
            background-position: 0 -142px;
          }
          .KYQP {
            background-position: 0 -254px;
          }
          .BY {
            background-position: 0 -588px;
          }
          .LGQP {
            background-position: 0 -647px;
          }
          .AGFISH {
            background-position: 0 -9px;
          }
          .MW {
            background-position: 0 -75px;
          }
          .JDBFISH {
            background-position: 0 -524px;
          }
          .DTQP {
            background-position: 0 -71px;
          }
        }
      }

      .nav_slot {
        background: url("./images/nav_slot52.png") no-repeat top left;
        background-position-x: left;
        background-position-y: top;
        width: 82px !important;
        height: 18px;
        display: inline-block;
        position: relative;
        vertical-align: middle;

        &.PT {
          background-position: 0 -316px;
          width: 64px;
          height: 24px;
        }

        &.PT2TIGER {
          background-position: 0 -316px;
          width: 64px;
          height: 24px;
        }

        &.PG {
          background-position: 0 -555px;
          width: 61px;
          height: 23px;
        }

        &.DT {
          background-position: 0 -71px;
          width: 76px;
        }

        &.RTG {
          background-position: 0 -435px;
        }

        &.CQ9 {
          background-position: 0 -495px;
          width: 61px;
          height: 23px;
        }

        &.SW {
          background-position: 0 -12px;
          width: 76px;
        }

        &.MG {
          background-position: 0 -127px;
        }

        &.PNG {
          background-position: 0 -255px;
          width: 64px;
          height: 24px;
        }
        &.JDBSLOT {
          background-position: 0 -671px;
          height: 24px;
        }

        &.AMEBA {
          background-position: 0 -733px;
          height: 24px;
        }

        &.QT {
          background-position: 0 -376px;
        }

        &.NT {
          background-position: 0 -190px;
          height: 22px;
        }

        &.TGP {
          background-position: 0 -615px;
          width: 61px;
          height: 23px;
        }

        &.AG {
          background-position: 0 1px;
        }
      }

      .nav_live {
        background: url("./images/nav_live7.png") no-repeat top left;
        background-position-x: left;
        background-position-y: top;
        width: 82px !important;
        height: 24px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        &.AG {
          background-position: 0 1px;
        }
        &.OG {
          background-position: 0 -66px;
        }
        &.BBIN {
          background-position: 0 -301px;
        }
        &.SUNBET {
          background: url("./images/sunbet.png") no-repeat top left;
          background-size: contain;
        }
        &.DGLIVE {
          background-position: 0 -579px;
        }
        &.SHABA {
          background-position: 0 -236px;
        }
        &.BTI {
          background-position: 0 -517px;
        }
        &.UG {
          background-position: 0 -368px;
        }
        &.AVIA {
          background-position: 0 -435px;
        }
      }

      .nav_ticket {
        background: url("./images/nav_fish8.png") no-repeat top left;
        background-position-x: left;
        background-position-y: top;
        width: 82px !important;
        height: 24px;
        display: inline-block;
        position: relative;
        vertical-align: middle;
        &.VR {
          background-position: 0 -203px;
          height: 22px;
        }
        &.BBCP {
          background-position: 0 -301px;
          height: 27px;
        }
        &.IG {
          background-position: 0 -320px;
        }
        &.IG1 {
          background-position: 0 -390px;
        }
        &.CB {
          background-position: 0 -461px;
        }
        &.CITY761 {
          background-position: 0 -142px;
        }
        &.KYQP {
          background-position: 0 -254px;
        }
        &.BY {
          background-position: 0 -588px;
        }
        &.LGQP {
          background-position: 0 -647px;
        }
        &.AGFISH {
          background-position: 0 -9px;
        }
        &.MW {
          background-position: 0 -75px;
        }
        &.JDBFISH {
          background-position: 0 -524px;
        }
        &.DTQP {
          background: url("./images/nav_slot52.png") no-repeat top left;
          background-position: 0 -71px;
        }
      }
    }

    .qr_pic {
      width: 123px;
      height: 123px;
      margin: 10px auto;

      img {
        max-width: 100%;
      }
    }
  }
  .bg-android_icon {
    width: 19px;
    height: 22px;
    display: inline-block;
    vertical-align: sub;
    margin-right: 6px;
    background: url(./images/header_sprites.png) -10px -45px;
  }
  .bg-ios_icon {
    width: 17px;
    height: 22px;
    display: inline-block;
    vertical-align: sub;
    background: url(./images/header_sprites.png) -10px -87px;
  }
  .iconp {
    margin: 5px auto;
  }
}

.clear {
  zoom: 1;
}

.hot-icon {
  position: absolute;
  right: 8px;
  top: 0px;
}

.link-spanner {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
