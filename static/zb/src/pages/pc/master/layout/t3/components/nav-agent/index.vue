<template>
  <div class="show-agent-nav">
    <div class="content cfx">
      <a href="/" class="agentlogo">
        <img src="/static/images/logo.gif">
        <!-- <span>加盟代理</span>-->
      </a>
      <div class="fr nav-link">
        <router-link class="nav-icon-back" :to="{name:'index'}">
          <span class="item0"></span>官网首页
        </router-link>
        <router-link class="nav-icon-index" :to="{name:'agentareaIndex',params:{'tab':'tab1'}}">
          <span class="item1"></span>代理首页
        </router-link>
        <router-link class="nav-icon-system" :to="{name:'agentareaSystem',params:{'tab':'tab2'}}">
          <span class="item2"></span>合营模式
        </router-link>
        <router-link class="nav-icon-plan" :to="{name:'agentareaPlan',params:{'tab':'tab3'}}">
          <span class="item3"></span>佣金政策
        </router-link>
        <router-link class="nav-icon-fqa" :to="{name:'agentareaQuestion',params:{'tab':'tab4'}}">
          <span class="item4"></span>常见问题
        </router-link>
        <!-- <router-link class="nav-icon-join" :to="{name:'agentareaJoin',params:{'tab':'tab5'}}">
          <span class="item5"></span>申请加盟
        </router-link>-->
      </div>
    </div>
  </div>
</template>
<script>
import { Games, platformData } from "@/assets/data";
import openWindow from "@/util/openWindow";
import { SETTING } from "@/assets/data";

import { mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      Games,
      SETTING,
      platformData
    };
  },
  props: {},
  computed: {
    ...mapGetters(["islogin"])
  },
  watch: {},
  methods: {
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    }
  },
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.show-agent-nav {
  height: 85px;
  min-width: 1200px;
  background: #1c1c1c;
  .content {
    height: 82px;
    position: relative;
  }
  .agentlogo {
    display: inline-block;
    width: 249px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 110;
    img {
      width: 100%;
    }
  }
  .nav-link {
    a {
      text-align: center;
      height: 85px;
      line-height: 26px;
      font-size: 16px;
      width: 105px;
      float: left;
      color: #fff;
      &.active,
      &:hover {
        color: #fff;
        background: #3ec1fe;
      }
      span {
        width: 100%;
        height: 40px;
        display: block;
        margin-top: 15px;
        &.item0 {
          background: url(./images/nav1.png) no-repeat center 0;
        }
        &.item1 {
          background: url(./images/nav-index.png) no-repeat center 0;
          -moz-background-size: 35% auto;
          -o-background-size: 35% auto;
          background-size: 35% auto;
        }
        &.item2 {
          background: url(./images/nav-system.png) no-repeat center 0;
          -moz-background-size: 35% auto;
          -o-background-size: 35% auto;
          background-size: 35% auto;
        }
        &.item3 {
          background: url(./images/nav-plan.png) no-repeat center 0;
          -moz-background-size: 35% auto;
          -o-background-size: 35% auto;
          background-size: 35% auto;
        }
        &.item4 {
          background: url(./images/nav-fqa.png) no-repeat center 0;
          -moz-background-size: 35% auto;
          -o-background-size: 35% auto;
          background-size: 35% auto;
        }
        &.item5 {
          background: url(./images/nav-join.png) no-repeat center 0;
          -moz-background-size: 35% auto;
          -o-background-size: 35% auto;
          background-size: 35% auto;
        }
      }
    }
  }
}
</style>
