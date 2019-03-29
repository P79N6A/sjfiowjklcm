<template>
    <el-form ref="form" :model="submitData" label-width="100px" :label-position="'left'" class="deposit-form">
      <!-- 支付银行，某些网银支付需要，动态读取接口 -->
      <el-form-item label="支付银行：" v-if="bankCodeData.length>0">
        <el-select v-model="submitData.bankCode" placeholder="请选择支付银行">
          <el-option :label="item.name" v-for='(item,i) in bankCodeData' :value="item.value" :key="i+item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存款姓名：" prop="order_accountName" v-if="payItem.type=='directpay'||payItem.type=='offbank'">
        <div class="selectItems">
          <el-input v-model="submitData.order_accountName" placeholder="请输入存款人姓名"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="存款金额：" prop="order_amount" v-if="payItem.customParams&&payItem.customParams.enterMode=='FIXED_AMOUNT'">
        <div class="selectItems">
          <div class="selectItem" @click="another(item)" :class="{active:submitData.order_amount==item}" v-for="item in payItem.customParams.defaultAmounts" :key="item">
            {{item}}元
          </div>
        </div>
      </el-form-item>
      <el-form-item label="存款金额：" prop="order_amount" v-else>
          <el-input v-model="submitData.order_amount" :placeholder="placeholder"></el-input>
          <p class="tips" v-if="payItem.type=='offbank'">温馨提示：银行卡入款最低存款金额为:{{payItem.lowerlimit}}元，如转入金额低于{{payItem.lowerlimit}}元，请补齐至{{payItem.lowerlimit}}元后联系在线客服为您处理。</p>
          <p class="tips" v-if="payItem.type=='directpay'">温馨提示：微信、支付宝扫码最低{{payItem.lowerlimit}}元，如有疑问请联系在线客服。</p>
          <div class="select-group">
            <a :class="{active:submitData.order_amount == item.value}" v-for="item in loadMoney" :key="item.value" @click="submitData.order_amount=item.value">{{item.name}}</a>
          </div>
      </el-form-item>
      <el-form-item>
          <el-button @click="depositPost" class="paybtn">提交</el-button>
      </el-form-item>
    </el-form> 
</template> 
<script>
  import check from '@/util/RegExp'
  import {basePay} from '@/controls/money/basePay'
  export default {
    mixins:[basePay],
    data() {
      return {
        active:0,
        loadMoney: [
        {
          name: "100元",
          value: 100
        },
        {
          name: "200元",
          value: 200
        },
        {
          name: "500元",
          value: 500
        },
        {
          name: "1000元",
          value: 1000
        },
        {
          name: "2000元",
          value: 2000
        },
        {
          name: "5000元",
          value: 5000
        }
      ]
      }
    },
    watch: {
      payItem(val){
        // 变化后去请求获取银行卡
        this.getBankList(val)
        if (val.customParams&&val.customParams.enterMode=='FIXED_AMOUNT') {
          this.submitData.order_amount = val.customParams.defaultAmounts[0]
        }
      },
    },
    methods: {
      depositPost(e) {
        this.submitData.id=this.payItem.id // 赋值当前支付的id
        // 提交表单
        this.depositPostSubmit(this.submitData,this.payItem).then(res=>{
          window.toast('充值成功，如2分钟未到账，请准备支付截图与客服联系','success')
        }).catch(err=>{
          console.log(err)
          window.toast(err.message)
        })
      },
      another(value){
        if (value !== '') {
          this.submitData.order_amount = value;
        } else {
          this.submitData.order_amount = '';
        }
      }
    },
    props:{
      payItem:{
        type:Object
      }
    },
    computed: {
      placeholder() {
        // 判断最高或最低提款
        if (this.payItem&&(this.payItem.lowerlimit||this.payItem.upperlimit)) {
          return "最少" + this.payItem.lowerlimit + "元，最多" + this.payItem.upperlimit + "元";
        } else {
          return "请输入存款金额";
        }
      }
    },
    created(){
      if(this.payItem.type == 'ebank') {
        this.getBankList(this.payItem)
      }
      if (this.payItem.customParams&&this.payItem.customParams.enterMode=='FIXED_AMOUNT') {
        this.submitData.order_amount = this.payItem.customParams.defaultAmounts[0]
      }
    }
  };

</script>

<style lang="scss" scoped>
  .paybtn{
    // width:350px;
    background: #0181fa;
    background: -moz-linear-gradient(to right,#0181fa,#16d6ff);
    background: -webkit-linear-gradient(to right,#0181fa,#16d6ff);
    background: -o-linear-gradient(to right,#0181fa,#16d6ff);
    background: linear-gradient(to right,#0181fa,#16d6ff);
    border: 1px solid #0181fa;
    color: #fff;
    width: 300px;
  }
  .deposit-form{
    width: 100%;
    .el-input{
      width: 20%;
    }
    .selectItems{
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .selectItem{
        padding: 2px 5px;
        color: #fff;
        width: 100px;
        margin: 0 10px 10px 0;
        text-align: center;
        border: 1px solid #fff;
        cursor: pointer;
        border-radius: 10px;
        &.active{
          border: 1px solid #0181fa;
          color: #0181fa;
        }
      }
    }
  }
  .tips{
    color: #fb3d3d;
    position: absolute;
    left: 225px;
    top: 0px;
    width: 457px;
    line-height: 18px;
  }
  .select-group {
    margin-top: 20px;
    a {
      display: inline-block;
      width: 80px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #ccc;
      color: #ccc;
      border-radius: 4px;
      margin-right: 20px;
      text-align: center;
      cursor: pointer;
      &:hover , &.active {
        border: 1px solid #0181fa;
        color: #0181fa;
      }
    }
  }
</style>

