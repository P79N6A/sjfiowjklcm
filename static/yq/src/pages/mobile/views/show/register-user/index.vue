<template>
  <div class="register-content">
    <!-- <div class="login_logo">
      <img src="/static/images/base/logo.png" alt>
    </div>-->
    <form class="form-ui">
      <div class="input-box">
        <div class="ui-input-row">
          <div class="iconbox">
            <i class="iconfont icon-dengluyonghuming"></i>
          </div>
          <input
            type="text"
            class="ui-ipt"
            v-model="registerForm.account"
            placeholder="用户名(6-10位数字或字母)"
          >
        </div>
        <div class="ui-input-row">
          <div class="iconbox">
            <i class="iconfont icon-mima"></i>
          </div>
          <input
            ref="pwd"
            type="password"
            class="ui-ipt"
            v-model="registerForm.password"
            placeholder="密 码(6-16位数字和字母)"
          >
          <eyes :dom="$refs.pwd"></eyes>
        </div>
        <div class="ui-input-row">
          <div class="iconbox">
            <i class="iconfont icon-shouji"></i>
          </div>
          <input
            type="text"
            class="ui-ipt"
            v-model="registerForm.phone"
            maxlength="11"
            placeholder="取款唯一凭证,请正确填写手机号"
          >
        </div>
        <div class="ui-input-row" v-if="codeType=='code'">
          <div class="iconbox">
            <i class="iconfont icon-yanzhengma"></i>
          </div>
          <input type="text" class="ui-ipt" v-model="registerForm.imageCode" placeholder="请输入验证码">
          <div class="form-img">
            <img :src="validateImage" @click="GET_VALIDATE">
          </div>
        </div>
        <div class="ui-input-row" v-if="codeType=='sms'">
          <div class="iconbox">
            <i class="iconfont icon-yanzhengma"></i>
          </div>
          <input type="text" class="ui-ipt" v-model="registerForm.imageCode" placeholder="请输入短信验证码">
          <span v-if="timer" class="btn-sms">{{timer}}s</span>
          <span v-else @click="getSmsCode" class="btn-sms">获取验证码</span>
        </div>
      </div>

      <div class="agreebox">
        <input type="checkbox" v-model="registerForm.userAgree">
        <label for="agentAgreeBoolean">
          我同意接受最新优惠并愿意遵守奇幻城国际娱乐
          <span class="cl-red" @click="showBox1 = true">《用户协议》</span>和
          <span class="cl-red" @click="showBox2 =true">《隐私条款》</span>
        </label>
        <div class="notice">
          <span class="cl-red">注意：</span>所有资料一经注册均无法修改，建议注册前再次确认注册信息！
        </div>
      </div>

      <!-- <div class="login-btn" @click="toSure">注册</div> -->
      <div class="loginBtnItem">
        <a href="javascript:void(0);" @click="toSure" class="loginBtn">注&nbsp;&nbsp;册</a>
        <router-link class="loginBtn" :to="{name:'guideMenu'}">新手指南</router-link>
      </div>
      <!-- <div class="other-box cfx">
        <router-link :to="{name:'cooperation'}" class="register-btn fl">注册代理账号</router-link>
        <router-link :to="{name:'login'}" class="forget-btn fr">已有账户？</router-link>
      </div>-->
      <!-- <div class="btns">
        <span class="btn block btn-blue" @click="submitForm">立即开户</span>
        <router-link :to="{name:'login'}" class="btn block btn-red">立即登录</router-link>
      </div>-->
    </form>

    <!-- 用户协议 -->
    <div class="overlay" v-show="showBox1">
      <div class="overlay-model">
        <div class="overlay-title">
          用户协议
          <i class="iconfont icon-cuo" @click="showBox1 = false"></i>
        </div>
        <div class="overlay-panel">
          <div class="h4">一、账户条例</div>
          <ol>
            <li>用户注册奇幻城游戏帐户，表示用户已确实详阅、理解并同意奇幻城各项使用规范、游戏规则、各项条款且同意自行承担相应的法律责任；如若不同意奇幻城任一项协议、条款、规范的内容，用户应立即停止使用奇幻城各项服务。</li>
            <li>享用奇幻城提供的服务是用户本人意愿，参与奇幻城服务的同时，均视为用户理解和接受赢钱和输钱的风险且其风险由用户自行承担，用户认同奇幻城所提供的服务是正常、合理、公正、公平的。</li>
            <li>用户声明并承诺，用户在注册开户时所提供的资料，包括用户姓名、电邮地址、电话号码、IP地址，均真实、准确、完整，一但注册，除特殊原因将无法更改。&nbsp;</li>
            <li>用户注册的游戏账户姓名必须与用户身份证、银行账户一致，若不一致，恕奇幻城无法提供部份服务。</li>
            <li>若发现用户以任何不正当的方式登入或参与任何游戏，奇幻城有权拒绝服务该用户，并在不通知的情况下冻结或关闭相关游戏账号，不退还任何款项。</li>
            <li>为避免任何争议，各用户参与奇幻城所有游戏过程中或在结束游戏前，务必检查游戏帐户资料，如发现任何异常情况，应立即与客服联系查证，否则视为同意并接受：其帐户之一切数据或历史数据，以奇幻城资料库的资料为准，用户不得异议。</li>
            <li>用户拥有超过一个游戏账号，包括同姓名、同一邮件地址、同一家庭、同一住址、同一借记卡/信用卡、同一银行账户、同一电脑（大学，团体，网吧，图书馆，办公室等），被将视为联合游戏帐号或可疑游戏账号，本网站有权在不通知的情况下冻结或关闭相关游戏账号，并不退还任何款项。</li>
            <li>所有账户若出现资金有误，用户有义务及时通知本网站调整，且不可使用相关错误金额，任何情况下，相关错误金额被视为无效金额，若用户使用该笔金额进行投注，所有投注被视为无效，一律取消并返还於本网站。&nbsp;</li>
            <li>禁止职业算牌客，全压庄闲大小的投注方式，若经发现本网站有权在不通知的情况下冻结或关闭相关游戏账户，并不退还款项。</li>
            <li>如果用户电脑配件的赛果与奇幻城服务器赛果不一致，奇幻城服务器所显示的结果将为最终赛果。用户也认同参与奇幻城服务的游戏规则，投注状况奇幻城拥有最终解释权。</li>
            <li>严禁用户用非真实IP地址登录游戏（vpn、远程主机等）。</li>
            <li>用户如有违反本服务条款，奇幻城有权随时依据相关规则暂停或中止用户使用奇幻城各项服务。</li>
            <li>在老虎机奖池中奖5万以上，需扣30%的税金。中奖百万以上需要扣除50%的税金。</li>
            <li>用户需认同本协议部分或全部内容是临时性的奇幻城保留随时更改公司服务与各项条款之权力，有权添加、修正或修改各项协议，原因包括但不限于商业原因、遵守监管机构的法律法规、指示、指导或建议或客户服务原因。这些信息仅供参考，在用户与本司之间并不构成协议，合同，和担保的依据，最新的规则与条款可通过网站下方用户协议链接查阅。</li>
            <li>博彩自律方面，如申请关闭游戏账户的玩家，禁用后15天内将无法再开启游戏账号。奇幻城国际为合法博彩公司，需遵守相关防沉迷游戏规定，奇幻城国际关心您。</li>
            <li>无论任何情况，奇幻城拥有最终决定权。</li>
          </ol>
          <div class="h4">二、提款条例</div>
          <ol>
            <li>用户每日提款次数不限。用户每日最高派彩金额1000万人民币，即所有玩法总和的派彩金额。</li>
            <li>最低提款额度为100元，当日提款总额度无上限。</li>
            <li>用户申请提款若遇到配合平台抽查，需全力配合，此不在奇幻城秒提、五分钟提款的承诺范围，平台抽查完毕，若无问题，奇幻城会于第一时间为用户出款。</li>
            <li>所有提款申请必须符合本网站的提款政策，如存款未达到全额投注，即无法通过提款审核，提款申请将会被驳回。&nbsp;</li>
            <li>若有需要，用户必须提供个人资料如身份证副本、驾驶执照副本、银行交易记录截图、居民户口簿副本等资料。</li>
            <li>用户被严禁使用他人或第三者银行账户或银行卡进行取款业务。</li>
            <li>在老虎机奖池中奖5万以上，需扣30%的税金。中奖百万以上需要扣除50%的税金。</li>
            <li>奇幻城秒提、五分钟提款的承诺不包含系统异常、银行维护、网路延迟。</li>
            <li>无论任何情况，奇幻城拥有最终决定权。</li>
          </ol>
          <div class="h4">三、存款条例</div>
          <ol>
            <li>通过网银自助存款方式的用户，若无依照网站要求填写附言，请及时联系在线客服。温馨提示：若存款人姓名与游戏账户姓名不一致，请配合提供网银电子回单，以便财务人员进行补单。</li>
            <li>通过第三方支付进行存款的会员，如果出现掉单的情况，请及时联系在线客服，并提供订单号，存款金额，存款时间，以便我们尽快为您补单。</li>
            <li>用户存款请务必先至奇幻城网站确认当下显示的存款帐户，并依照奇幻城的存款方式操作，若无先行确认当时使用的存款账户，而造成损失，恕奇幻城概不负责。</li>
            <li>第三方支付会有延迟到帐的情形，建议用户使用奇幻城秒存系统；点卡存款务必要至相关平台注册智汇宝帐户，并于操作点卡存款时确实填写，若无确实填写智汇宝帐户造成损失，恕奇幻城概不负责。</li>
            <li>存款最低额度10元，若低于10元，恕奇幻城不提供手工存款相关服务，待用户再次存款补足单笔最低10元额度，并联系客服，奇幻城才会提供用户手工存款相关的服务。</li>
            <li>无论任何情况，奇幻城拥有最终决定权。</li>
          </ol>
          <div class="h4">四、优惠条例</div>
          <ol>
            <li>若要享有奇幻城优惠红利或回赠，用户必须符合活动相关规则及所有条例、附加条款。</li>
            <li>用户涉及个人或团体以不正当的手法，进行骗取或诈骗相关优惠奖金，奇幻城有权在不通知的情况下冻结或关闭相关账户，并不退还款项，用户将会被列入黑名单，并保留追究权利。</li>
            <li>用户拥有超过一个账户，包括同一姓名、同一邮件地址、同一住址、同一借记卡/信用卡、同一银行账户、同一电脑（大学，团体，网吧，图书馆，办公室等），被视为联合账户或可疑账户。</li>
            <li>一但发现该用户有无风险投注，对赌行为，奇幻城有权在不通知的情况下冻结或关闭相关账户，并不退还款项，用户将会被列入黑名单，并保留追究权利。</li>
            <li>奇幻城有权根据会员情况调整会员投注限额。</li>
            <li>奇幻城拥有对所有优惠活动在无通知的情况下修改及最终解释的权力。</li>
            <li>无论任何情况，奇幻城拥有最终决定权。</li>
          </ol>
        </div>
      </div>
    </div>
    <!-- 绝对隐私 -->
    <div class="overlay" v-show="showBox2">
      <div class="overlay-model">
        <div class="overlay-title">
          绝对隐私
          <i class="iconfont icon-cuo" @click="showBox2 = false"></i>
        </div>
        <div class="overlay-panel">
          <p>奇幻城的头等重任，就是保证用户的个人资料及数据安全， 奇幻城承诺不会将用户的个人信息分享或出售给任何第三方，绝对不泄露用户的个人资料，数据库仅限内部员工使用，因此奇幻城国际娱乐城与我们的合作伙伴会通过邮件将您可能感兴趣的促销优惠发送给您；但除此之外，除非收到法庭传单或应可行法律的要求及判决，您的讯息才可能被披露。</p>
          <br>
          <p>奇幻城有权通过网站向相关付款平台服务提供商及金融保险机构，提供必要的个人信息，以完成付款要求，所有用户提供的个人信息，其传送都将通过安全端口（ 128位 SSL 加密标准）并存放在公众无法进入的保密环境之下，对于有机会接触用户个人资料的协助伙伴，也必需遵守奇幻城订立的保密规则，所有数据的内部出入都受到严格的限制及严密的监控。</p>
          <br>
          <p>未经奇幻城明确书面授权，任何人不得散布、变更、复制、转载、使用奇幻城任何内容，或在非奇幻城所属服务器作镜像，否则以侵权论，依法追究法律责任。</p>
          <br>
          <p>奇幻城不会永久保存用户信息，所有信息将按照本隐私政策进行。</p>
          <br>
        </div>
      </div>
    </div>

    <!-- 确认信息 -->
    <div class="overlay1" v-show="showBox3">
      <div class="overlay-model1">
        <div class="overlay-title1">
          确认注册信息
          <i class="iconfont icon-cuo" @click="showBox3 = false"></i>
        </div>
        <div class="overlay-panel1">
          <p class="cl-red">注意！请再次确认您的注册信息！</p>
          <br>
          <p>您即将注册的账号信息如下：</p>
          <br>
          <p>账号：{{registerForm.account}}</p>
          <br>
          <p>电话：{{registerForm.phone}}</p>
          <br>
          <p class="cl-red">温馨提示：注册信息错误会导致密码无法找回</p>
          <div class="sureBtn" @click="submitForm">确定注册</div>
          <div class="sbackBtn" @click="showBox3 = false">返回修改</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { register } from "@/api/authService";
import { registerControl } from "@/controls/auth/registerControl"; // 引入公共业务逻辑
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  mixins: [registerControl],
  data() {
    return {
      showBox1: false,
      showBox2: false,
      showBox3: false
    };
  },
  created() {
    this.checkCodeType();
  },
  computed: {
    ...mapGetters(["validateImage"])
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    submitForm() {
      // 提交动作
      this.register(this.registerForm)
        .then(res => {
          window.toast(res.message);
          this.$router.replace({ name: "registerSuccess" });
        })
        .catch(err => {
          window.toast(err.message);
        });
    },
    toSure() {
      if (this.registerForm.account == "") {
        window.toast("请输入账号");
      } else if (this.registerForm.password == "") {
        window.toast("请输入密码");
      } else if (this.registerForm.phone == "") {
        window.toast("请输入手机号");
      } else if (this.registerForm.imageCode == "") {
        window.toast("请输入验证码");
      } else if (this.registerForm.userAgree == "") {
        window.toast("请选择同意合作协议");
      } else {
        this.showBox3 = true;
      }
    },
    getSmsCode() {
      this.getMessage()
        .then(res => {
          window.toast("获取验证码成功，请注意查收手机短信!");
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #a8a8a8;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #a8a8a8;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #a8a8a8;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #a8a8a8;
}
.register-content {
  // background: url(./images/bg.png) no-repeat center center/100% 100%;
  // min-height: 92vh;
  // overflow: hidden;
  // .login_logo {
  //   text-align: center;
  //   img {
  //     margin: 15% 0;
  //     width: 28%;
  //   }
  // }
  .form-ui {
    width: 90%;
    margin: 25px auto 10px;
    .ui-input-row {
      position: relative;
      line-height: 46px;
      height: 46px;
      background: #fff;
      border-radius: r(8);
      margin-bottom: 23px;
      display: flex;
      overflow: hidden;
      .iconbox {
        width: r(88);
        height: 100%;
        text-align: center;
      }
      .iconfont,
      .iconbolin {
        color: #4db7f4;
        @include f(40px);
      }
    }
    .form-img {
      position: absolute;
      right: r(20);
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      width: 28%;
      height: 80%;
      img {
        width: 100%;
        height: 100%;
        border-radius: r(5);
        vertical-align: inherit;
      }
    }
    .btn-sms {
      width: 30%;
      color: #eee;
      background: #4db7f4;
      border-radius: 5px;
      text-align: center;
      display: block;
      height: 36px;
      line-height: 36px;
      margin: 5px;
      position: absolute;
      top: 0;
      right: 0;
      @include f(24px);
    }
    .input-box {
      // border-radius: 10px;
      overflow: hidden;
    }
    .ui-ipt {
      display: block;
      font-size: 15px;
      color: #a8a8a8;
      line-height: normal;
      line-height: 41px;
      text-align: left;
      white-space: nowrap;
      border: 0;
      width: 90%;
      background: none;
      padding-left: r(20);
      &:focus {
        outline: none;
      }
    }
  }
  input {
    outline: none;
  }
  .login-btn {
    width: 100%;
    border-radius: r(8);
    text-align: center;
    height: r(80);
    line-height: r(80);
    color: #ffffff;
    letter-spacing: 4px;
    @include f(30px);
    background: #4db7f4;
  }
  .other-box {
    color: #fff;
    padding: r(30) 0;
    @include f(30px);
    .register-btn {
      text-align: left;
    }
    .forget-btn {
      text-align: right;
    }
  }
  .agreebox {
    position: relative;
    padding-left: r(60);
    line-height: 1.5;
    input {
      position: absolute;
      left: r(20);
      top: r(4);
    }
    .notice {
      margin-top: r(15);
      margin-bottom: r(25);
    }
  }
  .cl-red {
    color: red;
  }
}
.loginBtnItem {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .loginBtn {
    width: 45%;
    color: #eee;
    background: #4db7f4;
    border-radius: r(10);
    text-align: center;
    display: block;
    height: r(78);
    line-height: r(78);
    @include f(28px);
  }
}
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.5);
  .overlay-model {
    width: 80%;
    height: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .overlay-title {
      position: relative;
      padding: r(20);
      font-weight: 500;
      letter-spacing: 3px;
      background-color: #4db7f4;
      color: #fff;
      .iconfont {
        position: absolute;
        right: r(30);
        top: 50%;
        transform: translateY(-50%);
        @include f(32px);
      }
    }
    .overlay-panel {
      height: 90%;
      overflow-y: auto;
      padding: r(30);
      background-color: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 2px 0 rgba(0, 0, 0, 0.12);
      line-height: 1.8;
      .h4 {
        color: #6ba6da;
      }
      ol {
        padding-left: r(40);
        letter-spacing: 1px;
      }
    }
  }
}
.overlay1 {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  .overlay-model1 {
    width: 80%;
    height: 70%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    .overlay-title1 {
      position: relative;
      padding: r(20);
      font-weight: 500;
      letter-spacing: 3px;
      background-color: #4db7f4;
      color: #fff;
      @include f(32px);
      .iconfont {
        position: absolute;
        right: r(30);
        top: 50%;
        transform: translateY(-50%);
        @include f(32px);
      }
    }
    .overlay-panel1 {
      height: 90%;
      overflow-y: auto;
      padding: r(30);
      background-color: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 2px 0 rgba(0, 0, 0, 0.12);
      line-height: 1.8;
      @include f(28px);
      .sureBtn {
        text-align: center;
        background: #4db7f4;
        color: #fff;
        border-radius: r(8);
        padding: r(12);
        margin-bottom: r(20);
      }
      .sbackBtn {
        text-align: center;
        background: #4db7f4;
        color: #fff;
        border-radius: r(8);
        padding: r(12);
      }
    }
  }
}
</style>
