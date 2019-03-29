<template>
  <div class="discount-code">
    <!-- <div class="discount-tips">
      优惠券代码会以站内信形式发送给您,请注意查看站内信通知。
    </div> -->

    <el-form :model="data" :rules="discountRule" ref="transferForm" label-width="100px" class="discount-form">
      <!-- 游戏平台 -->
      <el-form-item label="游戏平台" prop="couponType">
        <el-select v-model="data.couponType" placeholder="请选择需要转入的游戏平台">
          <el-option :label="item.name" v-for="item  in platformData" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!-- 转入金额 -->
      <el-form-item label="转入金额" prop="couponRemit" >
        <el-input v-model="data.couponRemit" type="number" placeholder="请填写转入金额"></el-input>
      </el-form-item>

      <!-- 优惠代码 -->
      <el-form-item label="优惠代码" prop="couponCode" >
        <el-input v-model="data.couponCode" type="text" placeholder="请填写优惠代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submitbtn" @click="submitForm('transferForm')">提交</el-button>
        <el-button @click="resetForm('transferForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tipsDiv">
        <p class="tipsTitle">温馨提示：</p>
        <p class="tipsBox" v-for="item in tips" :key="item">{{item}}</p>
    </div>
  </div>
</template>
<script>
  // import {    platformData  } from "@/assets/data"
  import {coupon} from '@/controls/discount/coupon'
  export default {
    mixins:[coupon],
    data() {
      const couponType_check=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请选择游戏平台'))
        }else{
          callback();
        }
      }
      const couponRemit_check=(rule,value,callback)=>{
        if (!value) {
          return callback(new Error('请输入转入金额'));
        }else if (!/^\d+$/.test(value)) {
          return callback(new Error('请输入整数金额'));
        }else{
          callback();
        }
      }
      const couponCode_check=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请输入优惠代码'))
        }else{
          callback();
        }
      }
      return {
        platformData:[],
        discountRule:{
          couponType:[{validator:couponType_check,trigger:'blur'}],
          couponCode:[{validator:couponCode_check,trigger:'blur'}],
          couponRemit:[{validator:couponRemit_check,trigger:'blur'}]
        },
        tips:[
          "优惠券代码会以站内信形式发送给您,请注意查看站内信通知。"
        ]
      };
    },
    watch: {
      "data.couponRemit" (val) {
        if (/[^\d]/g.test(val)) {
          this.data.couponRemit = this.data.couponRemit.toString().replace(/[^\d]/g, '')
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.couponSubmit(this.data).then(res=>{
              window.toast(res.message)
              this.resetForm('transferForm')
            }).catch(err=>{
              console.log(err)
              window.toast(err.message)
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  };

</script>

<style lang="scss" scoped>
.discount-tips{
        color: #09affe;
        font-size: 30px;
        margin: 20px 0;
        line-height:1.5;
}
  .discount-form {
    margin-top: 30px;
    width: 500px;
    .el-select {
      display: block !important;
    }
  }
.tipsDiv{
    font-size: 15px;
    line-height: 30px;
    width: 800px;
    .tipsTitle{
        color: #fff;
    }
    .tipsBox{
        color:#b5b5b5;
    }
}
.submitbtn{
  background: #0181fa;
  background: -moz-linear-gradient(to right,#0181fa,#16d6ff);
  background: -webkit-linear-gradient(to right,#0181fa,#16d6ff);
  background: -o-linear-gradient(to right,#0181fa,#16d6ff);
  background: linear-gradient(to right,#0181fa,#16d6ff);
  border: 1px solid #0181fa;
  color: #fff;
}
</style>
