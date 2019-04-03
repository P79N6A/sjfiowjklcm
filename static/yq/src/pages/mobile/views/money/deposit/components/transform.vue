<template>
  <div class="page_content_wrap thirdPay_type">
    <div class="pay-top">使用最新版微信<span class='red-text'>【转账到银行】</span>功能转账到以下收款账户</div>
    <div class="sec_box j-sec_box">
      <p class="pay-title">我们的收款账户</p>
        <table class="pay-table">
          <tbody v-if="DepositBankCard.length">
            <tr v-for="item in DepositBankCard">
              <td width="30%">银行类型</td>
              <td>{{DepositBankCard[0].bank}}</td>
            </tr>
            <tr>
              <td width="30%">银行卡号</td>
              <td>{{DepositBankCard[0].cardNo}}</td>
            </tr>
            <tr>
              <td width="30%">开户人</td>
              <td>{{DepositBankCard[0].accountName}}</td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="btns">
      <span @click="gokefu()" class="t_btn">我已成功付款</span>
    </div>
    <!-- <div class="btn_wrap j-btn">
      <v-button  @click="gokefu()">我已完成付款</v-button>
    </div> -->
    <div class="pay_tips">
      <p class="p_tips_title">温馨提示</p>
      <div class="p_tips_content">
        <p>1.请存入<span class='red-text'>带小数点</span>位数的存款金额,以加速专员匹配您的款项</p>
        <p>2.存款完毕后，您点击“<span class="red-text">我已成功付款</span>”后，页面将会自动跳转至在线客服，请<span class="red-text">提供您的账号、存款截图至在线客服</span>,将会马上为您查询上分!</p>
      </div>
    </div>
  </div>
</template>
<script>
  import {getDepositBankCard4User} from "@/api/payment"
  import  {SETTING} from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,
        DepositBankCard:[],
        paySelect: 'kefu',
        payTypeCh: [
          {
            type: "kefu",
            title: '支付宝/网银',
            class: "icon-translate"
          }
        ]
      }
    },
    watch: {
    },
    methods: {
      getDepositBankCard4User(){
        if(!this.DepositBankCard.length){
          getDepositBankCard4User({"type":2}).then((res) => {
            if (res.success) {
              this.DepositBankCard = res.data;
              if(res.data.length==0){
                $alert("您的活跃度不足，请使用其他存款通道提升活跃度！").then(()=>{
                  this.$router.back();
                })
              }
            }else{

            }
          });
        }
      },
      gokefu(){
        window.location.href=this.SETTING.live800
      },
    },
    computed: {
    },
    created() {
      this.getDepositBankCard4User();
    },
    components: {}
  };
</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .pay-top{
    padding:r(50) r(30);
    @include f(32px);
    line-height:1.2;
    border-bottom:solid r(30) #dfdfdf;
  }
  .red-text{
    color:$cl3;
  }
  .pay_tips{
    background:#f2f2f2;
    padding:r(30);
    margin:r(60) r(30);
    .p_tips_title{
      line-height:2;
      @include f(35px);
    }
    .p_tips_content{
      line-height:1.4;
      @include f(28px);
    }
  }
  .pay-title{
    padding:r(30) r(30) 0;
    line-height:2;
    @include f(32px);

  }
  .pay-table{
    margin:0 r(30);
    table-layout:fixed;
    @include f(28px);
    width:90%;
    background:#fff;
    margin-bottom:r(20);
    color:#666;
    td{
      border:solid 1px #ccc;
      padding:r(20);
    }
  }
  .btns{
    margin-top:r(60);
    text-align:center;
    .t_btn{
      padding:r(20);
      @include  f(36px);
      border-radius:6px;
      display:inline-block;
      width:45%;
      box-sizing: border-box;
      margin:0 r(10);
      background:#4db7f4;
      color:#fff;
    }
  }

</style>
