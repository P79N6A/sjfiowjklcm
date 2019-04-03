<template>
  <div >
    <img src="./images/VIPbanner.jpg" alt="" style="width: 100%;">
    <div class="vipmenus">
      <div class="vipmenu" @click="move(1)">晋级要求</div>
      <div class="vipmenu" @click="move(2)">VIP特权</div>
    </div>
    <div class="Exclusive">
      <div class="vip1">
       <table class="table" border="1">
        <tbody>
        <tr style="background:#4db7f4">
          <th>等级</th>
          <th>晋级要求</th>
          <th>保级要求</th>
        </tr>
        <tr>
          <td><img src="/static/images/level/1.png" alt=""></td>
          <td><span style="font-weight: 600;">A:</span> 所有平台月投注45万 
            <br/><span style="font-weight: 600;">B:</span>所有老虎机月累计总投注额10万
          </td>
          <td rowspan="6">永久保级</td>
        </tr>
        <tr>
          <td><img src="/static/images/level/2.png" alt=""></td>
           <td>A:所有平台月投注100万
            <br/>B:所有老虎机月累计总投注额60万
          </td>
        </tr>
        <tr>
          <td><img src="/static/images/level/3.png" alt=""></td>
           <td>A:所有平台月投注300万
            <br/>B:所有老虎机月累计总投注额180万
          </td>
        </tr>
        <tr>
          <td><img src="/static/images/level/4.png" alt=""></td>
           <td> A:所有平台月投注500万
            <br/>B:所有老虎机月累计总投注额300万
          </td>
        </tr>
        <tr>
          <td><img src="/static/images/level/5.png" alt=""></td>
          <td>A:所有平台月投注800万
            <br/>B:所有老虎机月累计总投注额500万
          </td>
        </tr>
        <tr>
          <td><img src="/static/images/level/6.png" alt=""></td>
          <td>特邀玩家</td>
        </tr>
        </tbody>
      </table>
       <table class="table" border="1">
        <tbody>
        <tr style="background:#4db7f4">
          <th>等级</th>
          <th>每月免费筹码</th>
          <th>生日礼金</th>
          <th>晋级礼金</th>
          <th>返水上限</th>
          <th>节日彩金</th>
        </tr>
        <tr>
          <td>忠实VIP</td>
          <td>8元</td>
          <td>88元</td>
          <td>88元</td>
          <td>28,888元</td>
          <td rowspan="6">奇幻城将根据不同节目不定期举办活动来派发节日彩金</td>
        </tr>
        <tr>
          <td>星级VIP</td>
          <td>38元</td>
          <td>188元</td>
          <td>188元</td>
          <td>28,888元</td>
        </tr>
        <tr>
          <td>黄金VIP</td>
          <td>88元</td>
          <td>888元</td>
          <td>588元</td>
          <td>28,888元</td>
        </tr>
        <tr>
          <td>铂金VIP</td>
          <td>188元</td>
          <td>1888元</td>
          <td>888元</td>
          <td>128,888元</td>
        </tr>
        <tr>
          <td>钻石VIP</td>
          <td>588元</td>
          <td>2888元</td>
          <td>2888元</td>
          <td>128,888元</td>
        </tr>
        <tr>
          <td>菁英VIP</td>
          <td>1288元</td>
          <td>8888元</td>
          <td>6888元</td>
          <td>128,888元</td>
        </tr>
        </tbody>
      </table>
      </div>
      <div class="vip2">
        <p class="vip-p">奇幻城VIP特权</p>
        <div class="vip2-bg">
          <ul>
            <li>
              <img src="./images/VIP2-1.png" alt="">
              <h3>每月免费筹码</h3>
              <p>奇幻城VIP免费筹码将在每月1-5日系统晋级结束之后统一派发</p>
            </li>
            <li>
              <img src="./images/VIP2-2.png" alt="">
              <h3>生日礼金</h3>
              <p>奇幻城VIP生日当天可以直接到【会员中心】-【自助优惠】-【生日礼金】自助申请</p>
            </li>
            <li>
              <img src="./images/VIP2-3.png" alt="">
              <h3>晋级礼金</h3>
              <p>会员自助/系统晋级成功，系统将会将礼金派发到【副账户】</p>
            </li>
            <li>
              <img src="./images/VIP2-4.png" alt="">
              <h3>节日彩金</h3>
              <p>奇幻城将根据不同节日不定期举办活动来派发节日彩金</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="vip3">
        <div class="vip-p">温馨提示</div>
        <p>1.每个月1-5日系统自动审核进行升级；系统以晋级条件中的A来进行升级。</p>
        <p>2.会员自助晋级可透过下面两种来申请：
          <br><span>①达到晋级条件中的A,可以进入“会员中心”—“自助优惠”—“自助晋级”自行操作</span>
          <br><span>②达到晋级条件中的B,可以发邮件到ceo@qian166.me进行申请</span>
          <br><span>温馨提示：符合晋级条件B的玩家，必须在下个月2号之前发送邮件申请晋级，逾期作废。</span>
        </p>
        <div class="maliimg"><img class="mail" src="./images/mail.png" alt="">邮件标题：申请VIP晋级，邮件内容：账号、注册姓名、电话、注册邮箱。相关部门会将会在24小时内为您审核。</div>
        <p>3.会员每个月只享有一次晋级的机会，且各等级晋级礼金每位玩家只可以获得一次。</p>
        <p>4.若会员跳级升级，晋级礼金按照当前晋级等级为主。例如会员由新会员晋级为星级会员，仅可领取星级会员之晋级礼金。</p>
        <p>5.当月自助晋级之后，下个月系统晋级审核时将不再计算上个月的投注额。</p>
        <p>6.奇幻城拥有最终解释权和裁决权。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { scrolltool } from "@/vue-extend/scrolltool";
export default {
  mixins:[scrolltool],
  data() {
    return {
      data: [] //records
    };
  },
  methods: {
    move(val) {
      let iTarget = 0 ;
      if(val == 1) {
        iTarget = document.querySelector(".vip1")
        this.scrollTo(iTarget.offsetTop - 80);
      }else {
        iTarget = document.querySelector(".vip2")
        this.scrollTo(iTarget.offsetTop - 40);
      }    
    }
  },
  created() {},
  components: {
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.vipmenus{
  display: flex;
  width: 100%;
  padding: r(30) r(20) r(10);
  justify-content: space-around;
  .vipmenu{
    width: 45%;
    height: r(75);
    line-height: r(75);
    text-align: center;
    @include f(28px);
    color: #fff;
    background: #4db7f4;
    &.active,&:hover{
      background: #fd4746;
    }
  }
}
.Exclusive {
  width: 100%;
  // background: #000046;
  background-size: 100%;
  color: #fff;
  img {
    width: 100%;
  }
  .vip1 {
    // background: url(./images/VIP.png) no-repeat;
    // background-size: 100% 100%;
    padding: r(20);
    .table {
      width: 100%;
      margin-bottom: r(30);
      border: 1px solid #ddd;
      color: #696969;
      th {
        color: #fff;
      }
      &:nth-child(1) {
        tr:nth-child(1) {
          height: r(80);
          th {
            &:nth-child(1) {
              width: r(180);
            }
            &:nth-child(2) {
              width: r(400);
            }
            &:nth-child(3) {
              width: r(200);
            }
          }
        }
        tr:nth-child(7) {
          td:nth-child(2) {
            @include f(28px);
            text-align: center;
          }
        }
        td {
          &:nth-child(1) {
            text-align: center;
            img {
              width: 80%;
              margin: r(8) r(25) r(0) r(15);
            }
          }
          &:nth-child(2) {
            line-height: r(40);
            padding: r(15) r(0) r(15) r(15);
          }
          &:nth-child(3) {
            text-align: center;
          }
        }
      }
      &:nth-child(2) {
        tr {
          &:nth-child(1) {
            height: r(80);
            th {
              &:nth-child(1) {
                width: r(180);
              }
              &:nth-child(2) {
                width: r(180);
              }
              &:nth-child(3) {
                width: r(200);
              }
              &:nth-child(4) {
                width: r(200);
              }
              &:nth-child(5) {
                width: r(200);
              }
              &:nth-child(6) {
                width: r(200);
              }
            }
          }
          &:nth-child(2) {
            td {
              &:nth-child(6) {
                line-height: r(30);
              }
            }
          }
        }
        td {
          height: r(70);
          text-align: center;
        }
      }
    }
  }
  img:nth-child(2) {
    margin-top: r(0);
  }
  .vip-p {
    background: #4db7f4;
    text-align: center;
    @include f(32px);
    font-weight: bold;
    line-height: 2;
    margin: 0 auto;
    width: 96%;
  }
  .vip2 {
    margin-bottom: r(20);
    // padding-top: r(40);
    // background: #000046;
    .vip2-bg {
      // background: url(./images/VIP2.png) no-repeat;
      // background-size: 100% 100%;
      padding: r(20);
      ul {
        display: flex;
        background: #4db7f4;
        // height: r(300);
        li {
          width: 25%;
          // float: left;
          text-align: center;
          border-left: 1px solid #fff;
          // &:nth-child(1) {
          //   background: #4db7f4;
          // }
          // &:nth-child(3) {
          //   background: #4db7f4;
          // }
          h3 {
            @include f(28px);
            margin-top: r(-20);
          }
          img {
            width: r(120);
            height: r(120);
            margin-top: r(20);
          }
          p {
            line-height: r(30);
            padding: r(5);
          }
        }
      }
    }
  }
  .vip3 {
    // background: #fff url(./images/VIP3.png) no-repeat;
    // background-size: 140% 100%;
    padding: r(20);
    p {
      line-height: r(35);
      padding:0 r(20);
      color: #333;
      span {
        margin-left: r(20);
      }
    }
    .maliimg {
      padding: r(18);
      padding-left: r(150);
      line-height: r(30);
      background: #4db7f4;
      border-radius: r(20);
      position: relative;
      // background: url(./images/VIP3-1.png) no-repeat;
      // background-size: 100% 100%;
      .mail {
        position: absolute;
        left: r(20);
        top: 50%;
        transform: translateY(-50%);
        width: r(90);
      }
    }
  }
}
</style>
