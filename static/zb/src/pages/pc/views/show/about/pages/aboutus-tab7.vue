<template>
  <div class="tutorials_right">
    <div class="tutorials_right_row">
      <div class="tutorials_right_middle">
        <!-- uiView: -->
        <div ui-view class="ng-scope">
          <div class="ng-scope">
            <h5>选品牌，当然选众博娛樂，十大放心理由</h5>
            <div class="sub_title">一、平臺足够权威</div>
            <p>众博娛樂與BBIN進行技術合作，並獲得GEOTRUST國際認證，確保網站公平、公正、公開。</p>
            <div class="sub_title">二、排名足夠靠前</div>
            <p>众博娛樂為澳門最具公信力博彩品牌，信譽馳名亞洲，在全球海量博彩公司中獨占前茅的博彩集團。</p>
            <div class="sub_title">三、資金足夠安全</div>
            <p>众博娛樂雄厚的資金鏈信譽良好，大額存款無憂，資金安全有保障，免去您壹切後顧之憂。</p>
            <div class="sub_title">四、取款足够自由</div>
            <p>众博娛樂24小時自由存取款，取款3-5分鐘火速到帳，且終身免手續費。</p>
            <div class="sub_title">五、活動足夠給力</div>
            <p>众博娛樂時時推出各項給力活動，優惠送不停，讓您真正賺翻天。</p>
            <div class="sub_title">六、安全足夠保障</div>
            <p>众博娛樂采用128位SSL加密技術和嚴格的安全管理體系，確保客戶資料安全得到最完善的保障。</p>
            <div class="sub_title">七、服務足夠貼心</div>
            <p>众博娛樂7X24小時客服貼心的服務，溫馨的呵護每壹位玩家。</p>
            <div class="sub_title">八、營業足夠合法</div>
            <p>众博娛樂是首家獲澳門特別行政區政府發出博彩經營權的企業，首間上市的持牌博彩經營商,新壹代賭王呂誌和直營的大型網絡博彩公司。</p>
            <div class="sub_title">九、操作足夠簡單</div>
            <p>众博娛樂秉承以客戶為中心的宗旨，在開發之初就設計了諸多人性化的功能和特性，省去繁瑣的麻煩，讓您輕松操作。</p>
            <div class="sub_title">十、VIP足夠優越</div>
            <p>众博娛樂VIP尊享貴賓級的專屬服務讓您享有賓至如歸般的帝王享受。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
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

