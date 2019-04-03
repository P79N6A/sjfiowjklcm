<template>
  <div class="agent-summary">
    <div class="box-border mb20">
      <h2 class="category-tit">
        <i class="icon-rmb-2"></i>
        汇总
      </h2>
      <table class="table1">
        <thead>
          <tr>
            <th>本月总输赢（元）</th>
            <th>本月总返水（元）</th>
            <th>本月总优惠（元）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="num c-red">{{summary.profitall}}</td>
            <td class="num c-cyan">{{summary.ximafee}}</td>
            <td class="num c-blue">{{summary.couponfee}}</td>
          </tr>
        </tbody>
      </table>
      <table class="table1">
        <thead>
          <tr>
            <th>会员总人数</th>
            <th>本月注册量</th>
            <th>本月投注额</th>
            <!-- <th>本日注册量</th> -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="num c-red">{{summary.reg}}</td>
            <td class="num c-cyan">{{summary.monthly_reg}}</td>
            <td class="num c-blue">{{summary.betall}}</td>
            <!-- <td class="num">{{summary.daily_reg}}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
    <div class="reg-tip">
      <div class="icon-tip">
        <span>温馨
          <br>提示
        </span>
      </div>
      <div class="tishi-tip">
        <p>1.当月汇总时间段是按照代理下线会员上月最后一天到当月倒数第二天，比如8月份的数据时间段为7月31日00:00—8月30日23:59。</p>
        <p>2.每天下午日结佣金结束之后数据会更新。</p>
        <p>3.数据可能会出现延迟，如果出现误差，请联系市场专员，以正式后台为准。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { summary } from "@/controls/agent/summary";
import { mapGetters, mapActions } from "vuex";

export default {
  mixins: [summary],
  data() {
    return {};
  },
  created() {
    this.getSummary()
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    ...mapGetters(["userData", "isAgent", "unread"])
  },
  methods: {},
  components: {}
};
</script>
<style lang="scss" scoped>
.agent-summary {
  transition: 0.3s left, 0.6s opacity ease-out;

  .ol-account {
    width: 94%;
    margin: 30px 0 0 30px;
    overflow: hidden;

    li {
      float: left;
      margin: 20px 0 0 10px;

      span {
        color: #cc0000;
        font-weight: 600;
      }
    }
  }

  .box-border {
    .category-tit {
      height: 70px;
      margin: 20px 0;
      font-size: 18px;
      line-height: 70px;
      padding-left: 28px;

      .icon-rmb-2 {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
        background: url(./images/count.jpg) no-repeat center center;
      }
    }

    .table1 {
      border-collapse: collapse;
      border-spacing: 0;
      line-height: 25px;
      border: 1px solid #fff;
      width: 94%;
      margin: 0 0 0 30px;
      overflow: hidden;
      background: #ddd;
      text-align: center;

      th {
        padding: 6px;
        border: 1px solid #fff;
        background-color: #4db7f4;
        color: #fff;
      }

      td {
        padding: 6px;
        border: 1px solid #fff;
      }

      .num {
        padding: 50px 0;
        font-size: 30px;
      }
      .c-red {
        color: red !important;
      }
      .c-cyan {
        color: #5bd644 !important;
      }

      .c-blue {
        color: #71a0f2 !important;
      }

      .collect {
        padding: 20px 0 24px;
        overflow: hidden;
      }

      [class*="col-"] {
        padding-right: 0px;
        padding-left: 0px;
        display: inline-block;
      }

      .col-md-3 {
        width: 25%;
        float: left;
      }
    }
  }

  .reg-tip {
    clear: both;
    position: relative;
    color: #8f816a;
    padding: 8px 0 8px 62px;
    font-size: 14px;
    margin: 20px;

    .icon-tip {
      position: absolute;
      left: 8px;
      top: 8px;
      border: 4px solid #4db7f4;

      span {
        display: block;
        width: 44px;
        height: 46px;
        text-align: center;
        border: 1px solid #fff;
        background: #4db7f4;
        color: #fff;
        padding-top: 8px;
        line-height: 1.2;
      }
    }

    .tishi-tip {
      border: 1px solid #4db7f4;
      padding: 8px;
      line-height: 27px;
      overflow: hidden;
      margin-right: 10px;

      p {
        line-height: 1.6;
      }
    }
  }
}
</style>
