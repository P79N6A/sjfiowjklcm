<template>
  <div class="lol">
    <div class="lol_title"></div>
    <div class="lol_wrap">
      <div class="div1">
        <div class="unit left" :class="{on:type=='lol'}" @mouseover="type = 'lol';isleft=1">
          <div class="shrink shrink1"></div>
          <div class="stretch stretch1">
            <div class="lol_detail">
              <h2 class="h2_title">英雄联盟</h2>
              <p class="lol_text1">LEAGUE OF LEGENDS</p>
              <span class="lol_text2">《英雄联盟》(简称LOL)是一款对战MOBA竞技网游，每年都</span>
              <span class="lol_text3">会举办季中冠军赛”“全球总决赛”“All Star全明星赛”...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='wzry',left:isleft<2,right:isleft>2||isleft==2}" @mouseover="type = 'wzry';isleft=2">
          <div class="shrink shrink2"></div>
          <div class="stretch stretch2">
            <div class="lol_detail lol_detail2">
              <h2 class="h2_title">王者荣耀</h2>
              <p class="lol_text1">KING OF GLORY</p>
              <span class="lol_text2">王者荣耀是一款当下最受欢迎的手机游戏，总下载次数突破2</span>
              <span class="lol_text3">亿，职业联赛KPL席位分别从KOC城市冠军赛、QGC大师赛...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='dota2',left:isleft<3,right:isleft>3||isleft==3}" @mouseover="type = 'dota2';isleft=3">
          <div class="shrink shrink3"></div>
          <div class="stretch stretch3">
            <div class="lol_detail lol_detail3">
              <h2 class="h2_title">DOTA 2</h2>
              <p class="lol_text1">DOTA 2</p>
              <span class="lol_text2">《刀塔2》是中美公司联合开发的一款游戏，是STEAM平台上</span>
              <span class="lol_text3">活跃人数最多的游戏之一，最高在线人数高达120万。...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='csgo',left:isleft<4,right:isleft>4||isleft==4}" @mouseover="type = 'csgo';isleft=4">
          <div class="shrink shrink4"></div>
          <div class="stretch stretch4">
            <div class="lol_detail lol_detail4">
              <h2 class="h2_title">CS GO</h2>
              <p class="lol_text1">CS GO</p>
              <span class="lol_text2">CS:GO是一款第一人称射击游戏，游戏玩家分为反恐精英</span>
              <span class="lol_text3">（CT阵营）与恐怖份子（T阵营），双方需在一个地图上进...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='ow',left:isleft<5,right:isleft>5||isleft==5}" @mouseover="type = 'ow';isleft=5">
          <div class="shrink shrink5"></div>
          <div class="stretch stretch5">
            <div class="lol_detail lol_detail5">
              <h2 class="h2_title">守望先锋</h2>
              <p class="lol_text1">OVER WATCH</p>
              <span class="lol_text2">《守望先锋》是一款第一人称射击游戏，游戏以未来地球为背</span>
              <span class="lol_text3">景，讲述人类、守望先锋成员和智能机械的恩怨纠葛。...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='lscs',left:isleft<6,right:isleft>6||isleft==6}" @mouseover="type = 'lscs';isleft=6">
          <div class="shrink shrink6"></div>
          <div class="stretch stretch6">
            <div class="lol_detail lol_detail6">
              <h2 class="h2_title">炉石传说</h2>
              <p class="lol_text1">HEARTH STONE</p>
              <span class="lol_text2">炉石传说是一款基于“魔兽系列”的集换式卡牌游戏，九位魔</span>
              <span class="lol_text3">兽角色对应九种不同职业，玩家可根据自己现有的“卡牌”...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit opt " :class="{on:type=='xj',left:isleft<7,right:isleft>7||isleft==7}" @mouseover="type = 'xj';isleft=7">
          <div class="shrink shrink7"></div>
          <div class="stretch stretch7">
            <div class="lol_detail lol_detail7">
              <h2 class="h2_title">星际争霸2</h2>
              <p class="lol_text1">STAR CRAFT</p>
              <span class="lol_text2">《星际争霸》一款即时战略游戏，是全球电竞中最引人注目的</span>
              <span class="lol_text3">焦点，三个独特种族的创新设计获得一致好评，GSL、GPL...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
        <div class="unit right" :class="{on:type=='fb'}" @mouseover="type = 'fb';isleft=8">
          <div class="shrink shrink8"></div>
          <div class="stretch stretch8">
            <div class="lol_detail lol_detail8">
              <h2 class="h2_title">风暴英雄</h2>
              <p class="lol_text1">HEROES NEXUS</p>
              <span class="lol_text2">《风暴英雄》 是由一款运行在Windows和Mac OS上的在线</span>
              <span class="lol_text3">多人竞技PC游戏，作为一款新兴游戏，HGC、SL职业联赛...</span>
              <a :href="Games.href_avia" class="playbtn" @click="checkLogin($event)" target="_blank">
                <span class="playbtn-text">泛亚电竞</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    Games
  } from "@/assets/data"
  import openWindow from '@/util/openWindow'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games,
        main: {
          currentSport: 'shaba',

        },
        type:'lol',
        isleft:1
      }
    },
    methods: {
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
      goLobby() {
        console.log('fasdf');

      },
      checkLogin(e) {
        console.log(e)
        if (!this.$store.getters.islogin) {
          e.preventDefault();
          window.toast("请先登录",'warning');
          this.$store.commit("SHOW_LOGIN", true);
          return false;
        }
      },
    },
    computed: {
      ...mapGetters(["islogin"])
    },
  }

</script>
<style lang="scss" scoped>
  .lol {
  overflow: hidden;
  width: 100%;
  height: 540px;
  background: url(./images/bg_lol.jpg) no-repeat center center/100% 100%;
  .lol_title {
    margin: 40px auto 0;
    width: 443px;
    height: 44px;
    background: url(./images/e_sports.png) no-repeat;
  }
  .lol_wrap {
    text-align: center;
    .div1 {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      margin: 40px auto 0;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      .unit {
        width: 115px;
        position: relative;
        margin-right: 10px;
        overflow: hidden;
        .shrink {
          width: 115px;
          height: 322px;
          background-color: #ce3533;
        }
        .stretch {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          width: 421px;
          height: 322px;
          background-color: #3ec1fe;
        }
        &.left .stretch {
          -webkit-transform: translateX(-100%);
          transform: translateX(-100%);
        }
        &.right .stretch {
          -webkit-transform: translateX(100%);
          transform: translateX(100%);
        }
        &.on {
          width: 421px;
          .shrink {
            display: none;
          }
          .stretch {
            opacity: 1;
            -webkit-transform: translateX(0);
            transform: translateX(0);
            transition: all 0.5s ease;
          }
        }
      }
      .shrink1 {
        background: url(./images/lol1.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch1 {
        background: url(./images/btn_detail1.png) no-repeat;
      }
      .shrink2 {
        background: url(./images/lol2.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch2 {
        background: url(./images/lol_detail2.png) no-repeat;
      }
      .shrink3 {
        background: url(./images/lol3.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch3 {
        background: url(./images/lol_detail3.png) no-repeat;
      }
      .shrink4 {
        background: url(./images/lol4.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch4 {
        background: url(./images/lol_detail4.png) no-repeat;
      }
      .shrink5 {
        background: url(./images/lol5.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch5 {
        background: url(./images/lol_detail5.png) no-repeat;
      }
      .shrink6 {
        background: url(./images/lol6.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch6 {
        background: url(./images/lol_detail6.png) no-repeat;
      }
      .shrink7 {
        background: url(./images/lol7.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch7 {
        background: url(./images/lol_detail7.png) no-repeat;
      }
      .shrink8 {
        background: url(./images/lol8.png) no-repeat;
        background-size: 100% 100%;
      }
      .stretch8 {
        background: url(./images/lol_detail8.png) no-repeat;
      }
    }
    .lol_detail {
      margin: 0 2px 5px;
      display: inline-block;
      text-align: left;
      width: 429px;
      height: 322px;
      background: url(./images/lol_detail.png) no-repeat;
      overflow: hidden;
      .h2_title {
        margin-top: 28px;
        padding-left: 35px;
        font-size: 47px;
        color: #fff;
      }
      .lol_text1 {
        margin: -7px 0 17px;
        padding-left: 35px;
        font-size: 18px;
        color: #fff;
      }
      .lol_text2 {
        font-size: 14px;
        line-height: 28px;
        padding-left: 35px;
        color: #fff;
      }
      .lol_text3 {
        font-size: 14px;
        line-height: 28px;
        padding-left: 35px;
        color: #fff;
        margin-bottom: 58px;
        display: inline-block;
      }
      .lol_btn {
        margin-bottom: 28px;
        margin-left: 35px;
        box-sizing: content-box;
        padding-left: 10px;
        display: inline-block;
        width: 154px;
        height: 43px;
        color: #fff;
        line-height: 40px;
        border-radius: 22px;
        border: 1px solid #fff;
        font-size: 14px;
        position: relative;
        overflow: hidden;
        transition: 0.3s;
      }
      .lol_btn2 {
        margin-left: 12px;
      }
    }
    .lol_detail2 {
      background: url(./images/lol_detail2.png) no-repeat;
    }
    .lol_detail3 {
      background: url(./images/lol_detail3.png) no-repeat;
    }
    .lol_detail4 {
      background: url(./images/lol_detail4.png) no-repeat;
    }
    .lol_detail5 {
      background: url(./images/lol_detail5.png) no-repeat;
    }
    .lol_detail6 {
      background: url(./images/lol_detail6.png) no-repeat;
    }
    .lol_detail7 {
      background: url(./images/lol_detail7.png) no-repeat;
    }
    .lol_detail8 {
      background: url(./images/lol_detail8.png) no-repeat;
    }
    .lol_btn {
      &:after {
        left: 50%;
        bottom: 0;
        position: absolute;
        display: block;
        transition: .3s;
        content: "";
        width: 0;
        height: 45px;
        background: #fff;
        height: 120%;
        left: -10%;
        -webkit-transform: skewX(15deg);
        transform: skewX(15deg);
      }
      &:hover {
        &:after {
          width: 100%;
          left: -10%;
          width: 120%;
        }
        color: #3ec1fe;
        .ios_down_btn_b {
          background: url(./images/ios_a.png) no-repeat;
          background-position: 0 50%;
        }
      }
      .sport_trim {
        display: inline-block;
        vertical-align: middle;
        margin-right: 12px;
        margin-left: 39px;
      }
    }
  }
}
.playbtn {
          position: relative;
          display: block;
          padding-left: 14px;
          padding-right: 10px;
          margin: 0 auto;
          box-sizing: content-box;
          width: 171px;
          height: 43px;
          color: #fff;
          line-height: 40px;
          border-radius: 21.5px;
          text-align: center;
          // border: 1px solid #fff;
          font-size: 14px;
          transition: .3s;
          overflow: hidden;
          background: transparent;
          border: 1px solid #fff;
          &:after {
            left: 50%;
            bottom: 0;
            position: absolute;
            display: block;
            transition: .3s;
            content: "";
            width: 0;
            height: 45px;
            background: #fff;
            height: 120%;
            left: -10%;
            transform: skewX(15deg);
          }
          &:hover {
            &:after {
              width: 100%;
              left: -10%;
              width: 120%;
              color: #3ec1fe;
            }
            color: #3ec1fe;
          }
          .playbtn-text{
            position: relative;
            z-index: 1;
            display: inline-block;
            vertical-align: middle;
          }
        }
</style>
