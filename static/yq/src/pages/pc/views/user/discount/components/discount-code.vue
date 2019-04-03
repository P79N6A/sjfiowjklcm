<template>
  <div class="discount-code">
    <!-- <div class="discount-tips">
      优惠券代码会以站内信形式发送给您,请注意查看站内信通知。
    </div>-->
    <el-form
      :model="data"
      :rules="discountRule"
      ref="transferForm"
      label-width="100px"
      class="discount-form"
    >
      <!-- 游戏平台 -->
      <el-form-item label="游戏平台" prop="couponType">
        <el-select v-model="data.couponType" placeholder="请选择需要转入的游戏平台">
          <el-option
            :label="item.name"
            v-for="(item,i)  in platformData"
            :value="item.value"
            :key="item.value+i"
          ></el-option>
        </el-select>
      </el-form-item>

      <!-- 转入金额 -->
      <el-form-item label="转入金额" prop="couponRemit">
        <el-input v-model="data.couponRemit" type="number" placeholder="请填写转入金额"></el-input>
      </el-form-item>

      <!-- 优惠代码 -->
      <el-form-item label="优惠代码" prop="couponCode">
        <el-input v-model="data.couponCode" type="text" placeholder="请填写优惠代码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('transferForm')">提交</el-button>
      </el-form-item>
    </el-form>
    <div class="ui-fast-game clear cfx">
      <div class="fl icons">
        <!-- <i class="icobjh bjh-tongzhi"></i> -->
        <div>
          <img src="./images/icon-quickgame.png" alt>
          <p>快速游戏</p>
        </div>
      </div>
      <div class="fl links">
        <ul>
          <li>老虎机：</li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PT2TIGER'}}" target="_blank">PT国际版</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'DT'}}" target="_blank">DT老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'MG'}}" target="_blank">MG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'CQ9'}}" target="_blank">CQ9老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'SW'}}" target="_blank">SW老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'JDBSLOT'}}" target="_blank">JDB老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'AMEBA'}}" target="_blank">AE老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PG'}}" target="_blank">PG老虎机</router-link>
          </li>
           <li>
            <router-link :to="{name:'gameIndex',params:{type:'TGP'}}" target="_blank">TGP老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'RTG'}}" target="_blank">RTG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'PNG'}}" target="_blank">PNG老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'QT'}}" target="_blank">QT老虎机</router-link>
          </li>
          <li>
            <router-link :to="{name:'gameIndex',params:{type:'NT'}}" target="_blank">NT老虎机</router-link>
          </li>
        </ul>
        <ul>
          <li>真人&amp;体育&amp;电竞：</li>
          <li>
            <a :href="Games.href_ag" target="_blank">AG真人</a>
          </li>
          <li>
            <a :href="Games.href_og" target="_blank">OG真人</a>
          </li>
          <li>
            <a :href="Games.href_bbin" target="_blank">BBIN真人</a>
          </li>
          <li>
            <a :href="Games.href_sunbet" target="_blank">申博真人</a>
          </li>
          <li>
            <a :href="Games.href_dg_pc" target="_blank">DG真人</a>
          </li>
          <li>
            <a :href="Games.href_sb_pc" target="_blank">沙巴体育</a>
          </li>
          <li>
            <a :href="Games.href_ug_pc" target="_blank">皇冠体育</a>
          </li>
          <li>
            <a :href="Games.href_bti" target="_blank">BTI体育</a>
          </li>
          <li>
            <a :href="Games.href_avia" target="_blank">泛亚电竞</a>
          </li>
        </ul>
        <ul>
          <li>彩票&amp;棋牌&amp;捕鱼:</li>
          <li>
            <a :href="Games.href_vr" target="_blank">VR彩票</a>
          </li>
          <li>
            <a :href="Games.href_ig_ssc" target="_blank">IG时时彩</a>
          </li>
          <li>
            <a :href="Games.href_ig_hk" target="_blank">IG香港彩</a>
          </li>
          <li>
            <a :href="Games.href_cb" target="_blank">彩播彩票</a>
          </li>
          <li>
            <a :href="Games.href_kyqp" target="_blank">开元棋牌</a>
          </li>
          <li>
            <a :href="Games.href_city761" target="_blank">761棋牌</a>
          </li>
          <li>
            <router-link :to="{name:'chessHall',params:{type:'DTQP'}}" target="_blank">DT棋牌</router-link>
          </li>
          <li>
            <a :href="Games.href_lgqp" target="_blank">幸运棋牌</a>
          </li>
          <li>
            <a :href="Games.href_by" target="_blank">BY棋牌</a>
          </li>
          <li>
            <a :href="Games.href_fish_jdb" target="_blank">JDB捕鱼</a>
          </li>
          <li>
            <a :href="Games.href_fish" target="_blank">AG捕鱼</a>
          </li>
          <li>
            <a :href="Games.href_fish_mw" target="_blank">大满贯捕鱼</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="user-tip">
      <p>温馨提示：</p>
      <p>1、请选择游戏平台，填写红利代码确认转入后，红利金额会自动添加到您选择的游戏平台。</p>
      <p>
        2、"
        <span style="color:#ea5048;">优惠代码</span>"请输入正确的代码，注意
        <span style="color:#ea5048;">大小写</span>要区分开，避免存在
        <span style="color:#ea5048;">空格键</span>。
      </p>
      <p>
        3、需要游戏平台账户余额低于
        <span style="color:#ea5048;">3元</span>或达到相应的有效投注额要求才能使用存送优惠券，进行转账至对应的游戏平台。
      </p>
      <p>
        4、优惠券有效期为
        <span style="color:#ea5048;">30天</span>，请您在有效期内使用，逾期视为自动放弃。
      </p>
      <p>
        5、优惠券会发送至您的
        <span style="color:#ea5048;">站内信</span>中。
      </p>
    </div>
  </div>
</template>
<script>
// import {    platformData  } from "@/assets/data"
import { coupon } from "@/controls/discount/coupon";
import { Games } from "@/assets/data";
export default {
  mixins: [coupon],
  data() {
    const couponType_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择游戏平台"));
      } else {
        callback();
      }
    };
    const couponRemit_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入转入金额"));
      } else if (!/^\d+$/.test(value)) {
        return callback(new Error("请输入整数金额"));
      } else {
        callback();
      }
    };
    const couponCode_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入优惠代码"));
      } else {
        callback();
      }
    };
    return {
      Games,
      platformData: [],
      discountRule: {
        couponType: [{ validator: couponType_check, trigger: "blur" }],
        couponCode: [{ validator: couponCode_check, trigger: "blur" }],
        couponRemit: [{ validator: couponRemit_check, trigger: "blur" }]
      },
      tips: ["优惠券代码会以站内信形式发送给您,请注意查看站内信通知。"]
    };
  },
  watch: {
    "data.couponRemit"(val) {
      if (/[^\d]/g.test(val)) {
        this.data.couponRemit = this.data.couponRemit
          .toString()
          .replace(/[^\d]/g, "");
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.couponSubmit(this.data)
            .then(res => {
              window.toast(res.message);
              this.resetForm("transferForm");
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.discount-code {
  .discount-tips {
    color: #09affe;
    font-size: 30px;
    line-height: 1.5;
  }
  .discount-form {
    width: 600px;
    .el-select {
      display: block !important;
    }
  }
  .ui-fast-game {
    display: block;
    width: 100%;
    padding: 20px 0;
    color: #333333;
    .icons {
      width: 15%;
      height: 190px;
      text-align: center;
      line-height: 43px;
      background: #4db7f4;
      color: #fff;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .links {
      width: 77%;
      background: #fff;
      border: 1px solid #4db7f4;
      border-left: none;
      line-height: 2;
      padding: 10px;
      li {
        display: inline-block;
        margin-right: 6px;
        cursor: pointer;
        &:hover {
          background: #4db7f4;
          color: #fff;
        }
      }
    }
  }
}
</style>
