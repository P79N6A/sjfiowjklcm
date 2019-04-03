<template>
  <div class="feedback">
    <form class="form-rowbox" action="applySuggestion" ref="ruleForm">
      <div class="inputbox" prop="type">
        <span class="label">
          <i class="ball"></i>反馈类型
        </span>
        <!-- <span v-for="(item,i) in typeData" :key="i" class="span-radio">
            <input type="radio" name="radio" :value="item.id" v-model="ruleForm.categoryId" style='display:none'/>
            <label for="ritema"><span @click='setValue(item.id)'>{{item.categoryName}}</span></label>
        </span>-->
        <select class="selectItem" v-model="ruleForm.categoryId">
          <option value>请选择反馈类型</option>
          <option v-for="(item,i) in typeData" :key="i" :value="item.id">{{item.categoryName}}</option>
        </select>
      </div>

      <div class="inputbox" prop="content">
        <span class="label">
          <i class="ball"></i>反馈问题描述
        </span>
        <textarea
          v-model="ruleForm.content"
          class="feedback-textarea"
          maxlength="300"
          placeholder="请详细描述您要反馈的内容，最多输入300个字"
        ></textarea>
      </div>

      <div class="inputbox" prop="phone">
        <span class="label">
          <i class="ball"></i>联系电话
        </span>
        <input
          type="text"
          v-model="ruleForm.phone"
          class="feedback-input"
          maxlength="11"
          placeholder="输入您的11位手机电话"
        >
      </div>

      <p
        style="color: red;font-size: 14px;line-height: 1.4;margin-bottom: 15px;"
      >您好，有任何疑问与反馈，您也可以发送到投诉邮箱：ceoqhc@gmail.com，奇幻城祝您生活愉快！</p>
      <button type="button" class="btn" @click="submitForm">发 送</button>
    </form>
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
      ruleForm: {
        phone: "",
        content: "",
        categoryId: ""
      },

      typeData: []
    };
  },
  props: {},
  watch: {},
  computed: {
    ...mapGetters(["isSetPayPwd"])
  },
  methods: {
    setValue: function(val) {
      this.ruleForm.categoryId = val;
    },
    submitForm() {
      const { content, phone, categoryId } = this.ruleForm;
      if (categoryId === "") {
        toast("请选择反馈类型");
        return;
      }
      if (content === "") {
        toast("请详细描述问题，最多输入300个字");
        return;
      }
      if (phone === "") {
        toast("请输入联系电话");
        return;
      } else if (!check.phone.test(phone)) {
        toast("手机号码格式不正确");
        return;
      }

      applySuggestion(this.ruleForm)
        .then(res => {
          if (res.code == "10000") {
            toast("发送成功");
            this.ruleForm = {
              categoryId: "",
              content: "",
              phone: ""
            };
            return;
          } else {
            toast(res.message);
            this.ruleForm = {
              categoryId: "",
              content: "",
              phone: ""
            };
            return;
          }
        })
        .catch(err => {
          window.toast("验证失败");
        });
    },
    getTypeData() {
      suggestCategories(this.categoryId).then(res => {
        if (res.code != 10000) {
          this.ruleForm.content = "";
          return;
        }
        this.typeData = res.data ? res.data : [];
      });
    }
  },
  mounted() {
    //select数据获取然后返回赋值过去
    this.getTypeData();
  },
  created() {},
  components: {}
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
.feedback {
  padding: r(25) r(50);
  .label {
    display: block;
    padding-left: r(10);
    margin: r(35) 0 0 0;
    @include f(30px);
    .ball {
      display: inline-block;
      background: #4db7f4;
      border-radius: 50%;
      width: r(20);
      height: r(20);
      margin-right: r(15);
    }
    img {
      width: 3%;
      margin-right: r(8);
    }
  }
  .feedback-radio {
    margin: r(25) 0;
  }
  .feedback-textarea {
    margin: r(30) 0 0 0;
    width: 100%;
    height: r(150);
    border-radius: r(10);
    background: #ffffff;
    border: 1px solid #efefef;
    padding-left: r(5);
  }
  .inputbox {
    margin: r(30) 0 0 0;
    .feedback-input {
      width: 66%;
      height: r(60);
      display: flex;
      margin: r(25) 0 r(60) 0;
      border-radius: r(10);
      background: #ffffff;
      border: 1px solid #efefef;
      padding-left: r(5);
    }
    .selectItem {
      margin-top: r(10);
      width: 66%;
      height: r(60);
      border-radius: r(6);
      background: #ffffff;
      border: 1px solid #efefef;
    }
    .span-radio {
      input[type="radio"] + label {
        color: #292321;
        @include f(26px);
      }
      input[type="radio"] + label span {
        display: inline-block;
        padding: r(7) r(30);
        margin: r(15) r(7) 0 0;
        vertical-align: middle;
        cursor: pointer;
        -moz-border-radius: r(20);
        border-radius: r(20);
        text-align: center;
      }

      input[type="radio"] + label span {
        border: 1px solid #d1d3d1;
        color: #333;
      }

      input[type="radio"]:checked + label span {
        background-color: #4db7f4;
        color: #fff;
        border: 1px solid #4db7f4;
      }

      input[type="radio"] + label span,
      input[type="radio"]:checked + label span {
        -webkit-transition: background-color 0.4s linear;
        -o-transition: background-color 0.4s linear;
        -moz-transition: background-color 0.4s linear;
        transition: background-color 0.4s linear;
      }
    }
  }

  .btn {
    width: 100%;
    height: r(80);
    background: #4db7f4;
    line-height: r(40);
    border-radius: r(15);
    color: #fff;
    span {
      display: block;
    }
  }
}
</style>
