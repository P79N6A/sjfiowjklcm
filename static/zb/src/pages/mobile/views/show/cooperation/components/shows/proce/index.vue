<template>
  <div class="agent-proce-content m-content">
    <span>佣金方案</span>
    <p class="content-color"></p>
    <table class="table">
      <tbody>
        <tr>
          <td colspan="2">当月盈利</td>
          <td>100-50000</td>
          <td>50001-200000</td>
          <td>200001-500000</td>
          <td>500001-800000</td>
          <td>800001-1200000</td>
          <td>1200001以上</td>
        </tr>
        <tr>
          <td colspan="2">有效会员</td>
          <td>≥5</td>
          <td>≥10</td>
          <td>≥20</td>
          <td>≥45</td>
          <td>≥80</td>
          <td>≥100</td>
        </tr>
        <tr>
          <td rowspan="6">退佣比例</td>
          <td>真人视讯(会员派彩)</td>
          <td>25%</td>
          <td>30%</td>
          <td>35%</td>
          <td>40%</td>
          <td>45%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>电竞(会员派彩)</td>
          <td>25%</td>
          <td>30%</td>
          <td>35%</td>
          <td>40%</td>
          <td>45%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>电子(会员派彩)</td>
          <td>25%</td>
          <td>30%</td>
          <td>35%</td>
          <td>40%</td>
          <td>45%</td>
          <td>50%</td>
        </tr>
        <tr>
          <td>彩票(有效投注)</td>
          <td>0.20%</td>
          <td>0.20%</td>
          <td>0.20%</td>
          <td>0.20%</td>
          <td>0.20%</td>
          <td>0.20%</td>
        </tr>
        <tr>
          <td>体育投注(会员派彩)</td>
          <td>10%</td>
          <td>10%</td>
          <td>10%</td>
          <td>10%</td>
          <td>15%</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>棋牌(会员派彩)</td>
          <td>20%</td>
          <td>25%</td>
          <td>30%</td>
          <td>35%</td>
          <td>40%</td>
          <td>45%</td>
        </tr>
      </tbody>
    </table>
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
  color: #ffffff;
  table {
    width: 100%;
    @include f(24px);
    text-align: center;
    th {
      background: #f28a57;
      border: 1px solid #eee;
      color: #fff;
      padding: r(10) 0;
    }
    td {
      border: 1px solid #eee;
      color: #fff;
      line-height: 2;
      padding: r(10) 0;
    }
  }
  span {
    @include f(30px);
    color: #ffffff;
    margin: r(20) auto;
    display: block;
  }
  .content-color {
    border-color: #c3c3c3;
    border-width: 1.5px 3px;
    border-style: solid;
    width: 8%;
    margin: -5px auto 5px;
  }
  .content-p {
    text-align: justify;
    @include f(24px);
  }
}
.agent-proce {
  padding: 0 r(30);
  @include f(28px);
  line-height: 1.3;
  table {
    width: 100%;
    @include f(26px);
    text-align: center;
    td,
    th {
      border: 1px solid $main-bg;
      line-height: 2;
    }
  }
  p {
    line-height: 1.3;
    @include f(20px);
  }
  h3 {
    margin: 1em 0;
    color: $cl1;
  }
}
</style>
