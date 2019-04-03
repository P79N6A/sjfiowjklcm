<template>
  <div class="register-agent">
    <!-- 代理注册，如果是弹窗形式，请写在这里 -->
    <div class="form-group">
      <label class="iconfont icon-wo"></label>
      <input v-model="agent.loginname" type="text"
             @click="agent.loginname=agent.loginname==''?'a_':agent.loginname"
             placeholder="账号(以a_(下划线)开头，3-15个数字或字母)">
    </div>
    <div class="form-group">
      <label class="iconfont icon-yonghu"></label>
      <input type="text" v-model='agent.accountName' placeholder="必须与您的银行账户名相同">
    </div>
    <div class="form-group">
      <label class="iconfont icon-mima"></label>
      <input v-model='agent.password' type="password" placeholder="由1-8个数字或小写字母组成">
      <eyes></eyes>
    </div>
    <div class="form-group">
      <label class="iconfont icon-mima"></label>
      <input v-model="agent.confirmPassword" type="password" placeholder="请在此填写登录密码">
      <eyes>  </eyes>
    </div>
    <div class="form-group">
      <label class="iconfont icon-youjian"></label>
      <input type="text" v-model='agent.email' placeholder="建议@gmail邮箱">
    </div>
    <div class="form-group">
      <label class="iconfont icon-shouji"></label>
      <input type="text" v-model="agent.phone" placeholder="请输入您的常用联系手机">
    </div>
    <div class="form-group">
      <label class="iconfont icon-QQ"></label>
      <input type="text" v-model='agent.qq' placeholder="玩家注册时必须填写QQ账号">
    </div>
    <div class="form-group">
      <label class="iconfont icon-ie"></label>
      <input type="text" v-model="agent.referWebsite" class="referWebsite" maxlength="15" placeholder="由1-6个数字或小写字母组成">
      <span class="captcha-code">{{data.domainName}}</span>
    </div>
    <div class="form-group">
      <label class="iconfont icon-cloud-we"></label>
      <input type="text" v-model='agent.partner' placeholder="代理推荐号">
    </div>
    <div class="form-group ">
      <label class="iconfont icon-yanzhengma"></label>
      <input type="text" class="v-code" v-model="agent.validateCode" placeholder="验证码" maxlength="6">
      <img class="captcha-code" @click="GET_VALIDATE" :src="validateImage" />
    </div>
    <div class="form-group none">
      <label for="">
        <input type="checkbox" name="agentAgreeBoolean" id="agentAgreeBoolean" v-model="data.agentAgreeBoolean">
        <input type="hidden" id="agentAgree" value="on" name="agentAgree" v-model="agent.agentAgree">
      </label>
      <span class="agree">本人已经超过合法年龄以及本人在此网站的所有活动并没有抵触本人所身在的国家所管辖的法律。同时接受该站点《用户协议》</span>
    </div>
    <div class="btn-sumbit" @click.prevent="register">
      提 交
    </div>
  </div>
</template>
<script>
  import {getDomainName} from '@/api/show'
  import {register} from '@/api/authService';
  import eyes from "pc/components/eyes"
  import check from "@/util/RegExp"
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        show: false,
        ImgCode: getAuthImg(),
        data: {
          loginname: "",
          password: "",
          validateCode: "",
          isRemember: false,
          agentAgreeBoolean: false,
          domainName: "获取中"
        },
        user: {},
        isSubmit: false,
        agent: {
          phone: "", //true string
          email: "", //true string
          accountName: "", //true string
          loginname: "", //true string
          validateCode: "", //true string
          password: "", //true string
          confirmPassword: "",
          qq: "", //true string
          partner: "",
          wechat: "",
          referWebsite: "",
          agentAgree: ""
        }
      }
    },
    mounted() {
      this.$nextTick(function () {
        this.getDomainName();
      });
    },
    computed: {
      ...mapGetters(['validateImage'])
    },
    methods: {
      ...mapMutations(['GET_VALIDATE']),
      getDomainName() {
        var that = this;
        getDomainName().then(res => {
          if (res.success) {
            that.data.domainName = res.data;
          }
        })
      },
      reset(msg) {
        this.data.validateCode = ""
        this.GET_VALIDATE()
      },
      check() {
        if (this.data.loginname == "")
          $alert("用户名不能为空")
        else if (this.data.password == "")
          $alert("密码不能为空")
        else if (this.data.validateCode == "")
          $alert("验证码不能为空")
        else
          return true;
      },
      checked() {
        if (!check.agent_account.test(this.agent.loginname)) toast("账号(以a_(下划线)开头，3-15个数字或字母)");
        else if (!check.password.test(this.agent.password)) toast("密码(6-10位数字和字母)");
        else if (this.agent.password != this.agent.confirmPassword) toast("二次密码不一致");
        else if (this.agent.accountName == "") toast("请输入姓名");
        else if (!check.name.test(this.agent.accountName)) toast("请输入正确的中文名字");
        else if (this.agent.referWebsite == "") toast("请输入加盟地址");
        else if (!check.email.test(this.agent.email)) toast("请输入电子邮箱地址");
        else if (!check.phone.test(this.agent.phone)) toast("手机号格式不正确");
        else if (this.agent.validateCode == "") toast("请输入验证码");
        else if (!this.data.agentAgreeBoolean) toast("请选择同意合作协议");
        else {
          return true;
        }
      },
      register() {
        if (this.isSubmit || !this.checked()) return;
        var that = this;
        var x = window.confirm("请确认资料是否填写正确，如有乱填写将不审核，此帐号不能进行游戏，确认提交后，我们的市场专员会在24小时内联系您")
        if (x) {
          this.isSubmit = true;
          this.agent.agentAgree = 'on';
          registerAgent(this.agent).then(res => {
            that.isSubmit = false;
            that.GET_VALIDATE();
            if (res.success) {
              $alert("代理帐号审核中,我们的市场专员会在24小时内联系您")
            } else
              $alert(res.message);
          })
        }
      }
    },
    components:{
      eyes
    }
  }
</script>
<style lang="scss">
  .register-agent {
    overflow: hidden;
    color: #c8c5c5;
    font-size: 14px;
    width: 650px;
    margin: 0 auto;

    .form-group {
      float: left;
      width: 300px;
      height: 54px;
      padding-left: 30px;
      border-bottom: 1px solid #4d4644;
      position: relative;
      padding-bottom: 12px;
      padding-top: 25px;

      &:nth-child(2n) {
        float: right;
      }
      &.none {
        border: none;
      }
      input[type='text'],
      input[type='password'] {
        background: none;
        width: 100%;
        color: #fff;
        vertical-align: top;
        line-height:1;
      }
      label {
        position: absolute;
        top: 15px;
        left: 0;
        height: 38px;
        line-height: 38px;
        font-size: 22px;
      }
      span.eyes{
        top:22px;
      }
    }
    .captcha-code {
      position: absolute;
      right: 0;
      top:22px;
      cursor: pointer;
      height: 28px;
      line-height:22px;
      width: 80px;
      color: #ff0;
    }

    .btn-sumbit {
      background: url("./images/pf.png");
      height: 54px;
      width: 320px;
      position: absolute;
      border-radius: 10px;
      bottom: -27px;
      left: 50%;
      margin-left: -160px;
      line-height: 54px;
      color: #000;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
    }
  }
</style>
