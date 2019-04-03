<template>
  <div>
    <div class="bankList">
      <div class="title">已绑定银行卡({{list.length}})张</div>
      <div class="bank" v-for="(item,i) in list" :key="i" :class="getClass(item)">
        <div class="bankTitle">
          <span class="bankIco">{{item.bankname.substr(0,1)}}</span>
          <span class="bankName">{{item.bankname}}</span>
        </div>
        <div class="bankNumber">**** **** **** {{item.bankno}}</div>
      </div>

      <!-- <router-link class="bank" :to="{name:'addbank'}" v-if="list.length<3" tag="div"> -->
      <div class="bank" v-if="list.length<3" @click="addBank">
        <p>
          <i class="iconcent ct-icon02"></i>添加银行卡
        </p>
      </div>
    </div>
    <p class="tips">温馨提示：</p>
    <form-tip>
      <p>1、为了您账户安全，您必须绑定银行卡/折号才可提款！</p>
      <p>2、您最多可以绑定三张不同类别银行卡进行提款。</p>
      <p>3、如须解绑，请您联系24小时在线客服提供您的相关资料，核实正确会为您解绑。</p>
      <p>4、请您保护好您的相关资料，如因您自己泄露资料而造成款项的流失，公司概不负责。</p>
    </form-tip>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { bank } from "@/controls/common/bank";
import formTip from "mobile/components/form-tip1";
export default {
  mixins: [bank],
  data() {
    return {};
  },
  methods: {
    getClass(item) {
      switch (item.bankname) {
        case "中国银行":
          return "bg1";
        case "中国农业银行":
        case "农业银行":
          return "bg2";
        case "光大银行":
          return "bg3";
        case "交通银行":
          return "bg4";
        case "民生银行":
          return "bg5";
        case "中国建设银行":
        case "建设银行":
          return "bg6";
        case "北京银行":
          return "bg7";
        case "华夏银行":
          return "bg8";
        case "邮政储蓄":
          return "bg9";
        case "兴业银行":
          return "bg10";
        case "":
          return "bg11";
        case "工商银行":
          return "bg12";
        case "招商银行":
          return "bg13";
        default:
          return "bg11";
      }
    },
    addBank() {
      if (!this.userData.accountName) {
        $alert("请先完善您的个人资料", "提示", {
          confirmText: "确认"
        }).then(() => {
          // 确认
          this.$router.push({ name: "personal" });
        });
      } else {
        this.$router.push({ name: "addbank" });
      }
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },
  created() {
    this.getBankList();
    this.$bus.$on("getBankList", eventData => {
      this.getBankList();
    });
  },
  components: {
    formTip
  },
  activated() {
    this.getBankList();
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.bankList {
  background: #f7f7f7;
  background: #fff;
  padding-bottom: r(20);
  .title {
    line-height: r(80);
    border-bottom: solid 1px #ccc;
    margin-bottom: r(20);
    padding-left: r(20);
    @include f(28px);
  }

  .bank {
    height: r(80);
    border-radius: 6px;
    border: solid 1px#ccc;
    color: #aaa;
    position: relative;
    background-size: 100% 100%;
    margin: r(30) r(20);
    color: #777;
    .bankTitle {
      padding-left: r(20);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      line-height: r(50);
      width: 100%;
      text-align: left;
      padding-right: r(30);
      .bankIco {
        border-radius: 50%;
        background: #fff;
        color: #23afff;
        padding: r(12);
        display: inline-block;
        font-weight: bold;
        @include f(30px);
      }
      .bankName {
        font-family: PingFangSC-Regular;
        @include f(28px);
      }
    }
    .bankNumber {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      font-family: STXihei;
      @include f(36px);
      line-height: r(50);
      width: 100%;
      text-align: right;
      padding-right: r(30);
    }
    .iconcent {
      @include f(38px);
      color: $cl1;
      margin-right: r(10);
    }
    p {
      line-height: r(80);
      font-family: STXihei;
      @include f(28px);
      color: #303030;
      letter-spacing: 0;
      text-align: center;
      padding-left: r(10);
    }
  }
}
.tips {
  color: #ea5048;
  padding: r(20) r(30) 0;
  @include f(28px);
}
.formTips {
  p {
    color: #000 !important;
    line-height: 1.7 !important;
    @include f(28px);
  }
}
</style>
