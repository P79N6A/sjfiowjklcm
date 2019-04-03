<template>
  <transition enter-active-class="animated pulse" leave-active-class="animated zoomOut">
  <div class="modal-register in" v-if="show">
      <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">
    <div class="modal-dialog popup" v-if="show">
      <div class="head-title">
        <p>代理注册申请</p>
        <p>Agent Registration Application</p>
      </div>
      <div type="button" class="close" @click="show = false">
        <span>X</span>
      </div>
      <div class="pop-content">
        <div class="form-box">
          <div class="form-group">
            <span>*代理账号：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.loginname" placeholder="加盟账号(a_开头,3-15数字或字母)"
              maxlength="17">
          </div>
          <div class="form-group">
            <span>*联系电话：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.phone" placeholder="联系电话,加盟负责人及时联系您" maxlength="11">
          </div>
          <div class="form-group">
            <span>*登入密码：</span>
            <input ref="pwd" type="password" autocomplete="off" class="ps-input inpt-pwd" v-model="submitData.password"
              placeholder="密   码(6-16位数字或字母）" maxlength="16">
          </div>
          <div class="form-group">
            <span>*联系邮箱：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.email" placeholder="电子邮箱,方便账号找回" maxlength="40">
          </div>
          <div class="form-group">
            <span>*确认密码：</span>
            <input ref="pwd2" type="password" autocomplete="off" class="ps-input inpt-pwd" v-model="submitData.confirmPassword"
              placeholder="确 认 密 码(6-16位数字或字母）" maxlength="16">
          </div>
          <div class="form-group">
            <span>*联系QQ：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.qq" placeholder="您可通过QQ与我们取得联系" maxlength="15">
          </div>
          <div class="form-group">
            <span>*真实姓名：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.accountName" placeholder="真实姓名,与银行账户姓名相同"
              maxlength="20">
          </div>
          <div class="form-group">
            <span>代理推荐号：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.partner" placeholder="代理推荐号" maxlength="30">
          </div>
          <div class="form-group">
            <span>*代理网址：</span>
            <input type="text" class="ps-input ps-input1" v-model="submitData.referWebsite" placeholder="推广网址(2-6位)"
              maxlength="6">
            <span v-text="domainName" class="domainName"></span>
          </div>
          <div class="form-group">
            <span>*验证码：</span>
            <input type="text" class="ps-input " v-model="submitData.validateCode" placeholder="验证码" maxlength="4">
            <a href="javascript:;" class="captcha-code icon_popup">
              <img :src="validateImage" @click="GET_VALIDATE">
            </a>
          </div>
          <div class="form-group1">
            <label>
              <input type="checkbox" v-model="submitData.agentAgree" checked="checked" name="plan">
              本人已经超过合法年龄以及本人在此网站的所有活动并没有抵触本人所身在的国家所管辖的法律，同时接受奇幻城国际娱乐城 
              <router-link :to="{name:'aboutIndex',params:{tab:'tab2'}}" target="_blank">用户协议</router-link>（确定无误后请打钩）
            </label>
          </div>
          <span class="validate"></span>
          <input type="submit" class="submit" @click="regSubmit" id="submit_user" value="提交">
        </div>
      </div>
    </div>
  </transition>
  </div>
  </transition>
</template>
<script>
import { getDomainName } from "@/api/show";
import { getAuthImg, registerAgent } from "@/api/authService";
import eyes from "pc/components/eyes";
import check from "@/util/RegExp";
  import {
    AgentRegisterControl
  } from '@/controls/auth/registerAgent'
import {
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
export default {
  
  mixins: [AgentRegisterControl],
  data() {
    return {
      authImg: "",
      domainName: "sdfas",
      show:false
    };
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
    computed: {
      ...mapGetters(['validateImage'])
    },
  created() {
    this.$bus.$on('showAgentRegister',eventData => {
      this.show = eventData
    })
  },
  components: {
    eyes
  }
};
</script>
<style lang="scss" scoped>
.modal-register {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  .domainName {
    position: absolute;
    top: 0;
    right: 10px;
    color: #0f97bd;
  }
  .modal-dialog {
    position: relative;
    max-width: 900px;
    min-width: 300px;
    padding-bottom: 20px;
    background: #fff;
    border-radius: 8px;
    color: #000;
    overflow: hidden;
    outline: 0;
    border-radius: 6px;
    box-shadow: 0 3px 9px rgba(0, 0, 0, .5);
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .2);

    .head-title{
      background: url('./images/modal-bg.png') no-repeat top center;
      height: 100px;
      padding-top: 15px;
      p{
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 1.2;
        width: 100%;
      }
    }
    .close {
      position: absolute;
      z-index: 1;
      top: 25px;
      right: 20px;
      cursor: pointer;
      color: #fff;
      border: 1px solid #fff;
      padding: 3px 12px;
      span{
        font-size: 36px;
      }
    }
  }
  

  .popup .pop-content {
    position: relative;
    padding-top: 25px;

    h2 {
      font-size: 24px;
      color: #282828;
      margin-bottom: 15px;
      text-align: center;
      font-weight: normal;
    }
  }

  .popup .form-box {
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    color: #13a1ca;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .form-group {
      height: 34px;
      line-height: 34px;
      position: relative;
      width: 45%;
      float: left;
      margin: 0 15px 14px;
      display: flex;
      align-items: center;
      
      span{
        color: #bc9878;
        font-size: 16px;
        flex:1;
      }
      // label {
      //   color: #13a1ca;

      //   input {
      //     margin-right: 10px;
      //   }
      // }
    }
    .form-group1{
      width: 90%;
      position: relative;
      margin: 25px 0 0;
      text-align: left;
      label{
        font-size: 14px;
        width: 100%;
        line-height: 1.6;
        display: inline-block;
        vertical-align: middle;
        input{
          vertical-align: middle;
        }
        a{
          color: red;
        }
      }
    }

    .validate {
      display: block;
      margin: 10px 0;
      font-size: 12px;
      color: #13a1ca;
      min-height: 16px;
      text-align: center;
    }

    p {
      text-align: center;
      color: #999;
    }

    .captcha-code {
      width: 90px;
      height: 30px;
      display: block;
      position: absolute;
      background: no-repeat;
      right: 0;
      top: 0;

      img {
        height: 30px;
        width: 90px;
        vertical-align: top;
      }
    }

    .ps-input {
      height: 30px;
      padding: 0 5px;
      outline: none;
      color: #808080;
      border: 1px solid #dcdcdc;
      width: 100%;
      max-width: 268px;
      background: transparent;
      flex: 3;
      // width: 100%;
      // height: 34px;
      // border: 0;
      // background: 0 0;
      // border-bottom: 1px solid #ccc;
      // outline: 0;
      // line-height: 34px;
      // font-size: 16px;
      // color: #333;
      // padding: 0 20px 0 30px;
    }

    .ps-input2 {
      width: 210px;
      float: left;
      height: 34px;
      border-bottom: 1px solid #ccc;
      outline: 0;
      line-height: 34px;
      font-size: 16px;
      color: #333;
      padding: 0 20px 0 30px;
    }

    i.iconfont {
      position: absolute;
      height: 100%;
      line-height: 34px;
      top: 0;
      left: 0;
      font-size: 24px;
      display: inline-block;
    }

    span.iconfont {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 24px;
      cursor: pointer;
      line-height: 34px;
      height: 100% !important;
      color: #f66;
    }
  }

  .popup .icon_popup {
    position: absolute;
    display: block;
  }

  .popup .submit {
    // width: 300px;
    // height: 40px;
    // background: #13a1ca;
    // text-align: center;
    // line-height: 40px;
    // cursor: pointer;
    // font-size: 16px;
    // color: #fff;
    // text-align: center;
    // display: block;
    // border-radius: 4px;
    margin: 0 auto;
    background: rgb(239, 68, 59);
    color: #fff;
    height: 50px;
    font-size: 26px;
    letter-spacing: 5px;
    max-width: 280px;
    padding: 0px 50px;
  }
}
</style>
