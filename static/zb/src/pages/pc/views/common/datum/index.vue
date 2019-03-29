<template>
  <div class="form-rowbox perfect-data">
    <el-form :model="Data" ref="infoForm" label-width="100px" class="info-form">
      <el-form-item label="*真实姓名" prop="accountName">
        <el-input
          v-model="Data.accountName"
          :readonly="userData.accountName?true:false"
          placeholder="必须与银行卡姓名一致，绑定后无法修改"
        ></el-input>
        <!-- <p>绑定的姓名必须与银行卡姓名一致，绑定后无法修改，请您仔细核对是否填写正确。</p> -->
      </el-form-item>

      <el-form-item label="*手机号码" prop="phone">
        <el-input v-model="Data.phone" :readonly="userData.phone?true:false" placeholder="输入手机号码">
          <el-button
            slot="append"
            icon="el-icon-error"
            v-if="userData.phoneValidStatus==0 && isUser"
            @click="checkverify"
            style="color:#ed7e12!important"
          >未验证</el-button>
          <el-button
            slot="append"
            icon="el-icon-success"
            v-else-if="userData.phoneValidStatus !=0 && isUser"
          >已验证</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="*出生日期" prop="birthday" v-if="isUser">
        <el-date-picker
          v-model="Data.birthday"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :readonly="userData.birthday?true:false"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="电子邮箱" prop="email">
        <el-input
          v-model="Data.email"
          :readonly="userData.email?true:false"
          placeholder="输入电子邮箱，方便找回密码"
        >
          <!-- 邮箱非必填，修改按钮是在完善信息后，且没填邮箱时 -->
          <el-button
            slot="append"
            icon="el-icon-edit"
            v-if="!userData.email&&!isCompleting"
            @click="upData('email')"
          >修改</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="*推广网址" prop="referWebsite" v-if="isAgent">
        <el-input v-model="Data.referWebsite" :readonly="userData.referWebsite?true:false">
          <el-button
            slot="append"
            icon="el-icon-edit"
            v-clipboard:copy="userData.referWebsite"
            v-clipboard:success="onCopy"
          >复制</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="*银行卡" prop="bankno" v-if="isCompleting&&isUser">
        <el-input
          v-model="Data.bankno"
          placeholder="输入16-19位卡号，系统自动识别"
          @input="verifyBankNumber(Data.bankno)"
        >
          <!-- 银行卡必填，完善信息前 -->
          <el-button
            slot="append"
            icon="el-icon-edit"
            v-if="!userData.bankno&&isCompleting"
          >{{banktxt}}</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="微信号码" prop="wechat">
        <el-input v-model="Data.wechat" :placeholder="userData.wechat?userData.wechat:'输入微信号码'">
          <el-button
            slot="append"
            icon="el-icon-edit"
            v-if="!isCompleting"
            @click="upData('wechat')"
          >修改</el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="Q Q号码" prop="qq">
        <el-input v-model="Data.qq" :placeholder="userData.qq?userData.qq:'输入QQ号码'">
          <el-button slot="append" icon="el-icon-edit" v-if="!isCompleting" @click="upData('qq')">保存</el-button>
        </el-input>
      </el-form-item>

      <el-form-item v-if="isCompleting">
        <el-button class="btn" @click="submitForm('infoForm')">提交</el-button>
        <el-button @click="resetForm('infoForm')">重置</el-button>
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
      showTips: false
    };
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
          window.toast(res.message,'warning');
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
          window.toast(res.message,'warning');
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    onCopy() {
      window.toast("复制成功",'success');
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
    }
  },
  activated() {
    // 要用了keep-alive才会有作用
    Object.assign(this.Data, this.userData || {});
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
  width: 500px;
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100% !important;
  }
}
</style>
