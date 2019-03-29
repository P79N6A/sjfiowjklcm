<template>
  <div class="agent-apply-join">
    <div class="title bold">申请加盟</div>
    <div class="content">
      <!-- <register-agent></register-agent> -->
      <div class="register-agent">
        <div class="cfx">
          <div class="form-group">
            <label>
              <span>*</span>加盟账号
            </label>
            <input
              v-model="submitData.loginname"
              type="text"
              @click="submitData.loginname=submitData.loginname==''?'a_':submitData.loginname"
              placeholder="账号(以a_(下划线)开头，3-15个数字或字母)"
            >
          </div>
          <div class="form-group">
            <label>*真实姓名</label>
            <input type="text" v-model="submitData.accountName" placeholder="必须与您的银行账户名相同">
          </div>
          <div class="form-group">
            <label>*登录密码</label>
            <input v-model="submitData.password" type="password" placeholder="密码(6-10位数字和字母)">
          </div>
          <div class="form-group">
            <label>*确认密码</label>
            <input v-model="submitData.confirmPassword" type="password" placeholder="请在此填写登录密码">
          </div>

          <div class="form-group">
            <label>*电子邮箱</label>
            <input type="text" v-model="submitData.email" placeholder="建议@gmail邮箱">
          </div>
          <div class="form-group">
            <label>*联系电话</label>
            <input type="text" v-model="submitData.phone" placeholder="请输入您的常用联系方式" maxlength="11">
          </div>
          <div class="form-group">
            <label>*QQ</label>
            <input type="text" v-model="submitData.qq" placeholder="玩家注册时必须填写QQ账号">
          </div>
          <div class="form-group">
            <label>*网址</label>
            <span>http://</span>
            <input type="text" v-model="submitData.referWebsite" class="referWebsite" maxlength="6" placeholder="2-6个数字/小写字母" >
            <span>{{domainName}}</span>
          </div>
          <div class="form-group">
            <label>推荐码</label>
            <input type="text" v-model="submitData.partner" placeholder="代理推荐号">
          </div>
          <div class="form-group">
            <label>*验证码</label>
            <input
              type="text"
              class="v-code"
              v-model="submitData.validateCode"
              placeholder="验证码"
              maxlength="4"
            >
            <a href="javascript:;" class="captcha-code icon_popup">
              <img :src="validateImage" @click="GET_VALIDATE">
            </a>
          </div>
        </div>

        <div style="font-size: 16px;text-indent: 10em">
          <input type="checkbox" class="checkBox" v-model="submitData.agentAgree">
          <span class="agree">本人已经超过合法年龄以及本人在此网站的所有活动并没有抵触本人所身在的国家所管辖的法律。同时接受该站点《用户协议》</span>
        </div>
        <input type="submit" class="submit" @click.prevent="regSubmit" id="submit_user" value="提交">

        <!-- <div class="tips-link">
          已有账号？
          <a class="spantext" href="#">在此登录</a> -->
          <!--<span @click="$store.commit('SHOW_LOGIN',true)">在此登录</span>-->
        <!-- </div> -->
      </div>
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
          window.toast(res.message,'warning');
        })
        .catch(err => {
          window.toast(err.message);
        });
    }
  }
};
</script>
<style lang="scss">
.bold {
  font-size: 30px;
  font-weight: 700;
}
.title {
  padding: 30px 0;
  margin-top: 36px;
  margin-bottom: 54px;
  background-color: #f2f2f2;
  // height: 111px;
  color: #000;
  line-height: 28px;
  text-align: center;
}
.agent-apply-join {
  background: #fff url("./images/join.jpg") no-repeat center top;
  padding-top: 302px;
  padding-bottom: 44px;
}
.register-agent {
  overflow: hidden;
  .form-group {
    font-size: 0;
    float: left;
    margin-bottom: 26px;
    color: #989d9f;
    white-space: nowrap;
    min-height: 46px;
    &:nth-child(2n) {
      float: right;
    }
    label {
      color: #3ec1fe;
      font-size: 20px;
      width: 148px;
      display: inline-block;
      text-align: right;
      line-height: 46px;
      padding-right: 30px;
      white-space: nowrap;
      vertical-align: top;
    }
    span {
      font-size: 20px;
    }
    input[type="text"],
    input[type="password"] {
      width: 374px;
      height: 46px;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 18px;
      padding-left: 10px;
    }

    .v-code {
      width: 234px !important;
    }
    .referWebsite {
      width: 213px !important;
    }
    img {
      width: 118px;
      height: 46px;
      float: right;
    }
    .agree {
      font-size: 18px;
      color: #535353;
      line-height: 32px;
      white-space: normal;
      display: inline-block;
    }
  }

  .submit {
    clear: both;
    display: block;
    margin: 25px auto 0;
    background-color: #3ec1fe;
    border-radius: 36px;
    height: 73px;
    width: 391px;
    line-height: 73px;
    text-align: center;
    color: #fff;
    font-size: 30px;
    border: 1px solid #3ec1fe;
    cursor: pointer;
    outline: none;
  }
  .tips-link {
    text-align: center;
    color: #888;
    font-size: 22px;
    padding-bottom: 200px;
    margin-top: 16px;
    .spantext {
      color: #3ec1fe;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .checkBox {
    width: 16px;
    height: 16px;
  }
}
</style>
