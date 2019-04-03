<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="ng-scope">
            <h5>APP问题</h5>
            <div class="sub_title">手机APP可以投注什么游戏？</div>
            <p>新九州提供的所有游戏项目，在手机APP中都可以进行投注。</p>
            <div class="sub_title">手机APP如何下载？</div>
            <p>会员可以在网站首页点击“客户端下载”按照页面提示信息操作即可。</p>
            <div class="sub_title">使用APP进入游戏需要输入前缀吗？</div>
            <p>新九州所有投注平台都是采用唯一接口，无需输入前缀即可进入游戏。</p>
            <div class="sub_title">苹果手机下载后如何设置信任？</div>
            <p>轻点“设置”&gt;“通用”&gt;“描述文件”或“描述文件与设备管理”，在“企业级应用”标题下方，您将看到我司APP的描述文件，轻点“企业级应用”标题下的开发者描述文件名称，然后点击确定即可。</p>
            <div class="sub_title">支持什么手机？</div>
            <p>安卓以及IOS系统均可下载新九州手机投注软件。</p>
            <div class="sub_title">需要支付任何费用吗？</div>
            <p>新九州手机APP可以适用于新九州会员免费登录适用，您只需要向网络运营商支付数据流量的费用，具体请您咨询当地网络运营商。</p>
            <div class="sub_title">游戏中网络断开怎么办？</div>
            <p>如果在使用手机APP时网络断开，您可以在网络恢复后重新下注。如果没有生成任何投注单号，表明您之前没有下注成功。您也可以在投注记录中查询。</p>
            <div class="sub_title">如何清除新九州安卓APP的缓存和APP数据？</div>
            <p>1. 点击“设置”菜单。</p>
            <p>2. 向下滚动，选择“程序管理”。</p>
            <p>3. 选择新九州-APP。</p>
            <p>4. 选择“清除数据”和“清除缓存”。</p>
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

