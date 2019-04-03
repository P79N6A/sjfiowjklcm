<template>
  <div class="flex_1">
    <div class="drawmoneyBox" v-show="step==1">
      <div class="head-top">
        <div class="top-money" v-if="!isAgent">
          <span>主账户余额</span>
          <br>
          {{userData.accountMoney}}
        </div>
        <div class="top-money" v-else>
          <span>老虎机佣金余额/其他佣金余额</span>
          <br>
          {{userData.slotAccount}}/{{userData.liveAccount}}
        </div>
      </div>
      <div class="btns">
        <span>银行卡提款</span>
      </div>

      <div class="inputs" v-show="isAgent">
        <h4>提款类型</h4>
        <select class="select" v-model="sumitData.tkType">
          <option value>请选择提款类型</option>
          <option :value="item.value" v-for="item in drawType" :key="item.value">{{item.name}}</option>
        </select>
      </div>

      <div class="inputs">
        <h4>提款银行</h4>
        <select v-model="sumitData.id">
          <option value>请选择提款银行类型</option>
          <option v-for="(item,i) in bankList" :value="item.id" :key="i">{{item.bankname}}</option>
          <option value="add" v-if="bankList.length<3">+添加新银行卡</option>
        </select>
      </div>

      <div class="inputs">
        <h4>提款银行</h4>
        <input
          readonly
          class="readonly"
          v-for="(item,i) in bankList"
          :value="'******'+item.bankno"
          :key="i"
          v-show="item.id==sumitData.id"
        >
        <input v-if="!sumitData.id" readonly class="readonly">
        <router-link class="i-btn" :to="{name:'addbank'}">绑定银行卡</router-link>
      </div>

      <div class="inputs">
        <h4>提款金额</h4>
        <input v-model.number="sumitData.amount" placeholder="最少100元">
        <a class="i-btn" @click="getAllMoney">全部</a>
      </div>

      <div class="inputs">
        <h4>提款密码</h4>
        <input type="password" v-model="sumitData.password" placeholder="请输入取款密码" maxlength="16">
        <router-link class="i-btn" :to="{name:'personalList'}">修改提款密码</router-link>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" @click="submit">提交</button>
      </div>

      <form-tip v-show="isUser">
        <p>1、若遇到提款问题或被取消，请联系在线客服为您查询！</p>
        <p>2、提款姓名与卡号须与注册信息一致，否则无法提款。</p>
        <p>3、若不申请任何优惠，须存款量的一倍流水才可以申请提款。</p>
      </form-tip>
      <form-tip v-show="isAgent">
        <p>1、提款时 【银行卡姓名】必须与 注册姓名一致，否则无法出款。</p>
        <p>2、提款后风控审核，请合作伙伴耐心等待，12小时内到账!</p>
      </form-tip>
    </div>

    <div class="drawmoney-success" v-show="step==2">
      <!-- <header-back2></header-back2> -->
      <div class="drawmoney-ok">
        <i class="iconcent ct-dui"></i>
        <p class="p1">提交取款申请成功</p>
        <p class="p2">+{{sumitData.amount}}</p>
        <p class="info_text" v-show="isUser">温馨提示：工作人员正在为您处理，如果您的各项资料正确，取款金额会在1小时内到达您的绑定银行账户。</p>
        <p class="info_text" v-show="isAgent">温馨提示：代理账号提款需要审核，会在12小时内为您到账；我们会尽快为您处理，请您耐心等待，谢谢您的支持！！</p>
      </div>
      <div class="user-personal-update-btn">
        <button class="btn" v-if="isUser">
          <router-link :to="{name:'user_log',params:{type:'withdraw'}}">查看取款记录</router-link>
        </button>
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
      // let index = this.$refs.select.selectedIndex;
      // if (index) {
      //   let text = this.$refs.select.options[index].text;
      //   this.lefeIcon = text.substr(0, 1);
      // } else {
      //   this.lefeIcon = null;
      // }
      if (val == "add") {
        this.sumitData.id = "";
        this.$router.push({ name: "addbank" });
      }
    },
    isSetPayPwd(val) {
      if (!val) {
        $alert("请先设置支付密码", "提示", {
          confirmText: "立即设置"
        }).then(() => {
          this.$router.push({ name: "payset" });
        });
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
    done() {
      this.step = 1;
    },
    getAllMoney() {
      if (this.isAgent) {
        if(this.sumitData.tkType == 'slotmachine'){
          this.sumitData.amount = Math.floor(this.wallet["SLOT"]);
        }else {
          this.sumitData.amount = Math.floor(this.wallet["LIVE"]);
        }
      } else {
        this.sumitData.amount = Math.floor(this.wallet["MAIN"]);
      }
    }
  },
  computed: {
    ...mapGetters(["userData", "isSetPayPwd", "isAgent", "wallet", "isUser"])
  },
  created() {
    if (!this.userData.accountName) {
      $alert("<p>请您先在账户设置里绑定您的真实姓名或银行卡，以便快速提款。</p>"
        ,  {
          cancelText: "取消",
          confirmText: "前往个人资料设置"
        }).then(() => {
        // 确认 废弃并生成新订单
          this.$router.push({name:'personal'})
        }, () => {
          // 取消  查看订单
          return false
      });
    }
    
    this.getBankList().then(res=>{
        console.log(res.data)
        if (res.data.length==0) {
          $alert("<p>请您先在账户设置里绑定您的真实姓名或银行卡，以便快速提款。</p>"
            ,  {
              cancelText: "取消",
              confirmText: "前往个人资料设置"
            }).then(() => {
            // 确认 废弃并生成新订单
              this.$router.push({name:'personal'})
            }, () => {
              // 取消  查看订单
              return false
          });
        }
    })
    console.log(this.isSetPayPwd);
  },
  components: { formTip, headernNobackground, headerBack2 }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.drawmoneyBox {
  .head-top {
    background: url(./images/balance-bg1.png) no-repeat center/100% 100%;
    min-height: r(180);
    margin-bottom: r(20);
    .top-money {
      text-align: center;
      color: #fff;
      @include f(44px);
      padding-top: r(35);
      span {
        // @include f(28px);
        margin-bottom: r(8);
        display: inline-block;
      }
    }
  }
  .btns {
    text-align: center;
    margin-bottom: r(20);
    span {
      border-radius: 4px;
      display: inline-block;
      color: #fff;
      background: #4db7f4;
      padding: r(30) r(100);
      @include f(28px);
    }
  }
  .inputs {
    margin: 0 r(20);
    position: relative;
    @include f(32);
    h4 {
      line-height: r(80);
      font-weight: normal;
    }
    input,
    select {
      width: 100%;
      height: r(80);
      border: solid 1px #dedede;
      border-radius: 6px;
      background: #fff;
      border-radius: 4px;
      text-indent: r(20);
      &.readonly {
        background: #eee;
      }
    }
    .i-btn {
      position: absolute;
      bottom: 0;
      border-radius: 0 4px 4px 0;
      right: 0;
      background: #ff3e3e;
      line-height: r(80);
      height: r(80);
      color: #fff;
      @include f(30);
      padding: 0 r(20);
      min-width: r(80);
      text-align: center;
    }
  }
}

.drawmoney-ok {
  text-align: center;
  padding: r(60) 0;
  background: #ffffff;
  .iconcent {
    color: $cl1;
    @include f(100px);
  }
  .p1 {
    color: $cl1;
    margin: r(20) 0;
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
