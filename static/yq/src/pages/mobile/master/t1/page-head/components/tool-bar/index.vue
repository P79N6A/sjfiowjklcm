<template>
  <div>
    <transition name="fade">
      <div class="tool-warp" v-show="myValue" @click.self="myValue=false">
        <transition name="slideLeft">
          <div v-show="myValue" class="tool-bar">
            <div class="tool-close" @click="myValue=false">
              <!-- <div class="iconfont icon-close"></div> -->
            </div>
            <div @click="myValue=false" class="tool-user-info">
              <!-- <div class="account-img">
                <span class="iconfont icon-zhanghu"></span>
              </div> -->
              
              <img src="/static/images/base/logo_H5.png" class="logo" alt="">
              <div class="user-name" v-if="islogin">欢迎您！{{userData.loginname}}</div>
              <div class="user-name" v-else>尊敬的用户，您好！请登录</div>
              <div class="user-level" v-if="isUser">{{userData.level}}</div>
            </div>
            <div @click="myValue=false">
              <router-link :to="{name:'balance'}" class="tool-item-href" v-if="isUser">
                主账户余额:{{wallet.MAIN}}元
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link :to="{name:'agentcenter'}" class="tool-item-href" v-if="isAgent">
                老虎机佣金:{{wallet.SLOT}}元
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <div class="tool-item-href" v-if="isUser">副账户余额:{{wallet.DEPUTY}}元</div>

              <router-link class="tool-item-href" :to="{name:'guide'}">
                <i class="guide"></i>新手指南
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'login'}" v-if="!islogin">
                <i class="nav-sprite login"></i>登录
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'agentcenter'}" v-if="isAgent">
                <i class="nav-sprite account"></i> 代理中心
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'usercenter'}" v-if="isUser">
                <i class="nav-sprite account"></i> 会员中心
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'register'}" v-if="!islogin">
                <i class="nav-sprite register"></i>注册
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'license'}" v-if="!islogin">
                <i class="nav-sprite license"></i>牌照展示
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'notice'}">
                <i class="nav-sprite notice"></i>奇幻城公告
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'service'}" v-if="islogin">
                <i class="nav-sprite unlock"></i>服务中心
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'hijacking'}">
                <i class="nav-sprite hijackingicon"></i>域名防劫持帮助
                <i class="iconfont icon--youjiantou"></i>
              </router-link>

              <router-link class="tool-item-href" :to="{name:'personalList'}" v-if="islogin">
                <i class="nav-sprite setting"></i> 账户设置
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <router-link class="tool-item-href" :to="{name:'message'}" v-if="islogin">
                <i class="nav-sprite mail"></i> 站内信
                <span class="unread" v-if="unread">{{unread}}</span>
                <i class="iconfont icon--youjiantou"></i>
              </router-link>
              <div v-if="islogin" class="tool-item-href" @click="$store.dispatch('LOGIN_OUT')">
                <i class="nav-sprite logout"></i> 退出
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>
<script>
import { SETTING, Download } from "@/assets/data";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      SETTING,
      Download,
      myValue: false,
      showWindow: false
    };
  },
  props: ["value"],
  computed: {
    ...mapGetters([
      "userData",
      "islogin",
      "isUser",
      "isAgent",
      "unread",
      "wallet"
    ])
  },
  methods: {
    closeBox() {
      this.showWindow = false;
    }
  },
  created() {
    //   监听setToolBar控制事件
    //   this.$bus.$on('setToolBar',eventData=>{
    //     this.myValue=eventData
    //   })
  },
  watch: {
    value(val) {
      this.myValue = val;
    },
    myValue(val) {
      this.$emit("input", val);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.tool-warp {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  .tool-bar {
    @include f(30px);
    transition: transform 0.5s;
    top: 0;
    left: 0;
    text-align: left;
    height: 100%;
    width: 80%;
    background: url("./images/comm-bg.jpg") no-repeat top/100%;
    // padding-top:r(20);
    overflow-y: scroll;
    &.active {
      display: block;
      transform: translateX(0);
    }
    .unread {
      margin-left: r(20);
      background: #ff7e28;
      border-radius: 20em;
      display: inline-block;
      padding: r(6);
      line-height: 1;
      color: #ffffff;
    }
    .tool-close {
      height: r(80);
      line-height: r(80);
      text-align: right;
      .iconay {
        @include f(72px);
        margin-right: r(32);
      }
      .icon-close {
        font-size: 36px;
        margin-right: 18px;
      }
    }
    .tool-user-info {
      text-align: center;
      margin-bottom: r(40);
      color: #fff;
      .user-level {
        height: r(40);
        line-height: r(40);
      }
      .user-name {
        display: inline-block;
        // width: 173px;
        height: 35px;
        line-height: 35px;
        color: #fff;
        border-radius: 5px;
      }
    }
    .account-img {
      border: solid r(7) #fff;
      border-radius: 100px;
      width: r(150);
      margin: 0 auto;
      background: #1dc4ec;
      height: r(150);
      text-align: center;
      line-height: r(140);
      .iconfont {
        @include f(100px);
      }
    }
    .tool-item-href {
      padding: r(20) 0 r(20) r(30);
      line-height: 1.5;
      color: #fff;
      position: relative;
      @include f(30px);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      &:nth-last-of-type() {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
      .guide{
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(./images/guide.png) no-repeat top center;
        background-size: 100%;
        margin-right: r(20);
      }
      .nav-sprite {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: url(./images/nav-sprite8.png) no-repeat top left;
        margin-right: r(20);
        &.login,
        &.account {
          background-position: 0 0;
        }
        &.register {
          background-position: 0 -133px;
        }
        &.notice {
          background-position: 0 -38px;
        }
        &.unlock {
          background-position: 0 -173px;
        }
        &.setting {
          background-position: 0 -115px;
        }
        &.mail {
          background-position: 0 -77px;
        }
        &.logout {
          background-position: 0 -95px;
        }
        &.license {
          background-position: 0 -57px;
        }
        &.hijackingicon {
          background-position: 0 -154px;
        }
      }
      .iconfont {
        position: absolute;
        right: r(30);
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .contack_btn {
      display: flex;
      justify-content: space-between;
      padding: 0 r(40);
      margin-top: r(20);
      a {
        display: block;
        border: 1px solid #996b3d;
        border-radius: 5px;
        text-align: center;
        height: 35px;
        line-height: 35px;
        width: 100px;
        color: #cca352;
      }
    }

    .tool-user-info-login {
      display: block;
      padding-left: r(40);
      .account-info-login {
        display: inline-block;
        color: #ffffff;
        padding-top: r(40);
        padding-left: r(20);
        p {
          line-height: 2;
        }
        .info-money {
          color: #cca352;
        }
      }
      .ay-xiangyou {
        color: #cca352;
        font-weight: bolder;
        margin-top: r(50);
        margin-right: r(30);
      }
    }
    .money-item {
      display: flex;
      justify-content: space-between;
      padding: r(40) r(40) 0;
      border-top: 1px solid #3a342e;
      margin: r(20) 0 r(40) 0;

      a {
        display: block;
        background-color: #2c2e36;
        border-radius: 5px;
        padding: r(10) r(30);
        color: #cca352;
        line-height: 2;
        img {
          width: r(60);
          margin-right: r(10);
        }
      }
    }
  }
}
</style>
