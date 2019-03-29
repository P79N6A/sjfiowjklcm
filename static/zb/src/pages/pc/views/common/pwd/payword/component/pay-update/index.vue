<template>
<div>
  <el-form :model="pwdForm" status-icon :rules="pwdrules" ref="pwdForm" label-width="120px" class="password-ruleForm" v-if="isSetPayPwd">
    <el-form-item label="原支付密码" prop="password">
      <el-input :type="passwordType.password" v-model="pwdForm.password" maxlength="6" placeholder="请输入旧的支付密码">
        <el-button slot="append" icon="iconyg yg-biyan" @click="showPwd('password')" v-if="passwordType.password=='password'"></el-button>
        <el-button slot="append" icon="iconyg yg-zhangyan" @click="showPwd('password')" v-else></el-button>
      </el-input>
    </el-form-item>

    <el-form-item label="新支付密码" prop="new_password">
          <!-- 密码不能添加model.number后缀,字符串和数字的md5值是不同的 -->
      <el-input :type="passwordType.new_password" v-model="pwdForm.new_password" auto-complete="off" maxlength="6" placeholder="请输入新的支付密码">
        <el-button slot="append" icon="iconyg yg-biyan" @click="showPwd('new_password')" v-if="passwordType.new_password=='password'"></el-button>
        <el-button slot="append" icon="iconyg yg-zhangyan" @click="showPwd('new_password')" v-else></el-button>
      </el-input>

    </el-form-item>
    <el-form-item label="确认新支付密码" prop="confirm_password">
          <!-- 密码不能添加model.number后缀,字符串和数字的md5值是不同的 -->
      <el-input :type="passwordType.confirm_password" v-model="pwdForm.confirm_password" auto-complete="off" maxlength="6" placeholder="请再次输入新的支付密码">
        <el-button slot="append" icon="iconyg yg-biyan" @click="showPwd('confirm_password')" v-if="passwordType.confirm_password=='password'"></el-button>
        <el-button slot="append" icon="iconyg yg-zhangyan" @click="showPwd('confirm_password')" v-else></el-button>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button class="btn" @click="submitForm('pwdForm')">提交</el-button>
      <el-button @click="resetForm('pwdForm')">清空</el-button>
      <el-button @click="$bus.$emit('showForgetPay',true)" type="text">忘记支付密码?</el-button>
    </el-form-item>

  </el-form>
  <!-- 找回支付密码(有待完善) -->
  <pay-forgot></pay-forgot>
  </div>
</template>
<script>
  import payForgot from "../pay-forgot"
  import check from "@/util/RegExp"
  import {mapGetters} from 'vuex'
  import {payword} from '@/controls/auth/payword'
  export default {
    mixins:[payword],
    data() {
      const password_check = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('旧支付密码不能为空'));
        } else {
          callback();
        }
      };

      const new_password_check = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入支付密码'));
        } else if (value == this.pwdForm.password) {
          callback(new Error("新支付密码不能与旧密码相同"))
        } else if (!check.pay_password.test(value)) {
          callback(new Error("新支付密码必须6位纯数字"))
        } else {
          if (this.pwdForm.checkPass !== '') {
            // 改变值后，去和确认密码做判断
            this.$refs.pwdForm.validateField('confirm_password');
          }
          callback();
        }
      };

      const confirm_password_check = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入支付密码'));
        } else if (value !== this.pwdForm.new_password) {
          callback(new Error('两次输入支付密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        passwordType:{
          confirm_password:'password',
          new_password:'password',
          password:'password'
        },
        pwdrules: {
          password: [{
            validator: password_check,
            trigger: 'blur'
          }],
          new_password: [{
            validator: new_password_check,
            trigger: 'blur'
          }],
          confirm_password: [{
            validator: confirm_password_check,
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      // 是否显示密码
      showPwd(val) {
        if (this.passwordType[val] === 'password') {
          this.passwordType[val] = ''
        } else {
          this.passwordType[val] = 'password'
        }
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 确认事件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.changePwd(this.pwdForm).then(res=>{
              window.toast(res.message,'warning')
              this.resetForm('pwdForm')
            }).catch(err=>{
              window.toast(err.message)
            })
          } else {
            return false;
          }
        });
      }
    },
    computed: {
      ...mapGetters(["isSetPayPwd"])
    },
    components:{payForgot}
  };

</script>
<style lang="scss" scoped>
  .password-ruleForm {
    width: 500px;
  }
  .btn{
    background: #0181fa;
    background: -moz-linear-gradient(to right,#0181fa,#16d6ff);
    background: -webkit-linear-gradient(to right,#0181fa,#16d6ff);
    background: -o-linear-gradient(to right,#0181fa,#16d6ff);
    background: linear-gradient(to right,#0181fa,#16d6ff);
    border: 1px solid #0181fa;
    color: #fff;
  }
</style>
