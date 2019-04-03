<template>
  <div class="birthday-gold">
    <!-- 判断有无设置生日 -->
    <div v-if="userData.birthday!=''">
      <!-- 可以领取生日礼金 -->
      <div v-if="isBirthday">
        <div class="bir-text">在您注册生日当天，即可申请生日礼金，祝您生日快乐，多多盈利！
          <p class="txtct" v-show="userData.levelNumber>0">
            <el-button type="primary" :disabled="!isBirthday" @click="submit">领取礼金</el-button>
          </p>
          <p class="txtct" v-show="userData.levelNumber ==0">
            <el-button type="info" disabled>未达到领取要求</el-button>
          </p>
        </div>
      </div>
      <!-- 不可以领取生日礼金 -->
      <div class="bir-tips" v-else>{{message}}</div>
    </div>
    <!-- 未设置生日 -->
    <div v-else style="text-align:center;">
      <div class="bir-tips">请先完善个人信息</div>
      <router-link class="formbtn btn-reset" :to="{name:'datum'}" v-show="userData.birthday==''">
        <el-button type="primary">去设置生日</el-button>
      </router-link>
    </div>

    <div class="user-tip">
      <p>温馨提示：</p>
      <p>
        1、生日礼金需会员等级在
        <span style="color:#ea5048;">【忠实会员】</span>及以上即可享有。
      </p>
      <p>
        2、生日礼金根据您填写的生日日期，当天即可进行自助领取彩金，彩金派发至您的
        <span style="color:#ea5048;">主账户余额内</span>。如无法进行领取彩金，请及时联系在线客服。
      </p>
      <p>
        3、生日礼金
        <span style="color:#ea5048;">无需流水</span>，可直接提款。
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { birthday } from "@/controls/discount/birthday";
export default {
  mixins: [birthday],
  data() {
    return {};
  },
  props: {},
  methods: {
    submit() {
      if (!this.isBirthday) return;
      this.birthSubmit()
        .then(res => {
          window.toast(res.message);
        })
        .then(err => {
          window.toast(err.message);
        });
    }
  },
  computed: {
    ...mapGetters(["userData"])
  },
  activated() {
    this.checkBirthCoupon()
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.birthday-gold {
  background: url(./images/discount-bg.png) center top no-repeat;
  min-height: 500px;
  // text-align: center;
  padding: 280px 50px 20px;
  .tbrithday {
    font-size: 24px;
    color: #ffecb7;
    text-align: center;
    width: 100%;
    line-height: 1.5;
  }
  .bir-text {
    text-align: center;
    font-size: 24px;
    color: #ccc;
    line-height: 2;
    line-height: 1.5;
  }
  .bir-tips {
    text-align: center;
    color: #4db7f4;
    font-size: 30px;
    // margin: 20px 0;
    line-height: 1.5;
  }
  .tipsDiv {
    font-size: 15px;
    line-height: 30px;
    width: 800px;

    .tipsTitle {
      color: #fff;
    }

    .tipsBox {
      color: #b5b5b5;
    }
  }
}
</style>
