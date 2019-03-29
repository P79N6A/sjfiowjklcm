<template>
  <div class="experience-gold">
    <!-- 是否可以领取体验金 -->
    <div v-if="canExp">
      <!-- <div class="exp-tips">
        可领取体验金{{amount}}元
        <br/> 无投注额要求,游戏账户达到{{limitAmount}}元即可提款
      </div>-->
      <el-form ref="transferForm" label-width="100px" class="discount-form">
        <el-form-item label="游戏平台" prop="platform">
          <el-select v-model="expData.platform" placeholder="选择游戏平台">
            <el-option
              v-for="item in platformData"
              :key="item.value"
              :label="`${item.name}`"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="experience-btn">
          <el-button class="submitbtn" @click="submitForm('transferForm')">提交</el-button>
          <router-link
            class="formbtn btn-reset"
            :to="{name:'user_datum'}"
            v-if="!userData.accountName"
          >
            <el-button type="text">去完善个人信息</el-button>
          </router-link>
          <router-link
            class="formbtn btn-reset"
            :to="{name:'user_datum'}"
            v-if="userData.phoneValidStatus=='0'"
          >
            <el-button type="text">去验证手机</el-button>
          </router-link>
        </el-form-item>
      </el-form>
      <!-- <div class="tipsDiv">
          <p class="tipsTitle">温馨提示：</p>
          <p class="tipsBox" v-for="item in tips" :key="item">{{item}}</p>
      </div>-->
    </div>
    <div v-else>
      <div class="exp-tips">
        <span class="exp-tips-text">{{msg}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { platformData } from "@/assets/data";
import { mapGetters } from "vuex";
import { experience } from "@/controls/discount/experience";
export default {
  mixins: [experience],
  data() {
    return {
      platformData,
      tips: ["部分厅NT需进入游戏激活，方可转入使用（点击游戏名称进入激活）。"]
    };
  },
  methods: {
    submitForm(formName) {
      this.CouponSubmit(this.expData)
        .then(res => {
          window.toast(res.message);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },
  activated() {
    this.checkCoupon();
  }
};
</script>
<style lang="scss" scoped>
.experience-gold {
  min-height: 500px;
  text-align: center;
  // padding: 280px 50px 20px;
  .exp-tips {
    color: #09affe;
    font-size: 30px;
    margin: 20px 0;
    line-height: 1.5;
    background: url(./images/discount-bg.png) center top no-repeat;
    min-height: 500px;
    text-align: center;
    .exp-tips-text {
      display: block;
      padding-top: 30%;
    }
  }
}

.discount-form {
  margin-top: 30px;
  width: 500px;
  .el-select {
    display: block !important;
  }
  .experience-btn {
    text-align: left;
  }
}
.tipsDiv {
  font-size: 15px;
  line-height: 30px;
  width: 800px;
  text-align: justify;
  .tipsTitle {
    color: #fff;
  }
  .tipsBox {
    color: #b5b5b5;
  }
}
.submitbtn {
  background: #0181fa;
  background: -moz-linear-gradient(to right, #0181fa, #16d6ff);
  background: -webkit-linear-gradient(to right, #0181fa, #16d6ff);
  background: -o-linear-gradient(to right, #0181fa, #16d6ff);
  background: linear-gradient(to right, #0181fa, #16d6ff);
  border: 1px solid #0181fa;
  color: #fff;
}
</style>
