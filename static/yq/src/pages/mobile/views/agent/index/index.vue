<template>
  <div class="agent_center_content">
    <div class="agent-top">
      <headern-nobackground>代理中心</headern-nobackground>
      <account-top :slotAccount="slotAccount">头部内容</account-top>
    </div>
   

    <col-list :data="colData">
      <!-- 汇总 -->
    </col-list>

    <table-list :data="tableListData">
      <!-- 报表 -->
    </table-list>

    <row-list :data="rowdata">
      <!-- 菜单 -->
    </row-list>
    <!-- <div class="btn_wrap" style="margin-top: 1em">
      <a @click="$store.dispatch('LOGIN_OUT')" href="javascript:;" class="btn btn01">退出</a>
    </div> -->
  </div>
</template>
<script>
  import headernNobackground from "mobile/components/head-nobackground";
  import {agentReport} from '@/api/agent';
  import {mapGetters} from 'vuex'
  import accountTop from "./components/account-top"
  import colList from "./components/col-list"
  import rowList from "./components/row-list"
  import tableList from "./components/table-list"
  import formTip from "./components/form-tip"

  export default {
    data() {
      return {
        slotAccount: 0,
        rowdata: [
          {name: '额度记录', ico:"iconList4", to: {name: "agent_creditlog"}},
          {name: '站内消息', ico:"iconList5", to: {name: "message"}},
          {name: '代理提款', ico:"iconList6", to: {name: "money_drawmoney"}},
          {name: '账户设置', ico:"iconList7", to: {name: "personalList"}},
        ],
        colData: [
          {name: "本月总输赢", view: 0, ico:"iconImg1"},
          {name: "本月总返水", view: 0, ico:"iconImg2"},
          {name: "本月总优惠", view: 0, ico:"iconImg3"},
          {name: "会员总人数", view: 0, ico:"iconImg4"},
          {name: "本月注册量", view: 0, ico:"iconImg5"},
          {name: "本月投注额", view: 0, ico:"iconImg6"}
        ],
        tableListData :[
          {name: '佣金报表', ico:"iconList1", to: {name: "agent_ptcommission"}},
          {name: '会员报表', ico:"iconList2", to: {name: "agent_memberlist"}},
          {name: '账务报表', ico:"iconList3", to: {name: "agent_memberbill"}},
        ]
      }
    },
    created() {
      agentReport().then((res) => {
        this.colData[0].view = res.data.profitall || 0;
        this.colData[1].view = res.data.ximafee || 0;
        this.colData[2].view = res.data.couponfee || 0;
        this.colData[3].view = res.data.reg || 0;
        this.colData[4].view = res.data.monthly_reg || 0;
        this.colData[5].view = res.data.betall || 0;
      }).catch((err) => {
        window.toast("流水查询失败");
      });
    },
    computed: {
      ...mapGetters(["userData"])
    },
    components: {
      tableList,
      rowList,
      colList,
      accountTop,
      formTip,
      headernNobackground
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .agent_center_content{
    padding-bottom: r(20);
    background: $body-bg;
    .agent-top {
      background: url(./images/bg.png) no-repeat center center/100% 100% ;
      min-height: r(593);
    }
  }
  .btn_wrap {
    padding-left: r(35);
    padding-right: r(35);
    margin-bottom: r(12);
    text-align: center;
    .btn01, .btn02 {
      display: inline-block;
      width: 90%;
      height: r(30*2);
      line-height: r(30*2);
      @include f(30px);
      color: #fff;
      border-radius: 100px;
      font-weight: 700;
      background: $cl1;
      border: none;
    }
  }
</style>
