<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view="" class="ng-scope">
          <div class="ng-scope">
            <h5>常见问题</h5>
            <div class="sub_title">新九州网址</div>
            <p>
              <a :href="WEBCONFIG.location">{{WEBCONFIG.location}}</a>
            </p>
            <div class="sub_title">新九州公司的实力和信誉怎么样？</div>
            <p>新九州是全球领先的合法在线娱乐运营商，详情请点击下方
              <router-link :to="{name:'aboutIndex',params:{'tab':'tab1'}}">关于我们</router-link>进行查看。</p>
            <div class="sub_title">如何清除访问网站的记录？</div>
            <p>请于网站的栏目位置，选取工具项，再选取清单选项，您会看到浏览器记录，然后按删除按钮，再选取您想删除的项目后，再按删除按钮即可。</p>
            <div class="sub_title">如何为新九州留言？</div>
            <p>新九州一直秉承“一切以用户体验设计为核心”的经营理念，您可以进入会员“个人中心”后点击“消息中心”—“留言反馈”来与新九州进行互动。</p>
            <div class="sub_title">页面无法弹出，无法跳转怎么办？</div>
            <p>1. 可能是您的浏览器设置了阻止弹跳窗口</p>
            <p>如页面显示“请问是否允许弹跳窗口？”相关提示说明，点击允许。最方便快捷的方法，建议您更换其他的浏览器或者其他的链接进行尝试。</p>
            <p>建议您使用IE、谷歌、或者火狐浏览器进行操作，如果您没有其他可使用的浏览器，您也可以尝试清除您的浏览器缓存，再次尝试即可。</p>
            <img src="./images/u59.jpg">
            <p>2. 可能是您的网络环境问题导致</p>
            <p>如果您打开所有网页都比较缓慢，这种情况那应该就是您的网络环境问题，您可以切换到其他网络设备进行再次尝试。</p>
            <p>3. 充值时出现问题，可能是相关支付平台问题</p>
            <p>充值时如页面显示“正在升级维护”或当支付平台不稳定时，页面也是无法进行跳转的，这种情况下会员都将暂时无法进行该支付平台的相关操作，此时您可以尝试使用其它支付方式，或者稍后再次尝试充值操作。</p>
            <div class="sub_title">为什么我的钱包向游戏转账会失败？</div>
            <p>向游戏转账失败可能存在以下几种原因：</p>
            <p>1. 第三方游戏数据异常或正在升级维护中。</p>
            <p>2. 数据对接异常，暂时无法进行资金操作。</p>
            <p>3. 网络连接异常，导致订单超时。</p>
            <div class="sub_title">选择什么样的浏览器才能获得最佳的娱乐体验？</div>
            <p>1. 我们设计的网页将会提供新一代浏览器服务，提供更好的特点，让您能够享有更好的投注乐趣。我们建议您能使用以下浏览器版本</p>
            <p>360浏览器7.0或以上版本</p>
            <p>微软IE9或以上版本</p>
            <p>火狐Firefox 10或以上版本</p>
            <p>谷歌Chrome 17或以上版本</p>
            <p>2. 如果您使用的是手持移动设备，我们建议您通过手机自带浏览器进行访问。</p>
            <p>3. 如果您使用的并非以上浏览器且在访问时遇到问题，请您联系我们客服服务部门获取帮助。</p>
            <div class="sub_title">网站页面部分图片无法看到？</div>
            <p>旧版本的Adobe Flash Player在显示部分Flash图片时存在问题。我们建议您安装使用Adobe Flash 9.0或更高的版本。</p>
            <div class="sub_title">第三方开奖机构不开奖怎么办？</div>
            <p>如遇第三方开奖机构不开奖，平台会对未获得开奖的注单进行撤单返款；撤单返款后无论第三方以任何形式补开，平台均维持撤单处理。</p>
            <div class="sub_title">什么是有效投注额？</div>
            <p>1. 新九州体育仅对已结算并产生输赢结果的投注额进行计算流水。</p>
            <p>2. 任何走盘、取消的赛事、对押等(包括串关和单双)赔率低于欧洲盘1.70，香港盘0.70，马来盘0.70，印尼盘-1.20，美国盘-120的投注将不计算在有效流水内。</p>
            <p>请您在投注时，尽量选择符合有效流水的内容进行投注，否则很可能造成您无法提款或者无法领取每日返水。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {WEBCONFIG} from '@/assets/data'
  export default {
    data() {
      return {
        WEBCONFIG,
      }
    },
  }
</script>
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

