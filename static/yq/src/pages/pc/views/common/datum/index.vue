<template>
  <div class="form-rowbox perfect-data">
    <el-form
      :model="Data"
      ref="infoForm"
      :hide-required-asterisk="true"
      label-width="120px"
      class="info-form"
    >
      <el-form-item label="用户名：" prop="loginname">
        <el-input
          v-model="Data.loginname"
          :readonly="true"
          :class="{readonly:userData.loginname}"
          :placeholder="userData.loginname?userData.loginname:'输入用户名'"
        ></el-input>
      </el-form-item>

      <el-form-item label="VIP等级：" prop="level" v-if="isUser">
        <el-input
          v-model="Data.level"
          :readonly="true"
          :class="{readonly:userData.level}"
          :placeholder="userData.level?userData.level:'VIP等级：'"
        ></el-input>
      </el-form-item>

      <el-form-item label="真实姓名：" :required="userData.accountName?false:true" prop="accountName">
        <el-input
          v-model="Data.accountName"
          :readonly="userData.accountName?true:false"
          :disable="userData.accountName?true:false"
          :placeholder="userData.accountName?userData.accountName:'输入真实姓名，必须与银行卡姓名一致'"
          :class="{readonly:userData.accountName}"
        ></el-input>
      </el-form-item>

      <el-form-item label="出生日期：" :show-message="false" prop="birthday" v-if="isUser">
        <el-date-picker
          v-model="Data.birthday"
          type="date"
          :placeholder="userData.birthday?userData.birthday:'选择日期'"
          value-format="yyyy-MM-dd HH:mm:ss"
          :readonly="userData.birthday?true:false"
          :class="{readonly:userData.birthday}"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="电子邮箱：" prop="email">
        <el-input
          v-model="Data.email"
          :readonly="userData.email?true:false"
          :placeholder="userData.email?userData.email:'输入电子邮箱，方便找回密码'"
          :class="{readonly:userData.email}"
          @blur="handleBlur()"
        ></el-input>
        <ul class="ulList" v-show="showUL">
          <li
            v-for="(item,i) in emailOption"
            :key="i"
            :ref="`li`+ i"
            @click="handleClick(item)"
          >{{item}}</li>
        </ul>
      </el-form-item>
      <el-form-item label="手机号码：" :required="userData.phone?false:true" prop="phone">
        <el-input
          :class="{readonly:userData.phone}"
          v-model="Data.phone"
          :readonly="userData.phone?true:false"
          :placeholder="userData.phone?userData.phone:'输入手机号码'"
          maxlnegth="11"
        >
          <el-button
            slot="append"
            icon="el-icon-error"
            v-if="userData.phoneValidStatus==0 && isUser&&userData.phone"
            @click="checkverify"
            style="color:#ed7e12!important"
          >未验证</el-button>
          <el-button
            slot="append"
            icon="el-icon-success"
            v-else-if="userData.phoneValidStatus !=0 && isUser&&userData.phone"
          >已验证</el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="Q Q号码：" prop="qq">
        <el-input v-model="Data.qq" :placeholder="userData.qq?userData.qq:'输入QQ号码'"></el-input>
      </el-form-item>

      <el-form-item label="微信号码：" prop="wechat">
        <el-input v-model="Data.wechat" :placeholder="userData.wechat?userData.wechat:'输入微信号码'"></el-input>
      </el-form-item>

      <el-form-item label="推广网址：" prop="referWebsite" v-if="isAgent">
        <el-input :value="userData.referWebsite" readonly v-if="userData.referWebsite">
          <el-button
            slot="append"
            icon="el-icon-edit"
            v-clipboard:copy="userData.referWebsite"
            v-clipboard:success="onCopy"
          >复制</el-button>
        </el-input>
      </el-form-item>

      <!-- <el-form-item label="银行卡：" prop="bankno" v-if="isCompleting&&isUser">
        <el-input
          v-model="Data.bankno"
          placeholder="输入16-19位卡号，系统自动识别"
          @input="verifyBankNumber(Data.bankno)"
        >
          <el-button
            slot="append"
            v-if="!userData.bankno&&isCompleting"
          >{{banktxt}}</el-button>
        </el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button @click="submitForm('infoForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="验证手机"
      width="640px"
      v-if="userData.phoneValidStatus==0"
      :visible.sync="showVerify"
    >
      <verifyPhone :data="reverseData" :phone="userData.phone"></verifyPhone>
    </el-dialog>
  </div>
</template>
<script>
import {
  completeUserInfo,
  getPhoneAndCode,
  modifyCustomerSocialInfo
} from "@/api/user";
import { validateBankNo } from "@/api/payment";
import { mapGetters } from "vuex";
import check from "@/util/RegExp";
import verifyPhone from "./components/verify";
import { update } from "@/controls/user/update";
import { bank } from "@/controls/common/bank";
export default {
  mixins: [update, bank],
  data() {
    return {
      showVerify: false,
      reverseData: null,
      showTips: false,
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      // alert('submit!');
      // 提交完善信息表单
      this.completeSubmit(this.Data)
        .then(res => {
          window.toast(res.message);
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
    onCopy() {
      window.toast("复制成功");
    },
    checkverify() {
      // 这部分逻辑，应该放到verify组件内
      getPhoneAndCode().then(res => {
        if (res.success && this.userData.phone) {
          this.showVerify = true;
          this.reverseData = res.data;
        } else {
          window.toast(res.message);
        }
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
  activated() {
    // 要用了keep-alive才会有作用
    // Object.assign(this.Data, this.userData || {});
  },
  computed: {
    ...mapGetters(["userData", "isUser", "unread"])
  },
  components: {
    verifyPhone
  }
};
</script>
<style lang="scss" rel="scss">
.info-form {
  width: 700px;
  margin: 70px auto;

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
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
    }
  }
}
</style>
