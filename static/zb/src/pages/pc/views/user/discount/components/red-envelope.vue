<template>
  <div class="red-envelope">
    <!-- <div class="enve-tips">
      红包代码会以站内信形式发送给您,请注意查看站内信通知。
    </div> -->

    <el-form :model="data" :rules="discountRuleRed" ref="transferFormRed" label-width="100px" class="discount-form">
      <!-- 游戏平台 -->
      <el-form-item label="游戏平台" prop="couponType">
        <el-select v-model="data.couponType" placeholder="请选择需要转入的游戏平台">
          <el-option :label="item.name" v-for="item  in platformData" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </el-form-item>

      <!-- 优惠代码 -->
      <el-form-item label="优惠代码" prop="couponCode" >
        <el-input v-model="data.couponCode" type="text" placeholder="请填写红包优惠代码"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="submitbtn" @click="submitForm('transferFormRed')">提交</el-button>
        <el-button @click="resetForm('transferFormRed')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tipsDiv">
        <p class="tipsTitle">温馨提示：</p>
        <p class="tipsBox" v-for="item in tips" :key="item">{{item}}</p>
    </div>
  </div>
</template>
<script>
  // import {platformData} from "@/assets/data"
  import {couponRed} from "@/controls/discount/couponRed"
  export default {
    mixins:[couponRed],
    data() {
      const couponType_check_red=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请选择游戏平台'))
        }else{
          callback();
        }
      }
      const couponCode_check_red=(rule,value,callback)=>{
        if(!value){
          return callback(new Error('请输入红包优惠代码'))
        }else{
          callback();
        }
      }
      return {
        platformData:[],
        data: {
          couponType: "", // 转入平台类型
          couponCode: ""// 红包代码
        },
        discountRuleRed:{ 
          // 验证规则配置
          couponType:[{validator:couponType_check_red,trigger:'blur'}],
          couponCode:[{validator:couponCode_check_red,trigger:'blur'}],
        }, 
        tips:[
          "红包代码会以站内信形式发送给您,请注意查看站内信通知。"
        ]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.couponSubmit(this.data).then(res=>{
              window.toast(res.message,'warning')
            }).catch(err=>{
              console.log(err)
              window.toast(err.message)
            })
            // this.submit(this.data)
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
.enve-tips{
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