<template>
  <div class="agent-proce-content m-content">
    <span>佣金方案</span>
    <p class="content-color"></p>
    <p class="content-p">佣金计算：（所有电子平台输赢×85%－优惠－返水）×佣金比例+（其他平台输赢x90%-优惠-反水）x佣金比例</p>
    <p class="content-p">佣金比例: 根据您所属的会员输赢值，返给您对应佣金！</p>
    <table class="table">
      <tbody>
        <tr>
          <th>佣金等级</th>
          <th>活跃会员</th>
          <th>利润等级</th>
          <th>佣金比例</th>
        </tr>
        <tr>
          <td>1</td>
          <td>≥3</td>
          <td>0-300,000</td>
          <td>30%</td>
        </tr>
        <tr>
          <td>2</td>
          <td>≥15</td>
          <td>300,001-1,000,000</td>
          <td>35%</td>
        </tr>
        <tr>
          <td>3</td>
          <td>≥40</td>
          <td>1,000,001-2,000,000</td>
          <td>40%</td>
        </tr>
        <tr>
          <td>4</td>
          <td>≥100</td>
          <td>≥2,000,0001</td>
          <td>45%</td>
        </tr>
      </tbody>
    </table>

    <span>佣金日结标准</span>
    <p class="content-color"></p>
    <p class="content-p">1、所有老虎机代理终身享受日结佣金。</p>
    <p class="content-p">2、提款要求：代理账户电子平台佣金额度大于100元即可提款。</p>
    <p
      class="content-p"
    >3、声明:享受日结的代理如果连续两个月没有新增一位活跃会员，将在第三个月的时候取消其日结模式；如果在第三个月有开发会员，在次月开启日结。 若合作伙伴自己的游戏账号注册到自己代理下线，取消代理资格，佣金不予发放。</p>

    <span>佣金月结标准</span>
    <p class="content-color"></p>
    <p class="content-p">1、针对其他类佣金发放日为每月1—5号，（结算时间为自然月：上月1号：00:00点至本月1号00:00）。
      <br>2、当月达到3位有效会员（真人，体育，彩票）且佣金大于100元，后续每两个月需新增一位有效下线。
      <br>3、有效会员标准，当月存款大于500元，投注额大于1000元，活跃天数大于7天。
      <br>4、若当月未达到发放标准，佣金会累计至某月达到要求后一起发放。
      <br>5、若当月代理佣金为负值，会累计至下月，等至累计正数且要求达到后佣金发放。
      <br>6、若合作伙伴自己的游戏账号注册到自己代理下线，取消代理资格，佣金不予发放。
    </p>

    <span>佣金计算标准</span>
    <p class="content-color"></p>
    <p class="content-p">1、计算公式：
      <br>（所有电子平台输赢×85%－优惠－返水）×佣金比例+（其他平台输赢x90%-优惠-反水）x佣金比例
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
.agent-proce-content {
  text-align: center;
  padding: 0 r(30);
  @include f(24px);
  line-height: r(50);
  table {
    width: 100%;
    @include f(24px);
    text-align: center;
    th {
      background: #4db7f4;
      border: 1px solid #ffffff;
      color: #fff;
      padding: r(10) 0;
    }
    td {
      border: 1px solid #ffffff;
      color: #4db7f4;
      line-height: 2;
      padding: r(10) 0;
    }
  }
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
    @include f(24px);
  }
  .cl-red {
    color: red;
  }
}
</style>
