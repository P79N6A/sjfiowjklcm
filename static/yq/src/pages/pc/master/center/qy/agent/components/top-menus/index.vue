<template>
  <!-- <div v-if="isAgent" class="mainDev content">
    <router-link
      class="gameDev"
      v-for="item in gamebox"
      :key="item.name"
      :to="{name: item.routerName}"
    >
      <div class="name">{{item.name}}</div>
      <div class="triangle-right"></div>
    </router-link>
  </div>-->
  <div class="agentMenu" v-if="isAgent">
    <div class="account-box">
      <div class="account-hd">
        <i></i>
        <h3>代理个人资料</h3>
      </div>
      <div class="account-bd">
        <div class="account-bd-box">
          <p>
            欢迎您，
            <span>{{userData.loginname}}</span>!
          </p>
        </div>
      </div>
    </div>
    <div class="ul-menu">
      <router-link
        class="menuItem"
        v-for="item in gamebox"
        :key="item.routerName"
        :to="{name: item.routerName}"
      >
        <i :class="item.ico"></i>
        {{item.name}}
        <b></b>
      </router-link>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchMoney: "",
      showMoney: "刷新余额",
      gamebox: [
        { name: "个人中心", routerName: "agent_datum", ico: "i6" },
        { name: "数据汇总", routerName: "agent_summary", ico: "i5" },
        { name: "会员列表", routerName: "agent_memberlist", ico: "i2" },
        { name: "会员帐务", routerName: "agent_memberbill", ico: "i3" },
        { name: "额度记录", routerName: "agent_creditlog", ico: "i4" },
        { name: "佣金报表", routerName: "agent_ptcommission", ico: "i1" },
        { name: "申请提款", routerName: "agent_drawmoney", ico: "i7" },
        { name: "站内信", routerName: "agent_message", ico: "i8" }
        // {name:'绑定银行卡/折号',routerName:'agent_banks'},
      ]
    };
  },
  props: {},
  methods: {
    ...mapActions(["LOGIN_OUT"])
  },
  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  created() {},
  components: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
.agentMenu {
  width: 212px;
  float: left;
  .account-box {
    width: 100%;
    background-color: #4db7f4;
    padding-bottom: 13px;
    .account-hd {
      height: 40px;
      position: relative;
      i {
        width: 27px;
        height: 32px;
        display: block;
        background: url(../../images/sprite.png) 0 -330px;
        position: absolute;
        top: 5px;
        left: 26px;
      }
      h3 {
        line-height: 40px;
        text-align: center;
        padding-left: 30px;
        font-size: 20px;
        font-weight: 400;
        color: #fff;
      }
    }
    .account-bd {
      margin: 5px;
      border: 1px solid #fff;
      padding: 3px 3px 5px;
      .account-bd-box {
        background-color: #44a7e0;
        position: relative;
        padding: 5px 0 20px;
        p {
          padding: 0 12px;
          line-height: 19px;
          color: #fff;
          font-size: 12px;
          span {
            color: #dfb86a;
          }
        }
      }
    }
  }
  .ul-menu {
    margin-top: 5px;
    .menuItem {
      display: block;
      height: 55px;
      line-height: 55px;
      margin-bottom: 1px;
      background-color: #4db7f4;
      -webkit-transition: all 0.35s ease;
      transition: all 0.35s ease;
      position: relative;
      font-size: 18px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover,
      &.active {
        background-color: #59dbd0;
        b {
          display: block;
          width: 16px;
          height: 55px;
          // background: url(../../images/active.jpg) no-repeat 0 0;
          position: absolute;
          right: -15px;
          top: 0;
        }
      }
      i {
        display: block;
        background: url(../../images/agent-ico.png) no-repeat;
        position: absolute;
        left: 30px;
        top: 10px;
        &.i6 {
          width: 27px;
          height: 28px;
          background-position: 0 -132px;
        }
        &.i5 {
          width: 26px;
          height: 26px;
          background-position: 0 -106px;
          top: 15px;
        }
        &.i2 {
          width: 23px;
          height: 29px;
          background-position: 0 -28px;
        }
        &.i3 {
          width: 26px;
          height: 21px;
          background-position: 0 -57px;
          top: 20px;
        }
        &.i4 {
          width: 30px;
          height: 28px;
          background-position: 0 -78px;
          top: 15px;
        }
        &.i1 {
          width: 23px;
          height: 28px;
          background-position: 0 0;
        }
        &.i7 {
          width: 27px;
          height: 25px;
          background-position: 0 -160px;
        }
        &.i8 {
          width: 25px;
          height: 16px;
          background-position: 0 -186px;
          top: 20px;
        }
      }
      b {
        display: none;
      }
    }
  }
}
</style>
