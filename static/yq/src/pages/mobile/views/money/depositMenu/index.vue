<template>
  <div id="j-title-content" class="contents" style="display: block;">
    <div class="center-top">
      <div class="o-wrapper">
        <div class="balance">
          <p class="amount-tit">主账户余额</p>
          <div>￥{{wallet['MAIN']}}</div>
        </div>
      </div>
    </div>
    <div class="center-list pay-tabctrl">
      <ul>
        <li
          class="title"
          id="deposit-juanZ"
          v-for="(item,i) in payMenus"
          @click="setPaytype(item)"
          :key="i"
        >
          <i class="left iconfont" :class="icos[item.type]"></i>
          <div class="deposit-title">
            {{item.name}}
            <!-- <img src="./img/ico2.png" v-if="item.rate4deputy" class="tips"> -->
            <span class="tips1" v-if="item.rate4deputy">赠2%，延迟即赔高达50%</span>
          </div>
          <i class="iconfont icon--youjiantou right"></i>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { depositMenu } from "@/controls/money/deposit";
// import vFooter from 'mobile/master/t1/show/components/footer'
export default {
  mixins: [depositMenu],
  data() {
    return {
      icos: {
        wechat: "iconfont icon-wechat",
        qq: "iconfont icon-QQ",
        alipay: "iconfont icon-big-Pay",
        jdpay: "iconfont icon-jingdong",
        ebank: "iconfont icon-yinxingqia",
        unionpay: "iconfont icon-saoma",
        directpay: "iconfont icon-zhuanzhang"
      }
    };
  },
  methods: {
    setPaytype(item) {
      if (this.paySelect == item) return;
      this.paySelect = item;
      this.$bus.$emit("setClasses", item);
      // if (this.$route.name == "app_deposit") {
      //   this.$router.push({
      //     name: "app_depositItem",
      //     params: { type: item.type, setClasses: item }
      //   });
      // } else {
      this.$router.push({
        name: "money_deposit",
        params: { type: item.type, setClasses: item }
      });
      // }
    }
  },
  created() {
    this.$bus.$emit("setBackHeader", "存款");
    this.getPaymentConfigInfo({ terminalType: 1, separateMcpay: 1 })
      .then(res => {
        // 默认选中第一个
        // this.setPaytype(res.data[0])
      })
      .catch(err => {
        console.log(err);
      });
    console.log(this.payMenus);
  },
  mounted() {
    this.$bus.$emit("setFooter", false);
  },
  activated() {
    this.$bus.$emit("setFooter", false);
  },
  deactivated() {
    this.$bus.$emit("setFooter", true);
  },
  beforeDestroy() {
    this.$bus.$emit("setFooter", true);
  },
  computed: {
    ...mapGetters(["userData", "wallet"])
  },
  props: {
    back: {
      type: Function
    }
  }
  // components: {vFooter}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.contents {
  padding: 0;
}
.o-wrapper {
  min-height: r(150);
  padding: r(40) 0;
  font-weight: 600;
  letter-spacing: r(2);
  overflow: hidden;
  background: url("./img/deposit-bg.jpg");
  background-size: 100% 100%;
  .balance {
    color: #fff;
    text-align: center;
    .amount-tit {
      color: #fff;
      padding: 0 0 6px 0;
      @include f(32px);
      line-height: 2;
    }
    div {
      border-radius: 20px;
      color: #fff;
      @include f(32px);
      width: 10em;
      margin: 0 auto;
    }
  }
}
.center-list {
  ul,
  ol,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .title {
    height: r(98);
    line-height: r(98);
    padding: 0 0 0 10px;
    letter-spacing: 0;
    font-size: 1.8rem;
    text-indent: 0;
    text-align: left;
    color: #747474;
    border-bottom: 1px solid #e2e2e3;
    position: relative;
    background: #fff;
    margin-bottom: r(10);
    .deposit-title {
      left: r(145);
      position: absolute;
      top: 0px;
      @include f(32px);
      font-weight: bold;
    }
    .tips {
      display: inline-block;
      height: r(45);
      margin-left: r(10);
      margin-top: r(-9);
    }
    .tips1 {
      display: inline-block;
      height: r(45);
      margin-left: r(10);
      margin-top: r(-9);
      background: #ea5048;
      color: #fff;
      line-height: r(45);
      padding: 0 r(15);
      border-radius: r(20);
      @include f(28px);
    }
    .right {
      @include f(44px);
      position: absolute;
      right: r(10);
      color: #cccccc;
    }
    .left {
      @include f(60px);
      position: absolute;
      left: r(30);
      color: #4db7f4;
      text-align: center;
      width: r(80);
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#ea5048),
        to(#ea5048)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .icon-wechat {
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#2be028),
        to(#2be028)
      );
    }
    .icon-big-Pay {
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#1296db),
        to(#1296db)
      );
    }
    .icon-yinxingqia {
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#fd9d80),
        to(#fd9d80)
      );
    }
    .icon-saoma {
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#4db7f4),
        to(#ea5048)
      );
    }
  }
}
</style>
