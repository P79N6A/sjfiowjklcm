<template>
  <div class="login_after clear" v-if="isUser">
    <div class="part1 li">
      <span>欢迎您！</span>
      <!-- <i class="vip-sprite"></i> -->
      <img class="vipImg" v-lazy="userData.avator">
      <span>{{userData.level}}</span>
      <span>{{userData.loginname}}</span>
    </div>
    <div id="j-balance" class="part2 c-dropdown li">
      <i class="iconfont icon-xiajiantou"></i>
      <label id="deader_credit" v-show="cur == 'MAIN'">
        <label>主账户：</label>
        {{wallet['MAIN']}}
      </label>
      <label id="header_friendPoint2" v-show="cur == 'DEPUTY'">
        <label>副账户：</label>
        {{wallet['DEPUTY']}}
      </label>
      <div class="login-dropdown" style="margin-top:-2px;">
        <ul>
          <li @click="cur = 'MAIN'">主账户</li>
          <li @click="cur = 'DEPUTY'">副账户</li>
        </ul>
      </div>
    </div>
    <div class="part3 li">
      <a href="javascript:void(0);" class="btn_onekeytranfer" @click="transferAll">资金一键归回主账户</a>
    </div>
    <div class="part5 li c-dropdown">
      <i class="iconfont icon-huiyuanzhongxin"></i>
      <router-link :to="{name:'deposit'}">会员中心</router-link>
      <i class="iconfont icon-xiajiantou"></i>
      <div class="login-dropdown">
        <ul class="js-quick-enter">
            <router-link tag="li" :to="{name:'deposit'}">存款</router-link>
            <router-link tag="li" :to="{name:'drawmoney'}">提款</router-link>
            <router-link tag="li" :to="{name:'transfer'}">转账</router-link>
        </ul>
      </div>
    </div>
    <div class="part5 li">
      <i class="iconfont icon-xiaoxi"></i>
      <router-link :to="{name:'message'}" class="js-quick-email">(
        <span class="js-email-count">{{unread}}</span>)未读
      </router-link>
    </div>
    <!-- <div class="part3 part6 li">
      <a href="/static/page/newTutorial/index.html" class="btn_onekeytranfer">新手指南</a>
    </div> -->
    <div class="last_item li">
      <a
        href="javascript:void(0);"
        id="logoutBtn"
        class="btn_logout"
        @click="$store.dispatch('LOGIN_OUT')"
      >登出</a>
    </div>
  </div>
  <div class="login_after clear" v-else-if="isAgent">
    <div class="part1 li">
      <span>欢迎您！</span>
      <span>代理用户</span>
      <span>{{userData.loginname}}</span>
    </div>
    <div id="j-balance" class="part2 c-dropdown li">
      <label id="deader_credit">
        <label>老虎机账户结余：</label>
        {{wallet['SLOT']}}元
      </label>
    </div>
    <div id="j-balance" class="part2 c-dropdown li">
      <label id="deader_credit">
        <label>其他账户结余：</label>
        {{wallet['LIVE']}}元
      </label>
    </div>
    <div class="part5 li c-dropdown">
      <i class="iconfont icon-huiyuanzhongxin"></i>
      <router-link :to="{name:'agent_summary'}">账户管理</router-link>
    </div>
    <div class="part5 li">
      <i class="iconfont icon-xiaoxi"></i>
      <router-link :to="{name:'agent_message'}" class="js-quick-email">(
        <span class="js-email-count">{{unread}}</span>)未读
      </router-link>
    </div>
    <div class="last_item li">
      <a
        href="javascript:void(0);"
        id="logoutBtn"
        class="btn_logout"
        @click="$store.dispatch('LOGIN_OUT')"
      >登出</a>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getGameMoney, doSignRecord } from "@/api/user";
import { updateGameMoney } from "@/api/payment";
import process from "pc/components/transfer-process";
export default {
  data() {
    return {
      actived: false,
      cur: "MAIN"
    };
  },
  computed: {
    ...mapGetters([
      "userData",
      "isUser",
      "isAgent",
      "unread",
      "money",
      "wallet"
    ])
  },
  components: {
    process
  },
  methods: {
    ...mapActions(["LOGIN_OUT", "UPDATE_MONEY"]),
    doSignRecord() {
      doSignRecord().then(res => {
        toast(res.message);
      });
    },
    getGameMoney(val) {
      // this.userData.accountMoney = "正在查询.."
      this.actived = !this.actived;
      this.UPDATE_MONEY(val)
        .then(res => {
          this.actived = !this.actived;
        })
        .catch(err => {
          window.toast(err.message);
        });
      // getGameMoney({
      //   gameCode: val
      // }).then(res => {
      //   if (res.success) {
      //     this.userData.accountMoney = res.data;
      //   } else {
      //     toast(res.message)
      //     this.userData.accountMoney = '查询失败'
      //   }
      // })
    },
    signIt() {
      doSignRecord().then(res => {
        toast(res.message);
      });
    },
    transferAll() {
      window.$confirm(
          '<p style="text-align:left;">1.游戏平台余额只会回收整数部分。<br/>2.领取优惠但未完成流水的游戏余额不会被归集。<br/>3.资金归集可能需要较长时间，请耐心等待。</p>',
          "温馨提示",
          {
            confirmText: "确认",
            cancelText: "取消"
          }
        ).then(() => {
            // 确认，发出归集请求
            window.setTimeout(() => {
              const postData = {
                transferGameOut: "ALL_V2",
                transferGameIn: "MAIN",
                transferGameMoney: 0
              };
              // 查看进度按钮
              updateGameMoney(postData).then(res => {
                if (res.success) {
                  this.$bus.$emit("showTransferProce", true);
                  window.toast(res.message);
                } else {
                  window.toast(res.message);
                }
              }).catch(err => {
                window.toast(err.message);
              });
            }, 300);
          },
          () => {
            // 取消，查看订单
          }
        );
    }
  }
};
</script>
<style lang="scss" scoped>
.login_after {
  float: right;
  font-size: 13px;
  .li {
    height: 50px;
    margin-right: 10px;
    float: left;
    line-height: 50px;
    color: #fff;
    label {
      color: #fff;
      font-size: 13px;
    }
    a {
      color: #fff;
    }
  }
  &.tools {
    float: left;
  }

  .part5 {
    display: flex;
    align-items: center;
  }

  .part5 i {
    font-size: 22px;
  }

  .part3 {
    width: 125px;
    position: relative;
  }
  .part6 {
    width: 70px!important;
  }
  &.tools i,
  .part5 i {
    margin-right: 5px;
  }

  li {
    height: 50px;
    margin-right: 10px;
    float: left;
    line-height: 50px;
    color: #fff;

    a {
      color: #fff;
    }

    i {
      vertical-align: sub;
    }
  }

  .part3 a {
    height: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    line-height: 30px;
    color: #fff;
  }

  .btn_onekeytranfer {
      background: rgb(89,219,208); /* Old browsers */
      background: -moz-linear-gradient(top, rgba(89,219,208,1) 0%, rgba(77,183,244,1) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top, rgba(89,219,208,1) 0%,rgba(77,183,244,1) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom, rgba(89,219,208,1) 0%,rgba(77,183,244,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */

    text-align: center;
  }

  .btn_desk {
    background: #4db7f4;
  }

  .last_item {
    width: 60px;
    margin-right: 0;
    position: relative;
  }

  .btn_logout {
    width: 60px;
    height: 30px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    line-height: 30px;
    color: #fff;
    background: rgba(77,183,244,1); /* Old browsers */
    background: -moz-linear-gradient(top, rgba(77,183,244,1) 0%, rgba(89,219,208,1) 100%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, rgba(77,183,244,1) 0%,rgba(89,219,208,1) 100%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, rgba(77,183,244,1) 0%,rgba(89,219,208,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4db7f4', endColorstr='#59dbd0',GradientType=0 ); /* IE6-9 */

    cursor: pointer;
    text-align: center;
  }
  .vipImg {
    height: 40px;
  }

  .vip-sprite {
    position: relative;
    top: 10px;
    left: 0;
    display: inline-block;
    width: 38px;
    height: 30px;
    background: url(../images/vip-sprites.png) no-repeat;

    &.vip-0 {
      background-position: 5px -193px;
    }

    &.vip-1 {
      background-position: 5px 0;
    }

    &.vip-2 {
      background-position: 5px -31px;
    }

    &.vip-3 {
      background-position: 5px -95px;
    }

    &.vip-4 {
      background-position: 5px -63px;
    }

    &.vip-5 {
      background-position: 5px -126px;
    }

    &.vip-6 {
      background-position: 1px -157px;
    }
  }
}

.clear {
  zoom: 1;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
.c-dropdown {
  cursor: pointer;
  &:hover {
    .login-dropdown {
      display: block;
    }
  }
}
.login-dropdown {
  display: none;
  position: absolute;
  z-index: 9999;
  background: #1d1d1d;
  top: 50px;
  ul {
    li {
      display: block;
      width: 100%;
      text-align: center;
      height: 34px;
      line-height: 34px;
      cursor: pointer;
    }
  }
}
</style>
