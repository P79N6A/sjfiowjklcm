<template>
  <div class="login_before_wp clear">
    <!-- <div class="username">
      <input
        type="text"
        id="loginname"
        v-model="loginData.account"
        @keyup.enter="login"
        maxlength="15"
        placeholder="用户名"
      >
    </div>
    <div class="password">
      <input
        type="password"
        id="password"
        maxlength="16"
        v-model="loginData.password"
        @keyup.enter="login"
        placeholder="密码"
      >
    </div>
    <div class="username">
      <input
        type="text"
        class="validimg"
        maxlength="4"
        @keyup.enter="login"
        v-model="loginData.imageCode"
        placeholder="验证码"
      >
      <img class="verifyImg" :src="validateImage" @click="GET_VALIDATE">
    </div>
    <input type="hidden" id="code">-->
    <div>
      <!-- <input type="button" id="loginBtn" @click.enter="login();" value="登录"> -->
      <router-link id="loginBtn" :to="{name:'loginPage'}">登录</router-link>
    </div>
    <div>
      <router-link id="regBtn" :to="{name:'registerPage'}">免费开户</router-link>
    </div>
    <!-- <div>
          <a class="new" href="/static/page/newTutorial/index.html">新手指南</a>
    </div>-->
    <!-- <div class="last_item"> -->
      <!-- <router-link class="forgetpwd" :to="{name:'accountQA'}">忘记密码?</router-link> -->
    <!-- </div> -->
  </div>
</template>
<script>
import { loginControl } from "@/controls/auth/loginControl"; // 引入公共业务逻辑
import { mapGetters, mapActions, mapMutations } from "vuex";
import { SETTING } from "@/assets/data";
import vLogin from "pc/master/layout/t3/components/auth/login";
export default {
  mixins: [loginControl], // 混合
  data() {
    return {
      SETTING,
      showRig: false,
      ImgCode: "",
      showPass: false,
      showQRcode: false,
      isShowLoginModal: false
    };
  },
  components: {
    vLogin
  },
  methods: {
    ...mapMutations(["GET_VALIDATE"]),
    login() {
      this.loginSubmit(this.loginData)
        .then(res => {
          window.toast(res.message);
          if (res.data.role == "AGENT") {
            this.$router.push({ name: "agent_summary" });
          } else {
            this.$router.push({ name: "deposit" });
          }
        })
        .catch(err => {
          window.toast(err.message);
        });
    },
    registerIt() {
      this.$bus.$emit("showRegister", true);
      console.log("ToshowRegister");
    },
    showQR() {
      this.showQRcode = true;
    },
    hideQR() {
      this.showQRcode = false;
    }
  },
  computed: {
    ...mapGetters([
      "validateImage",
      "userData",
      "isUser",
      "isAgent",
      "unread",
      "money",
      "wallet"
    ])
  }
};
</script>
<style lang="scss" scoped>
input::-webkit-input-placeholder {
  color: #fff;
}

input::placeholder {
  color: #fff;
}
.login_before_wp {
  float: right;
  margin-top: 10px;
  div {
    float: left;
    position: relative;
    margin: 0 6px 0;
    text-align: left;
    img {
      width: 55px;
      height: 30px;
    }
  }
  .validimg {
    width: 70px !important;
  }
  input[type="text"],
  input[type="password"] {
    width: 150px;
    height: 30px;
    padding: 0 0 0 5px;
    background: #505050;
    line-height: 30px;
    color: #fff;
    border: none;
    &:focus {
      outline: none;
    }
  }
  input[type="button"] {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid transparent;
    cursor: pointer;
  }

  #regBtn,
  #loginBtn {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: rgb(89, 219, 208); /* Old browsers */
    background: -moz-linear-gradient(
      top,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      top,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to bottom,
      rgba(89, 219, 208, 1) 0%,
      rgba(77, 183, 244, 1) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#59dbd0', endColorstr='#4db7f4',GradientType=0 ); /* IE6-9 */
    color: #fff;
    display: inline-block;
    text-align: center;
  }
  .new {
    background: #59dbd0;
    color: #fff;
    display: block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .last_item {
    margin: 0 0 0 6px;
    .forgetpwd {
      line-height: 30px;
      color: #9e9e9e;
      cursor: pointer;
    }
  }
}
.clear:after {
  content: "";
  display: block;
  clear: both;
}
</style>
