<template>
  <div class="password">
    <el-form
      :model="pwdForm"
      status-icon
      :rules="pwdrules"
      ref="pwdForm"
      label-width="120px"
      class="password-ruleForm"
    >
      <el-form-item label="旧密码：" prop="password">
        <el-input :type="passwordType.password" v-model="pwdForm.password" placeholder="请输入旧的登录密码">
          <el-button
            slot="append"
            icon="el-icon-remove-outline"
            @click="showPwd('password')"
            v-if="passwordType.password=='password'"
          ></el-button>
          <el-button slot="append" icon="el-icon-view" @click="showPwd('password')" v-else></el-button>
        </el-input>
      </el-form-item>

      <el-form-item label="新密码：" prop="new_password">
        <el-input
          :type="passwordType.new_password"
          v-model="pwdForm.new_password"
          auto-complete="off"
          placeholder="请输入新的登录密码"
        >
          <el-button
            slot="append"
            icon="el-icon-remove-outline"
            @click="showPwd('new_password')"
            v-if="passwordType.new_password=='password'"
          ></el-button>
          <el-button
            slot="append"
            icon="el-icon-view"
            @click="showPwd('new_password')"
            v-else
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="confirm_password">
        <el-input
          :type="passwordType.confirm_password"
          v-model="pwdForm.confirm_password"
          auto-complete="off"
          placeholder="请再次输入新的登录密码"
        >
          <el-button
            slot="append"
            icon="el-icon-remove-outline"
            @click="showPwd('confirm_password')"
            v-if="passwordType.confirm_password=='password'"
          ></el-button>
          <el-button
            slot="append"
            icon="el-icon-view"
            @click="showPwd('confirm_password')"
            v-else
          ></el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="submitForm('pwdForm')" type="primary">提交</el-button>
        <!-- <el-button @click="resetForm('pwdForm')">清空</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import check from "@/util/RegExp";
import { loginUpdate } from "@/controls/auth/loginUpdate";
export default {
  mixins: [loginUpdate],
  data() {
    const password_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("旧密码不能为空"));
      } else {
        callback();
      }
    };

    const new_password_check = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value == this.pwdForm.password) {
        callback(new Error("新密码不能与旧密码相同"));
      } else if (!check.password.test(value)) {
        callback(new Error("密码需为6-16位，包含数字和字母"));
      } else {
        if (this.pwdForm.checkPass !== "") {
          // 改变值后，去和确认密码做判断
          this.$refs.pwdForm.validateField("confirm_password");
        }
        callback();
      }
    };

    const confirm_password_check = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwdForm.new_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 密码明/暗文切换
      passwordType: {
        confirm_password: "password",
        new_password: "password",
        password: "password"
      },
      // form验证规则
      pwdrules: {
        password: [
          {
            validator: password_check,
            trigger: "blur"
          }
        ],
        new_password: [
          {
            validator: new_password_check,
            trigger: "blur"
          }
        ],
        confirm_password: [
          {
            validator: confirm_password_check,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 是否显示密码
    showPwd(val) {
      if (this.passwordType[val] === "password") {
        this.passwordType[val] = "";
      } else {
        this.passwordType[val] = "password";
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 确认事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitPwd(this.pwdForm)
            .then(res => {
              window.toast(res.message);
              this.$store.dispatch("LOGIN_OUT");
            })
            .catch(err => {
              console.log(err);
              window.toast(err.message);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.password {
  padding: 90px;

  .password-ruleForm {
    width: 700px;
    margin: 0 auto;
  }
}
</style>
