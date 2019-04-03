<template>
  <div class="classes" v-if="classes">
    <p
      class="title"
      v-show="classes.type=='qqpay'||classes.type=='ebank'||classes.type=='wechat'||classes.type=='alipay'||classes.type=='unionpay'||(hasTranferChecked&&hasSM)"
    >存款方式</p>
    <div class="cfx flexItem" v-show="classes.type=='qqpay'">
      <div
        class="class-items"
        v-if="hasSM"
        @click="selectPayMethod('SM')"
        :class="{active:payMethod=='SM'}"
      >
        QQ扫码
        <span v-if="smRate4deputy" class="rate4deputy">返赠{{rate4deputySMValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasTranferChecked"
        @click="selectPayMethod('TRANFER_BANK_CARD')"
        :class="{active:payMethod=='TRANFER_BANK_CARD'}"
      >
        QQ转账
        <span
          v-if="tranferRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyTranferValue.rate4deputy}}%</span>
      </div>
    </div>
    <div class="cfx flexItem" v-show="classes.type=='ebank'">
      <div
        class="class-items"
        v-if="hasTranferChecked"
        @click="selectPayMethod('TRANFER_BANK_CARD')"
        :class="{active:payMethod=='TRANFER_BANK_CARD'}"
      >
        网银转账
        <span
          v-if="tranferRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyTranferValue.rate4deputy}}%，延迟即赔高达50%</span>
      </div>
      <div
        class="class-items"
        v-if="hasebank"
        @click="selectPayMethod('ebank')"
        :class="{active:payMethod=='ebank'}"
      >
        在线网银
        <span
          v-if="ebankRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyEbankValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasspeedPay"
        @click="selectPayMethod('speedPay')"
        :class="{active:payMethod=='speedPay'}"
      >
        快捷支付
        <span
          v-if="speedRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputySpeedValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasoffbank"
        @click="selectPayMethod('offbank')"
        :class="{active:payMethod=='offbank'}"
      >
        线下银行卡存款
        <span
          v-if="offbankRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyOffbankValue.rate4deputy}}%</span>
      </div>
    </div>
    <div class="cfx flexItem" v-show="classes.type=='unionpay'">
      <div
        class="class-items"
        v-if="hasunionpay"
        @click="selectPayMethod('unionpay')"
        :class="{active:payMethod=='unionpay'}"
      >
        银联扫码
        <span
          v-if="unionRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyUnionValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasysfpay"
        @click="selectPayMethod('ysfpay')"
        :class="{active:payMethod=='ysfpay'}"
      >
        云闪付
        <span v-if="ysfRate4deputy" class="rate4deputy">返赠{{rate4deputyYSFValue.rate4deputy}}%</span>
      </div>
    </div>
    <div class="cfx flexItem" v-show="classes.type=='wechat'">
      <div
        class="class-items"
        v-if="hasSM"
        @click="selectPayMethod('SM')"
        :class="{active:payMethod=='SM'}"
      >
        微信支付
        <span v-if="smRate4deputy" class="rate4deputy">返赠{{rate4deputySMValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasTranferChecked"
        @click="selectPayMethod('TRANFER_BANK_CARD')"
        :class="{active:payMethod=='TRANFER_BANK_CARD'}"
      >
        微信转银行卡
        <span
          v-if="tranferRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyTranferValue.rate4deputy}}%，延迟即赔高达50%</span>
      </div>
    </div>
    <div class="cfx flexItem" v-show="classes.type=='alipay'">
      <div
        class="class-items"
        v-if="hasSM"
        @click="selectPayMethod('SM')"
        :class="{active:payMethod=='SM'}"
      >
        支付宝通道
        <span v-if="smRate4deputy" class="rate4deputy">返赠{{rate4deputySMValue.rate4deputy}}%</span>
      </div>
      <div
        class="class-items"
        v-if="hasTranferChecked"
        @click="selectPayMethod('TRANFER_BANK_CARD')"
        :class="{active:payMethod=='TRANFER_BANK_CARD'}"
      >
        支付宝转银行卡
        <span
          v-if="tranferRate4deputy"
          class="rate4deputy"
        >返赠{{rate4deputyTranferValue.rate4deputy}}%，延迟即赔高达50%</span>
      </div>
    </div>
    <p class="title" v-show="showMenu.length>1">存款通道</p>
    <div class="cfx flexItem" v-show="showMenu.length>1">
      <div
        class="class-items types"
        @click="selectPayInfo(item)"
        :class="{active:item==infoSelect}"
        v-for="(item,i) in showMenu"
        :key="i"
      >
        <span v-if="payMethod=='SM'">
          {{className}}支付{{i+1}}
        </span>
        <span v-else>
          {{item.remark}}
        </span>
        <span
          v-if="item.rate4deputy&& (item.platformtype=='mcpay' || item.platformtype.startsWith('mfb') )"
          class="rate4deputy"
        >返赠{{item.rate4deputy}}%，延迟即赔高达50%</span>
        <span
          v-else-if="item.rate4deputy&& (item.platformtype!='mcpay' || !item.platformtype.startsWith('mfb'))"
          class="rate4deputy"
        >返赠{{item.rate4deputy}}%</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getPaymentConfigInfo } from "@/api/payment";
import { payTypes, mcTypech } from "@/assets/data/deposit";
import { mapGetters } from "vuex";
import { depositMenu } from "@/controls/money/deposit";

export default {
  mixins: [depositMenu],
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
      rate4deputyOffbankValue: null,
      className:null
    };
  },
  methods: {
    // 逻辑有点混乱
    selectPayInfo(info) {
      if (!info) {
        info = this.classes.data[0];
      }
      this.infoSelect = info;
      if (
        info.payBy &&
        (info.payBy == "zfb" ||
          info.payBy == "new_zfb" ||
          info.payBy == "mfb2zfb")
      ) {
        window.$alert(
          `1.支付宝转银行卡23：00-凌晨01：00款项将延迟到账，具体到账时间由银行方而定！建议使用其他存款方式。<br>2.请您每次存款时务必登入官网获取<span style="color:#ea5048;">【我方最新收款账户】。</span>如存入我方<span style="color:#ea5048;">已关闭账户</span>，一概不负责！`
        );
      } else if (
        info.payBy &&
        (info.payBy == "bank_phone" ||
          info.payBy == "bank_web" ||
          info.payBy == "wechat" ||
          info.payBy == "mfb2wx" ||
          info.payBy == "mfb2wy")
      ) {
        window.$alert(
          `收款账户不定时更新，请您每次存款时，务必登入官网获取<span style="color:#ea5048;">【我方最新收款账户】</span>，切勿根据历史转账记录直接付款，<span style="color:#ea5048;">如存入我方已关闭账户</span>，一概不负责！`
        );
      }

      if (info.customParams && info.customParams.showBankCardWarn) {
        console.log("showBankCardWarn");
        window.$alert(
          `收款账户不定时更新，请您每次存款时，务必登入官网获取<span style="color:#ea5048;">【我方最新收款账户】</span>，切勿根据历史转账记录直接付款，<span style="color:#ea5048;">如存入我方已关闭账户</span>，一概不负责！`
        );
      }
      this.infoSelect = info;
      this.$emit("selectPayInfo", info);
    },
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
      // offbank
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
      });
      // offbank是否有优惠
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
      // 默认选中
      if (_this.hasTranferChecked) {
        _this.selectPayMethod("TRANFER_BANK_CARD");
      } else if (_this.hasspeedPay) {
        _this.selectPayMethod("speedPay");
      } else if (_this.hasebank) {
        _this.selectPayMethod("ebank");
      } else if (_this.hasysfpay) {
        _this.selectPayMethod("ysfpay");
      } else if (_this.hasunionpay) {
        _this.selectPayMethod("unionpay");
      } else if (_this.hasSM) {
        _this.selectPayMethod("SM");
      }
      // 菜单名称
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
          _this.className = "快速";
          break;
        case "unionpay":
          _this.className = "银联";
          break;
        case "offbank":
          _this.className = "银行";
          break;
        case "speedPay":
          _this.className = "快捷";
          break;
      }
      _this.$bus.$emit("setBackHeader", _this.className);
    }
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.type == "alipay") {
      // this.$route.meta.headName = '支付宝'
      this.$bus.$emit("setHeaderTxt", "支付宝");
    } else if (this.$route.params.type == "ebank") {
      this.$bus.$emit("setHeaderTxt", "网银");
      // this.$route.meta.headName = '网银'
    } else if (this.$route.params.type == "jdpay") {
      this.$bus.$emit("setHeaderTxt", "京东存款");
      // this.$route.meta.headName = '京东存款'
    } else if (this.$route.params.type == "wechat") {
      this.$bus.$emit("setHeaderTxt", "微信存款");
      // this.$route.meta.headName = '微信存款'
    } else if (this.$route.params.type == "unionpay") {
      this.$bus.$emit("setHeaderTxt", "银行扫码");
      // this.$route.meta.headName = '银行扫码'
    } else if (this.$route.params.type == "qqpay") {
      this.$bus.$emit("setHeaderTxt", "QQ存款");
      // this.$route.meta.headName = 'QQ存款'
    } else if (this.$route.params.type == "janPay") {
      this.$bus.$emit("setHeaderTxt", "久安支付");
      // this.$route.meta.headName = '久安支付'
    } else if (this.$route.params.type == "directpay") {
      this.$bus.$emit("setHeaderTxt", "快速支付");
      // this.$route.meta.headName = '快速支付'
    }
    if (this.$route.params.setClasses) {
      this.classes = this.$route.params.setClasses;
    } else {
      if (this.$route.params.type) {
        this.getPaymentConfigInfo({
          terminalType: 1,
          separateMcpay: 1
        })
          .then(res => {
            // 默认选中第一个
            res.data.some(item => {
              if (item.type == this.$route.params.type) {
                this.classes = item;
                return true;
              }
            });
            // this.setPaytype(res.data[0])
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$router.back();
      }
    }
  },
  deactivated() {
    this.$bus.$emit("setHeaderTxt", "");
  },
  beforeDestroy() {
    this.$bus.$emit("setHeaderTxt", "");
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.classes {
  margin: r(20);

  .title {
    @include f(32px);
    line-height: 2;
  }

  .class-items {
    position: relative;
    display: block;
    float: left;
    width: 45%;
    margin-right: r(20);
    background: #b6b6b6;
    text-align: center;
    padding: r(40) 0;
    border-radius: r(15);
    color: #fff;
    @include f(30px);
    margin-bottom: r(20);

    &.active {
      // background: #00a0e9;
      background: #4db7f4;
    }

    &.types {
      background: #fff;
      color: #333;
      border: solid 1px #666;

      &.active {
        background: #4db7f4;
        color: #fff;
        border: solid 1px transparent;
      }
    }
  }
  .flexItem {
    display: flex;
    flex-wrap: wrap;
  }
  .rate4deputy {
    // position: absolute;
    word-break: keep-all;
    @include f(24px);
    border: solid 1px #ff0000;
    background: #ff0000;
    color: #fff;
    padding: r(4) r(3);
    line-height: 1;
    border-radius: r(15);
    z-index: 2;
    display: block;
    margin: r(20) auto 0;
    width: 92%;
  }
}
</style>
