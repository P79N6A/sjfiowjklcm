<template>
  <div class="show-agent-question">
    <div class="title bold">常見問題</div>
    <div class="content">
      <div class="question-list">
        <div>
          <h3>為何要加盟本網站？</h3>網絡博彩已經成為一個如日中興的熱門產業，本站憑借多年的博彩運營經驗和先進的秒提技術，具有絕對的品牌優勢。合作方式簡單，無風險零投資，即可享受高達 50%傭金回報，如果您身邊有對博彩感興趣的朋友，充分利用身邊的人脈及網絡資源，可從被推薦會員處終身受益，月賺百萬，您還在猶豫什麽？
        </div>
        <div>
          <h3>如何加盟本網站？</h3>點擊代理首頁查看並添加QQ代理專員，提供真實完整的註冊資料，提交申請後代理專員將會在3日內與您聯系開通，並提供您的註冊賬號、密碼及推廣鏈接代碼，您也將得到一個免費的合營帳戶，從而您可以登陸我們的代理界面。
        </div>
        <div>
          <h3>傭金待遇如何？</h3>成為本站代理商是完全免費，無需任何資金投入，零風險高回報，每月坐享最高達50%的傭金。
        </div>
        <div>
          <h3>如何查詢我的會員投註記錄及輸贏情況？</h3>合作夥伴登入賬號後 點擊“代理中心—會員賬務 ”就可以查詢到下線會員的遊戲平臺輸贏情況。
        </div>
        <div>
          <h3>代理傭金是如何計算？</h3>合作夥伴傭金=(PT、MG、BBIN、PG等老虎機平臺輸贏x85%）x傭金比例；
          <br>舉例：假如你某月滿足至少三個有效活躍會員，老虎機平臺輸贏值5000，得到反水200，優惠100；傭金計算為：（5000×85%-200-100）x30%=1185
        </div>
        <div>
          <h3>我將如何收取傭金？</h3>根據合作協議，達到要求的合營商可直接申請提款。
        </div>
        <div>
          <h3>我想問的問題上面都沒有怎麽辦？</h3>馬上聯絡24 小時客服，給您最專業的 1:1 解答。
        </div>
        <div>
          <h3>免責聲明</h3>本站保有改變和修正任何條款的權益,以及代理本身不能使用任何不符合規定的方式套取傭金,我們有權隨時取消合營夥伴賬戶,最終解釋權歸本站所有。我們對代理合作的唯一要求只有誠信，我們的宗旨始終是以對合作夥伴和玩家的承諾以誠信為本。
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
<style lang="scss">
.bold {
  font-size: 30px;
  font-weight: 700;
}
.title {
  padding: 30px 0;
  margin-top: 36px;
  margin-bottom: 54px;
  background-color: #f2f2f2;
  // height: 111px;
  color: #000;
  line-height: 28px;
  text-align: center;
}
.show-agent-question {
  background: #fff url("./images/question2.jpg") no-repeat center top;
  padding-top: 495px;
  font-size: 16px;
  padding-bottom: 278px;
  color: #000;
  .question-list {
    overflow: hidden;

    h3 {
      color: #3ec1fe;
      padding-left: 25px;
      font-size: 22px;
      height: 63px;
      padding-top: 14px;
      line-height: 1;
      white-space: nowrap;
    }
    div {
      line-height: 28px;
      height: 248px;
      float: left;
      padding-top: 8px;
      width: 50%;
      padding-right: 90px;
      padding-left: 38px;
      margin-top: 52px;
      background-repeat: no-repeat;
      background-position: 0 8px;
      &:nth-child(2n) {
        background-position: 47px 8px;
        padding-left: 86px;
      }
      &:nth-child(4n-2) {
        border-left: 2px dashed #ccc;
        border-bottom: 2px dashed #ccc;
        padding-left: 82px;
      }
      &:nth-child(4n-1) {
        border-right: 2px dashed #ccc;
        border-bottom: 2px dashed #ccc;
      }
    }
    @for $i from 1 through 8 {
      > div:nth-child(#{$i}) {
        background-image: url("./images/step#{$i}.png");
      }
    }
  }
}
</style>
