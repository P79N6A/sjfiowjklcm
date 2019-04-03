<template>
  <div class="save-sendTip" v-if="!userData.accountName">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'personal'}" class="btn">完善资料</router-link>
    </div>
  </div>
  <div class="save-sendTip" v-else-if="userData.phoneValidStatus == '0'">
    <i class="iconcent ct-tishi"></i>
    <div class="tips">{{errTips}}</div>
    <div class="user-personal-update-btn">
      <router-link :to="{name:'verify'}" class="btn">验证手机</router-link>
    </div>
  </div>
  <div class="save-send" v-else>
    <div class="save-send-item">
      <div class="save-send-item-select">
        <select name="platform" class="select" v-model="Type">
          <option value>选择平台</option>
          <option v-for="(item,i) in platformData" :value="item.value" :key="i">{{item.name}}</option>
        </select>
        <span class="save-send-item-selectTitle">存送优惠平台</span>
        <!-- <span class="save-send-item-selectTips" v-show="!Type">选择平台</span>
        <i class="iconcent ct-jiantou" v-show="!Type"></i>-->
      </div>
      <div class="save-send-item-select">
        <select name="youhuiConfigId" class="select" v-model="submitData.youhuiConfigId">
          <option value>选择类型</option>
          <option
            v-for="(item,i) in listData"
            :value="item.id"
            :key="i"
            v-if="item.platform==Type"
          >{{item.name}}</option>
        </select>
        <span class="save-send-item-selectTitle">存送优惠类型</span>
        <!-- <span class="save-send-item-selectTips" v-show="!submitData.youhuiConfigId">选择类型</span>
        <i class="iconcent ct-jiantou" v-show="!submitData.youhuiConfigId"></i>-->
      </div>
      <div class="save-send-item-input">
        <span class="save-send-item-inputTitle">转账金额(元)：</span>
        <input type="text" v-model="submitData.remit" class="input">
        <span class="cny">￥</span>
      </div>
    </div>
    <div class="save-send-item">
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">红利金额</span>
        <span class="save-send-item-selectTips">{{percentMoney | toFixed}}元</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">取款流水要求</span>
        <span class="save-send-item-selectTips">{{limitMoney | toFixed}}元</span>
      </div>
      <div class="save-send-item-select">
        <span class="save-send-item-selectTitle">流水倍数</span>
        <span class="save-send-item-selectTips">{{betMultiples}}</span>
      </div>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submit">确定转入</button>
    </div>
    <form-tip>
      <p>1、每天的00:00-01:00为系统结算时间，暂时无法使用自助存送。</p>
      <p>2、申请存送后台彩金会自动添加到相应平台，您直接进入游戏即可。</p>
      <p>3、存送优惠活动有相应的游戏限制，请您在申请时详细了解该优惠活动规则及限制游戏，如违反活动规则，例如投注限制游戏等，将取消申领资格，扣除所有红利及盈利。</p>
    </form-tip>
  </div>
</template>
<script>
import { youhui, getSelfYouHuiObject } from "@/api/preferential-terms";
import formTip from "mobile/components/form-tip1";
import { mapGetters } from "vuex";
import { saveSend } from "@/controls/discount/saveSend";
export default {
  mixins: [saveSend],
  data() {
    return {
      errTips: ""
    };
  },
  methods: {
    submit() {
      this.saveSendSubmit(this.submitData)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  watch: {},
  computed: {
    ...mapGetters(["userData"])
  },
  created() {
    this.getYouHui();
    if (!this.userData.accountName) {
      this.errTips = "您还未设置个人资料";
    } else if (this.userData.phoneValidStatus == "0") {
      this.errTips = "您还未验证手机号码";
    }
  },
  components: {
    formTip
  }
};
</script>

<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin";

::-webkit-input-placeholder {
  /* WebKit browsers */
  font-family: PingFangSC-Regular;
  @include f(28px);
  color: #888;
  line-height: r(40);
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  font-family: PingFangSC-Regular;
  @include f(28px);
  color: #888;
  line-height: r(40);
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  font-family: PingFangSC-Regular;
  @include f(28px);
  color: #888;
  line-height: r(40);
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  font-family: PingFangSC-Regular;
  @include f(28px);
  color: #888;
  line-height: r(40);
}

.save-sendTip {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  position: relative;
  // background: #fff;
  height: 70vh;
  .user-personal-update-btn {
    position: absolute;
    bottom: r(100);
  }
  .iconcent {
    color: $cl1;
    @include f(85px);
    margin-bottom: r(45);
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .tips {
    font-family: PingFangSC-Regular;
    @include f(24px);
    color: $cl1;
    letter-spacing: 0;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.save-send {
  background: #f7f7f7;
  padding: r(20) 0;

  .save-send-item {
    background: #fff;
    box-shadow: inset 0 -1px 0 0 #ddd;
    margin-bottom: r(20);

    .save-send-item-select {
      box-shadow: inset 0 1px 0 0 #ddd;
      height: r(90);
      position: relative;

      .select {
        width: 100%;
        padding: 0 r(70) 0 r(300);
        height: r(90);
        border: none;
        z-index: 99;
        position: relative;
        direction: rtl;

        &:focus {
          border: none;
          outline-color: transparent;
        }
      }

      .save-send-item-selectTitle {
        font-family: PingFangSC-Regular;
        @include f(28px);
        color: #000;
        line-height: r(90);
        position: absolute;
        left: r(20);
        top: 0;
      }

      .save-send-item-selectTips {
        font-family: PingFangSC-Regular;
        @include f(26px);
        color: #888;
        line-height: r(90);
        position: absolute;
        right: r(70);
        top: 0;
      }

      .iconcent {
        color: #c7c7c7;
        @include f(40px);
        line-height: r(90);
        position: absolute;
        right: r(20);
        top: 0;
      }
    }

    .save-send-item-input {
      box-shadow: inset 0 1px 0 0 #ddd;
      // height: r(105);
      position: relative;
      padding: r(20);

      .input {
        width: 100%;
        border: none;
        line-height: r(105);
        @include f(48px);
        padding-left: r(60);
        font-family: STXihei;
        color: #ff3b30;
      }

      .cny {
        color: #ff3b30;
        @include f(48px);
        position: absolute;
        transform: translateY(-50%);
        top: 61%;
      }

      .save-send-item-inputTitle {
        @include f(28px);
        margin-bottom: r(30);
      }
    }
  }
}

.user-personal-update-btn {
  width: 100%;
  // position: absolute;
  // bottom: r(100);
  text-align: center;
  padding-bottom: r(30);
  padding-top: r(30);

  .btn {
    width: 94%;
    // margin: 0 auto;
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
</style>
