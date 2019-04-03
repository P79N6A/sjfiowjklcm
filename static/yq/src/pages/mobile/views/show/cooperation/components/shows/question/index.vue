<template>
  <div class="agent-question-content" v-once>
    <span>Q1:为什么要加盟奇幻城？</span>
    <p class="content-color"></p>
    <p
      class="content-p"
    >如今，网络博彩娱乐已经成为一个极具市场发展前景的热门产业，奇幻城凭借多年的博彩运营经验和先进的秒提技术，具有绝对的品牌优势。合作方式简单，无风险零投资，即可享受高达 45%佣金回报。如果您身边有对博彩感兴趣的朋友，充分利用身边的人脉及网络资源，可从被推荐会员处终身受益，月赚百万，您还在犹豫什么？</p>

    <span>Q2:如何加盟奇幻城？</span>
    <p class="content-color"></p>
    <p
      class="content-p"
    >点击“立即加盟”并填写真实完整的注册资料，认真阅读奇幻城的相关规则条款，并同意确认“合作协议”，然后提交“申请”，审查通过后，您就可以正式成为奇幻城合作伙伴，迈出您成功的第一步！</p>

    <span>Q3:佣金待遇如何？</span>
    <p class="content-color"></p>
    <p class="content-p">成为奇幻城代理商是完全免费，无需任何资金投入，零风险高回报，每月坐享高达45%的佣金。</p>

    <span>Q4:如何推广</span>
    <p class="content-color"></p>
    <p class="content-p">每位成功注册的合作伙伴提供专属推广链接和管理后台，您可以通过聊天室聊天、论坛发帖、博客留言以及网站上挂链接等多种网络推广方式来发展您的下线会员。</p>

    <span>Q5:如何查询我的会员投注记录及输赢情况？</span>
    <p class="content-color"></p>
    <p class="content-p">合作伙伴登入账号后 点击账户管理—“平台输赢” 就可以查询到下线会员的游戏平台输赢情况 。</p>

    <span>Q6:代理佣金是如何计算？</span>
    <p class="content-color"></p>
    <p class="content-p">合作伙伴佣金=（所有电子平台输赢×85%－优惠－返水）×佣金比例+（其他平台输赢x90%-优惠-反水）x佣金比例；<br>
      
              举例：假如你某月满足至少三个有效活跃会员，老虎机平台输赢值5000，其他平台输赢10000，老虎机和其他平台得到反水各200，老虎机和其他平台得到优惠各100；佣金计算为：（5000×85%-200-100）x30%+ （10000×90%-200-100）x30%=3795
    </p>

    <span>Q7:我将如何收取佣金？</span>
    <p class="content-color"></p>
    <p class="content-p">将根据合作协议佣金将分成“日结”和“月结”，达到要求的合作伙伴可以享有日结算功能。</p>
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
.agent-question-content {
  text-align: center;
  padding: 0 r(30);
  @include f(24px);
  line-height: r(50);
  span {
    @include f(30px);
    color: #4db7f4;
    margin: r(20) auto;
    display: block;
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
}
</style>
