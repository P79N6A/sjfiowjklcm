<template>
  <div class="sec-save">
    <div v-show="!payTrue">
      <form-tip>
        秒存转账<span style="color: red">（支持手机转账/网银转账/支付宝转账）</span><br>
        1.支付宝转账请选择两小时到账功能！使用次日到帐，支付成功之后请联系在线客服匹配您的款项<br>
        2.每日23:30-00:30支付宝转账存在延迟，请尽量选择其他方式进行存款
      </form-tip>
      <input-inline label="存款姓名：">
        <input v-model="myData.accountName" placeholder="请输入存款人姓名" type="text">
      </input-inline>
      <input-inline label="存款金额：">
        <input v-model.number="myData.amount" placeholder="请输入存款金额" type="text">
        <i slot="right">元</i>
      </input-inline>
      <v-button @click="submit">
        提交
      </v-button>
    </div>
    <div class="show-order" v-show="payTrue">
      <div>
        <h3>我们的收款账户</h3>
        <input-inline label="银行类别：">
          <input type="text" :value="orderData.bank" readonly="readonly">
        </input-inline>
        <input-inline label="开户人：">
          <input type="text" :value="orderData.accountname" readonly="readonly">
          <strong slot="right" class="btn-copy"
                  v-clipboard:copy="orderData.accountname" v-clipboard:success="onCopy"
                  v-clipboard:error="onError">复制</strong>
        </input-inline>
        <input-inline label="银行卡号：">
          <input type="text" :value="orderData.bankno" readonly="readonly">
          <strong slot="right" v-clipboard:copy="orderData.bankno" v-clipboard:success="onCopy"
                  v-clipboard:error="onError">复制</strong>
        </input-inline>
      </div>
      <div class="form_field_warp">
        <h3>您的存款信息</h3>
        <input-inline label="存款姓名：">
          <div class="input">
            {{orderData.uaccountname}}
          </div>
        </input-inline>
        <input-inline label="存款金额：">
          <div class="input">{{orderData.amount}}</div>
        </input-inline>
      </div>
      <v-button @click="payTrue=false">我已成功付款</v-button>
    </div>
    <div class="alreadyExist" v-show="!alreadyExist">
      <div class="alreadyExist-main">
        <div class="dialog_content">
          <h2 style="color: red;text-align: center">提示：您存在未处理的订单</h2>
          <p>1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单</p>
          <p>2. 如果未支付，请您先支付该笔订单或者选择废弃该订单</p>
        </div>
        <div class="btn_wrap">
          <v-button @click="newOrder">废弃并生成新订单</v-button>
          <v-button @click="alreadyExist=payTrue=true"> 查看该订单</v-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {copy} from "@/vue-extend/mixins/index"
  import {createDepositeOrder} from "@/api/payment"
  import formTip from "mobile/components/form-tip"

  export default {
    mixins: [copy],
    data() {
      return {
        myData: {
          amount: "", //true number 存款金额
          accountName: "",// true string 账户名
          discard: false//
        },
        orderData: {
          bankno: "",
          accountname: "",
          uaccountname: '',
          amount: ''
        },
        payTrue: false,
        alreadyExist: true
      };
    },
    methods: {
      newOrder() {
        this.alreadyExist = this.myData.discard = true;
        this.submit();
      },
      submit() {
        if (this.myData.accountName == "") return window.toast("存款人姓名不能为空")
        if (this.myData.amount == "") return window.toast("存款金额不能为空")
        createDepositeOrder(this.myData).then(res => {
          this.myData.discard = false;
          window.toast(res.message)
          if (res.success) {
            this.orderData = res.data;
            let type = res.data.type;
            if (type == "UNPAID_ORDER") {
              this.alreadyExist = false;
            } else if (type == 'NEW_ORDER') {
              this.payTrue = true;
            } else if ('BANKCARD_NOTAVAILABLE' == type) {
              window.toast("通道维护中，请选择其他存款方式");
            }
          }
        }).catch(err => {
          this.myData.discard = false;
        })
      }
    },
    components: {
      formTip
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .sec-save {
    padding: 1em 2em;
    .sec-tips {
      line-height: 1.5em;

    }
    .alreadyExist {
      line-height: 1.8em;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.75);
      h2 {
        text-align: center;
        color: #f00;
        line-height: 3em;
      }
      .alreadyExist-main {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 80%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: r(20);
        padding: r(50) r(20);
      }
    }
    .show-order {
      h3 {
        color: #f00;
        text-align: center;
        line-height: 3em;
        @include f(36px);
      }
    }
  }
</style>
