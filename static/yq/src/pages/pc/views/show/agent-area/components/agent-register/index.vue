<template>
  <div class="agent_register">
    <div class="agent_register_content">
      <h2>代理注册</h2>
      <h4>Proxy registration</h4>
      <form class="form_agent">
        <div class="form_group">
          <span class="icon_user register_icon"></span>
          <input type="text" class="form_control" name="account" maxlength="15" placeholder="代理账号(a_开头，3-15数字/字母)" v-model="submitData.loginname" autocomplete="off" >
        </div>
        <div class="form_group">
          <span class="icon_mobile register_icon"></span>
          <input type="text" class="form_control" name="mobile" placeholder="手机号码" v-model="submitData.phone" autocomplete="off" maxlength="11">
        </div>
        <div class="form_group">
          <span class="icon_pwd register_icon"></span>
          <input type="password" class="form_control" name="password" placeholder="密码(6-16位数字和字母)" v-model="submitData.password" autocomplete="off" maxlength="16">
        </div>
        <div class="form_group">
          <span class="icon_email register_icon"></span>
          <input type="text" class="form_control" name="email" placeholder="电子邮箱" v-model="submitData.email" autocomplete="off" maxlength="66">
        </div>
        <div class="form_group">
          <span class="icon_pwd register_icon"></span>
          <input type="password" class="form_control" name="compassword" placeholder="确认密码" v-model="submitData.confirmPassword" autocomplete="off" maxlength="16">
        </div>
        <div class="form_group">
          <span class="icon_qq register_icon"></span>
          <input type="text" class="form_control" name="qq" placeholder="QQ号码" v-model="submitData.qq" autocomplete="off" maxlength="16">
        </div>
        <div class="form_group">
          <span class="icon_name register_icon"></span>
          <input type="text" class="form_control" name="name" placeholder="真实姓名" v-model="submitData.accountName" autocomplete="off" maxlength="66">
        </div>
        <div class="form_group">
          <span class="icon_name register_icon"></span>
          <input type="text" class="form_control" name="name" placeholder="代理推荐码" v-model="submitData.partner" autocomplete="off" maxlength="16">
        </div>
        <div class="form_group">
          <span class="icon_name register_icon"></span>
          <input type="text" class="form_control" name="name" placeholder="推广网址(2-6位数字/字母)" v-model="submitData.referWebsite" autocomplete="off" maxlength="6">
          <span class="register_website">{{domainName}}</span>  
        </div>
        <div class="form_group">
          <span class="icon_code register_icon"></span>
          <input type="text" class="form_control code_form_control" name="code" placeholder="验证码" v-model="submitData.validateCode" autocomplete="off">
          <img :src="validateImage" class="code" @click="GET_VALIDATE">
        </div>
        <div class="form_group">
          <!-- <input type="checkbox"  name="plan" class="checked" v-model="submitData.accountName">
          <p>
            我要接收会员通讯及最新优惠计划.
          </p> -->
        </div>
        <div class="form_group">
          <input type="checkbox"  name="agentAgree" class="checked" v-model="submitData.agentAgree">
          <p>
            本人已经超过合法年龄以及本人在此网站的所有活动并没有 抵触本人所身在的国家所管辖的法律。
          </p>
        </div>
        <div class="form_btn_group">
            <a class="green_submitbtn" @click="regSubmit" id='agentarea'>立即注册</a>
          <!-- <input type="submit" class="green_submitbtn" id="submit_agent" value="立即注册" @click="regSubmit"> -->
        </div>
      </form>
    </div>
  </div>
</template>
<script>
  import {
    AgentRegisterControl
  } from '@/controls/auth/registerAgent'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    mixins: [AgentRegisterControl],
    data() {
      return {}
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
        regSubmit(){
            this.register(this.submitData).then(res=>{
                window.toast(res.message)
            }).catch(err=>{
                window.toast(err.message)
            })
        }
    },
  }

</script>
<style lang="scss" scoped>
  .agent_register {
    background: url(../../images/daili_register.jpg) no-repeat center center;
    min-height: 797px;
    padding-top: 146px;
    .agent_register_content {
      width: 1000px;
      margin: 0 auto;
      background: url(../../images/agent_registerbg.png) repeat;
      padding-top: 20px;
      h2 {
        font-size: 30px;
        color: #ffffff;
        text-align: center;
        height: 36px;
        line-height: 36px;
      }
      h4 {
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        height: 24px;
        line-height: 24px;
        margin-bottom: 20px;
      }
      .form_agent {
        display: inline-block;
        padding-left: 51px;
      }
      .form_group {
        width: 434px;
        float: left;
        margin: 0 28px 20px 0;
        position: relative;
        .register_website{
            position:absolute;
            top:0;
            right:0;
            color:#fff;
            font-size:16px;
            line-height:47px;
            padding-right:10px;
        }
        .register_icon {
          position: absolute;
          width: 34px;
          height: 35px;
          display: block;
          background-image: url(../../images/agent_regicon.png);
          background-repeat: no-repeat;
          top: 7px;
          left: 10px;
        }
        .icon_user {
          background-position: -20px -147px;
        }
        .icon_mobile {
          background-position: -20px -358px;
        }
        .icon_pwd {
          background-position: -20px -286px;
        }
        .icon_email {
          background-position: -20px -20px;
          top: 14px;
        }
        .icon_qq {
          background-position: -20px -432px;
        }
        .icon_name {
          background-position: -20px -82px;
          top: 12px;
        }
        .icon_code {
          background-position: -20px -216px;
        }
        .form_control {
          width: 100%;
          height: 47px;
          line-height: 47px;
          border: 1px solid #FFFFFF;
          padding-left: 50px;
          font-size: 24px;
          color: #ffffff;
          background: transparent;
        }
        .code_form_control {
          width: 62%;
        }
        .code {
          display: inline-block;
          float: right;
          height: 46px;
          display: inline-block;
          width: 150px;
        }
        .checked {
          width: 16px;
          height: 16px;
          border: 1px solid #FFFFFF;
          vertical-align: sub;
        }
        p {
          display: inline;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .form_btn_group {
        width: 100%;
        text-align: center;
        float: left;
        margin-bottom: 38px;
        .green_submitbtn {
          display:inline-block;
          width: 480px;
          height: 60px;
          line-height: 60px;
          border: none;
          background: #ed7e12;
          font-size: 36px;
          color: #ffffff;
          text-align: center;
          cursor:pointer;
        }
      }
    }
  }

</style>
