<template>
  <div class="esports ng-scope">
    <div class="bgESport lol" :class="{act:esportItem == 'lol'}">
      <div class="lol-element1 ani"></div>
      <div class="lol-element2 tran ani"></div>
      <div class="lol-element3 tran ani"></div>
      <div class="lol-element4">
        <div class="text lol-element4-text">
          <p>英雄联盟是由腾讯旗下子公司Riot Games开发的MOBA类多人在线</p>
          <p>竞技游戏。高峰时间段同时在线人数逾750万，活跃玩家每月超过1亿名。在</p>
          <p>2016年举行的S6全球总决赛中，在线观看人数超过1470万，收视率超同年NBA总决</p>
          <p>赛。对于电竞行业而言，这一款产品有着划时代的意义，将电子竞技真正的推向了职</p>
          <p>业化的顶峰。在世界各地均成立了健全的职业联赛体系，中国的LPL联赛、</p>
          <p>韩国的LCK联赛、北美的LCS.NA、欧洲的LCS.EU则是最</p>
          <p>具影响力的职业联赛赛区。</p>
        </div><a :href="Games.href_avia" class="btnESport lol-element4-btn" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport honor" :class="{act:esportItem == 'honor'}" id="content" style="">
      <div class="honor-element1"></div>
      <div class="honor-element2">
        <div class="text honor-element2-text">
          <p>王者荣耀是由腾讯旗下天美</p>
          <p>工作室在移动端开发的MOBA</p>
          <p>类多人在线竞技游戏，类似于</p>
          <p>PC端的英雄联盟。总下载次</p>
          <p>数突破2亿次，同时在线人数</p>
          <p>逾500万，日活跃人数逾</p>
          <p>4000万。2017年五月取得全</p>
          <p>球手游综合收入榜冠军。自</p>
          <p>2016年9月17日起，王者荣</p>
          <p>耀职业联赛KPL正式开幕，</p>
          <p>电子竞技在移动端迈出另一</p>
          <p>个时代的篇章。KPL联赛席位</p>
          <p>则分别从KOC城市冠军赛、</p>
          <p>QGC大师赛、WGC精英赛、</p>
          <p>TGA移动游戏大奖赛这四</p>
          <p>个赛区中决出。</p>
        </div><a :href="Games.href_avia" class="btnESport honor-element2-btn" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport dt" :class="{act:esportItem == 'dt'}">
      <div class="dt-element1"></div>
      <div class="dt-element2">
        <div class="text dt-element2-text">
          <p>DOTA2是一款由Valve开发</p>
          <p>的MOBA类多人在线竞技类</p>
          <p>游戏。前身是魔兽争霸中的</p>
          <p>一张自定义地图。DOTA2是</p>
          <p>STEAM平台上活跃人数最多</p>
          <p>的游戏之一，最高在线人数超</p>
          <p>过120万。2017年的DOTA2</p>
          <p>国际邀请赛冠军奖金成功突破</p>
          <p>1000万美元，成为了电竞历史</p>
          <p>上首个达到八位数的冠军奖金，</p>
          <p>电子竞技的发展从此达到一个新</p>
          <p>的高度。DOTA2一直都是职业</p>
          <p>电竞的象征，ESL、DLS、TI国</p>
          <p>际邀请赛、大师赛等构建了一个</p>
          <p>完备的联赛体系，比赛项目多是</p>
          <p>DOTA2职业比赛的特点。</p>
        </div><a :href="Games.href_avia" class="btnESport dt-element2-btn" :class="{tran:esportItem == 'dt'}" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport cs" :class="{act:esportItem == 'cs'}">
      <div class="cs-element1"></div>
      <div class="cs-element2"></div>
      <div class="cs-element3">
        <div class="text cs-element3-text">
          <p>CS:GO是一款由Valve开发的</p>
          <p>FPS游戏，18年前的CS仅为</p>
          <p>“半条命”的第三方模组，</p>
          <p>然而随着退出后逐渐积累的</p>
          <p>高人气，CS成为了独立游戏</p>
          <p>并且发行于市，是世界上最</p>
          <p>畅销且最具影响力的FPS游</p>
          <p>戏。作为FPS游戏鼻祖之一，</p>
          <p>CS：GO每年都会举办无数</p>
          <p>比赛，例如：ESL、CSL、</p>
          <p>Dream Hack等，奖金总额</p>
          <p>逾100万美金。</p>
        </div><a :href="Games.href_avia" class="btnESport cs-element3-btn" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport sw" :class="{act:esportItem == 'sw'}">
      <div class="sw-element1 ani"></div>
      <div class="sw-element2">
        <div class="text sw-element2-text">
          <p>守望先锋是一款由暴雪娱</p>
          <p>乐开发的FPS游戏，于</p>
          <p>2016年5月进行公测</p>
          <p>吸引了超过970万玩家。</p>
          <p>游戏发售首周所有平台总</p>
          <p>销量超过750万套，</p>
          <p>普遍获得好评。</p>
          <p>2016年暴雪嘉年华期间，</p>
          <p>暴雪公布了守望先锋联</p>
          <p>赛计划，守望先锋世界</p>
          <p>杯也是由暴雪娱乐举办，</p>
          <p>奖金高达28万美金。</p>
        </div><a :href="Games.href_avia" class="btnESport sw-element2-btn" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport xj" :class="{act:esportItem == 'xj'}">
      <div class="move" style="transform: translate(-6.225px, 0px);"></div>
      <div class="xj-element1"></div>
      <div class="xj-element2">
        <div class="xj-element2-text">
          <p>星际争霸2是由暴雪娱乐开发的即时战略游戏。星际争霸系列</p>
          <p>被视为游戏史上最为杰出和重要的游戏之一，对即时战略游戏发展起到了至高无上的作</p>
          <p>用。星际争霸的成功催生了电子竞技这个领域和产业。星际争霸2在2010年正</p>
          <p>式上线后，仍是全球电竞中最引人注目的焦点，GSL、GPL、SSL</p>
          <p>等职业联赛则是竞争最为激烈的联赛。</p>
        </div><a :href="Games.href_avia" class="btnESport xj-element2-btn" :class="{tran:esportItem == 'xj'}" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport ls" :class="{act:esportItem == 'ls'}">
      <div class="ls-element1"></div>
      <div class="ls-element2">
        <div class="text ls-element2-text">
          <p>炉石传说是暴雪娱乐开发的集换式卡牌游戏，故事基于魔兽</p>
          <p>系列世界观。该游戏可以在移动端与PC端间运行，比赛模式基于传统的1V1</p>
          <p>方式。作为一款卡牌游戏，炉石传说开创了卡牌游戏电竞历史，</p>
          <p>GS、HWC、HCT等联赛构建了卡牌游戏职业化的道路。</p>
        </div><a :href="Games.href_avia" class="btnESport ls-element2-btn" :class="{tran:esportItem == 'ls'}" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div>
    </div>
    <div class="bgESport fb" :class="{act:esportItem == 'fb'}">
      <div class="fb-element1"></div>
      <div class="fb-element2">
        <div class="text fb-element2-text">
          <p>风暴英雄是一款由暴雪娱乐</p>
          <p>开发的多人在线竞技类游戏，</p>
          <p>前身是“星际争霸2”中的</p>
          <p>一张地图，游戏中的英雄</p>
          <p>角色大部分来自于：“魔</p>
          <p>兽系列”、“暗黑破坏神”、</p>
          <p>“星际争霸系列”和“守</p>
          <p>望先锋”，少部分来自于</p>
          <p>“失落的维京人”。作为一</p>
          <p>款新兴游戏，依托暴雪</p>
          <p>这一顶级平台，HGC、SL</p>
          <p>职业联赛吸引着众多玩家</p>
          <p>的眼球。</p>
        </div><a :href="Games.href_avia" class="btnESport fb-element2-btn" @click="checkLogin($event)" target="_blank">泛亚电竞</a>
      </div><canvas id="canvas" style="height:145%; opacity: 0.5" width="1920" height="966"></canvas>
    </div>
    <div class="weather">
      <div class="degree">13</div>
    </div>
    <div class="nav-bar">
      <div class="nav-item lol " @click="esportItem = 'lol'" :class="{on:esportItem == 'lol'}">英雄联盟</div>
      <div class="nav-item" @click="esportItem = 'honor'" :class="{on:esportItem == 'honor'}">王者荣耀</div>
      <div class="nav-item" @click="esportItem = 'dt'" :class="{on:esportItem == 'dt'}">刀塔Ⅱ</div>
      <div class="nav-item" @click="esportItem = 'cs'" :class="{on:esportItem == 'cs'}">反恐精英</div>
      <div class="nav-item" @click="esportItem = 'sw'" :class="{on:esportItem == 'sw'}">守望先锋</div>
      <div class="nav-item" @click="esportItem = 'xj'" :class="{on:esportItem == 'xj'}">星际争霸</div>
      <div class="nav-item" @click="esportItem = 'ls'" :class="{on:esportItem == 'ls'}">炉石传说</div>
      <div class="nav-item fb" @click="esportItem = 'fb'" :class="{on:esportItem == 'fb'}">风暴英雄</div>
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
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        Games,
        Download,
        esportItem:'lol'
      };
    },
    methods: {
      checkLogin(e) {
        if (!this.$store.getters.islogin) {
          e.preventDefault();
          toast("请先登录")
          this.$store.commit("SHOW_LOGIN", true);
          return false;
        }
      },
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      },
    },
    computed: {
      ...mapGetters(["islogin"])
    },
  }

</script>
<style lang="scss" scoped>
  .esports {
    width: 100%;
    height: 100%;
    min-height: 1080px;
    min-width: 1200px;
    position: relative;
    overflow: hidden;

    .btnESport {
      display: block;
      position: absolute;
      width: 170px;
      height: 60px;
      background: url(./images/btn1.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 54px;
      font-weight: 700;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      text-indent: -28px;
      font-size: 14px;
      color: #3ec1fe;
      text-decoration: none;

      &:after {
        content: "";
        position: absolute;
        top: 24px;
        left: 110px;
        width: 20px;
        height: 5px;
        background: url(./images/arrows.png) no-repeat;
      }

      &:hover {
        width: 170px;
        height: 60px;
        background: url(./images/btn1-hover.png) no-repeat;
      background-size: 100% 100%;
      }
    }

    p {
      text-shadow: (-1px) 1px 1px rgba(0, 0, 0, 0.8);
      margin: 0;
    }

    .text {
      letter-spacing: 1px;
      font-size: 16px;
      color: #fff;
      line-height: 32px;
      text-indent: 24px;
      font-weight: 700;
    }

    .bgESport {
      display: none;
      position: absolute;
    //   top: 9.5%;
      // left: 50%;
      // width: 1920px;
      // margin-left: -960px;
      width: 100%;
      height: 100%;
      overflow: hidden;

      &.lol {
        background: url(./images/lol-bg.jpg) no-repeat;
        background-size: 100% 100%;

        .lol-element1 {
          position: absolute;
          left: 50%;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          bottom: 0;
          width: 915px;
          height: 775px;
          background: url(./images/lol-element-01.png);
          opacity: 0;

          &.ani {
            -webkit-animation: fadeIn 1s ease-in;
            animation: fadeIn 1s ease-in;
            opacity: 1;
          }
        }

        .lol-element2 {
          position: absolute;
          bottom: 0;
          width: 620px;
          height: 712px;
          background: url(./images/lol-element-02.png) no-repeat;
        }

        .lol-element3 {
          position: absolute;
          top: -40px;
          right: -185px;
          width: 1023px;
          height: 599px;
          background: url(./images/lol-element-03.png) no-repeat;
        }

        .lol-element4 {
          position: absolute;
          width: 795px;
          height: 379px;
          left: 50%;
          top: 120px;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          background: url(./images/lol-element-04.png) no-repeat;
          -webkit-animation: fadeIn 3s ease-in;
          animation: fadeIn 3s ease-in;

          .lol-element4-text {
            padding-top: 130px;
            text-align: center;
          }

          .lol-element4-btn {
            top: 400px;
            left: 600px;

            &:active {
              top: 401px;
            }
          }

          .lol-element4-btn1 {
            top: 400px;
            left: 420px;

            &:active {
              top: 401px;
            }
          }
        }
      }

      &.honor {
        background-image: url(./images/honor-bg.jpg);
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: 100% 100%;
        z-index: 0;

        #snowflake {
          position: absolute;
          top: 200px;
        }

        .honor-element1 {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 1333px;
          height: 980px;
          background: url(./images/honor-element11.png);
          -webkit-animation: fadeInLeft 2s ease;
          animation: fadeInLeft 2s ease;
        }

        .honor-element2 {
          position: absolute;
          top: 68px;
          right: 349px;
          width: 425px;
          height: 643px;
          background: url(./images/honor-element2.png);
          -webkit-animation: fadeIn 1.5s ease;
          animation: fadeIn 1.5s ease;

          .honor-element2-text {
            -webkit-animation: fadeIn 3s ease;
            animation: fadeIn 3s ease;
            padding-top: 60px;
            padding-right: 48px;
            text-align: right;
          }

          .honor-element2-btn {
            top: 634px;
            left: 239px;

            &:active {
              top: 635px;
            }
          }

          .honor-element2-btn1 {
            top: 634px;
            left: 40px;

            &:active {
              top: 635px;
            }
          }
        }
      }

      &.dt {
        background: url(./images/dt-bg.jpg) no-repeat;
        background-size: 100% 100%;

        .dt-element1 {
          position: absolute;
          right: -100px;
          width: 1685px;
          height: 100%;
          background: url(./images/dt-element1.png);
          background-size: 100% 100%;
          -webkit-animation: fadeIn 2s ease-in;
          animation: fadeIn 2s ease-in;
        }

        .dt-element2 {
          position: absolute;
          top: 35px;
          left: 245px;
          width: 398px;
          height: 614px;
          background: url(./images/dt-element2.png);
          -webkit-animation: zoomIn 1s ease-in;
          animation: zoomIn 1s ease-in;

          .dt-element2-text {
            padding-top: 60px;
            padding-right: 42px;
            text-align: right;
          }

          .dt-element2-btn {
            opacity: 0;
            top: 625px;
            left: 227px;
            transition: opacity 2s ease;

            &:active {
              top: 626px;
            }

            &.tran {
              opacity: 1;
            }
          }

          .dt-element2-btn1 {
            opacity: 0;
            top: 625px;
            left: 31px;
            transition: opacity 2s ease;

            &:active {
              top: 626px;
            }

            &.tran {
              opacity: 1;
            }
          }
        }
      }

      &.cs {
        background: url(./images/cs-bg.jpg) no-repeat;
        background-size: 100% 100%;
        .cs-element1 {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 794px;
          height: 977px;
          background: url(./images/cs-element1.png) no-repeat;
          -webkit-animation: bounceInLeft 1s;
          animation: bounceInLeft 1s;
        }

        .cs-element2 {
          position: absolute;
          right: -120px;
          bottom: 0;
          width: 1110px;
          height: 980px;
          background: url(./images/cs-element2.png) no-repeat;
          -webkit-animation: bounceInRight 1s;
          animation: bounceInRight 1s;
        }

        .cs-element3 {
          position: absolute;
          width: 374px;
          height: 528px;
          left: 50%;
          top: 50px;
          -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
          background: url(./images/cs-element3.png) no-repeat;
          -webkit-animation: fadeIn 2s ease-in;
          animation: fadeIn 2s ease-in;

          .cs-element3-text {
            padding-top: 60px;
            padding-right: 42px;
            text-align: right;
          }

          .cs-element3-btn {
            top: 550px;
            left: 17px;

            &:active {
              top: 551px;
            }
          }

          .cs-element3-btn1 {
            top: 550px;
            left: 226px;

            &:active {
              top: 551px;
            }
          }
        }
      }

      &.sw {
        background: url(./images/sw-bg.jpg) no-repeat;
        background-size: 100% 100%;
        .sw-element1 {
          position: absolute;
          top: -40px;
          left: 0;
          width: 1466px;
          height: 100%;
          background: url(./images/sw-element1.png);
          -webkit-animation: fadeInLeft 2s ease-in;
          animation: fadeInLeft 2s ease-in;

          &.ani {
            -webkit-animation: shake 2s ease-in infinite;
            animation: shake 2s ease-in infinite;
          }
        }

        .sw-element2 {
          position: absolute;
          right: 205px;
          top: 35px;
          width: 426px;
          height: 608px;
          background: url(./images/sw-element2.png);
          -webkit-animation: fadeIn 3s ease-in;
          animation: fadeIn 3s ease-in;

          .sw-element2-text {
            padding-top: 60px;
            padding-right: 72px;
            text-align: right;
          }

          .sw-element2-btn {
            top: 610px;
            left: 237px;

            &:active {
              top: 611px;
            }
          }

          .sw-element2-btn1 {
            top: 610px;
            left: 37px;

            &:active {
              top: 611px;
            }
          }
        }
      }

      &.xj {
        .move {
          position: absolute;
          width: 2032px;
          height: 1112px;
          margin-top: -25px;
          background: url(./images/xj-bg1.jpg) no-repeat;
          background-size: 100% 100%;
          left: 50%;
          margin-left: -1043px;
          z-index: -1;
        }

        .xj-element1 {
          position: absolute;
          width: 1920px;
          height: 100%;
          background: url(./images/xj-element1.png);
          z-index: 2;
            background-size: 100% 100%; 
        }

        .xj-element2 {
          position: absolute;
          top: 230px;
          left: 50%;
          margin-left: -393px;
          width: 786px;
          height: 335px;
          background: url(./images/xj-element2.png) no-repeat;
          -webkit-animation: fadeInDown 2s ease-in;
          animation: fadeInDown 2s ease-in;
          z-index: 3;

          .xj-element2-text {
            padding-top: 88px;
            -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
            font-size: 16px;
            text-align: center;
            color: #fff;
            line-height: 32px;
            text-indent: 24px;
          }

          .xj-element2-btn {
            opacity: 0;
            transition: opacity .5s ease;
            -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
            top: 297px;
            left: 424px;

            &:active {
              top: 298px;
            }

            &.tran {
              opacity: 1;
            }
          }

          .xj-element2-btn1 {
            opacity: 0;
            transition: opacity .5s ease;
            -webkit-transform: rotate(-8deg);
            transform: rotate(-8deg);
            top: 267px;
            left: 637px;

            &:active {
              top: 268px;
            }

            &.tran {
              opacity: 1;
            }
          }
        }
      }

      &.ls {
        background: url(./images/ls-bg.jpg) no-repeat;
        background-size: 100% 100%;
        .ls-element1 {
          position: absolute;
          bottom: 0;
          width: 1920px;
          height: 626px;
          background: url(./images/ls-element1.png);
          z-index: 1;
          -webkit-animation: fadeIn 1.5s ease-in;
          animation: fadeIn 1.5s ease-in;
        }

        .ls-element2 {
          position: absolute;
          top: 170px;
          left: 50%;
          margin-left: -426.5px;
          width: 873px;
          height: 281px;
          background: url(./images/ls-element2.png);
          -webkit-animation: fadeInDown 2s ease-in;
          animation: fadeInDown 2s ease-in;

          .ls-element2-text {
            padding-top: 110px;
            padding-right: 50px;
            text-align: center;
          }

          .ls-element2-btn {
            transition: opacity 1s ease;
            opacity: 0;
            top: 286px;
            left: 634px;
            z-index: 1;

            &:active {
              top: 287px;
            }

            &.tran {
              opacity: 1;
            }
          }

          .ls-element2-btn1 {
            transition: opacity 1s ease;
            opacity: 0;
            top: 286px;
            left: 427px;
            z-index: 1;

            &:active {
              top: 287px;
            }

            &.tran {
              opacity: 1;
            }
          }
        }
      }

      &.fb {
        background: url(./images/fb-bg.png) no-repeat;
        background-size: 100% 100%;
        .fb-element1 {
          position: absolute;
          top: -90px;
          width: 1318px;
          height: 954px;
          background: url(./images/fb-element1.png) no-repeat;
          -webkit-animation: fadeIn 5s ease;
          animation: fadeIn 5s ease;
          z-index: 1;

          &.ani {
            -webkit-animation: shake 2s ease-in infinite;
            animation: shake 2s ease-in infinite;
            -webkit-animation-delay: 1s;
            animation-delay: 1s;
          }
        }

        .fb-element2 {
          position: absolute;
          top: 40px;
          right: 365px;
          width: 370px;
          height: 572px;
          background: url(./images/fb-element2.png) no-repeat;
          -webkit-animation: fadeIn 3s ease-in;
          animation: fadeIn 3s ease-in;
          z-index: 1;

          .fb-element2-text {
            padding-top: 76px;
            padding-right: 50px;
            text-align: right;
          }

          .fb-element2-btn {
            top: 576px;
            left: 205px;

            &:active {
              top: 577px;
            }
          }

          .fb-element2-btn1 {
            top: 576px;
            left: 7px;

            &:active {
              top: 577px;
            }
          }
        }
      }

      &.act {
        display: block;
      }
    }

    .weather {
      position: absolute;
      bottom: 70px;
      right: 52px;
      width: 81px;
      height: 134px;
      background: url(./images/weather1.png) no-repeat;
      z-index: 2;

      .degree {
        padding-top: 5px;
        padding-left: 5px;
        color: #29abe2;
        font-size: 40px;
      }
    }

    .nav-bar {
      position: absolute;
      left: 50%;
      bottom: 160px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      width: 100%;
      max-width: 1425px;
      min-width: 1080px;
      height: 70px;
      font-size: 14px;
      color: #fff;
      z-index: 3;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      text-align: center;

      .nav-item {
        padding-top: 35px;
        width: 141px;
        background: url(./images/game-btn.png) no-repeat bottom;
        cursor: pointer;
        transition: all 0.3s ease-in;

        &:hover {
          padding-top: 10px;
          background: url(./images/game-btn-hover.png) no-repeat top;
        }

        &.on {
          color: #3eeafe;
          padding-top: 10px;
          background: url(./images/game-btn-hl.png) no-repeat top;
        }
      }
    }
  }

  @media screen and (max-width: 1680px) {
    .esports .weather {
      position: absolute;
      bottom: 70px;
      right: -3px;
    }
  }

  @media screen and (max-width: 1440px) {
    .esports .bgESport.sw .sw-element2 {
      position: absolute;
      right: 271px;
      top: 53px;
      width: 426px;
      height: 608px;
      background: url(./images/sw-element2.png) no-repeat;
      -webkit-animation: fadeIn 3s ease-in;
      animation: fadeIn 3s ease-in;
    }
  }

  @media screen and (max-width: 1280px) {
    .esports .bgESport.sw .sw-element2 {
      position: absolute;
      right: 325px;
      top: 53px;
      width: 426px;
      height: 608px;
      background: url(./images/sw-element2.png) no-repeat;
      -webkit-animation: fadeIn 3s ease-in;
      animation: fadeIn 3s ease-in;
    }
  }

  @media screen and (max-width: 1600px) {
    .weather {
      display: none;
    }
  }

  .lol-element2 {
    -webkit-transform: translateX(-30px);
    transform: translateX(-30px);
    opacity: 0;

    &.tran {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
      transition: all 2s ease-in;
    }

    &.ani {
      -webkit-animation: shake 2s ease-in infinite;
      animation: shake 2s ease-in infinite;
    }
  }

  .lol-element3 {
    -webkit-transform: translateX(30px);
    transform: translateX(30px);
    opacity: 0;

    &.tran {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
      transition: all 2s ease-in;
    }

    &.ani {
      -webkit-animation: shake 2s ease-in infinite;
      animation: shake 2s ease-in infinite;
      -webkit-animation-delay: 1s;
      animation-delay: 1s;
    }
  }

  @-webkit-keyframes shake {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }

    10% {
      -webkit-transform: translate3d(0, 0.2%, 0);
      transform: translate3d(0, 0.2%, 0);
    }

    25% {
      -webkit-transform: translate3d(0, 0.5%, 0);
      transform: translate3d(0, 0.5%, 0);
    }

    50% {
      -webkit-transform: translate3d(0, 1%, 0);
      transform: translate3d(0, 1%, 0);
    }

    75% {
      -webkit-transform: translate3d(0, 0.5%, 0);
      transform: translate3d(0, 0.5%, 0);
    }

    90% {
      -webkit-transform: translate3d(0, 0.2%, 0);
      transform: translate3d(0, 0.2%, 0);
    }

    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }


  @keyframes shake {
    0% {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }

    10% {
      -webkit-transform: translate3d(0, 0.2%, 0);
      transform: translate3d(0, 0.2%, 0);
    }

    25% {
      -webkit-transform: translate3d(0, 0.5%, 0);
      transform: translate3d(0, 0.5%, 0);
    }

    50% {
      -webkit-transform: translate3d(0, 1%, 0);
      transform: translate3d(0, 1%, 0);
    }

    75% {
      -webkit-transform: translate3d(0, 0.5%, 0);
      transform: translate3d(0, 0.5%, 0);
    }

    90% {
      -webkit-transform: translate3d(0, 0.2%, 0);
      transform: translate3d(0, 0.2%, 0);
    }

    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }


  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }


  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }


  @-webkit-keyframes fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100px, 0, 0);
      transform: translate3d(-100px, 0, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }


  @-webkit-keyframes zoomIn {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.2, 0.2, 0.2);
      transform: scale3d(0.2, 0.2, 0.2);
    }

    50% {
      opacity: 1;
    }
  }


  @keyframes zoomIn {
    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.2, 0.2, 0.2);
      transform: scale3d(0.2, 0.2, 0.2);
    }

    50% {
      opacity: 1;
    }
  }


  @-webkit-keyframes bounceInLeft {

    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }

    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }

    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }

    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }

    to {
      -webkit-transform: none;
      transform: none;
    }
  }


  @keyframes bounceInLeft {

    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }

    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }

    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }

    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }

    to {
      -webkit-transform: none;
      transform: none;
    }
  }


  @-webkit-keyframes bounceInRight {

    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }

    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }

    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }

    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }

    to {
      -webkit-transform: none;
      transform: none;
    }
  }


  @keyframes bounceInRight {

    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }

    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }

    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }

    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }

    to {
      -webkit-transform: none;
      transform: none;
    }
  }


  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }


  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

</style>
