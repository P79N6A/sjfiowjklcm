<template>
  <div class="nav-bg">
    <div class="nav cfx">
      <router-link tag="a" to="/index" class="logo">
        <img src="/static/images/logo.gif">
      </router-link>
      <div class="nav-a cfx">
        <!-- <router-link tag="a" to="/index" class="nav-item">
          首页
        </router-link> -->
        <router-link :to="{name:'sportindex'}" class="nav-item">体育游戏
          <ul class="menu-nav">
            <li><a target="_blank" @click="open(Games.href_sb_pc, '沙巴体育', 900, 640, true, islogin)">沙巴体育</a></li>
            <li><a target="_blank" @click="open(Games.href_ug_pc, '新皇冠体育', 900, 640, true, islogin)">新皇冠体育</a></li>
          </ul>
        </router-link>
        <router-link :to="{name:'realindex'}" class="nav-item">真人娱乐
          <ul class="menu-nav">
            <li><a target="_blank" @click="open(Games.href_ag, 'AG真人', 900, 640, true, islogin)">AG真人</a></li>
            <li><a target="_blank" @click="open(Games.href_sunbet, '申博真人', 900, 640, true, islogin)">申博真人</a></li>
            <li><a target="_blank" @click="open(Games.href_og, 'OG真人', 900, 640, true, islogin)">OG真人</a></li>
            <li><a target="_blank" @click="open(Games.href_bbin, 'BBIN真人', 900, 640, true, islogin)">BBIN真人</a></li>
            <li><a target="_blank" @click="open(Games.href_dg_pc, 'DG真人', 900, 640, true, islogin)">DG真人</a></li>
            <li><a target="_blank" @click="open(Games.href_bg, 'BG真人', 900, 640, true, islogin)">BG真人</a></li>
          </ul>
        </router-link>
        <router-link :to="{name:'lotteryindex'}" class="nav-item">彩票游戏
          <ul class="menu-nav">
            <li><a target="_blank" @click="open(Games.href_vr, 'IG时时彩', 900, 640, true, islogin)">VR彩票</a></li>
            <li><a target="_blank" @click="open(Games.href_ig_ssc, 'IG时时彩', 900, 640, true, islogin)">IG时时彩</a></li>
            <li><a target="_blank" @click="open(Games.href_ig_hk, 'IG香港彩', 900, 640, true, islogin)">IG香港彩</a></li>
            <li><a target="_blank" @click="open(Games.href_cb, '彩播彩票', 900, 640, true, islogin)">彩播彩票</a></li>
            <li><a target="_blank" @click="open(Games.href_bbcp, 'BBIN彩票', 900, 640, true, islogin)">BBIN彩票</a></li>         
          </ul>
        </router-link>
        <a href="javascript:;" class="nav-item">
          电子游戏
          <ul class="menu-nav">
            <li class="ptasia" v-for="item in platformData" :key="item.value">
                <router-link :to="{name:'gameIndex',params:{type:item.value}}">
                  {{item.name}}
                </router-link>
              </li>
          </ul>
        </a>
        <a href="javascript:;" class="nav-item">棋牌/捕鱼
          <ul class="menu-nav">
            <li><router-link :to="{name:'chessHallindex'}">棋牌游戏</router-link></li>
            <li><router-link :to="{name:'fishindex'}">捕鱼游戏</router-link></li>
          </ul>
        </a>
        <router-link :to="{name:'esportsindex'}" class="nav-item">电子竞技
        </router-link>
        <router-link tag="a" :to="{name:'promosIndex'}" class="nav-item">优惠活动</router-link>
        <router-link tag="a" :to="{name:'dIndex'}" class="nav-item">手机APP</router-link>
        <router-link :to="{name:'vIndex'}" class="nav-item">VIP专区</router-link>
        <router-link :to="{name:'cIndex'}" class="nav-item">代理加盟</router-link>
        
      </div>
    </div>
  </div>
</template>
<script>
  import {Games,platform,platformData} from "@/assets/data"
  import {    SETTING  } from "@/assets/data";
  import openWindow from '@/util/openWindow'
  import {    mapGetters, mapActions, mapMutations  } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        SETTING,
        Games,
        platformData,
        showNav: 1
      };
    },
    computed: {
      ...mapGetters(["userData", "islogin", "isAgent", "isUser"])
    },

    methods: {
      needLogin(href) {
      if (this.islogin) {
        if (this.isAgent) {
          $alert("代理不能游戏！");
        } else {
          window.open(href);
        }
      } else {
        window.toast("请先登录！");
      }
    },
    downapp() {
      // console.log(this.islogin);
      if (!this.islogin) {
        $alert("您好，请先登录游戏账号，若无账号，请先进入网页注册!");
      }
    },
      showNavs(index) {
        console.log(index);
      },
      open(url, title, w, h, needLogin, loginState) {
        openWindow(url, title, w, h, needLogin, loginState)
      }
    }
  };

</script>
<style lang="scss" scoped>
.nav-bg{
  background: #0E0E1E;
}
.nav {
  font-size: 16px;
  line-height: 70px;
  position: relative;
  width: 1250px;
  height: 70px;
  margin: 0 auto;
}
.nav .logo {
  width: auto;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  border: 0;
  padding-bottom: 10px;
  height: 67px;
  overflow: hidden;
  img {
    height: 60px;
    display: block;
    margin-top: 6px;
  }
}
.nav-a {
  float: right;
  clear: both;
}
.nav a {
  position: relative;
  display: block;
  width: 95px;
  // padding: 0 20px;
  text-align: center;
  color: #e0e0e0;
  transition: all 0.4s;
  cursor: pointer;
  float: left;
  &:hover,
  &.active {
    color: #0498fc;
  }
  .menu-nav {
    position: absolute;
    z-index: 999;
    background: #161620;
    padding: 10px;
    opacity: 0;
    transition: all 0.5s;
    height: 0;
    overflow: hidden;
    width: 100% !important;
    box-sizing: content-box !important;
    left: 50%;
    transform: translate(-50%);
    li {
      line-height: 22px;
      img {
        display: block;
        width: 100%;
      }
      a {
        line-height: 22px;
        padding: 6px 0;
        border: none;
        float: none !important;
      }
    }
  }
  &:hover {
    .menu-nav {
      opacity: 1;
      height: auto;
      // display:block;
    }
  }
}
.nav a i {
  position: absolute;
  top: 33px;
  right: 6px;
  display: block;
  width: 9px;
  height: 6px;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
  background: url(./images/icon14.png) no-repeat;
}
.nav a:hover i {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  transform: rotate(180deg);
}
</style>
