<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="ng-scope">
            <h5>存款问题</h5>
            <div class="sub_title">存款介绍</div>
            <p>新九州在线存款拥有最全面的安全便捷支付方式，完美覆盖40多家主流银行、以及互联网新兴支付机构，支付宝、微信支付、在线支付、银联支付等，使您舒适放心选择任何您习惯常用的便捷支付方式进行存款。支付渠道已经过中国银联等机构权威认证，100%保障您的充值安全。</p>
            <div
              class="sub_title">如何存款？</div>
          <p>登录账户后，点击账户名，进入个人中心页面，选择“充值”，根据页面显示选择自己需要的存款方式进行存款操作即可。</p>
          <!-- <table>
            <tbody>
              <tr>
                <th>电脑（PC）端</th>
                <th>手机APP</th>
              </tr>
              <tr>
                <td>
                  <a href="/tutorials/HelpDepositEAtm">转账存款图文介绍</a>
                </td>
                <td>
                  <a href="/tutorials/HelpDepositEAtm_M">手机APP转帐存款图文介绍</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorials/HelpDepositWechat">微信扫码支付图文介绍</a>
                </td>
                <td>
                  <a href="/tutorials/HelpDepositWechat_M">手机APP微信存款图文介绍</a>
                </td>
              </tr>
              <tr>
                <td>
                  <a href="/tutorials/HelpDepositAlipay">支付宝扫码支付图文介绍</a>
                </td>
                <td>
                  <a href="/tutorials/HelpDepositAlipay_M">手机APP支付宝存款图文介绍</a>
                </td>
              </tr>
            </tbody>
          </table> -->
          <div class="sub_title">存款到账时间要多久？</div>
          <p>1. 在线充值、微信、支付宝：完成支付后一般都是即时到账，如果出现延迟到账，请联系在线客服。</p>
          <p>2. 银行转账：相关部门会在确认到款项后的5分钟内办理到账。</p>
          <div class="sub_title">存款限额是多少？</div>
          <p>1. 支付宝、微信、QQ扫码：50元-3000元</p>
          <p>2. 在线充值限额：50元-50000元</p>
          <p>3. 转账限额：100元-50000元</p>
          <div class="sub_title">存款需要收取什么手续费吗？</div>
          <p>新九州公司充值无须任何手续费。</p>
          <div class="sub_title">每天存款次数是多少？</div>
          <p>会员存款只设置单笔存款限额，每天存款次数无上限</p>
          <div class="sub_title">存款是否支持信用卡？</div>
          <p>由于信用卡到账不稳定, 公司不建议客户使用信用卡支付, 如果您使用信用卡支付发生无法到账情况, 需由客户自己承担责任损失。</p>
          <div class="sub_title">可以使用别人的银行卡存款吗？</div>
          <p>对于存款人是没有限制的，您可以使用自己或是朋友的网银进行转账，只需要在提交存款单时将存款人姓名修改为实际存款人的名字即可，但是提款必须使用自己真实姓名的银行卡才能支付成功。</p>
          <div class="sub_title">微信充值提示“超过商户限额”？</div>
          <p>会员在使用微信充值过程中，可能会看到以下提示:“超过当日在该商户的微信扫码支付限额，请尝试通过其他方式完成支付”，一般情况下，超过商户限额有两种可能。</p>
          <p>1. 商户限额，一般情况下商户限额您先尝试小额入款如成功支付后再尝试大额，如果您多次支付还是这样的提示，那么就是说明您的微信超过了限额。</p>
          <p>2. 微信绑定的银行卡限额，您可以进入微信，点击“我”然后查看“钱包”，点击您绑定的银行卡，即可查看到定的银行卡限额度，如果您想修改限额，可以咨询“交易限额咨询”客服热线：95017进行提升。</p>
          <div class="sub_title">使用在线充值安全吗？</div>
          <p>用户在本站充值时选择任一银行卡支付通道后立即进入银行网关，银行卡资料全部在银行网关加密页面上填写，资料提交过程全部采用国际通用的SSL或SET及数字证书进行加密传输，安全性由银行全面提供支持和保护，各银行网上支付系统对网上支付的安全提供保障。</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<style lang="scss" scoped>
.tutorials_right {
    background: #fff;
    border-right: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    margin: 0;
    padding: 0;
    width: 50%;
    float: left;
    table, td, th {
      text-align: center;
      border: 1px solid #2293fc;
      border-collapse: collapse;
    }
    .tutorials_right_row {
      .tutorials_right_Top {
        text-align: center;
        vertical-align: middle;
        .tutorials_right_Top_navbar {
          background: url(./images/nav_bg.png) 50% no-repeat;
          background-size: 100% 100%;
          margin-top: 35px;
          height: 50px;
          .divline {
            text-align: center;
            vertical-align: middle;
            line-height: 50px;
            margin: 0 3em;
            &:before {
              content: "";
              position: absolute;
              top: 1.7em;
              left: -5em;
              width: 4em;
              height: .1em;
              background: #e7e7e7;
              z-index: 2;
            }
            &:first-child:before {
              display: none;
            }
            span {
              padding-left: 30%;
              font-size: 16px;
            }
          }
          .tutorials_right_Top_navbar_gameTab {
            outline: none;
            ul a {
              color: #787878;
            }
            .dotline {
              font-size: 1px;
              font-weight: 100;
            }
            .actionDotline {
              color: #2293fc;
            }
            &.tutorials_right_Top_navbar_casino_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/casino_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/casino_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .casino {
                position: absolute;
                left: -20px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                background-size: 100% 100%;
                display: none;
                ul {
                  font-size: 16px;
                  color: #787878;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                    &:hover {
                      color: #2293fc;
                    }
                  }
                }
              }
              &:hover .casino {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_esports_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/esports_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/esports_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
            }
            &.tutorials_right_Top_navbar_lottery_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/lottery_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/lottery_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .lottery {
                position: absolute;
                left: -15px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                display: none;
                ul {
                  color: #787878;
                  font-size: 16px;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                  }
                  a:hover {
                    color: #2293fc;
                  }
                }
              }
              &:hover .lottery {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_sport_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/sport_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/sport_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
              .sport {
                position: absolute;
                left: -20px;
                width: 140px;
                background: url(./images/db.png) no-repeat;
                background-size: 100% 100%;
                display: none;
                ul {
                  font-size: 16px;
                  color: #787878;
                  position: relative;
                  top: 10px;
                  left: -27px;
                  height: 200px;
                  li {
                    height: 50px;
                    &:hover {
                      color: #2293fc;
                    }
                  }
                }
              }
              &:hover .sport {
                display: block;
              }
            }
            &.tutorials_right_Top_navbar_esport_i {
              width: 100px;
              height: 50px;
              display: inline-block;
              position: relative;
              background: url(./images/esports_i.png) 0 no-repeat;
              &.action, &:hover {
                background: url(./images/esports_i01.png) 0 no-repeat;
                cursor: pointer;
                color: #2293fc;
              }
            }
          }
        }
      }
      .tutorials_right_middle {
        padding: 50px;
        padding-top: 0;
        margin: 20px 0;
        .subject, h5 {
          padding-top: 40px;
          text-align: center;
          font-weight: 700;
          font-size: 16px;
          color: #2293fc;
        }
        .sub_title, h3 {
          font-size: 16px;
          font-weight: 700;
          margin-top: 1em;
          line-height: 1.1;
          color: inherit;
          margin-bottom: 10px;
        }
        p {
          margin: 20px 0;
          font-size: 14px;
          color: #787878;
          line-height: 1.5;
        }
        ul {
          margin-left: 50px;
          list-style-type: decimal;
          > li {
            margin-bottom: 10px;
            line-height: 22px;
            list-style: none;
            margin: 0;
            padding: 0;
          }
        }
      }
    }
  }
</style>

