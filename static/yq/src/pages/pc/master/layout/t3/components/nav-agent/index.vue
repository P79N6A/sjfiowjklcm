<template>
  <div class="nav_wp">
    <div class="nav wp">
      <div class="logo-box logo-box1">
        <!-- <i class="i1"></i> -->
        <!-- <i class="i2"></i> -->
        <router-link :to="{name:'home'}">
          <img src="./images/logo1.png" width="264" height="128" alt>
        </router-link>
      </div>
      <div class="logo-ban clickable" id="headerAgent" @click="showRegister">
        <img src="./images/add.jpg" width="117" height="95" alt>
      </div>
      <div class="agent-nav">
        <div class="agent-tit">
          <h3>
            <span>▶</span>奇幻城代理，给您一个未来!!
          </h3>
        </div>
        <div class="items">
          <router-link :to="{name:'agentarea',params:{'tab':'tab1'}}">首页</router-link>
          <router-link :to="{name:'agentarea',params:{'tab':'tab2'}}">
            奇幻城优势
            <i class="triangle"></i>
          </router-link>
          <router-link :to="{name:'agentarea',params:{'tab':'tab3'}}">
            佣金计划
            <i class="triangle"></i>
          </router-link>
          <router-link :to="{name:'agentarea',params:{'tab':'tab4'}}">
            常见问题
            <i class="triangle"></i>
          </router-link>
          <a href="javascript:void(0);" @click="showRegister">立即加盟</a>
        </div>
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
    },
    showRegister() {
      this.$bus.$emit("showAgentRegister", true);
    }
  },
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.nav_wp {
  .wp {
    position: relative;
    width: 1200px !important;
    min-width: 1200px !important;
    max-width: 1200px !important;
    margin: 0 auto;
    &::before {
      display: table;
      content: "";
    }
    &::after {
      display: table;
      content: "";
    }
    .logo-box {
      width: 274px;
      background-color: #fff;
      position: absolute;
      top: -28px;
      left: 0;
      i {
        font-size: 22px;
        width: 14px;
        height: 58px;
        display: block;
        background: url(./images/arrow.png) no-repeat;
        position: absolute;
        &.i1 {
          background-position: 0 0;
          left: -14px;
        }
        &.i2 {
          background-position: -14px 0;
          right: -14px;
        }
      }
      img {
        margin: 4px;
      }
    }
    .clickable {
      cursor: pointer;
    }
    .logo-ban {
      height: 110px;
      margin-left: 270px;
      background: url("./images/agentban1.jpg");
      img {
        position: absolute;
        top: 7px;
        right: 10px;
      }
    }
    .agent-nav {
      width: 1000px;
      margin: 0 auto 10px;
      height: 28px;
      line-height: 28px;
      position: relative;
      z-index: 1000;
      .agent-tit {
        background-color: #fff;
        float: left;
        h3 {
          width: 264px;
          background-color: #7d6549;
          height: 28px;
          line-height: 28px;
          margin-left: 4px;
          text-indent: 2em;
          color: #fff;
          font-size: 16px;
          font-weight: normal;
          span {
            color: #d1a633;
          }
        }
      }
      .items {
        width: 727px;
        position: relative;
        float: left;
        margin-left: 5px;
        a {
          background: #7d6549;
          position: relative;
          z-index: 2;
          display: block;
          width: 144.4px;
          border-left: 1px solid #fff;
          height: 28px;
          float: left;
          line-height: 28px;
          text-align: center;
          font-size: 20px;
          color: #fff;
          cursor: pointer;
          .triangle {
            display: none;
          }
          &.active,
          &:hover {
            background: #e16d00;
            color: #fff;
            .triangle {
              display: block;
              position: absolute;
              border-width: 7px;
              border-style: solid;
              border-color: transparent transparent #e16d00 transparent;
              bottom: -8px;
              width: 0;
              height: 0;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
}
</style>
