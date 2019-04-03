<template>
  <div v-if="classes">
    <!-- 特殊处理，mfb的支付宝下边，再出个通道一和通道二 -->
    <div class="dep_type">
      <div v-show="classes.type=='qqpay'">
        <span
          class="dep_item"
          v-if="hasTranferChecked"
          @click="selectPayMethod('TRANFER_BANK_CARD')"
          :class="{active:payMethod=='TRANFER_BANK_CARD'}"
        >
          <h3>QQ转账</h3>
          <h5>稳定，单笔上限300万</h5>
          <span
            class="rate4deputy"
            v-if="tranferRate4deputy"
          >赠{{rate4deputyTranferValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasSM"
          @click="selectPayMethod('SM')"
          :class="{active:payMethod=='SM'}"
        >
          <h3>QQ扫码</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="smRate4deputy">赠{{rate4deputySMValue.rate4deputy}}%</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
      <div v-show="classes.type=='ebank'">
        <span
          class="dep_item"
          v-if="hasspeedPay"
          @click="selectPayMethod('speedPay')"
          :class="{active:payMethod=='speedPay'}"
        >
          <h3>网银快捷支付</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="speedRate4deputy">赠{{rate4deputySpeedValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasebank"
          @click="selectPayMethod('ebank')"
          :class="{active:payMethod=='ebank'}"
        >
          <h3>在线网银支付</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="ebankRate4deputy">赠{{rate4deputyEbankValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasoffbank"
          @click="selectPayMethod('offbank')"
          :class="{active:payMethod=='offbank'}"
        >
          <h3>线下银行卡存款</h3>
          <h5></h5>
          <span
            class="rate4deputy"
            v-if="offbankRate4deputy"
          >赠{{rate4deputyOffbankValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasTranferChecked"
          @click="selectPayMethod('TRANFER_BANK_CARD')"
          :class="{active:payMethod=='TRANFER_BANK_CARD'}"
        >
          <h3>网银转账</h3>
          <h5>稳定，单笔上限300万</h5>
          <span
            class="rate4deputy"
            v-if="tranferRate4deputy"
          >赠{{rate4deputyTranferValue.rate4deputy}}%,延迟即赔高达50%</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
      <div v-show="classes.type=='unionpay'">
        <span
          class="dep_item"
          v-if="hasysfpay"
          @click="selectPayMethod('ysfpay')"
          :class="{active:payMethod=='ysfpay'}"
        >
          <h3>云闪付</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="ysfRate4deputy">赠{{rate4deputyYSFValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasunionpay"
          @click="selectPayMethod('unionpay')"
          :class="{active:payMethod=='unionpay'}"
        >
          <h3>银联扫码</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="unionRate4deputy">赠{{rate4deputyUnionValue.rate4deputy}}%</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
      <div v-show="classes.type=='wechat'">
        <span
          class="dep_item"
          v-if="hasSM"
          @click="selectPayMethod('SM')"
          :class="{active:payMethod=='SM'}"
        >
          <h3>微信支付</h3>
          <span class="rate4deputy" v-if="smRate4deputy">赠{{rate4deputySMValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasTranferChecked"
          @click="selectPayMethod('TRANFER_BANK_CARD')"
          :class="{active:payMethod=='TRANFER_BANK_CARD'}"
        >
          <h3>微信转银行卡</h3>
          <span
            class="rate4deputy"
            v-if="tranferRate4deputy"
          >赠{{rate4deputyTranferValue.rate4deputy}}%,延迟即赔高达50%</span>
          <h5>稳定，单笔上限300万</h5>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
      <div v-show="classes.type=='alipay'">
        <span
          class="dep_item"
          v-if="hasSM"
          @click="selectPayMethod('SM')"
          :class="{active:payMethod=='SM'}"
        >
          <h3>支付宝快捷</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="smRate4deputy">赠{{rate4deputySMValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasTranferChecked"
          @click="selectPayMethod('TRANFER_BANK_CARD')"
          :class="{active:payMethod=='TRANFER_BANK_CARD'}"
        >
          <h3>支付宝转账</h3>
          <h5>稳定，单笔上限300万</h5>
          <span
            class="rate4deputy"
            v-if="tranferRate4deputy"
          >赠{{rate4deputyTranferValue.rate4deputy}}%,延迟即赔高达50%</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
      <div v-show="classes.type=='directpay'">
        <span
          class="dep_item"
          v-if="hasSM"
          @click="selectPayMethod('SM')"
          :class="{active:payMethod=='SM'}"
        >
          <h3>快捷支付</h3>
          <h5></h5>
          <span class="rate4deputy" v-if="smRate4deputy">赠{{rate4deputySMValue.rate4deputy}}%</span>
        </span>
        <span
          class="dep_item"
          v-if="hasTranferChecked"
          @click="selectPayMethod('TRANFER_BANK_CARD')"
          :class="{active:payMethod=='TRANFER_BANK_CARD'}"
        >
          <h3>快捷支付</h3>
          <h5></h5>
          <span
            class="rate4deputy"
            v-if="tranferRate4deputy"
          >赠{{rate4deputyTranferValue.rate4deputy}}%</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
    </div>

    <div class="user-tip">
      <p>
        1、 最低存款额度为
        <span style="color:#ea5048;">{{infoSelect.lowerlimit}}</span>元，最高
        <span style="color:#ea5048;">{{infoSelect.upperlimit}}</span>
        元。
      </p>
      <p
        v-if="infoSelect.type=='alipay'||infoSelect.payMethod=='ebank'||infoSelect.payMethod=='unionpay'||infoSelect.type=='jdpay'"
      >
        &nbsp;&nbsp;&nbsp;&nbsp;使用此通道，须承担
        <span
          style="color:#ea5048;"
        >{{infoSelect.rate4player*100}}%的手续费</span>由第三方收取，若选择的通道无法存款，请点选其他支付通道。
      </p>
      <!-- <p v-if="infoSelect.type=='wechat'">
        &nbsp;&nbsp;&nbsp;&nbsp;使用此方式将收取
        <span style="color:#ea5048;">1%-4.5%手续费</span>；不同存款通道，收取的手续费不一样，具体手续费请以第三方为准。
      </p>-->
      <div
        v-if="infoSelect.payBy && (infoSelect.payBy == 'zfb' || infoSelect.payBy == 'new_zfb' || infoSelect.payBy == 'mfb2zfb')"
      >
        <p>2、 支付宝转账到银行卡23：00-凌晨01：00有延迟到帐现象，具体到账时间由银行方而定，建议使用其他存款方式。</p>
        <p>
          3、
          <span style="color:#ea5048;">我方收款账户不定时更新</span>，请您每次存款务必登入官网查看【最新银行卡】，切勿根据历史转账记录直接付款！
        </p>
        <p>
          4、
          <span style="color:#ea5048;">若存入已关闭的银行卡，我方一概不负责</span>，请您谅解！
        </p>
      </div>
      <div
        v-else-if="infoSelect.payBy &&(infoSelect.payBy == 'bank_phone' ||infoSelect.payBy == 'bank_web' ||infoSelect.payBy == 'wechat' || infoSelect.payBy == 'mfb2wx' || infoSelect.payBy == 'mfb2wy')"
      >
        <p>
          2、
          <span style="color:#ea5048;">我方收款账户不定时更新</span>，请您每次存款务必登入官网查看【最新银行卡】，切勿根据历史转账记录直接付款！
        </p>
        <p>
          3、
          <span style="color:#ea5048;">若存入已关闭的银行卡，我方一概不负责</span>，请您谅解！
        </p>
      </div>
      <div v-if="infoSelect.customParams && infoSelect.customParams.showBankCardWarn">
        <p>
          2、
          <span style="color:#ea5048;">我方收款账户不定时更新</span>，请您每次存款务必登入官网查看【最新银行卡】,切勿根据历史转账记录直接付款！
        </p>
        <p>
          3、
          <span style="color:#ea5048;">若存入已关闭的银行卡，我方一概不负责</span>，请您谅解！
        </p>
      </div>
      <div v-if="infoSelect.type == 'unionpay'">
        <p style="text-align:left;">
          2、银联扫码同时支持
          <span style="color:#ea5048;">云闪付、唯品会、京东、美团、大众点评</span>支付方式
        </p>
        <p style="text-align:left;">
          3、支持多家主流银行：
          <span style="color:#ea5048;">工商、农业、建设、招商、民生、交通、兴业、农村信用社、中信、广大、浦发</span>
        </p>
      </div>
    </div>

    <div class="dep_type">
      <div>
        <span class="dep_title">支付通道：</span>
      </div>
      <div>
        <span
          @click="selectPayInfo(item)"
          :class="{active:item==infoSelect}"
          v-for="(item,i) in showMenu"
          :key="i"
          class="dep_item_new"
        >
          <span v-if="payMethod=='SM'">{{className}}支付{{i+1}}</span>
          <span v-else>{{item.remark}}</span>
        </span>
        <span class="dep_item" v-show="!classes">请先选择支付方式</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getPaymentConfigInfo } from "@/api/payment";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      infoSelect: null,
      payMethod: "SM",
      hasSM: false, // 是否有扫码
      hasTranferChecked: false, // 是否有转账
      hasspeedPay: false,
      hasunionpay: false,
      hasebank: false,
      hasysfpay: false,
      hasoffbank: false,
      classes: null, // 当前的class
      tranferRate4deputy: false,
      smRate4deputy: false,
      unionRate4deputy: false,
      ebankRate4deputy: false,
      speedRate4deputy: false,
      ysfRate4deputy: false,
      offbankRate4deputy: false,
      rate4deputyTranferValue: null,
      rate4deputySMValue: null,
      rate4deputyEbankValue: null,
      rate4deputyUnionValue: null,
      rate4deputyYSFValue: null,
      rate4deputySpeedValue: null,
      rate4deputyOffbankValue: null
    };
  },
  methods: {
    // 选择其他支付方式
    selectPayInfo(info) {
      if (!info) {
        info = this.classes.data[0];
      }
      this.infoSelect = info;
      this.$emit("selectPayInfo", info);
      return;
      // if (info.payBy && (info.payBy == "zfb" || info.payBy == "new_zfb")) {
      //   window.$alert(
      //     `1.支付宝转账到银行卡23：00-凌晨01：00有延迟到帐现象，具体到账时间由银行方而定，建议使用其他存款方式。<br>2.温馨提示：<span style="color:#ea5048;">我方收款账户不定时更新</span>，请您每次存款务必登入官网查看【最新银行卡】；<span style="color:#ea5048;">若存入已关闭的银行卡，我方一概不负责</span>，请您谅解！`
      //   );
      // } else if (
      //   info.payBy &&
      //   (info.payBy == "bank_phone" ||
      //     info.payBy == "bank_web" ||
      //     info.payBy == "wechat")
      // ) {
      //   window.$alert(
      //     `<span style="color:#ea5048;">我方收款账户不定时更新</span>，请您每次存款务必登入官网查看【最新银行卡】；<span style="color:#ea5048;">若存入已关闭的银行卡，我方一概不负责</span>，请您谅解！！`
      //   );
      // }

      // if (info.customParams && info.customParams.showBankCardWarn) {
      //   window.$alert(
      //     `收款账户不定时更新，请您每次存款时，务必登入官网获取<span style="color:#ea5048;">【我方最新收款账户】</span>，切勿根据历史转账记录直接付款，<span style="color:#ea5048;">如存入我方已关闭账户</span>，一概不负责！`
      //   );
      // }
      // if (info.type == "unionpay") {
      //   window.$alert(
      //     `<p style="text-align:left;">1.银联扫码同时支持<span style="color:#ea5048;">云闪付、唯品会、京东、美团、大众点评</span>支付方式</p><p style="text-align:left;">2.支持多家主流银行：<span style="color:#ea5048;">工商、农业、建设、招商、民生、交通、兴业、农村信用社、中信、广大、浦发</span></p>`
      //   );
      // }
    },
    // 选择支付方式
    selectPayMethod(payMethod) {
      this.payMethod = payMethod;
      this.selectActive(payMethod);
    },
    // 选择第一个支付
    selectActive(payMethod) {
      if (!payMethod) {
        return;
      }
      this.classes.data.some(item => {
        if (item.payMethod == payMethod) {
          this.selectPayInfo(item);
          return true;
        }
      });
    }
  },
  computed: {
    ...mapGetters(["userData"]),
    showMenu() {
      if (!this.classes) {
        return [];
      }
      return this.classes.data.filter(item => {
        return item.payMethod == this.payMethod;
      });
    }
  },
  watch: {
    classes(val) {
      let _this = this;
      // 是否有扫码
      _this.hasSM = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "SM";
        }
      });
      // 是否有转账
      _this.hasTranferChecked = val.data.some(item => {
        if (item.payMethod) {
          console.log(item.payMethod);
          return item.payMethod == "TRANFER_BANK_CARD";
        }
      });
      // 快捷支付
      _this.hasspeedPay = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "speedPay";
        }
      });
      // 银联扫码
      _this.hasunionpay = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "unionpay";
        }
      });
      // 在线支付
      _this.hasebank = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "ebank";
        }
      });
      // 在线支付
      _this.hasoffbank = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "offbank";
        }
      });

      // hasysfpay
      _this.hasysfpay = val.data.some(item => {
        if (item.payMethod) {
          return item.payMethod == "ysfpay";
        }
      });
      // 扫码支付有优惠
      _this.smRate4deputy = val.data.some(item => {
        return item.payMethod == "SM" && item.rate4deputy > 0;
      });
      // 转账支付方式是否有优惠
      _this.tranferRate4deputy = val.data.some(item => {
        return item.payMethod == "TRANFER_BANK_CARD" && item.rate4deputy > 0;
      });
      // 银联扫码是否有优惠
      _this.unionRate4deputy = val.data.some(item => {
        return item.payMethod == "unionpay" && item.rate4deputy > 0;
      });
      // 网银-在线网银是否有优惠
      _this.ebankRate4deputy = val.data.some(item => {
        return item.payMethod == "ebank" && item.rate4deputy > 0;
      });
      // 网银快捷方式是否有优惠
      _this.speedRate4deputy = val.data.some(item => {
        return item.payMethod == "speedPay" && item.rate4deputy > 0;
      });
      // offbank是否有优惠
      _this.offbankRate4deputy = val.data.some(item => {
        return item.payMethod == "offbank" && item.rate4deputy > 0;
      }); // offbank是否有优惠
      _this.ysfRate4deputy = val.data.some(item => {
        return item.payMethod == "ysfpay" && item.rate4deputy > 0;
      });
      // 如有优惠，默认取第一个有优惠信息的优惠值，显示在存款方式，PS：商家要求
      _this.rate4deputyTranferValue = val.data.find(item => {
        return item.payMethod == "TRANFER_BANK_CARD" && item.rate4deputy > 0;
      });
      _this.rate4deputySMValue = val.data.find(item => {
        return item.payMethod == "SM" && item.rate4deputy > 0;
      });
      _this.rate4deputyUnionValue = val.data.find(item => {
        return item.payMethod == "unionpay" && item.rate4deputy > 0;
      });
      _this.rate4deputyYSFValue = val.data.find(item => {
        return item.payMethod == "ysfpay" && item.rate4deputy > 0;
      });
      _this.rate4deputyEbankValue = val.data.find(item => {
        return item.payMethod == "ebank" && item.rate4deputy > 0;
      });
      _this.rate4deputySpeedValue = val.data.find(item => {
        return item.payMethod == "speedPay" && item.rate4deputy > 0;
      });
      _this.rate4deputyOffbankValue = val.data.find(item => {
        return item.payMethod == "offbank" && item.rate4deputy > 0;
      });
      // 如有优惠，默认取第一个有优惠信息的优惠值，显示在存款方式，PS：商家要求
      _this.rate4deputyValue = val.data.find(item => {
        return item.payMethod == "TRANFER_BANK_CARD" && item.rate4deputy > 0;
      });
      // 默认选中
      if (_this.hasspeedPay) {
        _this.selectPayMethod("speedPay");
      } else if (_this.hasebank) {
        _this.selectPayMethod("ebank");
      } else if (_this.hasTranferChecked) {
        _this.selectPayMethod("TRANFER_BANK_CARD");
      } else if (_this.hasysfpay) {
        _this.selectPayMethod("ysfpay");
      } else if (_this.hasunionpay) {
        _this.selectPayMethod("unionpay");
      } else if (_this.hasSM) {
        _this.selectPayMethod("SM");
      }
      switch (val.type) {
        case "alipay":
          _this.className = "支付宝";
          break;
        case "wechat":
          _this.className = "微信";
          break;
        case "qqpay":
          _this.className = "QQ";
          break;
        case "ebank":
          _this.className = "网银";
          break;
        case "jdpay":
          _this.className = "京东";
          break;
        case "ysfpay":
          _this.className = "云闪付";
          break;
        case "directpay":
          _this.className = "快速支付";
          break;
        case "unionpay":
          _this.className = "银联扫码";
          break;
        case "offbank":
          _this.className = "线下银行转账";
          break;
        case "speedPay":
          _this.className = "快捷支付";
          break;
      }
    }
  },
  created() {
    this.$bus.$on("setClasses", eventData => {
      this.classes = eventData;
    });
  }
};
</script>
<style lang="scss" scoped>
.dep_type {
  .dep_title {
    color: #343434;
    line-height: 3;
  }
  .dep_item {
    display: inline-block;
    // float: left;
    border: 1px solid rgb(217, 217, 217);
    width: 150px;
    height: 70px;
    margin: 0 15px 15px 0;
    padding: 6px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    background: #fff;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2);
    position: relative;
    vertical-align: top;
    h3 {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    h5 {
      font-size: 12px;
    }
    &:hover,
    &.active {
      border: 1px solid #4db7f4;
      box-shadow: 2px 2px 6px #4db7f4;
      background: #fff5e3;
      // background: url(../images/usercenter/paylist-bg.png) no-repeat center top;
    }
    .dep_selected {
      line-height: 1;
      position: absolute;
      color: #39b6fe;
      top: -6px;
      right: -8px;
      font-size: 16px;
    }
    .rate4deputy {
      position: absolute;
      top: -16px;
      right: -16px;
      display: block;
      min-width: 45px;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      text-align: center;
      border-radius: 10px;
      padding: 0 7px;
      color: #fff;
      background: #ed0000;
      font-weight: bold;
      z-index: 9;
    }
  }
  .dep_item_new {
    position: relative;
    display: inline-block;
    padding: 8px 20px;
    border: 1px solid #dcdcdc;
    margin-right: 10px;
    margin-bottom: 10px;
    text-align: center;
    background: #fff;
    color: #000000;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover,
    &.active {
      background: #4db7f4;
      color: #fff;
      border-radius: 3px;
    }
  }
}
.icos {
  position: absolute;
  top: -10px;
  z-index: 9;
  right: -25px;
  font-size: 12px;
  animation: start 0.4s;
  animation-iteration-count: 999999999;
}
@keyframes start {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}
</style>
