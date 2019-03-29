<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view class="ng-scope">
          <div style="height: 521px" class="ng-scope">
            <h5>联系我们</h5>
            <p>在线客服</p>
            <p>
              7*24 在线客服
              <a style="color: #ffeb00;" target="_blank" :href="SETTING.live800">【在线客服】</a>
            </p>
            <p>QQ咨询</p>
            <p>{{SETTING.qq}}</p>
            <p>电话咨询</p>
            <p>{{SETTING.Tel}}</p>
            <p>投诉与反馈</p> 
            <p>{{SETTING.SuggessEmail}}</p>
            <!-- <p>优惠活动咨询</p>
            <p>{{SETTING.SupportEmail}}
              <a style="color: #2293fc;" :href="'mailto:'+SETTING.SupportEmail">【发送邮件】</a>
            </p>
            <p>存提款咨询</p>
            <p>{{SETTING.SupportEmail}}
              <a style="color: #2293fc;" :href="'mailto:'+SETTING.SupportEmail">【发送邮件】</a>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
export default {
  name: "",
  data() {
    return {
      SETTING
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  created() {},
  activated() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.tutorials_right {
  // background: #fff;
  border-right: 1px solid #e7e7e7;
  border-left: 1px solid #e7e7e7;
  margin: 0;
  padding: 0;
  width: 50%;
  float: left;
  table,
  td,
  th {
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
            height: 0.1em;
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
            color: #fff;
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
            &.action,
            &:hover {
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
                color: #fff;
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
            &.action,
            &:hover {
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
            &.action,
            &:hover {
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
                color: #fff;
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
            &.action,
            &:hover {
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
                color: #fff;
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
            &.action,
            &:hover {
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
      .subject,
      h5 {
        padding-top: 40px;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
        color: #fff;
      }
      .sub_title,
      h3 {
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
        color: #fff;
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

