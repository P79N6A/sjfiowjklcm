<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="ng-scope">
            <h5>账号问题</h5>
            <div class="sub_title">如何进行账号注册？</div>
            <p>1. 点击网站右上角“注册”的功能键</p>
            <p>2. 进入注册页面，填写开户申请表，根据页面显示以及提示填写几项简单信息即可成功注册</p>
            <p class="color-note-text">注：用户名必须至少含有6-12个字母和数字的混合字符。</p>
            <p class="color-note-text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码必须至少含有6-12个字母和数字的混合字符。此外，请将密码严格保密。</p>
            <div class="sub_title">注册账户需要注意什么？</div>
            <p>1. 为了规范网站游戏账户管理，每一位会员只允许注册一个游戏账户。</p>
            <p>2. 同一用户名，邮箱以及电话只能注册一个游戏账户，如果该信息已被使用，将无法再次被用于注册新账户。</p>
            <div class="sub_title">在网站注册之后，我的个人资料信息安全有保障吗？</div>
            <p>关于客户账户资料安全，以及客户隐私权，请参考
              <router-link :to="{name:'aboutIndex',params:{'tab':'tab3'}}">隐私政策</router-link>
            </p>
            <div class="sub_title">注册账户忘记怎么办？</div>
            <p>忘记会员账户您可以联系我们在线客服团队，为您提供必要协助。</p>
            <div class="sub_title">忘记密码怎么办？</div>
            <p>1. 在登录页面，点击“找回密码”功能键</p>
            <p>2. 进入找回密码页面，填写您的用户名，通过您预留的电话或者邮箱获取新密码</p>
            <div class="sub_title">如何更改账户密码？</div>
            <p>1. 请您登录账户后，点击用户名，进入“个人中心”。</p>
            <p>2. 点击页面的“安全管理”，在“修改账户密码”区域内填写新旧密码。</p>
            <p>3. 点击“修改”即可完成修改。</p>
            <div class="sub_title">登录账户提示被锁是什么原因？</div>
            <p>会员输入错误密码五次以上，为了保障会员账号的安全，系统自动锁定会员账号，出现此类问题，建议可以联系在线客服团队进行询问解除锁定</p>
            <div class="sub_title">我可以申请注销账户吗？</div>
            <p>新九州不以任何理由注销会员账户，您可以与在线客服联系申请冻结/停用您的会员账户</p>
            <div class="sub_title">怎么申请更改个人资料信息？</div>
            <p>客户成功注册后，可以通过安卓，苹果，电脑或其他设备随意修改个人基本资料信息。如遇任何问题，请咨询我们在线客服团队。</p>
            <div class="sub_title">为何账户有多个不同钱包？</div>
            <p>1. 中心钱包是新九州上娱乐城所有产品的现金钱包，存款和提款操作必须在中心钱包进行。您可以将中心钱包的有效资金进行提款或者转账到其他产品钱包。</p>
            <p>2. 产品钱包中的有效资金可以直接进行投注, 也可以转账到中心钱包或者其他游戏平台对应的游戏钱包。</p>
            <div class="sub_title">账户具体分为哪些钱包？</div>
            <p>客户账户分为中心钱包和产品钱包两大种类</p>
            <p>1. 体育产品钱包：美洲体育、欧洲体育、亚洲体育</p>
            <p>2. 电子竞技产品钱包：新九州电竞</p>
            <p>3. 真人视讯产品钱包：BBIN、OG、AG、eBET、申博</p>
            <p>4. 电子游戏产品钱包：MG、PT、PG、BNG老虎机</p>
            <p>5. 彩票产品钱包：BBIN、LB KENO彩票</p>
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

