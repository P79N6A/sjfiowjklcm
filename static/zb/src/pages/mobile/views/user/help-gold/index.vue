<template>
  <div class="help-gold">
    <div class="vipTips" v-show="showTips">
      <i class="iconcent ct-tongzhi"></i>
      <span>救援金有效时间为{{expriedDay}}天</span>
      <i class="iconcent ct-guanbi1" @click="showTips = false"></i>
    </div>
    <div class="vip-step">
      <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>救援金</th>
            <th>选择平台</th>
            <th>领取状态</th>
          </tr>
        </thead>
        <tbody v-if="listData.length>0">
          <tr v-for=" (item,i) in listData" :key="i">
            <td>{{i+1}}</td>
            <td>{{item.promo}}</td>
            <td>
              <select class="platform" :ref="['platform'+i]" v-if="item.status == '0'">
                <option value=''>点击选择</option>
                <option :value="item.value" v-for="item in otherMoney" :key="item.value">{{item.name}}</option>
              </select>
              <span v-else>{{item.platform}}平台</span>
            </td>
            <td>
              <button class="tbbtn" @click="doSubmit(item.pno,i)" v-if="item.status == '0'">可领取</button>
              <button class="tbbtn1" disabled v-else-if="item.status == '1'||item.status == '2'">已领取</button>
              <button class="tbbtn1" disabled v-else>已过期</button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4">暂无可领取救援金</td>
          </tr>
        </tbody>
      </table>
    </div>
    <form-tip>
      <p>1.救援金有效时间为{{expriedDay}}天（从派发当天开始计算），规定时间内未领取会自动取消！</p>
      <p>2.自助救援金仅支持老虎机平台，其他游戏平台请参照优惠页面获取方式。</p>
      <p>3.救援金计算公式：救援金=（会员前一天在老虎机平台投注输值-前一天的红利总额）*会员对应比例。</p>
    </form-tip>
  </div>
</template>

<script>
  import formTip from "mobile/components/form-tip1"
  import vInput from "mobile/components/form"
  import vButton from "mobile/components/form/button"
  import {
    platformData , Money , otherMoney
  } from "@/assets/data"
  import {
    helpGold
  } from '@/controls/discount/helpGold'
  export default {
    mixins: [helpGold],
    data() {
      return {
        platformData,
        Money,
        otherMoney,
        showTips: true,
        platform:""
      };
    },
    methods: {
      submit() {
        // 提交表单
        this.helpGoldSubmit(this.submitData).then(res => {
          window.toast(res.message)
        }).catch(err => {
          console.log(err)
          window.toast(err.message)
        })
      },
      doSubmit(val , i){
        this.submitData.pno = val;
        //获取平台
        let index = this.$refs['platform'+i][0].selectedIndex;
        let platform = this.$refs['platform'+i][0].options[index].value;
        this.submitData.platform = platform;
        this.submit()
      }
    },
    created() {
      this.getHelpGold(this.searchLogData);
    },
    components: {
      formTip,
      vInput,
      vButton
    }
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";

  .help-gold {
    @include f(28px);

    .vipTips {
      width: 100%;
      height: r(90);
      background: #fefcec;
      opacity: 0.9;
      font-family: PingFangSC-Regular;
      @include f(28px);
      color: #f76a24;
      line-height: r(90);
      padding: 0 r(20);
      position: relative;

      .ct-guanbi1 {
        position: absolute;
        right: r(20);
        @include f(20px);
      }

      .ct-tongzhi {
        @include f(34px)
      }
    }

    .vip-step {
      padding: 0 r(20);

      table {
        width: 100%;
        border-spacing: 0;
        text-align: center;
        border-collapse: collapse;
        color: #303030;
        font-family: PingFangSC-Regular;
        table-layout: fixed;
        margin-top: r(20);

        th {
          background: #fff8f2;
          // padding: r(20) r(40);
          font-weight: 100;
          height: r(91);
          line-height: r(91);
          border: 1px solid #ecd1ba;
          @include f(28px);
        }

        td {
          // padding: r(20) r(40);
          border: 1px solid #ecd1ba;
          @include f(24px);
          height: r(70);
          line-height: r(70);

          .tbbtn {
            background: $cl1;
            color: #fff;
            width: r(130);
            height: r(45);
            line-height: r(45);
            font-family: PingFangSC-Regular;
            @include f(20px);
            letter-spacing: 0;
            text-align: center;
          }

          .tbbtn1 {
            background: #b1becf;
            color: #fff;
            width: r(130);
            height: r(45);
            line-height: r(45);
            font-family: PingFangSC-Regular;
            @include f(20px);
            letter-spacing: 0;
            text-align: center;
          }
          .platform{
            width: 100%;
            border: none;
            height: r(70);
            line-height: r(70);
            text-align: center;
            text-align-last: center;
            &:focus{
              outline-color: transparent;
            }
          }
        }
      }
    }

    .user-personal-update-btn {
      width: 100%;
      // position: absolute;
      // bottom: r(100);
      text-align: center;
      padding-bottom: r(30);

      .btn {
        width: 94%;
        // margin: 0 auto;
        display: inline-block;
        background: $cl1;
        color: #fff;
        height: r(94);
        line-height: r(94);
        text-align: center;
        @include f(32px);
        letter-spacing: 2px;
        font-family: PingFangSC-Regular;
        border-radius: 5px;
      }
    }

    .selectBox {
      background: rgba($color: #000, $alpha: 0.6);
      position: fixed;
      width: 100%;
      height: 90vh;
      z-index: 999;
      top: 0;
      left: 0;
      overflow: hidden;
      .main {
        position: absolute;
        background: #fff;
        max-height: 50vh;
        width: 100%;
        bottom: 0;
        overflow-y: scroll;
        .head {
          height: r(100);
          line-height: r(100);
          display: flex;
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          .headCtrl {
            flex: 1;
            color: #108ee9;
            @include f(28px);
            text-align: center;
          }

          .title {
            font-family: PingFangSC-Regular;
            @include f(28px);
            color: #000;
            flex: 5;
            text-align: center;
          }
        }
        .list{
          width: 100%;
          position: relative;
          height: r(90);
          line-height: r(90);
          border-bottom: 1px solid rgba($color: #ddd, $alpha: .6);
          .listPlatform{
            font-family: PingFangSC-Regular;
            @include f(28px);
            color: #000;
            text-align: center;
            position: absolute;
            left: r(20);
          }
          .iconcent{
            color: #0b97e7;
            position: absolute;
            right: r(20);
            @include f(28px);
          }
        }
      }
    }
  }

</style>
