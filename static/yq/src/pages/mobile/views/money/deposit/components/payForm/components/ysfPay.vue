<template>
  <div class="ysfpay">
    <div v-if="active == 0">
      <!-- <div class="inputs">
                <p class="title" >存款卡号</p>
                <input type="text" v-model="submitData.bankno" placeholder="请输入您要付款的银行卡号后四位" >
      </div>-->
      <div class="inputs">
        <p class="title">存款金额</p>
        <input :placeholder="placeholder" v-model="submitData.amount" name="amount">
      </div>
      <div class="select-group cfx">
        <div
          class="select-box"
          v-for="item in loadMoney"
          v-if="item<=payItem.upperlimit&&item>=payItem.lowerlimit"
          :key="item"
        >
          <span
            href="javascript:void(0);"
            @click="submitData.amount=item"
            :class="{active:submitData.amount==item}"
          >{{item}}</span>
        </div>
        <div class="select-box">
          <span
            href="javascript:void(0);"
            @click="submitData.amount=''"
            :class="{active:loadMoney.indexOf(submitData.amount)<0}"
          >其他</span>
        </div>
      </div>
      <div>
        <input type="hidden" v-model="submitData.bankCode" name="bankCode">
        <div class="btns">
          <span class="t_btn" @click="showYsfTech=true">云闪付存款流程</span>
          <span class="t_btn" @click="createOrderForYsfpay1(false)">获取收款二维码</span>
        </div>
        <div class="pay_tips">
          <p class="p_tips_title">温馨提示</p>
          <p class="p_tips_content">1、请先下载云闪付APP（中国银联），需使用云闪付APP扫码进行支付
            <br>2、填写的存款银行卡号（后4位），需与实际付款的银行卡一致，（不可填写A卡号，实际使用B银行卡支付）。
            <br>3、填写的存款金额，需与实际支付的金额一致，系统方可自动匹配到账。
          </p>
        </div>
      </div>
    </div>
    <div v-if="active==1">
      <div class="mc_wx_tips inputbox">
        <!-- <p class="m_w_t_title">请您在
              <span class="m_w_t_money">
                <span class="m_w_t_time">{{help_time.min}}</span>：
                <span class="m_w_t_time">{{help_time.sec}}</span>
              </span>时间内按下【确认】
        </p>-->
        <p>
          确认金额：
          <span class="m_w_t_money">{{orderData.amount}}元</span>
        </p>
        <p class="m_w_t_tips">温馨提示:按下【确认】，方可产生订单
          <br>否则无法自动到账
        </p>
      </div>

      <div class="agrees">
        <p class="mc_wx_tips_agree">
          <label>
            <input type="checkbox" id="mc_wx_2" v-model="agree_1"> 本人已同意，如未转账
            <span class="red">{{orderData.amount}}</span>元，导致系统无法匹配存款，本网站概不负责。
          </label>
        </p>
      </div>
      <div class="btn_wrap j-btn" @click="wxSecCheck">确认</div>
      <div class="btn_wrap j-btn" @click="active=0">返回</div>
    </div>
    <div v-if="active == 2" class="ysf-order">
      <table>
        <tbody>
          <!-- <tr>
                    <td>您的支付卡尾号：</td>
                    <td>{{orderData.ubankno}}</td>
          </tr>-->
          <tr>
            <td>存款金额为：</td>
            <td>{{orderData.amount}}</td>
          </tr>
        </tbody>
      </table>
      <p>* 请使用以上存款信息，转账至以下收款账户。</p>
      <div>
        <img :src="orderData.qrcodeUrl" class="ysf_qr">
        <p class="red-text">请务必保存存款成功截图，未到账可提供在线客服上分</p>
        <div class="btns">
          <span class="t_btn" @click="active = 0">我已经成功转账</span>
          <span class="t_btn" @click="active = 0">重新填写</span>
        </div>
      </div>
      <div class="pay_tips">
        <p class="p_tips_title">温馨提示</p>
        <p class="p_tips_content">1.云闪付请下载云闪付APP绑定您常用银行卡进行存款支付。
          <br>2.云闪付存款需要填写正确支付
          <span class="red-text">银行卡号末四位</span>系统才会正确匹配到帐，无需附言。
          <br>3.支付金额需要与填写存款金额一样系统才会匹配上分。
          <br>
        </p>
      </div>
    </div>
    <ysf-tech v-model="showYsfTech">云闪付教程</ysf-tech>
  </div>
</template>
<script>
import { createOrderForYsfpay } from "@/api/payment";
import check from "@/util/RegExp";
//   import tipsYsfpay from './tips-ysfpay'
import ysfTech from "../../ysf-tech";
export default {
  data() {
    return {
      active: 0,
      dialogVisible: false,
      submitData: {
        bankno: "",
        amount: "",
        discard: false
      },
      orderData: {},
      loadMoney: [50, 100, 200, 500, 1000, 2000, 3000],
      showYsfTech: false,
      show_ysf_order: false,
      help_time: {
        Interval: null,
        init: 0, //分钟整数，接口获取
        min: 0, //显示的分钟
        sec: "00" //显示的秒
      },
      agree_1: true
    };
  },
  methods: {
    wxSecCheck() {
      if (this.agree_1) {
        this.active = 2;
      } else {
        window.toast("请同意协议");
      }
    },
    onCopy() {
      window.toast("复制成功");
    },
    // 检查
    depositCheck() {
      // 需要添加数字为整数
      // if (!this.submitData.bankno) {
      //   window.toast("请输入银行卡号后4位");
      //   return false;
      // } else
      if (!this.submitData.amount) {
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

          this.ysfSubmit(this.submitData, true);
        },
        () => {
          // 取消，查看订单
          this.active = 1;
        }
      );
    },
    // 确认按钮
    depositPost(e) {
      // this.submitData.payBy = this.payItem.id
      // 赋值当前支付的id
      if (this.depositCheck()) {
        // 先检查
        this.ysfSubmit(this.submitData, false);
      } else {
        // e.stopPropagation()
        // e.preventDefault()
      }
    },
    //提交订单
    createOrderForYsfpay1(discard) {
      this.submitData.discard = discard;
      let _this = this;
      createOrderForYsfpay(_this.submitData)
        .then(res => {
          _this.submitData.discard = false;
          if (res.success) {
            _this.orderData = res.data;
            let type = res.data.type;

            if (type == "UNPAID_ORDER") {
              $confirm("您有未处理订单", "提示", {
                message:
                  "1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单<br/> 2. 如果未支付，请您先支付该笔订单或者选择废弃该订单 ",
                confirmText: "生成新订单",
                cancelText: "查看订单"
              }).then(
                () => {
                  // 废弃并生成新订单
                  _this.createOrderForYsfpay1(true);
                },
                () => {
                  // 查看订单
                  _this.active = 1;
                }
              );
            } else if (type == "NEW_ORDER") {
              _this.active = 1;
            } else if ("BANKCARD_NOTAVAILABLE" == type) {
              toast("通道维护中，请选择其他存款方式");
            }
          } else {
            toast(res.message);
            // this.mcStep=1;
          }
        })
        .catch(err => {
          this.ysfpayData.discard = false;
        });
    },
    ysfSubmit(data, discard) {
      if (discard) {
        data.discard = true;
      } else {
        data.discard = false;
      }
      createOrderForYsfpay(data).then(res => {
        if (res.success) {
          let type = res.data.type;
          this.orderData = res.data;
          if ("UNPAID_ORDER" == type) {
            // 到第二步
            this.showExist();
          } else if ("NEW_ORDER" == type) {
            // 到第三步
            this.active = 1;
          } else if ("BANKCARD_NOTAVAILABLE" == type) {
            $alert("通道维护中，请选择其他存款方式");
          }
        } else {
          $alert(res.message);
        }
      });
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
  created() {
    this.$bus.$on("goOn", eventData => {
      this.dialogVisible = eventData;
    });
  },
  components: { ysfTech }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.ysfpay {
  padding: r(30);
}
.inputs {
  margin-bottom: r(20);
  .title {
    // @include f(30px);
    line-height: 2;
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
.mc_wx_tips {
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

.mc_wx_tips_agree {
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
.select-group {
  width: 90%;
  margin-bottom: r(30);
  .select-box {
    float: left;
    width: 20%;
    text-align: center;
    margin-bottom: r(20);
    span {
      width: 90%;
      @include f(28px);
      line-height: 2.2;
      border: solid 1px #555;
      display: inline-block;
      &.active {
        background: #4db7f4;
        color: #fff;
      }
    }
  }
}
.btns {
  margin-bottom: r(40);
  text-align: center;
  .t_btn {
    padding: r(20);
    @include f(36px);
    border-radius: 6px;
    display: inline-block;
    width: 45%;
    box-sizing: border-box;
    margin: 0 r(10);
    background: #4db7f4;
    color: #fff;
  }
}
.pay_tips {
  background: #f2f2f2;
  padding: r(30);
  margin-bottom: r(30);
  text-align: left;
  .p_tips_title {
    line-height: 2;
    @include f(35px);
  }
  .p_tips_content {
    line-height: 1.4;
    @include f(28px);
    word-wrap: break-word;
  }
}
.ysf-order {
  color: #333;
  text-align: center;
  .user-tips {
    text-align: left;
  }
  table {
    table-layout: fixed;
    width: 100%;
    margin: r(10) auto;
    td {
      padding: r(10);
      border: solid 1px #ccc;
    }
  }
  p {
    line-height: 2;
  }
  .ysf_qr {
    display: inline-block;
    width: 100%;
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
</style>
