<template>
  <div class="aboutTab">
    <dl>
      <dd>奇幻城成立于2010年，持有菲律宾政府颁发的PAGCOR合法经营执照，同时也是网络博彩委员会制定有合法博彩牌照的网络博彩网站，是正规合法对外营业的专业赌场。公司与亚游（Asia Gaming）、波音（BBIN）、沙巴（IBC）、 PT（PlayTech）、MG（MicroGaming）、DT（Dream tech)等进行技术合作，共同打造高品质的游戏平台，具有绝对的合法性和公平性。为广大客户提供丰富多彩的博彩活动，并提供丰厚的优惠回馈。竭诚用心为玩家提供最高端最公正的游戏环境。</dd>
      <dt>品牌优势</dt>
      <dd>创新自动化：秒存、自助优惠，自助返水、提款10秒钟到账。 方便快捷，全球首发。
        <br>资质公认：菲律宾政府卡格扬河经济特区所授权和监管，奇幻城国际博彩牌照NO.174。
        <br>实力雄厚：与全球最权威公正游戏平台合作，兼容欧洲的公正诚信与亚洲的活力创新。
      </dd>
      <dt>诚信经营</dt>
      <dd>公司严格遵守菲律宾政府规定博彩守则，以“诚”为本。100%信誉保证游戏公平、公正。您的每笔存取款业务在经过审核后都将安全、快捷的完成。</dd>
      <dt>公平公正</dt>
      <dd>真人娱乐中的荷官均接受严格的国际赌场专业训练与认证，所有赌局都依据荷官动作做出反应，而不是无趣的电脑几率预设结果。我们运用高科技的网络直播技术，带给您亲历赌场的刺激体验。电子游艺使用最公平的随机数产生机率，让您安心享受多元，炫丽的娱乐性游戏。</dd>
      <dt>友善和专业的客户服务团队</dt>
      <dd>我们亲切友善的客服专员训练有素，在帮助解决客户疑难的同时也能给与您最优越和最贴身的服务。我们也有提供线上聊天的功能，让客户们能即时联络我们。以及提供贴心的专属客服，享受宾至如归的待遇。</dd>
      <dt>现场赌厅</dt>
      <dd>奇幻城在菲律宾马尼拉最豪华的两家赌场云顶赌场（Resort World）和Solaire赌场中均设有VIP赌厅，我们可以为您提供最优质的现场VIP赌厅服务，欢迎新老客户莅临现场参观!</dd>
    </dl>
  </div>
</template>
<script>
import { WEBCONFIG, SETTING } from "@/assets/data";
export default {
  name: "",
  data() {
    return { WEBCONFIG, SETTING };
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
.aboutTab {
  display: block;
  dl {
    dt {
      line-height: 3;
      font-size: 18px;
      color: #4db7f4;
      font-weight: bold;
      &::before {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 6px;
        content: "";
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        vertical-align: middle;
        background: #4db7f4;
      }
      &::after {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 0 6px;
        content: "";
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        vertical-align: middle;
        background: #4db7f4;
      }
    }
    dd {
      line-height: 2.2;
      font-size: 16px;
    }
  }
}
</style>
