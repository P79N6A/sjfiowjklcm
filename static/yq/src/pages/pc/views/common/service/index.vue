
<template>
  <div class="user-suggest">
    <!-- 投诉建议 -->
    <el-form :model="ruleForm" ref="ruleForm" label-width="120px" style="width:600px;">
      <el-form-item label="反馈类型：" prop="type">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择">
          <el-option
            v-for="item in typeData"
            :key="item.id"
            :label="item.categoryName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="联系电话：" prop="phone">
        <el-input v-model="ruleForm.phone" maxlength="11" placeholder="输入您的11位手机电话"></el-input>
      </el-form-item>

      <el-form-item label="反馈问题描述：" prop="content">
        <el-input
          v-model="ruleForm.content"
          type="textarea"
          :rows="6"
          maxlength="300"
          placeholder="请详细描述您要反馈的内容，最多输入300个字"
        ></el-input>
      </el-form-item>

      <p
        style="padding-left: 115px;padding-bottom: 20px;color: red;"
      >您好，有任何疑问与反馈，您也可以发送到投诉邮箱：ceoqhc@gmail.com，奇幻城祝您生活愉快！</p>

      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">发送</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { suggestCategories, applySuggestion } from "@/api/user";
import check from "@/util/RegExp";
import { mapGetters } from "vuex";
export default {
  name: "",
  data() {
    return {
      cur: "Suggest",
      ruleForm: {
        phone: "",
        content: "",
        categoryId: ""
      },

      typeData: []
    };
  },
  computed: {
    ...mapGetters(["isSetPayPwd"])
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          applySuggestion(this.ruleForm)
            .then(res => {
              if (res.code == "10000") {
                toast("发送成功");
                this.$refs[formName].resetFields();
                return;
              } else {
                toast(res.message);
                this.$refs[formName].resetFields();
                return;
              }
            })
            .catch(err => {
              console.log(err);
              window.toast(err.message);
            });
        } else {
          return false;
        }
      });
    },
    // 获取反馈类型
    getTypeData() {
      suggestCategories(this.categoryId).then(res => {
        if (res.code != 10000) {
          return;
        }
        this.typeData = res.data ? res.data : [];
      });
    }
  },
  mounted() {
    //select数据获取然后返回赋值过去
    this.getTypeData();
  }
};
</script>
<style lang="scss">
.user-suggest {
  width: 100%;
  padding: 40px;
  text-align: left;
  .des {
    width: 55%;
    margin-top: 20px;
    padding-left: 100px;
    color: #333;
    .d_title {
      font-size: 60px;
      font-weight: normal;
      margin-bottom: 25px;
      margin-left: -6px;
    }
    .d_etitle {
      font-family: sans-serif;
      font-size: 22px;
    }
    .btns {
      margin-top: 10px;
      .btn {
        text-align: center;
        position: relative;
        display: block;
        float: left;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: 170px;
        height: 50px;
        margin: 5px 10px 5px 0px;
        padding-top: 4px;
        cursor: pointer;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        color: #fff;
        background-color: #0e7a99;
        background-repeat: no-repeat;
        background-position: 25px center;
        span {
          font-size: 16px;
          line-height: 20px;
          padding-left: 10px;
          text-align: center;
        }
        &:hover {
          background-color: #3cb9d8;
          img {
            opacity: 1;
            top: 50px;
          }
        }
        img {
          position: absolute;
          left: 0;
          top: 0px;
          padding: 10px;
          box-sizing: border-box;
          background: #eee;
          width: 170px;
          height: 170px;
          opacity: 0;
          transition: all 0.5s;
        }
      }
      .btn.active {
        background-color: #3cb9d8;
      }
    }
    .tips {
      font-size: 24px;
      margin-top: 10px;
    }
    .tipsa {
      font-size: 17px;
      line-height: 24px;
    }
  }
  .img {
    width: 45%;
    img {
      display: block;
      max-width: 100%;
      height: 300px;
      margin-left: 100px;
    }
  }
}
</style>
