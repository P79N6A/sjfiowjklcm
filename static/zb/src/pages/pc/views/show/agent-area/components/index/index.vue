<template>
  <div class="show-agent-index">
    <div class="title">
      <p class="reds">諮詢代理QQ：{{SETTING.qqAgent}} 諮詢代理Email：{{SETTING.emailAgent}}</p>
      <h1>合作共赢 携手共进</h1>誠邀您加入我們的合作代理，讓您錢程似錦 最高50%提成，
      <br>我們提供頂級產品；體育投注、電子競技、真人娛樂城、老虎機、彩票等多種遊戲。
      <br>我們的市場策略為業界最佳，口碑也是我們最好的行銷方式。
      <br>最佳傭金計畫，合營夥伴將可掙得最高相當於會員洗碼0.30%的傭金。
      <br>多種支付方式供您選擇，讓您不會錯過任何一筆傭金的支付。
      <h1 style="margin: 15px;">免费加入代理(步骤)</h1>
      <p>添加代理專員→提供註冊資料→代理專員進行資料審核→審核通過→分配代理專屬推廣網址→發展會員→領取傭金！
        <br>
        众博娛樂會評估審核聯盟申請訊息，3日內由專員與您聯繫開通，並提供您的註冊帳號、密碼及推廣連結。
        <br>
        
      </p>
    </div>
    <div class="content cfx">
      <div class="agent-step">
        <div>
          <h3>提交申请</h3>10秒快速填寫代理申請表，一旦申請成功，您將即刻成為最有吸引力的合營計劃的一份子。馬上加入吧！
        </div>
        <div>
          <h3>推廣</h3>除了運用您自身的資源外，我們也提供多種市場推廣工具、資源與您一起開拓您的代理事業，讓您如虎添翼！
        </div>
        <div>
          <h3>立刻開始賺錢</h3>您的傭金來自每位您所推薦的會員。會員越多、投註越大，您獲得的傭金也就越多。
        </div>
      </div>
      <dl class="agent-reason">
        <dt>加入代理計劃的理由</dt>
        <dd>賺取高達50%的代理傭金</dd>
        <dd>專業的市場發展戰略、豐富的推廣</dd>
        <dd>多元化在線綜合娛樂平臺</dd>
        <dd>全面清晰的傭金報表</dd>
        <dd>從被推薦會員處終身受益</dd>
        <!-- <dd>成为在线新生代的一员</dd> -->
      </dl>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
export default {
  name: "",
  data() {
    return {
      SETTING
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.show-agent-index {
  background: #fff url(./images/agentjoin1.jpg) no-repeat center top;
  padding-top: 492px;
  padding-bottom: 44px;
  .agent-step {
    float: left;
    width: 794px;
    h3 {
      color: #3ec1fe;
      padding-left: 64px;
      font-size: 22px;
      height: 98px;
      padding-top: 34px;
    }
    div {
      height: 162px;
      border-bottom: 2px dashed #cdcdcd;
      &:first-child {
        height: 140px;
      }
    }
    @for $i from 1 through 3 {
      > div:nth-child(#{$i}) {
        background: url("./images/step#{$i}.png") no-repeat 0 20px;
      }
    }
  }
  .agent-reason {
    float: right;
    width: 371px;
    dt {
      font-size: 22px;
      color: #3ec1fe;
      border-left: #3ec1fe 2px solid;
      padding-left: 13px;
      margin-top: 9px;
    }
    dd {
      margin-left: 16px;
      padding-left: 40px;
      margin-top: 14px;
      height: 57px;
      border-bottom: 2px dashed #ccc;
      font-size: 16px;
      line-height: 57px;
    }
    @for $i from 1 through 6 {
      dd:nth-of-type(#{$i}) {
        background: url("./images/reason#{$i}.png") no-repeat 0 center;
      }
    }
  }
}
.title {
  padding: 30px 0;
  margin-top: 36px;
  margin-bottom: 54px;
  background-color: #f2f2f2;
  font-size: 16px;
  color: #000;
  line-height: 28px;
  text-align: center;
  h1 {
    font-size: 30px;
    margin: 0 0 15px 0;
  }
  .reds{
    color: red;
    margin-bottom: 10px;
    font-size: 17px;
  }
}
</style>
