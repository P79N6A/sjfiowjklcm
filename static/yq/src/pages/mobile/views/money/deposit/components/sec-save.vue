<template>
  <div class="sec-save mc_content_wrap">
    <div class="sec_box j-sec_box" v-if="mcStep==1">
      <div class="mcpay-titile" v-if="!from_wx">
        <p>秒存转账支持：网银、支付宝付款
          <br>手机银行转账、微信转账
        </p>
      </div>
      <div class="mcpay-input" v-if="!from_wx">
        <!-- <span class="m-i-title">支付通道</span> -->
        <div class="pay-type-content">
          <div class="pay-type" @click="myData.payBy='';showTd=true;">
            <span
              :class="{active:showTd}"
              v-if="payItem.payChannelList.indexOf('zfb')>-1||payItem.payChannelList.indexOf('new_zfb')"
            >支付宝转账</span>
          </div>
          <div
            class="pay-type"
            v-for="item in payItem.payChannelList"
            :key="item"
            @click="myData.payBy=item;showTd=false;"
            v-if="item!='zfb'&&item!='new_zfb'"
          >
            <span :class="{active:myData.payBy==item}">{{mcTypech[item]}}</span>
          </div>
        </div>
      </div>
      <div class="mcpay-input" v-if="!from_wx&&showTd">
        <!-- <span class="m-i-title">支付通道</span> -->
        <div class="pay-type-content">
          <div
            class="pay-type"
            v-for="item in payItem.payChannelList"
            :key="item"
            @click="myData.payBy=item"
            v-if="item=='zfb'||item=='new_zfb'"
          >
            <span :class="{active:myData.payBy==item}">{{mcTypech[item]}}</span>
          </div>
        </div>
      </div>
      <div class="mcpay-input">
        <span class="m-i-title">存款姓名</span>
        <input class="m-i-input" type="text" v-model="myData.accountName" placeholder="请输入存款人姓名">
      </div>
      <div class="mcpay-input">
        <span class="m-i-title">存款金额</span>
        <input
          class="m-i-input"
          type="text"
          v-model.number="myData.amount"
          :placeholder="placeholder"
        >
      </div>
      <div class="btns">
        <span @click="mcStepCheck" class="t_btn">获取收款账户</span>
      </div>
      <!-- <v-button @click="submit">提交</v-button> -->
      <div class="pay_tips">
        <p class="p_tips_title">温馨提示</p>
        <div class="p_tips_content">
          <p>1.为了让您的存款“秒”到，请务必按此流程操作，系统会自动保存供下次选择，感谢您的配合！</p>
          <p class="c-red">2.支付宝转账请选择两小时到账功能！使用次日到帐，支付成功之后请联系在线客服匹配您的款项</p>
          <p>3.每日23:30-00:30支付宝转账存在延迟，请尽量选择其他方式进行存款</p>
        </div>
      </div>
    </div>
    <div v-if="mcStep==2" class="layout_form layout_form_readonly sec_box mt20 fix_bg">
      <div class="mc_wx_tips inputbox">
        <p class="m_w_t_title">您需要存入金额：</p>
        <p>
          <span class="m_w_t_money">{{myData.amount}}元</span>
        </p>
        <p class="m_w_t_tips">温馨提示:请您存入该金额，否则存款无法到账
          <br>
          本订单有效时间为{{mcTime}}分钟
        </p>
      </div>
      <div class="agrees">
        <p class="mc_wx_tips_agree">
          <label>
            <input type="checkbox" id="mc_wx_1" v-model="myData.agree_first"> 我已明白需要转账
            <span class="red">{{myData.amount}}</span>元。
          </label>
        </p>
        <p class="mc_wx_tips_agree">
          <label>
            <input type="checkbox" id="mc_wx_2" v-model="myData.agree_second"> 本人已同意，如未转账
            <span class="red">{{myData.amount}}</span>元，导致系统无法匹配存款，奇幻城概不负责。
          </label>
        </p>
      </div>
      <div class="btns">
        <span @click="wxSecCheck" class="t_btn">获取收款账户</span>
      </div>
    </div>
    <div v-if="mcStep==3" class="layout_form layout_form_readonly sec_box mt20 fix_bg">
      <p class="mcpay-title">我们的收款账户</p>
      <table class="mcpay-table">
        <tbody>
          <tr v-if="orderData.accountOpenAddr">
            <td width="30%">开户地址</td>
            <td v-clipboard:copy="orderData.accountOpenAddr" v-clipboard:success="onCopy">
              <span>{{orderData.accountOpenAddr}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">银行卡类型</td>
            <td v-clipboard:copy="orderData.bank" v-clipboard:success="onCopy">
              <span>{{orderData.bank}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">银行卡号</td>
            <td v-clipboard:copy="orderData.bankno" v-clipboard:success="onCopy">
              <span>{{orderData.bankno}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">开户人</td>
            <td v-clipboard:copy="orderData.accountname" v-clipboard:success="onCopy">
              <span>{{orderData.accountname}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="mcpay-title">您的存款信息</p>
      <table class="mcpay-table">
        <tbody>
          <tr>
            <td width="30%">存款姓名</td>
            <td v-clipboard:copy="orderData.uaccountname" v-clipboard:success="onCopy">
              <span>{{orderData.uaccountname}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">存款金额</td>
            <td v-clipboard:copy="orderData.amount" v-clipboard:success="onCopy">
              <span>{{orderData.amount}}</span>
            </td>
          </tr>
          <tr>
            <td width="30%">存款方式</td>
            <td v-clipboard:copy="mcTypech[orderData.payBy]" v-clipboard:success="onCopy">
              <span>{{mcTypech[orderData.payBy]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btns">
        <span @click="mcStep=4" class="t_btn" v-show="orderData.payBy=='wechat'">微信转账流程</span>
        <span @click="mcStep=1" class="t_btn">我已成功付款</span>
      </div>
      <div class="pay_tips paytips_2">
        <p class="p_tips_title">温馨提示</p>
        <div class="p_tips_content">
          <p>1.为了让您的存款“秒”到，请务必按此流程操作，系统会自动保存供下次选择，感谢您的配合！</p>
          <p class="c-red">2.支付宝转账请选择两小时到账功能！使用次日到帐，支付成功之后请联系在线客服匹配您的款项</p>
          <p>3.每日23:30-00:30支付宝转账存在延迟，请尽量选择其他方式进行存款</p>
        </div>
      </div>
    </div>
    <div
      v-if="mcStep==4&&orderData.payBy=='wechat'"
      class="layout_form layout_form_readonly sec_box mt20 fix_bg"
    >
      <div class="mc_wx_helps inputbox">
        <swiper style="height:100%;" :options="swiperOption">
          <swiper-slide>
            <img src="./img/helps/01.jpg">
            <p class="mc_wx_h_tips">点击微信
              <span class="mc_wx_red">【钱包】</span>-
              <span class="mc_wx_red">【收付款】</span>页面，使用
              <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src="./img/helps/02.jpg">
            <p class="mc_wx_h_tips">点击微信
              <span class="mc_wx_red">【钱包】</span>-
              <span class="mc_wx_red">【收付款】</span>页面，使用
              <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src="./img/helps/03.jpg">
            <p class="mc_wx_h_tips">点击微信
              <span class="mc_wx_red">【钱包】</span>-
              <span class="mc_wx_red">【收付款】</span>页面，使用
              <span class="mc_wx_red">【转账到银行卡功能】</span>即可进行转账！
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src="./img/helps/04.jpg">
            <p class="mc_wx_h_tips">
              <span class="mc_wx_red">【请输入我方的收款人姓名和对应的银行卡号，核对无误点击确定】</span>
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src="./img/helps/05.jpg">
            <p class="mc_wx_h_tips">输入
              <span class="mc_wx_red">【系统指定的金额】</span>进行转账操作，转账成功后，方可自动到账！
            </p>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="btns">
          <span @click="mcStep=3" class="t_btn">继续存款</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import formTip from "components/form-tip";
import {
  createDepositeOrder,
  getPaymentConfigInfo,
  getWxZzQuota,
  getZfbZzQuota
} from "@/api/payment";
import check from "@/util/RegExp";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      showTd: false,
      payTypeCh: [
        {
          type: "secSave",
          title: "秒存转账",
          class: "icon-translate"
        }
      ],
      payItem: "",
      myData: {
        amount: "", //true number 存款金额
        accountName: "", // true string 账户名
        discard: false, //是否销毁旧订单
        payBy: "wechat", //存款方式
        agree_first: false, //微信秒存协议1
        agree_second: false //微信秒存协议2
      },
      help_img: 1, //秒存教程
      mcStep: 1,
      mcTime: 0,
      orderData: {
        bankno: "",
        accountname: "",
        uaccountname: "",
        amount: ""
      },
      mcTypech: {
        zfb: "支付宝通道1",
        new_zfb: "支付宝通道2",
        bank_phone: "手机银行转账",
        bank_web: "网上银行转账",
        wechat: "微信转账"
      },
      payMax: "",
      pamMin: "",
      placeholder: "请输入存款金额",
      payTrue: false,
      alreadyExist: true,
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 3000,
        // direction : 'vertical',
        effect: "coverflow",
        grabCursor: true,
        setWrapperSize: true,
        // autoHeight: true,
        paginationType: "bullets",
        pagination: ".swiper-pagination",
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      }
    };
  },
  methods: {
    newOrder() {
      this.alreadyExist = this.myData.discard = true;
      this.submit();
    },
    getWxZzQuota() {
      getWxZzQuota({
        amount: this.myData.amount
      })
        .then(result => {
          if (result.success) {
            this.myData.amount = result.data.amount;
            this.mcTime = result.data.min;
            this.mcStep = 2;
          } else {
            toast(result.message);
          }
        })
        .catch(err => {});
    },
    getZfbZzQuota() {
      getZfbZzQuota({ amount: this.myData.amount })
        .then(result => {
          $load.close();
          if (result.success) {
            this.myData.amount = result.data.amount;
            this.mcTime = result.data.min;
            this.mcStep = 2;
          } else {
            toast(result.message);
          }
        })
        .catch(err => {});
    },
    mcStepCheck() {
      if (this.secCheck()) {
        if (this.myData.payBy == "wechat") {
          this.getWxZzQuota();
        } else if (this.myData.payBy == "new_zfb") {
          this.getZfbZzQuota();
        } else {
          this.submit();
        }
      } else {
        this.mcStep = 1;
      }
    },
    secCheck() {
      if (!this.myData.payBy) {
        toast("请选择存款方式");
      } else if (!this.myData.accountName) {
        toast("请输入存款姓名");
      } else if (!this.myData.amount) {
        toast("请输入金额");
      } else if (!check.intNum.test(this.myData.amount)) {
        toast("请输入整数金额！");
      } else if (this.payMin && this.myData.amount < this.payMin) {
        toast("最低存款" + this.payMin + "元");
      } else if (this.payMax && this.myData.amount > this.payMax) {
        toast("最高存款" + this.payMax + "元");
      } else {
        return true;
      }
    },
    wxSecCheck() {
      if (this.myData.agree_first && this.myData.agree_second) {
        this.submit();
      } else {
        toast("请同意协议");
      }
    },
    submit() {
      createDepositeOrder(this.myData)
        .then(res => {
          this.myData.discard = false;
          if (res.success) {
            this.orderData = res.data;
            let type = res.data.type;
            if (type == "UNPAID_ORDER") {
              this.alreadyExist = false;
              $confirm("您有未处理订单", "提示", {
                message:
                  "1. 如果您已经支付且超过10分钟，请联系在线客服处理该笔订单<br/> 2. 如果未支付，请您先支付该笔订单或者选择废弃该订单 ",
                confirmText: "废弃旧订单",
                cancelText: "查看订单"
              }).then(
                () => {
                  setTimeout(() => {
                    // 废弃并生成新订单
                    this.newOrder();
                  }, 300);
                },
                () => {
                  // 查看订单
                  this.mcStep = 3;
                  this.alreadyExist = true;
                }
              );
            } else if (type == "NEW_ORDER") {
              // this.payTrue = true;
              this.mcStep = 3;
            } else if ("BANKCARD_NOTAVAILABLE" == type) {
              toast("通道维护中，请选择其他存款方式");
            }
          } else {
            toast(res.message);
            this.mcStep = 1;
          }
        })
        .catch(err => {
          this.myData.discard = false;
        });
    },
    onCopy() {
      toast("复制成功");
    }
  },
  props: {
    from_wx: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    mcStep(val) {
      this.$emit("wx_mc_step", val);
    }
  },
  computed: {},
  created() {
    getPaymentConfigInfo({
      terminalType: 1
    }).then(res => {
      if (res.success) {
        let index = res.data.findIndex(z => {
          return "mcpay" == z.type;
        });
        if (index > -1) {
          this.payItem = res.data[index];

          this.payMin = this.payItem.lowerlimit;
          this.payMax = this.payItem.upperlimit;
          this.placeholder =
            "最少" + this.payMin + "元，最多" + this.payMax + "元";
        }
      }
    });

    if (this.from_wx) {
      this.myData.payBy = "wechat";
    } else {
      this.myData.payBy = "";
    }
  },
  components: {
    formTip
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.mcpay-titile {
  text-align: left;
  padding: r(50) r(200) r(100) r(60);
  border-bottom: solid r(30) #f2f2f2;
  @include f(32px);
  background: url(./img/ico-mcpay.png) right r(10) top 40% no-repeat;
  background-size: auto 30%;
  img {
    margin-left: r(10);
  }
}

.mcpay-input {
  padding: r(60) r(60) 0 r(60);
  @include f(32px);
  display: flex;
  align-items: center;
  .m-i-title {
    flex: 1;
    display: inline-block;
  }
  .m-i-input {
    flex: 2;
    padding: r(10);
  }
  .pay-type-content {
    flex: 2;
    padding: r(10);
    .pay-type {
      width: 32.33%;
      display: inline-block;
      text-align: center;
      margin-bottom: r(60);
      span {
        border: solid 1px #555;
        display: inline-block;
        width: 90%;
        line-height: 2.3;
        border-radius: 6px;
        @include f(24px);
        &.active {
          background: #4db7f4;
          color: #fff;
        }
      }
    }
  }
}

.btns {
  margin-top: r(60);
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
  margin: r(30);

  &.paytips_2 {
    background: #fff;
    margin: r(60) 0;
  }
  .p_tips_title {
    line-height: 2;
    @include f(35px);
  }
  .p_tips_content {
    line-height: 1.4;
    @include f(28px);
  }
}

.mcpay-title {
  line-height: 2;
  @include f(32px);
}

.mcpay-table {
  table-layout: fixed;
  @include f(28px);
  width: 100%;
  background: #fff;
  margin-bottom: r(20);
  color: #666;
  td {
    border: solid 1px #ccc;
    padding: r(20);
  }
}

.mc_content_wrap {
  // position: absolute;
  // top: 0;
  // bottom: 0;
  // left:0;
  // right:0;
  // padding-top: r(80);
  .layout_form_readonly {
    padding: 1em;
  }
  .c-red {
    color: $cl3;
  }
  .form_tip {
    margin: 1em;
  }
}

.mc_wx_tips {
  color: #e7091a;
  text-align: left;
  line-height: 1.5;
  @include f(30px);
  .m_w_t_money {
    @include f(40px);
    font-weight: bold;
  }
}

.agrees {
  line-height: 2.5;
  margin-top: r(30);
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

.mc_wx_helps {
  img {
    display: block;
    width: 100%;
  }
}

.fix_bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: r(100) !important;
  background: #dfdfdf;
}
.mc_wx_h_tips {
  color: #333;
  margin: 20px 0;
  .mc_wx_red {
    color: #ea5048;
    font-weight: bold;
  }
}
</style>
