<template>
  <div class="user-personal-updata">
    <div class="inputs">
      <h4>用户名</h4>
      <input
        v-model="userData.loginname"
        readonly
        :placeholder="userData.loginname?userData.loginname:'请输入您的用户名'"
      >
    </div>

    <div class="inputs">
      <h4>
        <span class="cl-red">*</span>真实姓名
      </h4>
      <input
        type="text"
        v-model="Data.accountName"
        :readonly="userData.accountName?true:false"
        :placeholder="userData.accountName?userData.accountName:'请输入您的真实姓名'"
      >
    </div>

    <div class="inputs" v-if="isUser">
      <h4>生日</h4>
      <input
        :value="userData.birthday.toString().toDate().format('yyyy-MM-dd')"
        readonly
        type="text"
        v-if="userData.birthday"
        :placeholder="userData.birthday?userData.birthday:'请输入您的生日'"
      >
      <input v-model="Data.birthday" type="date" placeholder="年龄需满18岁" v-else>
    </div>

    <div class="inputs">
      <h4>
        <span class="cl-red">*</span>联系电话
      </h4>
      <input
        type="text"
        v-model="Data.phone"
        maxlength="11"
        :readonly="userData.phone?true:false"
        :placeholder="userData.phone?userData.phone:'请输入您的联系电话'"
      >
      <router-link
        class="i-btn"
        :to="{name:'verify'}"
        v-if="userData.phoneValidStatus == 0 && isUser&&userData.phone"
      >进入验证</router-link>
    </div>
    <!-- <div class="inputs" v-if="isCompleting">
      <h4>
        <span class="cl-red" v-if="isCompleting">*</span>银行卡号
      </h4>
      <input
        type="text"
        class="user-personal-input"
        v-model="Data.bankno"
        maxlength="19"
        @input="verifyBankNumber(Data.bankno)"
        :readonly="userData.bankno?true:false"
        placeholder="输入16-19位卡号后，系统智能识别"
      >
      <span class="i-btn" v-if="!userData.bankno&&isCompleting">{{banktxt}}</span>
    </div>-->
    <div class="inputs">
      <h4>电子邮箱</h4>
      <input
        type="text"
        v-model="Data.email"
        :readonly="userData.email?true:false"
        :placeholder="userData.email?userData.email:'请输入您的电子邮箱'"
        @blur="handleBlur()"
      >
      <!-- <span class="i-btn" v-if="!userData.email&&!isCompleting" @click="upData('email')">修改</span> -->
      <ul class="ulList" v-show="showUL">
        <li
          v-for="(item,i) in emailOption"
          :key="i"
          :ref="`li`+ i"
          @click="handleClick(item)"
        >{{item}}</li>
      </ul>
    </div>
    <div class="inputs">
      <h4>QQ号</h4>
      <input
        type="text"
        class="user-personal-input"
        v-model="Data.qq"
        :placeholder="userData.qq?userData.qq:'请输入您的QQ号'"
      >
      <!-- <span class="i-btn" v-if="!isCompleting" @click="upData('qq')">修改</span> -->
    </div>
    <div class="inputs">
      <h4>微信号</h4>
      <input
        type="text"
        class="user-personal-input"
        v-model="Data.wechat"
        :placeholder="userData.wechat?userData.wechat:'请输入您的微信号'"
      >
      <!-- <span class="i-btn" v-if="!isCompleting" @click="upData('wechat')">修改</span> -->
    </div>
    <div class="inputs" v-if="isAgent && userData.referWebsite">
      <h4>推广网址</h4>
      <input type="text" :value="userData.referWebsite" :readonly="userData.referWebsite?true:false">
      <span class="i-btn" v-clipboard:copy="userData.referWebsite" v-clipboard:success="onCopy">复制</span>
    </div>
    <div class="user-personal-update-btn">
      <button class="btn" @click="submitForm">提交个人信息</button>
    </div>
  </div>
</template>
<script>
import { modifyCustomerSocialInfo } from "@/api/user";
import { mapGetters } from "vuex";
import vVerify from "./components/verify";
import { update } from "@/controls/user/update";
import { bank } from "@/controls/common/bank";
export default {
  mixins: [update, bank],
  data() {
    return {
      newDetail: {
        qq: "",
        wechat: "",
        email: ""
      },
      oldDetail: {
        qq: "",
        wechat: "",
        email: ""
      },
      emailOption: [],
      showUL: false,
      notWatch: false
    };
  },
  watch: {
    "Data.email"(val) {
      if (!this.notWatch) {
        let flag = "";
        let temp = [
          "@qq.com",
          "@gmail.com",
          "@126.com",
          "@163.com",
          "@sina.cn",
          "@sina.com"
        ];
        if (val) {
          this.showUL = true;
          //当用户输入了@
          if (val.indexOf("@") > 0) {
            flag = val.substr(val.indexOf("@")); //获取的输入的@开始的内容
            this.emailOption = temp.map(item => {
              return val.substring(0, val.indexOf("@")) + item;
            });
          } else {
            flag = "";
            this.emailOption = temp.map(item => {
              return val + item;
            });
          }
          //如果用户输入了@，则检查哪些是满足条件的
          if (flag != "") {
            var reg = new RegExp(flag, "i");
            for (var i = 0; i < temp.length; i++) {
              if (reg.test(temp[i])) {
                this.$refs["li" + i][0].style.display = "block";
              } else {
                this.$refs["li" + i][0].style.display = "none";
              }
            }
          }
        } else {
          this.showUL = false;
        }
      }
      this.notWatch = false;
    }
  },
  methods: {
    onCopy() {
      window.toast("复制成功");
    },
    submitForm(formName) {
      // alert('submit!');
      // 提交完善信息表单
      this.completeSubmit(this.Data)
        .then(res => {
          window.toast(res.message);
          this.$bus.$emit("getBankList");
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    // 更新某个值
    upData(type) {
      this.modifySubmit({
        [type]: this.Data[type]
      })
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    handleClick(item) {
      this.Data.email = item;
      this.notWatch = true;
      this.showUL = false;
    },
    handleBlur() {
      setTimeout(() => {
        this.showUL = false;
      }, 200);
    }
  },
  computed: {
    ...mapGetters(["userData", "isUser", "isAgent"])
  },
  // created() {
  //   Object.assign(this.Data, this.userData || {});
  // },
  // activated() {
  //   // 要用了keep-alive才会有作用
  //   Object.assign(this.Data, this.userData || {});
  // },
  components: {
    vVerify
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.user-personal-updata {
  background: #f4f4f4;
  padding-top: r(20);
  padding-bottom: r(100);
  .inputs {
    margin: 0 r(20);
    position: relative;
    // overflow: hidden;
    // @include f(32px);
    .ulList {
      position: absolute;
      z-index: 1;
      background: #fff;
      border: 1px solid #ccc;
      width: 100%;
      border-radius: 5px;
      padding-left: 10px;
      transition: all 0.8s;
      li {
        cursor: pointer;
        line-height: 2;
      }
    }
    h4 {
      line-height: r(80);
      font-weight: normal;
    }
    input,
    select {
      display: block;
      width: 100%;
      height: r(80);
      border: solid 1px #dedede;
      border-radius: 6px;
      background: #fff;
      border-radius: 4px;
      text-indent: r(20);
      &.readonly,
      &:read-only {
        background: #eee;
      }
    }
    input[type="date"] {
      width: 95vw;
      display: block;
    }
    .i-btn {
      position: absolute;
      bottom: 0;
      border-radius: 0 4px 4px 0;
      right: 0;
      background: #ff3e3e;
      line-height: r(80);
      height: r(80);
      color: #fff;
      @include f(30);
      padding: 0 r(20);
    }
  }
}
.user-personal {
  @include f(32px);
}
.page_content_tip {
  padding: r(20);
  line-height: 1.4;
  text-align: center;
  color: red;
}
.user-personal-update-btn {
  width: 100%;
  text-align: center;
  margin-top: r(30);
  .btn {
    width: 94%;
    // margin: 0 auto;
    background: $cl1;
    color: #fff;
    height: r(94);
    line-height: r(94);
    text-align: center;
    @include f(32px);
    letter-spacing: 2px;
    font-family: PingFangSC-Regular;
    border-radius: 5px;
  }
}
</style>
