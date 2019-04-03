<template>
  <header class="index-top">
    <!-- <app-down></app-down> -->
    <div class="top-header">
      <div class="head-left" @click="value=true" v-if="!$route.meta.isBack">
        <i class="iconclass left-icon"></i>  
        <span>菜单</span>
      </div>   
      <router-link :to="{name:'registerAgent'}" class="iconclass agent-icon" v-else-if="$route.meta.joinAgent">加盟注册</router-link>
      <div class="head-left-back" @click="$router.back();" v-else>
        <i class="iconclass iconfont icon-xingzhuang"></i>
        <span>返回</span>
      </div>        

      <a href="/" class="link_logo" v-if="!$route.meta.title">
        <img src="/static/images/base/logo_H5.png">
      </a>
      <span class="head-title" v-else>{{$route.meta.title}}</span>
      
      <router-link :to="{name:'download'}" class="head-right" v-if="$route.name == 'slotgame'">
        <i class="iconclass iconfont icon-xiazai1"></i>  
        <span>客户端下载</span>
      </router-link>
      <a class="head-right" @click="valueRight=true" v-else>
        <i class="iconclass right-icon"></i>  
        <span>客服</span>
      </a>
      
    </div>

    <tool-bar v-model="value"></tool-bar>
    <tool-barright v-model="valueRight"></tool-barright>
  </header>
  
</template>
<script>
import toolBar from "../tool-bar";
import toolBarright from "../tool-bar-right";
import callBack from "mobile/views/common/back-Call";
import { SETTING } from "@/assets/data";
import { mapGetters } from "vuex";
import appDown from "../../components/app-down/index";
export default {
  data() {
    return {
      SETTING,
      value: false,
      showHead: true,
      sheetData: [
        {
          name: "在线客服",
          target: "_blank",
          href: SETTING.live800
        },
        { name: "电话回拨", to: { path: "/common/backCall" } },
        { name: SETTING.telAgent, href: "tel:" + SETTING.telAgent }
      ],
      showSheet: false,
      valueRight: false,
    };
  },
  created() {
    // 监听header控制事件
    this.$bus.$on("setHeader", eventData => {
      this.showHead = eventData;
    });
  },
  components: {
    toolBar,
    toolBarright,
    appDown
  },
  computed: {
    ...mapGetters(["isAgent", "islogin"])
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
header.index-top {
  width: 100%;
  // height: r($header-h);
  // line-height: r($header-h);
  position: fixed;
  top: 0;
  border: none;
  text-align: center;
  z-index: 999;
  .top-header {
    height: r($header-h);
    line-height: r($header-h);
    position: relative;
    background:$header-bg;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
  }
  .head-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    margin-left: r(10);
    span {
      line-height: 1;
    }
  }
  .head-left-back {
    span {
      @include f(32px);
    }
  }
  .head-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    margin-right: r(10);
    span {
      line-height: 1;
    }
  }
  .iconclass {
    @include f(40px);
    color: #fff;
    line-height: 1;
    // position: absolute;
    // top: 50%;
    // transform: translateY(-50%);
    display: inline-block;
    vertical-align: middle;
  }
  .left-icon {
    left: r(16);
    width: r(58);
    height: r(48);
    background: url(./images/head-menu.png) no-repeat center/100% ;
  }
  .agent-icon {
    @include f(32px);
    padding-left:r(15);
    // left: r(16);
    // width: r(180);
    // height: r(48);
    // background: url(./images/agentregister.png) no-repeat top left/100% ;
  }
  .iconfont {
    left: r(16);
  }
  .right-icon {
    right: r(16);
    width: r(52);
    height: r(52);
    background: url(./images/head-chat.png) no-repeat center/100%;
  }
  .link_logo {
    display: flex;
    height: 80%;
    img {
      height: 100%;
    }
  }
  .head-title {
    @include f(36px);
    color: #fff;
  }
}
</style>
