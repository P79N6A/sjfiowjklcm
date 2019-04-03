<template>
  <div>
    <ul class="ui-thirdmenu ui-withdraw-menu">
      <li class="active" data-toggle="tab" href="#tab-withdraw-box" aria-expanded="true">
        <i class="iconfont icon-yinxingqia1"></i>银行卡提款
      </li>
    </ul>
    <div class="drawmoney">
      <!-- 表单内容 -->
      <el-form :model="sumitData" ref="drawForm" label-width="140px" class="draw-form">
        <!-- 取款类型，只有代理用户才需要传给后台！！ -->
        <el-form-item label="老虎机佣金余额：" v-show="isAgent">
          <el-input v-model="userData.slotAccount" class="readonly" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="其他佣金余额：" v-show="isAgent">
          <el-input v-model="userData.liveAccount" class="readonly" :readonly="true"></el-input>
        </el-form-item>
        <!-- <el-form-item label="主账户总余额：" prop="tkType" v-show="!isAgent">
            <el-row>
              <el-col :span="7">{{userData.accountMoney}}</el-col>
              <el-col :offset="7" :span="10"><el-button class="backmainbtn">一键收回主账户</el-button></el-col>
            </el-row>
        </el-form-item>-->
        <el-form-item label="注册姓名：">
          <el-input v-model="userData.accountName" class="readonly" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="账户余额：" v-show="isUser">
          <el-input v-model="wallet['MAIN']" class="readonly" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="取款类型：" prop="tkType" v-if="isAgent">
          <el-select v-model="sumitData.tkType" placeholder="请选择取款类型">
            <el-option
              v-for="item in drawType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="取款银行：" prop="id">
          <el-select v-model="sumitData.id" placeholder="请选择取款银行">
            <!-- 取款额度由后台判断 -->
            <el-option
              v-for="item in bankList"
              :key="item.id"
              :label="`${item.bankname}--${item.bankno}`"
              :value="item.id"
            ></el-option>
          </el-select>
          <router-link :to="{name:'banks'}" class="addbanks" v-if="bankList.length<3 && !isAgent">
            <el-button type="primary">绑定卡/折号？</el-button>
          </router-link>
          <router-link
            :to="{name:'agent_banks'}"
            class="addbanks"
            v-if="bankList.length<3 && isAgent"
          >
            <el-button type="primary">绑定卡/折号？</el-button>
          </router-link>
        </el-form-item>

        <el-form-item label="取款金额：" prop="amount">
          <el-input v-model.number="sumitData.amount" type="number" placeholder="请输入取款金额"></el-input>
        </el-form-item>
        <!-- 取款密码需要二次md5加密后，传给后台-->
        <!-- 密码不能添加model.number后缀,字符串和数字的md5值是不同的 -->
        <el-form-item label="取款密码：" prop="password">
          <el-input
            v-model="sumitData.password"
            maxlength="6"
            type="password"
            placeholder="请输入取款密码"
          ></el-input>

          <router-link :to="{name:'payword'}" class="addbanks" v-if="!isSetPayPwd && !isAgent">
            <el-button type="primary">设置取款密码?</el-button>
          </router-link>
          <router-link
            :to="{name:'agent_payword'}"
            class="addbanks"
            v-else-if="!isSetPayPwd && isAgent"
          >
            <el-button type="primary">设置取款密码?</el-button>
          </router-link>
        </el-form-item>

        <el-form-item>
          <el-button class="submitbtn" @click="submitForm('drawForm')">提交</el-button>
          <!-- <el-button @click="resetForm('drawForm')">清空</el-button> -->
          <el-button
            type="text"
            @click="$bus.$emit('showForgetPay',true)"
            v-if="isSetPayPwd"
          >忘记取款密码?</el-button>
        </el-form-item>
      </el-form>
      <!-- 取款成功提示 -->
      <el-dialog title="取款成功" width="640px" :visible.sync="drawSuccess">
        <el-alert
          :title="`取款金额:${sumitData.amount}元成功`"
          :description="`工作人员正在为您处理，如果您的各项资料正确，取款金额会在1小时内到达您的绑定银行账户`"
          :closable="false"
          type="success"
        ></el-alert>
        <br>
        <div class="btn-suc">
          <el-button type="primary" @click="drawSuccess=false">确定</el-button>
          <router-link
            :to="{name:'user_log',params:{type:'withdraw'}}"
            class="formbtn"
            v-if="!isAgent"
          >
            <el-button type="text">查看取款记录</el-button>
          </router-link>
        </div>
      </el-dialog>
      <div class="user-tip" v-if="isUser">
        <p>温馨提示：</p>
        <p>
          1、提款时
          <span style="color:#ea5048">【银行卡姓名】</span>必须与
          <span style="color:#ea5048">注册姓名一致</span>，否则无法出款。
        </p>
        <p>
          2、在您没有申请任何优惠的情况下，您需要投注
          <span style="color:#ea5048">一倍流水</span>方可进行提款。
        </p>
        <p>3、首次提款会进行电话核实、请您保持电话畅通，加速出款的速度。</p>
      </div>
    </div>
    <div class="user-tip" v-if="isAgent">
      <p>温馨提示：</p>
      <p>
        1、提款时
        <span style="color:#ea5048">【银行卡姓名】</span>必须与
        <span style="color:#ea5048">注册姓名一致</span>，否则无法出款。
      </p>
      <p>
        2、提款后风控审核，请合作伙伴耐心等待，
        <span style="color:#ea5048">12小时</span>内到账!
      </p>
    </div>
    <!-- 忘记支付密码 -->
    <pay-forgot></pay-forgot>
  </div>
</template>
<script>
import payForgot from "pc/views/common/pwd/payword/component/pay-forgot"; // 忘记支付密码
import md5 from "MD5"; // 取款密码加密
import {
  findUserBankList,
  checkWithdrawPwd,
  withdraw_new
} from "@/api/payment"; // api接口
// import
import { mapGetters } from "vuex";
import { withdraw } from "@/controls/money/withdraw";
export default {
  mixins: [withdraw],
  data() {
    return {
      step: 1,
      showSetPayWord: false, // 是否需要弹窗设置支付密码
      drawSuccess: false, // 取款成功标识
      drawType: [
        // 取款类型，只有代理账户才会用到
        {
          name: "老虎机",
          value: "slotmachine"
        },
        {
          name: "其他",
          value: "liveall"
        }
      ],
      sumitData: {
        // 提交的表单类型
        amount: "", // 取款金额
        id: "", // 取款银行卡id
        password: "", // 取款密码，最终会经过2次md5加密
        tkType: "" // 若是代理取款，必填输入代理取款类型，取款类型，slotmachine-老虎机，liveall-其他部分
      }
    };
  },
  methods: {
    submitForm(formName) {
      // 提交表单
      this.drawSubmit(this.sumitData)
        .then(res => {
          window.toast(res.message);
          this.step = 3;
          this.drawSuccess = true;
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    },
    resetForm(formName) {
      // 重置表单
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters(["userData", "isSetPayPwd", "isAgent", "wallet", "isUser"])
  },
  created() {
    let flag = true;
    this.getBankList()
      .then(res => {
        console.log(res.data);
        if (res.data.length == 0 || !this.userData.accountName) {
          flag = false;
          $confirm(
            "<p>请您先在账户设置里绑定您的真实姓名或银行卡，以便快速提款。</p>",
            "提示",
            {
              confirmText: "前往个人资料设置"
            }
          ).then(
            () => {
              // 确认
              if (this.isAgent) {
                this.$router.push({ name: "agent_setting" });
              } else {
                this.$router.push({ name: "user_setting" });
              }
            },
            () => {
              return false;
            }
          );
        }
      })
      .then(() => {
        if (flag && !this.isSetPayPwd) {
          $confirm("请先设置支付密码", "提示", {
            confirmText: "立即设置"
          }).then(
            () => {
              if (this.isAgent) {
                this.$router.push({ name: "agent_payword" });
              } else {
                this.$router.push({ name: "payword" });
              }
            },
            () => {
              return false;
            }
          );
        }
      });
  },
  components: {
    payForgot
  }
};
</script>
<style lang="scss" scoped>
.ui-withdraw-menu {
  width: 30%;
  /* width: 60%; */
  display: flex;
  margin: 0 auto;
  li {
    flex: 1;
    float: left;
    width: 9%;
    height: 70px;
    line-height: 67px;
    margin: 0 5px;
    border-bottom: 3px solid transparent;
    font-size: 16px;
    text-align: center;
    color: #787876;
    cursor: pointer;
    &.active {
      color: #333;
      border-bottom: 4px solid #4db7f4;
    }
    i {
      color: #00a0e9;
      margin-right: 5px;
      vertical-align: middle;
      font-size: 26px;
    }
  }
}
.drawmoney {
  border-top: solid 20px #f1f1f1;

  padding: 40px;

  .backmainbtn {
    background: #ed7e12;
    color: #fff;
  }
  .transact_top {
    height: 70px;
    line-height: 35px;
    width: 800px;
    text-align: center;
    font-size: 24px;
  }
  .addbanks {
    position: absolute;
    left: 105%;
    top: 0;
    word-break: keep-all;
  }
  .draw-form {
    width: 500px;
    // margin-top: 30px;
    color: #fff;
    .el-select {
      display: block !important;
    }
  }
}
.user-tip {
  margin: 10px auto;
  padding: 20px;
  border: 1px solid #f5e9e5;
  border-radius: 3px;
  background: #fffaf1;
}
</style>
