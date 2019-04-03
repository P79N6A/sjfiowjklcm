<template>
  <div class="save-send">
    <el-form
      :model="submitData"
      ref="transferForm"
      :rules="saveSendRules"
      label-width="120px"
      class="discount-form"
    >
      <!-- 游戏平台 -->
      <br>
      <el-form-item label="申请平台：">
        <el-select v-model="Type" placeholder="请选择需要转入的游戏平台">
          <el-option
            :label="item.name"
            v-for="(item,i)  in platformData"
            :value="item.value"
            :key="i"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 优惠幅度 -->
      <el-form-item label="优惠类型：" prop="youhuiConfigId">
        <el-select v-model="submitData.youhuiConfigId" placeholder="请先选择转入的游戏平台">
          <el-option
            :label="item.name"
            v-for="item  in listData"
            :value="item.id"
            :key="item.id"
            v-if="item.platform==Type"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 转入金额 -->
      <el-form-item label="转账金额：" prop="remit">
        <el-input v-model.number="submitData.remit" type="number" placeholder="请输入转入金额"></el-input>
      </el-form-item>

      <!-- 可获得红利 -->
      <el-form-item label="红利金额：">
        <el-input v-model.number="percentMoney" class="readonly" readonly placeholder="选择优惠幅度后自动计算"></el-input>
      </el-form-item>

      <!-- 倍数 -->
      <el-form-item label="流水倍数：">
        <el-input v-model="betMultiples" class="readonly" readonly placeholder="选择优惠幅度后自动计算"></el-input>
      </el-form-item>

      <!-- 取款流水要求 -->
      <el-form-item label="取款流水：">
        <el-input v-model.number="limitMoney" class="readonly" readonly placeholder="选择优惠幅度后自动计算"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('transferForm')">提交</el-button>
        <router-link
          class="formbtn btn-reset"
          :to="{name:'datum'}"
          v-if="userData.phoneValidStatus=='0'"
        >
          <el-button type="text">验证手机号码</el-button>
        </router-link>
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
      <p>
        1、请在转账时候认准
        <span style="color:#ea5048;">您要参加的游戏平台</span>，若参加优惠成功之后，请完成投注要求，方能进行下一次户内转账！
      </p>
      <p>
        2、每日的
        <span style="color:#ea5048;">00：00—01：00</span>自助系统例行维护升级，请避开此时间段进行自助存送。
      </p>
      <p>3、若完成优惠流水倍数要求后不能进行额度转出，请及时联系在线客服为您处理。</p>
      <p>
        4、存送优惠活动有
        <span style="color:#ea5048;">相应的游戏限制</span>，请您在申请时详细了解该优惠活动规则及限制游戏，如违反活动规则，例如投注限制游戏等，将取消申领资格，扣除所有红利及盈利。
      </p>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Games } from "@/assets/data";
import { saveSend } from "@/controls/discount/saveSend";
export default {
  mixins: [saveSend],
  data() {
    const youhuiConfigId_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请选择优惠方案"));
      } else {
        callback();
      }
    };
    const remit_check = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入转入金额"));
      } else if (!/^\d+$/.test(value)) {
        return callback(new Error("请输入整数金额"));
      } else {
        callback();
      }
    };
    return {
      // 规则
      Games,
      saveSendRules: {
        youhuiConfigId: [
          {
            validator: youhuiConfigId_check,
            trigger: "blur"
          }
        ],
        remit: [
          {
            validator: remit_check,
            trigger: "blur"
          }
        ]
      },
      tips: ["部分厅NT需进入游戏激活，方可转入使用（点击游戏名称进入激活）。"]
    };
  },

  methods: {
    submitForm(formName) {
      this.drawSuccess = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.saveSendSubmit(this.submitData)
            .then(res => {
              window.toast(res.message);
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
  },
  computed: {
    ...mapGetters(["userData"])
    // betMultiples(){
    //   this.listData.filter(item=>{
    //     return item.id=this.submitData.youhuiConfigId
    //   })
    // }
  },
  activated() {
    this.getYouHui();
    // this.phoneCheck();
  },
  created() {
    if (this.userData.phoneValidStatus == "0") {
      $confirm("<p>请您先在账户设置里验证手机号码。</p>", "提示", {
        confirmText: "前往验证"
      }).then(
        () => {
          // 确认 废弃并生成新订单
          this.$router.push({ name: "datum" });
        },
        () => {
          return false;
        }
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.save-send {
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
      background: #44a7e0;
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
          background: #44a7e0;
          color: #fff;
        }
      }
    }
  }
  .discount-form {
    width: 600px;

    .el-select {
      display: block !important;
    }
  }
}
</style>
