<template>
  <div class="flex_1">
    <div class="drawmoneyBox" v-show="step==1">
      <div class="head-top">
        <headern-nobackground :isBack='true'></headern-nobackground>
        <div class="top-money" v-if="!isAgent">{{userData.accountMoney}} <br> <span>主账户余额</span></div>
        <div class="top-money" v-else>{{userData.slotAccount}}/{{userData.liveAccount}} <br> <span>老虎机佣金余额/其他佣金余额</span></div>
      </div>

      <div class="item-select" v-show='isAgent'>
        <select class="select" v-model="sumitData.tkType">
          <option value="">请选择提款类型</option>
          <option :value="item.value" v-for="item in drawType" :key="item.value">{{item.name}}</option>
        </select>
        <span class="item-selectTitle">提款类型</span>
        <i class="iconfont icon-arrow_r"></i>
      </div>

      <div class="item-select">
        <select class="select" v-model="sumitData.id" v-if="bankList.length" ref="select">
          <option value="">请选择银行卡</option>
          <option v-for="(item,i) in bankList" :value="item.id" :key="i"><span></span>{{item.bankname}}——尾号{{item.bankno}}</option>
        </select>
        <!-- <span class="item-selectTitle" v-if="bankList.length">取款银行</span>
        <span class="item-selectTitle" v-else>暂未绑定银行卡</span> -->
        <span class="iconcent left-icon" v-if="bankList.length" :class="{'ct-ico_bank':!lefeIcon}">{{lefeIcon}}</span>
        <span class="left-icon-no" v-else><i class="iconcent ct-ico_bank"></i>暂未绑定银行卡</span>
        <i class="iconfont icon-arrow_r"></i>
      </div>

      <div class="item-input">
        <span class="item-inputTitle">取款金额(元)：</span>
        <input type="text" class="input inputPHD" v-model.number="sumitData.amount" placeholder="最少100元">
        <span class="cny">￥</span>
      </div>
      <div class="item-select">
        <!-- <div class="select">{{money}}元</div> -->
        <input type="password" v-model="sumitData.password" placeholder="请输入取款密码" class="input1 inputRightPHD" >
        <span class="item-selectTitle">取款密码</span>
      </div>
      <div class="forgetpsd" v-if="bankList.length && isSetPayPwd"><router-link :to="{name: 'forgotPayword'}" >忘记支付密码？</router-link></div>

      <!-- 提示 -->
      <router-link :to="{name: 'personal'}" class="draw-tips" v-if="!userData.accountName">
        <i class="iconcent ct-pic_noticex"></i>
        <p>您还未设置个人资料</p>
      </router-link>
      <router-link :to="{name: 'addbank'}" class="draw-tips" v-else-if="!bankList.length">
        <i class="iconcent ct-pic_noticex"></i>
        <p>您还未绑定银行卡</p>
      </router-link>
      <router-link :to="{name: 'payset'}" class="draw-tips" v-else-if="!isSetPayPwd">
        <i class="iconcent ct-pic_noticex"></i>
        <p>您还未设置支付密码</p>
      </router-link>
      <form-tip v-else>
        <p>1.若遇到提款问题或被取消，请联系在线客服为您查询。</p>
        <p>2.提款姓名与绑定银行卡须与注册信息一致，否则无法提款。</p>
        <p>3.首次提款会进行电话核实、请您保持电话畅通，加速出款的速度。</p>
        <p>4.如利用本平台进行任何洗钱诈骗行为，本公司将保留权力终止会员服务及冻结其账户。</p>     
      </form-tip>
      <!-- 按钮 -->
      <div class="user-personal-update-btn">
        <router-link :to="{name: 'personal'}" class="btn" v-if="!userData.accountName">完善个人资料</router-link>
        <router-link :to="{name: 'addbank'}" class="btn" v-else-if="!bankList.length">绑定银行卡</router-link>
        <router-link :to="{name: 'payset'}" class="btn" v-else-if="!isSetPayPwd">设置支付密码</router-link>
        <button class="btn" @click="submit" v-else>提交</button>
      </div>
    </div>

    <div class="drawmoney-success" v-show="step==2">
      <header-back2></header-back2>
      <div class="drawmoney-ok">
        <i class="iconcent ct-dui"></i>
        <p class="p1">提交取款申请成功</p>
        <p class="p2">+{{sumitData.amount}}</p>
        <p class="info_text" v-show='isUser'>温馨提示：工作人员正在为您处理，如果您的各项资料正确，取款金额会在1小时内到达您的绑定银行账户。</p>
        <p class="info_text" v-show='isAgent'>温馨提示：代理账号提款需要审核，会在12小时内为您到账；我们会尽快为您处理，请您耐心等待，谢谢您的支持！！</p>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" v-if='isUser'><router-link :to="{name:'user_log',params:{type:'withdraw'}}">查看取款记录</router-link></button>
        <button class="btn" @click="done" v-else>完成</button>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "MD5";
import { findUserBankList, withdraw_new } from "@/api/payment";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { withdraw } from "@/controls/money/withdraw";
import formTip from "mobile/components/form-tip1";
import headernNobackground from "mobile/components/head-nobackground";
import headerBack2 from "mobile/master/t1/page-in";
export default {
  mixins: [withdraw],
  data() {
    return {
      step: 1,
      canAddcard: false, //判断是否能显示银行卡
      lefeIcon: null
    };
  },
  watch: {
    "sumitData.id"(val) {
      let index = this.$refs.select.selectedIndex;
      if (index) {
        let text = this.$refs.select.options[index].text;
        this.lefeIcon = text.substr(0, 1);
      } else {
        this.lefeIcon = null;
      }
    }
  },
  methods: {
    ...mapActions(["LOGIN_OUT", "UPDATE_MONEY"]),
    submit() {
      this.drawSubmit(this.sumitData)
        .then(res => {
          window.toast(res.message);
          this.step = 2;
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    done () {
      this.step = 1;
    }
  },
  computed: {
    ...mapGetters(["userData", "isSetPayPwd", "isAgent", "isUser", "money"])
  },
  created() {
    this.getBankList();
  },
  components: { formTip, headernNobackground ,headerBack2}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.drawmoneyBox {
  .head-top {
    background: url(./images/Bitmap@2x.jpg) no-repeat center/100% 100%;
    min-height: r(359);
    margin-bottom: r(20);
    .top-money {
      text-align: center;
      color: #fff;
      @include f(48px);
      padding-top: r(60);
      span {
        @include f(28px);
      }
    }
  }
  .item-select {
    border-top: 1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
    margin-bottom: r(20);
    height: r(90);
    position: relative;
    background: #ffffff;
    display: flex;
    align-items: center;
    .icon-arrow_r {
      position: absolute;
      right: r(30);
      top: 50%;
      transform: translateY(-50%);
      margin-top: r(3);
    }
    .select {
      display: block;
      width: 100%;
      padding: 0 r(70);
      height: r(90);
      line-height: r(90);
      border: none;
      z-index: 9;
      position: relative;
      direction: rtl;
      &:focus {
        border: none;
        outline-color: transparent;
      }
    }
    .input1 {
      display: block;
      width: 100%;
      padding: 0 r(70) 0 r(200);
      height: r(90);
      line-height: r(90);
      border: none;
      z-index: 9;
      position: relative;
      &:focus {
        border: none;
        outline-color: transparent;
      }
    }
    .item-selectTitle {
      font-family: PingFangSC-Regular;
      @include f(28px);
      color: #000;
      position: absolute;
      left: r(20);
      top: 50%;
      transform: translateY(-50%);
      z-index: 99;
    }
    .left-icon {
      position: absolute;
      left: r(20);
      background: $cl1;
      color: #ffffff;
      border-radius: 50%;
      padding: r(8);
      @include f(24px);
      &.ct-ico_bank {
        background: #ffffff;
        color: $cl1;
        padding: 0;
        @include f(40px);
      }
    }
    .left-icon-no {
      position: absolute;
      left: r(20);
      .ct-ico_bank {
        background: #ffffff;
        color: $cl1;
        padding: 0;
        @include f(40px);
        vertical-align: middle;
        margin-right: r(15);
      }
    }
  }
  .item-input {
    border-top: 1px solid rgba($color: #ddd, $alpha: .6);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
    margin-bottom: r(20);
    position: relative;
    padding: r(20);
    background: #ffffff;

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
      transform: translateY(-50%);
      top: 61%;
    }

    .item-inputTitle {
      @include f(28px);
      margin-bottom: r(30);
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
  .draw-tips {
    display: block;
    color: $cl1;
    text-align: center;
    padding: r(100) 0;
    .iconcent {
      @include f(100px);
      margin-bottom: r(20);
      display: inline-block;
    }
  }
  .forgetpsd {
    text-align: right;
    padding-right: r(30);
    color: $cl1;
  }
}
.drawmoney-ok{
  text-align: center;
  padding: r(60) 0;
  background: #ffffff;
  .iconcent {
    color: $cl1;
    @include f(100px);
  }
  .p1 {
    color: $cl1;
    margin: r(20) 0 ;
    @include f(30px);
  }
  .p2 {
    @include f(48px);
  }
  .info_text {
    padding: r(20) r(60);
    color: red;
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
</style>
