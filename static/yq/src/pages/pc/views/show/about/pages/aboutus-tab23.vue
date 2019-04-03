<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="ng-scope">
            <h5>提款问题</h5>
            <div class="sub_title">如何进行提款？</div>
            <p>1. 登录账户之后， 点击用户名，进入个人中心页面，选择“提款”。</p>
            <p>2. 进入提款页面后，会显示可提款金额以及不提款金额金额，下方输入提款金额，提款密码，如果未添加银行卡信息需要绑定银行卡，选择银行名称，输入开户姓名、开户账号、开户行，点击下方取款即可。</p>
            <!-- <p>
              <a href="/tutorials/HelpWithdrawalHow">提款申请图文介绍</a>
            </p> -->
            <div class="sub_title">支持哪些银行？</div>
            <p>新九州与中国银联无缝对接，全面支持中国各大银行有：中国银行、中国工商银行、中国建设银行、中国农业银行、中国招商银行、中国交通银行、中国光大银行、中国邮政储蓄银行、平安银行、中国民生银行、浦发银行、广发银行、中国中信银行、华夏银行、兴业银行、上海银行、上海农商银行、北京银行。并且您的每一笔提款均无需支付其它衍生费用，极速提款静候您的到来。</p>
            <div
              class="sub_title">提款限额是多少？</div>
          <p>提款金额单笔最低100元最高5万</p>
          <div class="sub_title">每天提款次数有限制吗？</div>
          <p>每天最多可提款5次，上一笔提款未成功时，不接受下一笔申请，每日最高提款额度25万。</p>
          <div class="sub_title">提款多长时间可以到账？</div>
          <p>一般取款时间是5-10分钟即可到账，如果长时间未到账请联系在线客服进行查询。</p>
          <div class="sub_title">提款密码忘记了怎么办？</div>
          <p>如忘记提款密码，请及时联系在线客服团队寻求协助</p>
          <div class="sub_title">可以使用别人的银行卡进行提款吗？</div>
          <p>为了确保客户的账户资金安全，提款需要使用游戏账号本人的银行卡才可以进行提款哦，且提款银行卡姓名必须与注册姓名一致。</p>
          <div class="sub_title">申请提款需要注意些什么？</div>
          <p>1. 提款绑定的银行卡姓名需与游戏账户的注册姓名一致。</p>
          <p>2. 提款绑定的银行卡信息需要正确。</p>
          <p>3. 若您未申请任何红利优惠，投注盈利即可申请提款。</p>
          <p>4. 若申请首存红利，则需要满足优惠活动写明的有效投注额要求。</p>
          <p>5. 全天24小时都可进行提款申请。</p>
          <div class="sub_title">游戏账户里有钱为什么无法提款？</div>
          <p>您需要先将资金从游戏平台转至中心账户后才能进行提款操作。</p>
          <div class="sub_title">可以绑定多张银行卡吗？</div>
          <p>会员账户可以绑定多张银行卡进行提款操作，在账户中心选择“银行卡管理”，进行新增添加即可。</p>
          <div class="sub_title">提款为什么还需要审核？</div>
          <p>提款审核是相关部门在给您办理出款之前的一个简单的核实步骤，是为了确保客户资金安全，所以需要核实相关信息。</p>
          <div class="sub_title">我可以取消提款吗？</div>
          <p>如果您在提款过程中遇到认为胜率较大的比赛、牌局时，可以联系在线客服申请取消提款，一般会在3分钟内完成办理。</p>
          <div class="sub_title">提款显示失败怎么办？</div>
          <p>提款审核失败有多方面原因，请看下您是否存在以下情况：</p>
          <p>1. 如提示系统额度不足，请确认是否已将各个厅的额度转到主账户，取款只可从主账户提取。</p>
          <p>2. 如提示支行信息有误，请及时联系在线客服修改您的提款银行卡信息。</p>
          <p>3. 如提示提款流水不足，新九州诚邀您继续投注。</p>
          <p>4. 如遇上取款银行进行维护，也会导致无法取款，请及时查看网站公告，避开维护期操作取款。</p>
          <p>为了确保您的交易效率，详情请您咨询在线客服团队。</p>
          <div class="sub_title">提款已显示成功，为什么我的银行账户没收到资金？</div>
          <p>一般情况下是由于银行转账延迟而导致的，各大银行转账到账时间不一，若转账产生延迟还请您耐心等待，同时可联系我们在线客服团队寻求协助</p>
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

