<template>
  <div class="mfbpay">
    <div v-if="active==0">
      <div class="inputs" v-show="payItem.payBy=='mfb2wy'">
        <p class="title">存款姓名</p>
        <input type="text" v-model="submitData.accountName" placeholder="请输入存款人姓名">
      </div>
      <div class="inputs">
        <p class="title">存款金额</p>
        <input type="text" v-model="submitData.amount" :placeholder="placeholder">
      </div>
      <div
        v-if="payItem.customParams&&payItem.customParams.enterMode=='FIXED_AMOUNT'"
        class="select_amount inputs"
      >
        <p class="title">充值金额</p>
        <span
          @click="submitData.amount=item"
          v-for="(item,key,i) in payItem.customParams.defaultAmounts"
          class="dep_item"
          :key="i"
          :class="{active:submitData.amount==item}"
          v-if="item>=payItem.lowerlimit && item<=payItem.upperlimit"
        >{{item}}</span>
      </div>
      <div v-else class="select_amount inputs">
        <p class="title">充值金额</p>
        <span
          @click="submitData.amount=item"
          v-for="(item,key,i) in moneys"
          class="dep_item"
          :key="i"
          :class="{active:submitData.amount==item}"
          v-if="item>=payItem.lowerlimit && item<=payItem.upperlimit"
        >{{item}}</span>
      </div>
      <div class="btn_wrap j-btn" @click="depositPost">提交</div>
    </div>
    <div v-if="active==1">
      <div class="mfb_wx_tips inputbox">
        <p class="m_w_t_title">
          请您在
          <span class="m_w_t_money">
            <span class="m_w_t_time">{{help_time.min}}</span>：
            <span class="m_w_t_time">{{help_time.sec}}</span>
          </span>时间内按下【确认】
        </p>
        <p>
          确认金额：
          <span class="m_w_t_money">{{submitData.amount}}元</span>
        </p>
        <p class="m_w_t_tips">
          温馨提示:按下【确认】，方可产生订单
          <br>否则无法自动到账
        </p>
      </div>

      <div class="agrees">
        <p class="mfb_wx_tips_agree">
          <label>
            <input type="checkbox" id="mc_wx_2" v-model="agree_1"> 本人已同意，如未转账
            <span class="red">{{submitData.amount}}</span>元，导致系统无法匹配存款，本网站概不负责。
          </label>
        </p>
      </div>
      <div class="btn_wrap j-btn" @click="wxSecCheck">确认</div>
      <div class="btn_wrap j-btn" @click="active=0">返回</div>
    </div>
    <div v-if="active==2" class="mfb-order">
      <div class="form_field_warp">
        <h3 class="order-title mb20">我们的收款账户</h3>
        <input-inline label="收款银行：">
          <input type="text" :value="orderData.bank" readonly="readonly">
          <strong
            slot="right"
            class="btn-copy"
            v-clipboard:copy="orderData.bank"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
        <input-inline label="开户地址：" v-if="orderData.accountOpenAddr">
          <input type="text" :value="orderData.accountOpenAddr" readonly="readonly">
          <strong
            slot="right"
            class="btn-copy"
            v-clipboard:copy="orderData.accountOpenAddr"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
        <input-inline label="收款人姓名：">
          <input type="text" :value="orderData.accountname" readonly="readonly">
          <strong
            slot="right"
            class="btn-copy"
            v-clipboard:copy="orderData.accountname"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
        <input-inline label="收款账号：">
          <input type="text" :value="orderData.bankno" readonly="readonly">
          <strong slot="right" v-clipboard:copy="orderData.bankno" v-clipboard:success="onCopy">复制</strong>
        </input-inline>
      </div>
      <div class="form_field_warp">
        <h3 class="order-title mb20">您的存款信息</h3>
        <input-inline label="存款姓名：" v-show="orderData.payBy=='mfb2wy'">
          <div class="input">{{orderData.uaccountnameByUser}}</div>
          <strong
            slot="right"
            v-clipboard:copy="orderData.uaccountnameByUser"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
        <input-inline label="存款金额：">
          <div class="input">{{orderData.amountOrder}}</div>
          <strong
            slot="right"
            class="btn-copy"
            v-clipboard:copy="orderData.amountOrder"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
        <input-inline label="存款方式：">
          <div class="input">{{orderData.transTypeName}}</div>
        </input-inline>
        <input-inline label="订单号：">
          <div class="input">{{orderData.billno}}</div>
          <strong
            slot="right"
            class="btn-copy"
            v-clipboard:copy="orderData.billno"
            v-clipboard:success="onCopy"
          >复制</strong>
        </input-inline>
      </div>
      <div class="btn_wrap j-btn" @click="active=0">我已成功付款</div>
    </div>
  </div>
</template>
<script>
import { createCustomizeDepositTly } from "@/api/payment";
// import formTip from "~mobile/src/components/form-tip"

export default {
  data() {
    return {
      active: 0,
      moneys: [10, 50, 100, 200, 500, 1000, 2000, 3000, 5000, 10000, 20000],
      submitData: {
        accountName: "",
        payBy: "",
        amount: "",
        discard: false
      },
      help_time: {
        Interval: null,
        init: 0, //分钟整数，接口获取
        min: 0, //显示的分钟
        sec: "00" //显示的秒
      },
      agree_1: true,
      orderData: {},
      type: null
    };
  },
  methods: {
    onCopy() {
      window.toast("复制成功");
    },
    // 检查
    depositCheck() {
      // 需要添加数字为整数
      if (!this.submitData.payBy) {
        window.toast("请选择存款方式");
        return false;
      } else if (
        (this.submitData.payBy == "bank_phone" ||
          this.submitData.payBy == "bank_web" ||
          this.submitData.payBy == "mfb2wy") &&
        !this.submitData.accountName
      ) {
        window.toast("请输入存款人姓名");
        return false;
      } else if (!this.submitData.amount) {
        window.toast("请输入存款金额");
        return false;
      } else {
        return true;
      }
    },
    // 如果已存在订单
    showExist() {
      $confirm(
        "<p>1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单 <br> 2. 如果未支付，请您先支付该笔订单或者选择废弃该订单</p>",
        "提示：您存在未处理的订单",
        {
          confirmText: "废弃并生成新订单",
          cancelText: "查看订单"
        }
      ).then(
        () => {
          // 确认，废弃并生成新订单
          this.mfbSubmit(this.submitData, true);
        },
        () => {
          // 取消，查看订单
          this.active = 2;
        }
      );
    },
    // 确认按钮
    depositPost() {
      this.submitData.payBy = this.payItem.payBy;
      // 赋值当前支付的id
      if (this.depositCheck()) {
        this.mfbSubmit(this.submitData);
      }
    },
    //提交订单
    mfbSubmit(data, discard) {
      if (discard) {
        data.discard = true;
      } else {
        data.discard = false;
      }
      createCustomizeDepositTly(data).then(res => {
        if (res.success) {
          let type = res.data.type;
          this.orderData = res.data;
          if ("UNPAID_ORDER" == type) {
            // 到第二步
            this.showExist();
          } else if ("NEW_ORDER" == type && this.submitData.payBy != "mfb2wy") {
            // 是否是秒付宝的支付宝和微信（网银没有金额显示）
            // 到第三步
            this.active = 1;
            this.submitData.amount = res.data.amountOrder;
            this.timer(res.data.activeTimeMinutes);
          } else if ("NEW_ORDER" == type && this.submitData.payBy == "mfb2wy") {
            // 到第三步
            this.active = 2;
          } else if ("BANKCARD_NOTAVAILABLE" == type) {
            $alert("通道维护中，请选择其他存款方式");
          } else if ("OTHER" == type) {
            $alert(res.data.otherMsg);
          }
        } else {
          $alert(res.message);
        }
      });
    },
    // 计时器
    timer(min) {
      this.help_time.init = min;
      this.help_time.min = min;
      this.help_time.sec = 0;
      window.clearInterval(this.help_time.Interval);
      this.help_time.Interval = window.setInterval(() => {
        if (this.help_time.min == 0 && this.help_time.sec == 0) {
          // 倒计时结束，返回第一个tab
          window.clearInterval(this.help_time.Interval);
          this.active = 0;
        } else {
          if (this.help_time.sec > 0) {
            this.help_time.sec--;
          } else if (this.help_time.sec <= 0) {
            this.help_time.min--;
            this.help_time.sec = 59;
          }
          this.help_time.sec < 10
            ? (this.help_time.sec = "0" + parseInt(this.help_time.sec))
            : this.help_time.sec;
          this.help_time.min < 10
            ? (this.help_time.min = "0" + parseInt(this.help_time.min))
            : this.help_time.min;
        }
      }, 1000);
    },
    // 秒付宝协议确认
    wxSecCheck() {
      if (this.agree_1) {
        this.active = 2;
      } else {
        window.toast("请同意协议");
      }
    }
  },
  props: {
    payItem: {
      type: Object
    }
  },
  watch: {
    active(val) {
      if (val != 1) {
        window.clearInterval(this.help_time.Interval);
        this.submitData.amount = "";
      }
    },
    "submitData.accountName"(val) {
      this.submitData.accountName = val.replace(/[^\u4E00-\u9FA5]/g, "");
    }
  },
  computed: {
    placeholder() {
      if (this.payItem && this.payItem.lowerlimit) {
        return (
          "最少" +
          this.payItem.lowerlimit +
          "元，最多" +
          this.payItem.upperlimit +
          "元"
        );
      } else {
        return "请输入存款金额";
      }
    }
  },
  components: {
    // tipsMcpay
    // formTip
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.mfbpay {
  width: 94%;
  margin: 0 auto;

  .mc-title {
    background: rgb(255, 236, 183);
    /* Old browsers */
    background: -moz-linear-gradient(
      top,
      rgba(255, 236, 183, 1) 0%,
      rgba(255, 209, 120, 1) 100%
    );
    /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(255, 236, 183, 1) 0%,
      rgba(255, 209, 120, 1) 100%
    );
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(255, 236, 183, 1) 0%,
      rgba(255, 209, 120, 1) 100%
    );
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffecb7', endColorstr='#ffd178', GradientType=0);
    /* IE6-9 */
    text-align: center;
    font-size: 16px;
    line-height: 3;
    margin: 30px 0;
  }

  .mfb_wx_tips {
    color: #e7091a;
    text-align: left;
    line-height: 1.5;
    padding: 0 r(40);
    @include f(30px);

    .m_w_t_money {
      @include f(40px);
      font-weight: bold;
    }
  }

  .mfb_wx_tips_agree {
    color: #343434;
  }

  .agrees {
    line-height: 2.5;
    margin-top: r(30);
    padding: 0 r(40);
    color: #fff;

    input {
      background: #fff;
      width: r(40);
      height: r(40);
    }
  }

  .red {
    color: #e7091a;
    font-weight: bold;
  }

  .mfb-order {
    position: fixed;
    padding: r(100) r(10) r(100);
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 9;
    min-height: 100vh;

    .order-title {
      margin: r(30) 0;
      text-align: center;
    }
  }

  .select_amount {
    margin: r(20) 0;

    .dep_item {
      display: inline-block;
      border: solid 1px #efefef;
      border-radius: 5px;
      background: #f8f8f8;
      min-width: r(150);
      text-align: center;
      height: r(80);
      line-height: r(80);
      margin: 0 10px 4px 0;
      padding: 0 r(10);
      margin-bottom: r(10);
      cursor: pointer;
      position: relative;
      @include f(24px);
      border: solid 2px transparent;

      &:hover,
      &.active {
        border: solid 2px #4db7f4;
      }

      .dep_selected {
        line-height: 1;
        position: absolute;
        color: #4db7f4;
        top: -6px;
        right: -8px;
        @include f(24px);
      }
    }
  }

  .inputs {
    margin-bottom: r(20);

    .title {
      @include f(30px);
      line-height: 2;
      color: #333;
    }

    input,
    select {
      display: block;
      width: 100%;
      height: r(80);
      line-height: r(80);
      border: none;
      background: #fff;
      border: 1px solid #d3d3d3;
      border-radius: r(6);
      padding-left: r(30);
    }
  }

  .btn_wrap {
    display: block;
    width: 100%;
    height: r(80);
    margin-bottom: r(20);
    line-height: r(80);
    text-align: center;
    background: #4db7f4;
    border-radius: r(6);
    color: #fff;
    @include f(30px);
    box-sizing: border-box;

    &.active {
      background: #4db7f4;
    }
  }
}
</style>
