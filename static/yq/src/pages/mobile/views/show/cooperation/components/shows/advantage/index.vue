<template>
  <div class="agent-advantage-content">
    <span>平台介绍</span>
    <p class="content-color"></p>
    <p class="content-p">奇幻城成立于2010年，拥有菲律宾政府颁发的PAGCOR博彩牌照，合法运营。并接入了业界5大主流电子游戏平台PT国际/DT/NT/MG/QT/PNG。拥有业界最快提款速度，10秒到账—“秒提”，技术团队独立研发，业界首创，五分钟提款单日和单笔无上限。</p>

    <span>专业管理系统</span>
    <p class="content-color"></p>
    <p class="content-p">代理会员信息一目了然，管理方便、快捷。</p>

    <span>代理专属服务</span>
    <p class="content-color"></p>
    <p class="content-p">专业的代理咨询团队为您提供7×24小时的优质服务。</p>

    <span>免费推广支持</span>
    <p class="content-color"></p>
    <p class="content-p">免费为代理提供课件培训，量身订做推广方案，以及推广技术支持。</p>

    <span>关于奇幻城：</span>
    <p class="content-color"></p>
    <p class="content-p">1.专业品牌团队：多年业界运营实践经验。
      <br>2.平台自助体验：自助优惠，自助实时返水，系统独立研发。
      <br>3.产品丰富多彩：涵盖5大电子游艺。
      <br>4.佣金结算灵活：业务首创结算模式“日结佣金”。
      <br>5.服务：7x24小时在线服务，提供最优质服务。
      <br>6.安全：奇幻城采用128位SSL高标准加密技术。
      <br>7.提款：20万以下提款10秒到账，全球首发。
      <br>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {},
  methods: {},
  computed: {},
  created() {},
  components: {}
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.agent-advantage-content {
  padding: 0 r(30);
  @include f(20px);
  line-height: r(50);
  span {
    @include f(30px);
    color: #4db7f4;
    margin: r(20) auto;
    display: block;
    text-align: center;
  }
  .content-color {
    border-color: #4db7f4;
    border-width: 1.5px 3px;
    border-style: solid;
    width: 8%;
    margin: -5px auto 5px;
  }
  .content-p {
    text-align: justify;
    @include f(20px);
  }
  .cl-tips {
    color: #e2b85a;
  }
  .cl-red {
    color: red;
  }
}
</style>
