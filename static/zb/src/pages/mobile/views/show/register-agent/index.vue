<template>
  <div class="agent-register-content">
    <div class="register-item ">
      <div class="register-item-row">
        <i class="iconay ay-zhanghao"></i>
        <span class="register-text">代理账户：</span>
        <input type="text" v-model="submitData.loginname" class="register-input" placeholder="输入用户名">
      </div>
      <div class="register-item-row">
        <i class="iconay ay-mima1"></i>
        <span class="register-text">设置密码：</span>
        <input ref="pwd" type="password" v-model="submitData.password" class="register-input" placeholder="6-16位数字或英文字母">
        <eyes :dom="$refs.pwd"></eyes>
      </div>
      <div class="register-item-row">
        <i class="iconay ay-mima1"></i>
        <span class="register-text">确认密码：</span>
        <input type="password" v-model="submitData.confirmPassword" class="register-input" placeholder="再次输入密码">
      </div>
      <div class="register-item-row">
        <i class="iconay ay-xingming"></i>
        <span class="register-text">真实姓名：</span>
        <input type="text" v-model="submitData.accountName" class="register-input" placeholder="请输入真实姓名">
      </div>
      <div class="register-item-row">
        <i class="iconay ay-wangzhi"></i>
        <span class="register-text">代理网址：</span>
        <input type="text" v-model="submitData.referWebsite" class="register-input" placeholder="(2-6位数字/字母)" maxlength="6">
        <span class="label-right">{{domainName}}</span>
      </div>
      <div class="register-item-row">
        <i class="iconay ay-youxiang"></i>
        <span class="register-text">电子邮箱：</span>
        <input type="text" v-model="submitData.email" class="register-input" placeholder="请输入电子邮箱">
      </div>
      <div class="register-item-row">
        <i class="iconay ay-shouji1"></i>
        <span class="register-text">手机号码：</span>
        <input type="text" maxlength="11" v-model="submitData.phone" class="register-input" placeholder="请输入手机号码">
      </div>
      <div class="register-item-row">
        <i class="iconay ay-QQ"></i>
        <span class="register-text">QQ：</span>
        <input type="text" v-model="submitData.qq" class="register-input" placeholder="请输入QQ">
      </div>
      <!-- <div class="register-item-row">
        <i class="iconay yg-qq"></i>
        <span class="register-text">代理推荐人：</span>
        <input type="text" v-model="submitData.partner" class="register-input" placeholder="请输入代理推荐人">
      </div> -->
      <div class="register-item-row">
        <i class="iconay ay-yanzhengma1"></i>
        <span class="register-text">验证码：</span>
        <input type="text" v-model="submitData.validateCode" class="register-input register-input-code" maxlength="4" placeholder="输入验证码">
        <img :src="validateImage" @click="GET_VALIDATE"/>
      </div>
    </div>
    <div class="agreeGroup">
      <input id='agentAgreeBoolean' type="checkbox"  v-model="submitData.agentAgree">
      <label for="agentAgreeBoolean">
        同意并接受本平台的合作协议。
      </label>
    </div>
    
  <div class="register-btngroup">
    <button class="register-btn" @click="regSubmit">注册</button>
  </div>
  </div>
</template>

<script>
import { AgentRegisterControl } from "@/controls/auth/registerAgent";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  mixins: [AgentRegisterControl],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    regSubmit() {
      this.register(this.submitData)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  },
  components: {}
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.agent-register-content {
  text-align: center;
  padding-bottom: 4vh;
  @include f(24px);
  line-height: r(50);
  color: $main-cl;
  .register-item {
    width: 100%;
    text-align: center;
    box-shadow: 0 1px 3px 0 rgba(168, 173, 181, 0.5);
    .register-item-row {
      display: inline-block;
      position: relative;
      width: 90%;
      line-height: r(80);
      height: r(80);
      @include f(28px);
      border: 1px solid rgba(85, 110, 188, 0.7);
      padding-left: 3%;
      text-align: left;
      margin: r(10) auto 0;
      border-radius: r(40);
      overflow: hidden;
      background: $main-bg;
      .iconay {
        @include f(44px);
        color: #dddddd;
      }
      i {
        margin-right: 1%;
      }
      .register-text {
        color: $cl6;
        text-align: center;
        margin-right: 1%;
      }
      .register-input {
        border: none;
        width: 60%;
        @include f(28px);
        background-color: $main-bg;
        color: #ffffff;
        &.register-input-code {
          width: 45%;
        }
      }
      img {
        width: r(130);
        height: 100%;
        float: right;
      }
      .label-right{
        position:absolute;
        top:0;
        right:r(10);
      }
    }
  }
  .agreeGroup {
    margin-top: r(10);
    text-align: left;
    padding-left: 6%;
    color: #dddddd;
    #agentAgreeBoolean {
      width: r(30);
      height: r(27);
      border-radius: 15px;
    }
  }
  .register-btngroup {
    margin-top: 2vh;
    text-align: center;
    .register-btn {
      width: 80%;
      background: $iconcl;
      border-radius: r(50);
      color: $main-cl;
      line-height: r(80);
      height: r(80);
      @include f(28px);
      letter-spacing: r(20);
    }
  }
}
.layout_form04 {
  padding: r(10) 0 r(20);
  .form_field_warp {
    padding-left: r(15 * 2);
    padding-right: r(15 * 2);
  }
}

.form_field {
  &.form_field_cap_code {
    .right_label {
      top: r(-4);
      right: r(6);
      height: 100%;
      position: absolute;
      img {
        vertical-align: middle;
        border-radius: 20em;
        height: r(40 * 2);
        width: auto;
      }
    }
  }
}
</style>
