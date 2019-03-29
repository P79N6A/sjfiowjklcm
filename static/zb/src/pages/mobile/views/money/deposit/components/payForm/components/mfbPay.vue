<template>
  <div class="mfbpay">
    <div v-if="active==0">
      <div v-show="payItem.payBy=='mfb2wy'">
        <div class="text-title">输入存款姓名</div>
        <div class="item-input1">
          <span class="item-inputTitle1">姓名：</span>
          <input
            type="text"
            class="input1 inputRightPHD"
            placeholder="请输入存款人姓名"
            v-model="submitData.accountName"
          >
        </div>
      </div>
      <div class="text-title">输入存款金额</div>
      <div class="item-input">
        <span class="item-inputTitle">存款金额(元)：</span>
        <div class="inputDiv">
          <input
            type="text"
            class="input inputPHD"
            :placeholder="placeholder"
            v-model="submitData.amount"
          >
          <span class="cny">￥</span>
        </div>
      </div>
      <div class="submitBox">
        <div class="depositMoney">
          <span>到账金额(元):</span>
          <br>
          <span class="orderMoney">{{submitData.amount || 0}}</span>
        </div>
        <div class="submitBtn" @click="depositPost">提交存款</div>
      </div>
    </div>

    <div v-if="active==1">
      <div class="mfb-order">
        <div class="mfb-order-box">
          <img class="orderImg" src="./images/pic_top@2x.png" alt>
          <div class="form_field_warp">
            <div class="order-text">您需要存入金额(元)</div>
            <div class="order-text-money">{{submitData.amount}}</div>
          </div>
          <div class="form_field_warp1">
            <div class="order-tips-box">
              <input type="checkbox" class="mfb_wx_2" v-model="agree_1">
              <span>本人已同意，如未转账{{submitData.amount}}元，导致系统无法匹配存款，本网站概不负责。</span>
            </div>
          </div>
          <p class="order-t-tips">
            温馨提示：按下【确认】，方可产生订单，否则无法自动到账。本订单有效时间
            <span class="m_w_t_time">{{help_time.min}}</span>:
            <span class="m_w_t_time">{{help_time.sec}}</span>
          </p>
        </div>
      </div>
      <div class="submitBox">
        <div class="depositMoney">
          <span>到账金额(元):</span>
          <br>
          <span class="orderMoney">{{submitData.amount || 0}}</span>
        </div>
        <div class="submitBtn" @click="wxSecCheck">确定</div>
      </div>
    </div>

    <div v-if="active==2" class="mfb-order">
      <div class="mfb-order-box">
        <img class="orderImg" src="./images/pic_top@2x.png" alt>
        <div class="form_field_warp">
          <div class="item-select">
            <span class="item-select1">银行类别：</span>
            <span class="item-select2">{{orderData.bank}}</span>
            <span
              class="item-select3"
              v-clipboard:copy="orderData.bank"
              v-clipboard:success="onCopy"
            >复制</span>
          </div>
          <div class="item-select" v-if="orderData.accountOpenAddr">
            <span class="item-select1">开户地址：</span>
            <span class="item-select2">{{orderData.accountOpenAddr}}</span>
            <span
              class="item-select3"
              v-clipboard:copy="orderData.accountOpenAddr"
              v-clipboard:success="onCopy"
            >复制</span>
          </div>
          <div class="item-select">
            <span class="item-select1">开户人：</span>
            <span class="item-select2">{{orderData.accountname}}</span>
            <span
              class="item-select3"
              v-clipboard:copy="orderData.accountname"
              v-clipboard:success="onCopy"
            >复制</span>
          </div>
          <div class="item-select">
            <span class="item-select1">银行卡号：</span>
            <span class="item-select2">{{orderData.bankno}}</span>
            <span
              class="item-select3"
              v-clipboard:copy="orderData.bankno"
              v-clipboard:success="onCopy"
            >复制</span>
          </div>
        </div>
        <div class="form_field_warp1">
          <div class="item-select" v-show="orderData.payBy =='mfb2wy'">
            <span class="item-select1">存款姓名：</span>
            <span class="item-select2">{{orderData.uaccountnameByUser}}</span>
          </div>
          <div class="item-select">
            <span class="item-select1">存款金额：</span>
            <span class="item-select2">{{orderData.amountOrder}}</span>
          </div>
          <div class="item-select">
            <span class="item-select1">存款方式：</span>
            <span class="item-select2">{{orderData.transTypeName}}</span>
          </div>
          <div class="item-select">
            <span class="item-select1">订单号：</span>
            <span class="item-select2">{{orderData.billno}}</span>
            <span
              class="item-select3"
              v-clipboard:copy="orderData.billno"
              v-clipboard:success="onCopy"
            >复制</span>
          </div>
        </div>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" @click="paid()">我已成功付款</button>
      </div>
    </div>
  </div>
</template>
<script>
import { createCustomizeDeposit } from "@/api/payment";
import check from "@/util/RegExp";
export default {
  data() {
    return {
      active: 0,
      dialogVisible: false,
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
      agree_1: false,
      orderData: {}
    };
  },
  methods: {
    onCopy() {
      window.toast("复制成功");
    },
    // 成功付款
    paid() {
      this.active = 0;
      Object.assign(this.$data.submitData, this.$options.data().submitData);
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
      } else if (
        this.payItem.lowerlimit &&
        this.submitData.amount * 1 < this.payItem.lowerlimit
      ) {
        window.toast("最低存款" + this.payItem.lowerlimit + "元");
        return false;
      } else if (
        this.payItem.upperlimit &&
        this.submitData.amount * 1 > this.payItem.upperlimit
      ) {
        window.toast("最高存款" + this.payItem.upperlimit + "元");
        return false;
      } else if (
        this.submitData.order_amount <= ~~this.submitData.order_amount &&
        this.submitItem.customParams &&
        this.submitItem.customParams.enterMode
      ) {
        let msg = "";
        if (this.submitData.customParams.depositLimitOfDay) {
          msg = `存款金额请输入带有两位小数点的数字，如${(
            Math.random() * 100
          ).toFixed(2)}元。<br>每日存款次数限制为：${
            this.submitData.customParams.depositLimitOfDay
          }次`;
        } else {
          msg = `存款金额请输入带有两位小数点的数字，如${(
            Math.random() * 100
          ).toFixed(2)}元。`;
        }
        // 风控 要加小数点
        $alert(msg, "存款金额提示");
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
      console.log(this.payItem);
      this.submitData.payBy =
        this.payItem.payBy|| this.payItem.platformtype || this.payItem.id ;
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
      createCustomizeDeposit(data).then(res => {
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
    // 微信秒存协议确认
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
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.mfbpay {
  .agrees {
    line-height: 2.5;
    margin-top: r(30);
    padding: 0 r(40);
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
    padding: r(30);
    position: absolute;
    padding-top: r(150);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f5f5f5;
    min-height: r(71);
    .mfb-order-box {
      .orderImg {
        width: 100%;
      }
    }
    .form_field_warp1 {
      background: #ffffff;
    }
    .form_field_warp {
      border-bottom: 1px dashed #ddd;
      position: relative;
      background: #ffffff;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: r(40);
        height: r(40);
        margin-left: r(-20);
        margin-bottom: r(-20);
        border-radius: 50%;
        background: #f5f5f5;
        z-index: 99;
      }
      &::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        width: r(40);
        height: r(40);
        margin-right: r(-20);
        margin-bottom: r(-20);
        border-radius: 50%;
        background: #f5f5f5;
        z-index: 99;
      }
    }
    .order-title {
      margin: r(30) 0;
      text-align: center;
    }
    .order-text {
      padding: r(30) r(20);
    }
    .order-text-money {
      text-align: center;
      padding: r(30) 0 r(60);
      color: #ff4b41;
      font-family: STXihei;
      @include f(48px);
    }
    .order-tips-box {
      padding: r(50) r(20) r(50) r(50);
      position: relative;
      .mfb_wx_2 {
        position: absolute;
        left: r(20);
        top: r(50);
      }
      span {
        letter-spacing: 1px;
        line-height: 1.2;
      }
    }
    .order-t-tips {
      margin-top: r(30);
      color: #ff4b41;
      line-height: 1.5;
    }
  }

  .text-title {
    padding-left: r(30);
    font-family: PingFangSC-Regular;
    @include f(24px);
    color: #888888;
    margin-bottom: r(10);
  }
  .submitBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: r(120);
    background: #ffffff;
    display: flex;
    .depositMoney {
      flex: 1;
      padding: r(20) r(30);
      overflow: hidden;
      .orderMoney {
        display: inline-block;
        color: #ff4b41;
        @include f(48px);
        padding-top: r(10);
      }
    }
    .submitBtn {
      width: r(350);
      color: #ffffff;
      background: $cl1;
      border-radius: r(80) 0 0 0;
      text-align: center;
      letter-spacing: 2px;
      line-height: r(120);
      @include f(36px);
    }
  }
  .item-input1 {
    border-top: 1px solid rgba($color: #ddd, $alpha: 0.6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
    margin-bottom: r(20);
    position: relative;
    background: #ffffff;
    .input1 {
      width: 100%;
      border: none;
      line-height: r(90);
      @include f(28px);
      font-family: STXihei;
      padding: 0 r(40) 0 r(200);
    }
    .item-inputTitle1 {
      position: absolute;
      top: 52%;
      left: r(40);
      transform: translateY(-50%);
      font-family: PingFangSC-Regular;
      @include f(28px);
    }
  }
  .item-input {
    border-top: 1px solid rgba($color: #ddd, $alpha: 0.6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: 0.6);
    margin-bottom: r(20);
    position: relative;
    padding: r(20) r(30) r(10);
    background: #ffffff;
    .inputDiv {
      position: relative;
    }

    .input {
      width: 100%;
      border: none;
      line-height: r(90);
      @include f(48px);
      padding-left: r(60);
      font-family: STXihei;
      color: #ff3b30;
    }

    .cny {
      color: #ff3b30;
      @include f(48px);
      position: absolute;
      bottom: 20%;
      left: 0;
    }

    .item-inputTitle {
      @include f(28px);
      margin-bottom: r(30);
    }
  }
  .item-select {
    height: r(90);
    position: relative;
    background: #ffffff;
    display: flex;
    align-items: center;
    padding-right: r(120);
    .item-select1 {
      padding-left: r(20);
      width: r(160);
    }
    .item-select2 {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-select3 {
      background-image: linear-gradient(-232deg, #ff7761 0%, #ff9d6c 100%);
      border-radius: r(10);
      width: r(100);
      height: r(60);
      line-height: r(60);
      color: #ffffff;
      text-align: center;
      position: absolute;
      right: r(20);
    }
  }
  .user-personal-update-btn {
    width: 100%;
    text-align: center;
    padding-bottom: r(30);
    padding-top: r(30);
    .btn {
      width: 94%;
      display: inline-block;
      background: $cl1;
      color: #fff;
      height: r(94);
      line-height: r(94);
      text-align: center;
      @include f(32px);
      letter-spacing: 2px;
      font-family: PingFangSC-Regular;
      border-radius: 5px;
    }
  }
}
</style>
