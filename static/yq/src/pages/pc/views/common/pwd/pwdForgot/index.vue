<template>
    <el-dialog
      v-if="!islogin"
      center
      title="忘记密码"
      :visible.sync="showForget"
      width="500px"
      >
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="短信找回" name="Sms">
        <el-form :model="phone" :rules="phoneRules" ref="phoneForm" label-width="0" class="register-ruleForm" width="500">

          <el-form-item prop="name">
            <el-input v-model="phone.name" prefix-icon="iconfont icon-yonghu" placeholder="请输入您的游戏账号" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item prop="phone">
            <el-input v-model="phone.phone" prefix-icon="iconfont icon-shouji" placeholder="请输入绑定手机号码" maxlength="11"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('phoneForm')" v-show="SmsTimer == 0" :loading="isLoadingSms">提交</el-button>
            <el-button type="primary" @click="submitForm('phoneForm')" v-show="SmsTimer != 0" loading>{{SmsTimer}}s后可重新获取</el-button>

          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱找回" name="Email">
        <el-form :model="email" :rules="emailRules" ref="emailForm" label-width="0" class="register-ruleForm" width="500">

          <el-form-item prop="name">
            <el-input v-model="email.name" prefix-icon="iconfont icon-yonghu" placeholder="请输入您的游戏账号" maxlength="20"></el-input>
          </el-form-item>

          <el-form-item prop="yxdz">
            <el-input v-model="email.yxdz" prefix-icon="iconfont icon-youjian" placeholder="请输入绑定的邮箱" maxlength="50"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input v-model="email.code" auto-complete="off" prefix-icon="iconfont icon-yanzhengma" placeholder="请输入验证码" maxlength="10">
              <el-button slot="append" @click="GET_VALIDATE">
                <img :src="validateImage">
              </el-button>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('emailForm')" v-show="EmailTimer == 0" :loading="isLoadingEmail">提交</el-button>
            <el-button type="primary" @click="submitForm('emailForm')" v-show="EmailTimer != 0" loading>{{EmailTimer}}s</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="在线客服" name="Cs">
      </el-tab-pane>
    </el-tabs>
    </el-dialog>
</template>
<script>
  import  {SETTING} from "@/assets/data"
  import  check from "@/util/RegExp"
  import openWindow from '@/util/openWindow'
  import {mapGetters, mapActions, mapMutations} from 'vuex'
  import {loginForgot} from '@/controls/auth/loginForgot'
  export default {
    mixins:[loginForgot],
    data() {
      // 登录名验证规则
      const name_check = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        else{
          callback();
        }
      };
      // 手机号验证规则
      const phone_check = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }else if(!check.phone.test(value)){
          return callback(new Error('手机号格式不正确'));
        }
        else{
          callback();
        }
      };
      // 邮箱验证规则
      const email_check = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱地址不能为空'));
        }else if(!check.email.test(value)){
          return callback(new Error('邮箱地址不正确'));
        }
        else{
          callback();
        }
      };
      // 验证码验证规则
      const code_check = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }
        else{
          callback();
        }
      };
      return {
        SETTING, //
        showForget:false,
        activeName:'Sms',// 当前选择tab
        SmsTimer: 0, // 获取验证码倒计时
        intervalSms: null,// 定时器
        EmailTimer:0, // 按钮有效倒计时
        intervalEmail:null, // 邮箱定时器
        authImg: '',
        isLoadingSms:false,
        isLoadingEmail:false,
        phone: {
          // 手机找回，提交内容
          sid: "9d154e5f-4f65-4b6d-9201-632adcdba1b7", // true string
          phone: "", // true string
          check_address: "sverify-5-2-0", // true string
          token: "99da842a-40d4-4f10-9a221499131241289", //true string
          name: "",
          check_key: "",
        },
        phoneRules:{
          name: [
            { validator: name_check, trigger: 'blur' }
          ],
          phone: [
            { validator: phone_check, trigger: 'blur' }
          ]
        },
        email: {
          //邮箱找回，提交内容
          yxdz: '', //true string
          name: '', //true string
          code: '',
        },
        emailRules:{
          name: [
            { validator: name_check, trigger: 'blur' }
          ],
          yxdz: [
            { validator: email_check, trigger: 'blur' }
          ],
          code: [
            { validator: code_check, trigger: 'blur' }
          ]
        },
      }
    },
    computed: {
      ...mapGetters(["islogin",'validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      handleClick($tab,$evt){
        // 选项点击事件
        if($tab.name=='Email'){
          // 刷新验证码
          this.GET_VALIDATE();
        }else if($tab.name=='Cs'){
          // 客服
          openWindow(SETTING.live800, '在线客服', 700, 640)
          // 重置一下tab
          let $this = this
          Vue.nextTick(function () { 
            // DOM 更新了 
            $this.activeName='Sms'
          }) 
        }
      },
      // 表单提交事件
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(formName=='phoneForm'){
              this.isLoadingSms=true;
              this.getbackPwdByDx_dc(this.phone).then(res=>{
                this.isLoadingSms=false;
                this.setDxTimer();
                window.toast(res.message)
              }).catch(err=>{
                console.log(err)
                this.isLoadingSms=false;
                
                window.toast(err.message)
              })
            }else if(formName=='emailForm'){
              this.isLoadingEmail=true;
              this.getbackPwdByEmail(this.email).then(res=>{
                this.isLoadingEmail=false;
                this.setEmailTimer();
                window.toast(res.message)
              }).catch(err=>{
                console.log(err)
                this.isLoadingEmail=false;
                window.toast(err.message)
              })
            }
          } else {
            return false;
          }
        });
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      setDxTimer(){
            // 120秒倒计时，防止频繁触发短信
            this.SmsTimer = 120;
            let $this = this;
            this.intervalSms = setInterval(function(){
              $this.SmsTimer --;
              if ($this.SmsTimer == 0) {
                clearInterval($this.intervalSms);
              }
            }, 1000);
      },
      setEmailTimer(){
            // 120秒倒计时，防止频繁触发短信
            this.EmailTimer = 30;
            let $this = this;
            this.intervalEmail = setInterval(function(){
              $this.EmailTimer --;
              if ($this.EmailTimer == 0) {
                clearInterval($this.intervalEmail);
              }
            }, 1000);
      }
    },
    created(){
      this.$bus.$on('showForget', (eventData) => {
        
        this.showForget=eventData
      })
    },
    beforeDestroy() {
      // 销毁前清除定时器
      window.clearInterval(this.intervalSms)
      window.clearInterval(this.intervalEmail)
    },
    components: {
     // vTouclick
    }
  }
</script>
<style lang="scss">

</style>
