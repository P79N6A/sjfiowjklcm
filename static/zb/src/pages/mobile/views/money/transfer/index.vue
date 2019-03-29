<template>
<div class="transferBox">
  <div class="transfer" v-show="step==1">
    <div class="head-top">
     <headern-nobackground :isBack='true'></headern-nobackground>
      <div class="top-money">{{wallet['MAIN']}} <br> 
      <span>主账户余额</span><br>
      <span class="transferall" @click="transferAll">资金一键归户</span>
      </div>
    </div>

    <div class="transfer-select">
      <div class="transfer-select-name">
        <span class="transfer-name-out">转出账户</span>
        <span class="transfer-name-in">转入账户</span>
      </div>
      <div class="transfer-select-plat">
        <select class="transfer-plat-out" v-model="data.transferGameOut">
          <option value=''>请选择转出账户</option>
          <option :nameVal="item.name" v-for="item in Money" :value="item.value" :key="item.value">
            {{item.name}}
          </option>
        </select>
        <select class="transfer-plat-in" v-model="data.transferGameIn">
          <option value=''>请选择转入账户</option>
          <option :nameVal="item.name" v-for="item in filterMoney" :value="item.value" :key="item.value">
            {{item.name}}
          </option>
        </select>
        <i class="icoturn iconcent ct-convert"></i>
      </div>   
      <span class="sanjiao1"></span>  
      <span class="sanjiao2"></span>  
    </div>
    <div class="transfer-showmoney">
      <div class="transfer-select-name">
        <span class="transfer-name-out">余额</span>
        <span class="transfer-name-in">余额</span>
      </div>
      <div class="transfer-select-name">
        <span class="transfer-name-out moneyOut">{{(wallet[data.transferGameOut] || wallet[data.transferGameOut] == 0 ) ? wallet[data.transferGameOut] : '- -'}}</span>
        <span class="transfer-name-in moneyIn" v-if="showIn">{{(wallet[data.transferGameIn] || wallet[data.transferGameIn] == 0) ? wallet[data.transferGameIn]  : '- -'}}</span>
        <span class="transfer-name-in moneyIn" v-else>- -</span>
      </div>
    </div>
    <div class="item-input">
      <span class="item-inputTitle">转账金额(元)：</span>
      <input type="text" class="input inputPHD" v-model.number="data.transferGameMoney" placeholder="请输入转账金额">
      <span class="cny">￥</span>
    </div>
    <form-tip>
      <p>1.请在户内转账前进行平台激活，激活后方可转账</p>
      <p>2.激活方法：登入官网>进入需要激活的游戏平台>选择游戏>加载游戏完成后退出即可。</p>
      <p>3.户内转账只支持整数转账，最低转账金额为1元。</p> 
      <p>4.进行户内转账时，请先关闭正在进行的游戏页面，避免出现错误。</p> 
    </form-tip>
    <div class="user-personal-update-btn">
      <button class="btn" @click="transfer">转账</button>
    </div>
  </div>

  <div class="transfer-success" v-show="step==2">
    <header-back2></header-back2>
    <div class="transfer-ok">
      <i class="iconcent ct-dui"></i>
      <p class="p1">转账成功</p>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="step = '1'">完成</button>
    </div>
  </div>
</div>
</template>
<script>
import { updateGameMoney } from "@/api/payment";
import { getGameMoney } from "@/api/user";
import { platformData } from "@/assets/data";
import { Money } from "@/assets/data";
import { transfer } from "@/controls/money/transfer";
import { mapGetters, mapActions, mapMutations } from "vuex";
import formTip from "mobile/components/form-tip1"
import headernNobackground from "mobile/components/head-nobackground";
import headerBack2 from "mobile/master/t1/page-in";
export default {
  mixins: [transfer],
  data() {
    return {
      step: 1,
      Money,
      newMoney: [],
      gamelen: "",
      showIn:true,
      data: {
        transferGameOut: "",
        transferGameIn: "",
        transferGameMoney: ""
      },
      isxuanzhuan: false
    };
  },
  methods: {
    ...mapActions(["UPDATE_MONEY"]),
    // submitForm(formName) {
    //     this.drawSuccess = true
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         this.transferSubmit(this.data).then(res=>{
    //           window.toast(res.message)
    //           this.resetForm('transferForm')
    //         }).catch(err=>{
    //           window.toast(err.message)
    //         })
    //       } else {
    //         return false;
    //       }
    //     });
    //   },
    transferAll() {
      window.$confirm(
        '<p style="text-align:left;">1.游戏平台余额只会回收整数部分。<br/>2.领取优惠但未完成流水的游戏余额不会被归集。<br/>3.资金归集可能需要较长时间，请耐心等待。</p>',
        "温馨提示",
        {
          confirmText: "确认",
          cancelText: "取消"
        }
      ).then(
        () => {
        // 确认，发出归集请求
        window.setTimeout(()=>{
          const postData = {
            transferGameOut: "ALL_V2",
            transferGameIn: "MAIN",
            transferGameMoney: 0
          };
          // 查看进度按钮
            updateGameMoney(postData).then(res => {
                if (res.success) {
                  this.$bus.$emit('showTransferProce',true)
                  window.toast(res.message)
                } else {
                  window.toast(res.message)
                }
              })
              .catch(err => {
                window.toast(err.message)
              });
          },300)
        },
        () => {

          // 取消，查看订单
        });
    },
    transfer(){
      this.transferSubmit(this.data).then(res=>{
        window.toast(res.message)
        this.step = 2;
      }).catch(err=>{
        window.toast(err.message)
      })
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      refresh(val){
        console.log(val);
        // this.UPDATE_MONEY(val); // control里已经监听更新了
      },
    chooseIt(item) {
      this.data.transferGameOut = item.value;
      this.isxuanzhuan = true;
    }
  },
  computed: {
    ...mapGetters(["userData", "isUser", "unread", "wallet"]),
    filterMoney(){
      return this.Money.filter((item)=>{
        return item.value!= this.data.transferGameOut
      })
    }
  },
  created() {
    // console.log(Money);
    // console.log(this.wallet);
    // this.newMoney = Money;
    // if (this.newMoney[0].value == "MAIN") {
    //   this.newMoney.shift();
    // }
  },
  watch: {
    'data.transferGameOut'(val) {
      if(val == this.data.transferGameIn){
        this.showIn =false;
      }else {
        this.showIn =true;
      }
    },
    'data.transferGameIn'(val) {
      this.showIn =true;
    }
  },
  components: { formTip, headernNobackground ,headerBack2}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.transfer {
  // padding:r(30);
  .head-top {
    background: url(./images/Bitmap@2x.jpg) no-repeat center/100% 100%;
    min-height: r(359);
    margin-bottom: r(20);
    .top-money {
      text-align: center;
      color: #fff;
      @include f(48px);
      padding-top: r(60);
      position: relative;
      span {
        @include f(28px);
      }
    }
    .transferall{
      background: #8d7fda;
      border-radius: r(15);
      padding: r(15) r(20);
      position: absolute;
      right: r(30);
      bottom: r(30);
    }
  }
  .transfer-select {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    background: #fff;
    padding: r(20) r(30);
    position: relative;
    .sanjiao1 {
      &::before {
        content: "";
        z-index: 1;
        position: absolute;
        left: r(50);
        bottom: 0;
        height: 0;
        width: 0;
        border: r(10) solid transparent;
        border-bottom-color: #dddddd;
      }
      &::after {
        content: "";
        z-index: 1;
        position: absolute;
        left: r(50);
        bottom: -1px;
        height: 0;
        width: 0;
        border: r(10) solid transparent;
        border-bottom-color: #ffffff;
      }
    }
    .sanjiao2 {
      &::before {
        content: "";
        z-index: 1;
        position: absolute;
        right: r(50);
        bottom: 0;
        height: 0;
        width: 0;
        border: r(10) solid transparent;
        border-bottom-color: #dddddd;
      }
      &::after {
        content: "";
        z-index: 1;
        position: absolute;
        right: r(50);
        bottom: -1px;
        height: 0;
        width: 0;
        border: r(10) solid transparent;
        border-bottom-color: #ffffff;
      }
    }
    .transfer-select-plat {
      display: flex;
      position: relative;
      .transfer-plat-out {
        flex: 1;
        text-align: left;
        border: none;
        @include f(30px);
        color: #999;
        &:focus {
          border: none;
          outline-color: transparent;
        }
      }
      .transfer-plat-in {
        flex: 1;
        text-align: right;
        border: none;
        @include f(30px);
        color: #999;
        direction: rtl;
        &:focus {
          border: none;
          outline-color: transparent;
        }
      }
      option{
        color: #000;
      }
      .icoturn {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        @include f(48px);
        color: $cl1;
      }
    }
  }
  .transfer-select-name {
    display: flex;
    margin-bottom: r(20);
    .transfer-name-out {
      flex: 1;
      text-align: left;
    }
    .transfer-name-in {
      flex: 1;
      text-align: right;
    }
  }
  .transfer-showmoney {
    background: #ffffff;
    padding: r(20) r(30) 0;
    margin-bottom: r(20);
    border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
    .moneyOut , .moneyIn {
      color: $cl3;
      @include f(32px);
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
  .transfer-ok{
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
@keyframes rotateImg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotateImg {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>
