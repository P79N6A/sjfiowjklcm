<template>
  <div class="content">
    <div class>
      <img style="max-width: 100%;" src="./images/banner.jpg">
    </div>
    <div class="wp">
      <div class="vip_menu">
        <ul class="inblock_fix">
          <li class="li1" @click="scrollTop(1)">
            <div class="menu_pic">
              <div class="bg-blue_crown"></div>
            </div>
            <div class="menu_text">
              <h3>成为奇幻城VIP</h3>
              <div>上百款游戏，不用花钱照样玩!</div>
            </div>
            <a href="#member">
              <span class="link-spanner"></span>
            </a>
          </li>
          <li @click="scrollTop(2)">
            <div class="menu_pic">
              <div class="bg-gold_crown"></div>
            </div>
            <div class="menu_text">
              <h3>享受尊爵特权</h3>
              <div>上百款游戏，不用花钱照样玩!</div>
            </div>
            <a href="#privilege">
              <span class="link-spanner"></span>
            </a>
          </li>
          <!-- <li>
            <div class="menu_pic">
              <div class="bg-cruise"></div>
            </div>
            <div class="menu_text">
              <h3>豪华招待游</h3>
              <div>上百款游戏，不用花钱照样玩!</div>
            </div>
            <a href="#tour"> <span class="link-spanner"></span>
            </a>
          </li>-->
        </ul>
      </div>
    </div>

    <div class="info_content">
      <div class="wp">
        <div id="member" class="title" style="margin-top: 0;">
          <i class="bg-bcrown_icon"></i>成为奇幻城VIP
        </div>
        <div class="member_container">
          <table class="member_table">
            <thead>
              <tr>
                <th>VIP等级</th>
                <th>晋级条件</th>
                <th>保级要求</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_1"></i> -->
                  <img class="vipImg" src="/static/images/level/1.png" alt>
                  忠实VIP
                </td>
                <td class="row_2">
                  <div>A.所有平台月投注额45万</div>
                  <div>B.所有老虎机月累计投注额月投注额10万</div>
                </td>
                <td class="row_3" rowspan="6">
                  <div>
                    <div>无需要求</div>
                    <div>永久有效</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_2"></i> -->
                  <img class="vipImg" src="/static/images/level/2.png" alt>
                  星级VIP
                </td>
                <td class="row_2">
                  <div>A.所有平台月投注额100万</div>
                  <div>B.所有老虎机月累计投注额月投注额60万</div>
                </td>
              </tr>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_4"></i> -->
                  <img class="vipImg" src="/static/images/level/3.png" alt>
                  黄金VIP
                </td>
                <td class="row_2">
                  <div>A.所有平台月投注额300万</div>
                  <div>B.所有老虎机月累计投注额月投注额180万</div>
                </td>
              </tr>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_3"></i> -->
                  <img class="vipImg" src="/static/images/level/4.png" alt>
                  白金VIP
                </td>
                <td class="row_2">
                  <div>A.所有平台月投注额500万</div>
                  <div>B.所有老虎机月累计投注额月投注额300万</div>
                </td>
              </tr>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_5"></i> -->
                  <img class="vipImg" src="/static/images/level/5.png" alt>
                  钻石VIP
                </td>
                <td class="row_2">
                  <div>A.所有平台月投注额800万</div>
                  <div>B.所有老虎机月累计投注额月投注额500万</div>
                </td>
              </tr>
              <tr>
                <td class="row_1">
                  <!-- <i class="bg-vip_6"></i> -->
                  <img class="vipImg" src="/static/images/level/6.png" alt>
                  菁英VIP
                </td>
                <td class="row_2">
                  <div>特邀玩家</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div id="privilege" class="title li2">
          <i class="bg-gcrown_icon"></i>享受尊爵特权
        </div>

        <div class="privilege_container">
          <table class="privilege_table">
            <thead>
              <tr>
                <th style="border: none"></th>
                <th>忠实VIP</th>
                <th>星级VIP</th>
                <th>黄金VIP</th>
                <th>白金VIP</th>
                <th>钻石VIP</th>
                <th>菁英VIP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="row_1">
                  <i class="bg-chips"></i>每月免费筹码
                </td>
                <td>8元</td>
                <td>38元</td>
                <td>88元</td>
                <td>188元</td>
                <td>588元</td>
                <td>1288元</td>
              </tr>
              <tr>
                <td class="row_1">
                  <i class="bg-birth"></i>生日礼金
                </td>
                <td>88元</td>
                <td>188元</td>
                <td>888元</td>
                <td>1888元</td>
                <td>2888元</td>
                <td>8888元</td>
              </tr>
              <tr>
                <td class="row_1">
                  <i class="bg-levelup"></i>晋级礼金
                </td>
                <td>88元</td>
                <td>188元</td>
                <td>588元</td>
                <td>888元</td>
                <td>2888元</td>
                <td>6888元</td>
              </tr>
              <tr>
                <td class="row_1">
                  <i class="bg-return"></i>反水上限
                </td>
                <td>28888元</td>
                <td>28888元</td>
                <td>28888元</td>
                <td>128888元</td>
                <td>128888元</td>
                <td>128888元</td>
              </tr>
              <tr>
                <td class="row_1">
                  <i class="bg-festival"></i>节日彩金
                </td>
                <td>
                  <i class="bg-error"></i>
                </td>
                <td>
                  <i class="bg-correct"></i>
                </td>
                <td>
                  <i class="bg-correct"></i>
                </td>
                <td>
                  <i class="bg-correct"></i>
                </td>
                <td>
                  <i class="bg-correct"></i>
                </td>
                <td>
                  <i class="bg-correct"></i>
                </td>
              </tr>
              <!-- <tr>
                <td class="row_1"><i class="bg-cs"></i>专属客服</td>
                <td><i class="bg-correct"></i></td>
                <td><i class="bg-correct"></i></td>
                <td><i class="bg-correct"></i></td>
                <td><i class="bg-correct"></i></td>
                <td><i class="bg-correct"></i></td>
                <td><i class="bg-correct"></i></td>
              </tr>-->
            </tbody>
          </table>
        </div>
        <div class="privilege_container" style="margin-top: 20px">
          <table class="privilege_table">
            <thead>
              <tr>
                <th style="border: none" colspan="2">VIP特权说明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="row_2">
                  <i class="bg-chips"></i>每月免费筹码
                </td>
                <td class="row_3 require-container">奇幻城VIP免费筹码将在每月【1-5日】系统晋级结束之后统一派发
                  <ul class="require">
                    <li>会员等级</li>
                    <li>每月存款要求</li>
                    <li>忠实VIP</li>
                    <li>100</li>
                    <li>星级VIP</li>
                    <li>300</li>
                    <li>黄金VIP</li>
                    <li>500</li>
                    <li>白金VIP</li>
                    <li>700</li>
                    <li>钻石VIP</li>
                    <li>900</li>
                    <li>菁英VIP</li>
                    <li>1500</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td class="row_2">
                  <i class="bg-birth"></i>生日礼金
                </td>
                <td class="row_3">奇幻城VIP
                  <span style="color:#ea5048">生日当天</span>可以直接到【会员中心】- 【自助优惠】- 【生日礼金】自助申请！
                </td>
              </tr>
              <tr>
                <td class="row_2">
                  <i class="bg-levelup"></i>晋级礼金
                </td>
                <td class="row_3">会员自助/系统晋级成功，系统将会将礼金派发到【副账户】</td>
              </tr>
              <tr>
                <td class="row_2">
                  <i class="bg-festival"></i>节日彩金
                </td>
                <td class="row_3">奇幻城国际将根据不同节日不定期举办活动来派发节日彩金</td>
              </tr>
              <!-- <tr>
                <td class="row_2"><i class="bg-cs"></i>专属客服</td>
                <td class="row_3">提供VIP专属服务、专属优惠和个别咨询通道; VIP会员可向在线客服咨询专员联系方式</td>
              </tr>-->
            </tbody>
          </table>
        </div>

        <!-- tour_intro end -->
        <div class="tips">
          <div>温馨提示:</div>
          <p>1.每个月5号系统自动审核进行升级；系统以晋级条件中的A、B来进行升级。</p>
          <p>2.会员有达到晋级条件中的A或B，可以进入“ 会员中心”--“自助晋级”自行操作。</p>
          <p>3.会员每个月只享有一次晋级的机会， 且各等级晋级礼金每位玩家只可以获得一次。</p>
          <p>4.若会员跳级升级，晋级礼金按照当前晋级等级为主。例如会员由新会员晋级为星级VIP，仅可领取星级VIP之晋级礼金。</p>
          <p>5.当月自助晋级之后，下个月系统晋级审核时将不再计算上个月的投注额。</p>
          <p>6.奇幻城国际拥有最终解释权和裁决权。</p>
        </div>
      </div>
      <!-- wp end -->
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data";
import { scrolltool } from "@/vue-extend/scrolltool";
export default {
  mixins: [scrolltool],
  data() {
    return {
      index: 1,
      SETTING,
      offsetY: 0
    };
  },
  methods: {
    scrollTop(val) {
      if (val == 1) {
        this.offsetY = document.querySelector(".li1").offsetTop;
      } else {
        this.offsetY = document.querySelector(".li2").offsetTop;
      }
      this.scrollTo(this.offsetY);
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100% !important;
}

.wp {
  width: 1200px;
  margin: 0 auto;
}

.vip_menu {
  height: 122px;
  padding-top: 20px;

  .menu_pic {
    float: left;
    padding: 10px 10px;
    border: 1px solid #c9c9c9;
    border-radius: 19px;
  }

  ul {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    li {
      width: 50%;
      height: 100%;
      vertical-align: top;
      font-size: 14px;
      letter-spacing: normal;
      word-spacing: normal;
      zoom: 1;
      position: relative;
      display: flex;
      justify-content: center;
      border-bottom: 4px solid transparent;
      align-items: center;
      cursor: pointer;
      &:hover {
        border-bottom: 4px solid red;
      }
    }
  }

  .bg-blue_crown {
    width: 61px;
    height: 63px;
    background: url(./images/vip_sprites.png) -10px -10px;
  }
}

.bg-gold_crown {
  width: 64px;
  height: 63px;
  background: url(./images/vip_sprites.png) -10px -86px;
}

.bg-cruise {
  width: 67px;
  height: 63px;
  background: url(./images/vip_sprites.png) -91px -4px;
}

.vip_menu .menu_text {
  padding: 14px 0 0 20px;
  overflow: auto;

  h3 {
    margin-bottom: 5px;
    color: #000;
    font-size: 18px;
  }
}

.info_content {
  padding-top: 50px;
  background: url(./images/info_bg.jpg);

  .title {
    margin: 57px 0 27px;
    font-size: 24px;
    color: #000;
  }

  i {
    display: inline-block;
    vertical-align: bottom;
  }

  .bg-bcrown_icon {
    width: 40px;
    height: 40px;
    margin-right: 12px;
    background: url(./images/vip_sprites.png) -245px -10px;
  }

  .member_container {
    background: #fff;
  }

  .member_table {
    width: 100%;
    font-size: 15px;

    thead tr {
      color: #fff;
      background: #4db7f4;
      line-height: 52px;

      :nth-child(2) {
        border-left: 1px solid #907053;
        border-right: 1px solid #907053;
      }
    }

    tbody {
      color: #000;
    }

    .row_1 {
      width: 20%;
      border: 1px solid #c9c9c9;
      text-align: center;
      padding: 12px 0;

      i {
        vertical-align: middle;
        margin-right: 6px;
      }
    }
  }

  .privilege_table .row_1 i {
    vertical-align: middle;
    margin-right: 6px;
  }

  .member_table {
    .row_2 {
      width: 50%;
      padding: 14px 0 14px 29px;
      text-align: left;
      border: 1px solid #c9c9c9;
    }

    .row_3 {
      width: 30%;
      text-align: center;
      border: 1px solid #c9c9c9;
    }
  }

  .member_container .tips {
    padding: 28px 0 28px 65px;
    text-align: left;
    color: #8e8e8d;
    line-height: 28px;

    div {
      color: #000;
    }
  }

  .privilege_container {
    background: #fff;
    font-size: 15px;

    .pt-ten {
      padding-top: 10px;
    }

    .privilege_table {
      thead th {
        width: 14%;
        background: #4db7f4;
        color: #fff;
        border-left: 1px solid #907053;
        line-height: 52px;

        &:nth-child(1) {
          width: 15%;
          min-width: 259px;
        }
      }

      tbody {
        tr {
          height: 50px;
        }

        :nth-child(5) td div {
          overflow: auto;
        }

        td {
          border: 1px solid #c9c9c9;
          /*border-left: 1px solid #c9c9c9;*/
          /*border-right: 1px solid #c9c9c9;*/
          text-align: center;
        }

        > :nth-child(even) {
          background: #fffaf6;
        }
      }

      width: 100%;

      .row_1 {
        padding-left: 20px;
        text-align: left;
      }

      .row_2 {
        width: 30%;
        text-align: left;
        padding-left: 10%;
      }

      .row_3 {
        text-align: left;
        padding-left: 2%;

        &.require-container {
          text-align: center;
        }

        .require {
          display: flex;
          flex-wrap: wrap;
          width: 70%;
          margin: 5px auto;
          border-top: 1px solid #ddd;
          border-right: 1px solid #ddd;

          li {
            width: 50%;
            height: 30px;
            line-height: 30px;
            border-left: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            text-align: center;
          }
        }
      }
    }

    .privilege_table2 {
      width: 80% !important;

      tr {
        height: 40px !important;
      }
    }
  }

  .member_table {
    .vipImg {
      height: 60px;
    }
    .bg-vip_1 {
      width: 40px;
      height: 39px;
      background: url(./images/vip_sprites.png) -245px -70px;
    }

    .bg-vip_2 {
      width: 41px;
      height: 39px;
      background: url(./images/vip_sprites.png) -72px -158px;
    }

    .bg-vip_3 {
      width: 42px;
      height: 39px;
      background: url(./images/vip_sprites.png) -178px -67px;
    }

    .bg-vip_4 {
      width: 42px;
      height: 39px;
      background: url(./images/vip_sprites.png) -10px -158px;
    }

    .bg-vip_5 {
      width: 47px;
      height: 39px;
      background: url(./images/vip_sprites.png) -94px -93px;
    }

    .bg-vip_6 {
      width: 47px;
      height: 37px;
      background: url(./images/vip_sprites.png) -178px -10px;
    }
  }

  .bg-gcrown_icon {
    width: 38px;
    height: 30px;
    margin-right: 12px;
    background: url(./images/vip_sprites.png) -124px -223px;
  }

  .bg-chips {
    width: 38px;
    height: 30px;
    background: url(./images/vip_sprites.png) -305px -163px;
  }

  .bg-birth {
    width: 38px;
    height: 38px;
    background: url(./images/vip_sprites.png) -245px -129px;
  }

  .bg-levelup {
    width: 38px;
    height: 30px;
    background: url(./images/vip_sprites.png) -10px -217px;
  }

  .bg-return {
    width: 38px;
    height: 30px;
    background: url(./images/vip_sprites.png) -305px -62px;
  }

  .bg-savepromo {
    width: 38px;
    height: 32px;
    float: left;
    background: url(./images/vip_sprites.png) -305px -10px;
  }

  .bg-tour {
    width: 38px;
    height: 31px;
    background: url(./images/vip_sprites.png) -305px -112px;
  }

  .bg-festival {
    width: 38px;
    height: 30px;
    background: url(./images/vip_sprites.png) -305px -213px;
  }

  .bg-gifts {
    width: 38px;
    height: 32px;
    background: url(./images/vip_sprites1.png) -251px -215px;
  }

  .bg-integral {
    width: 38px;
    height: 32px;
    background: url(./images/vip_sprites1.png) -246px -180px;
  }

  .bg-cs {
    width: 38px;
    height: 30px;
    background: url(./images/vip_sprites.png) -68px -217px;
  }

  .bg-correct {
    width: 20px;
    height: 20px;
    background: url(./images/vip_sprites.png) -182px -217px;
  }

  .bg-error {
    width: 20px;
    height: 20px;
    background: url(./images/vip_sprites.png) -195px -158px;
  }

  .bg-cruise_icon {
    width: 42px;
    height: 36px;
    margin-right: 12px;
    background: url(./images/vip_sprites.png) -133px -160px;
  }

  .bg-return2 {
    width: 36px;
    height: 36px;
    background: url(./images/return2.png) no-repeat center;
    position: relative;
    right: 5px;
  }
}

.center-wallet-text {
  font-size: 13px;
  color: red;
  padding-bottom: 10px;
}

.tour_intro .box {
  width: 585px;
  height: 235px;
  margin-bottom: 30px;
  background: #fff;
  text-align: center;
  padding: 5px 5px 0;
  transition: background 0.8s, color 0.8s;
  background: #fff;

  &.fullbox {
    width: 1200px;
    text-align: center;
  }
}

.slide_show {
  margin-bottom: 30px;

  .btn_container {
    display: block;
    position: absolute;
    width: 50px;
    height: 114px;
    z-index: 5;
    top: 50%;
    transform: translateY(-50%);
    background: #4db7f4;

    button {
      width: 100%;
      color: #fff;
      background: none;
      font-size: 54px;
      line-height: 114px;
    }

    &:hover {
      background: #fd4747;
    }
  }
}

.tour_intro {
  .pic {
    width: 100%;
    height: 192px;
    position: relative;
    overflow: hidden;
  }

  .pic_block {
    width: 100%;
    height: 100%;
    padding: 28px 0 15px 50px;
    position: absolute;
    top: -100%;
    background: rgba(0, 0, 0, 0.5);
    text-align: left;
    transition: top 0.8s;

    span {
      width: 24px;
      height: 24px;
      margin: 0 5px 8px 0;
      display: inline-block;
      border-radius: 99em;
      line-height: 24px;
      background: #fd4747;
      text-align: center;
    }
  }

  .box {
    &:hover {
      .pic_block {
        top: 0;
        transition: top 0.8s;
      }

      background: #fd4747;
      color: #fff;
      transition: background 0.8s, color 0.8s;
    }

    p {
      line-height: 38px;
    }
  }

  .pic {
    &.cruise_tour {
      background: url(./images/cruise_tour.jpg) no-repeat center;
    }

    &.malay {
      background: url(./images/malaysian.jpg) no-repeat center;
    }

    &.palawan {
      background: url(./images/palawan.jpg) no-repeat center;
    }

    &.cebu {
      background: url(./images/cebu.jpg) no-repeat center;
    }

    &.star_cruises {
      background: url(./images/star_cruises.jpg) no-repeat center;
    }
  }
}

.info_content .tips {
  padding-bottom: 30px;
  color: #8e8e8d;
  line-height: 28px;
  color: #8e8e8d;
}
.inblock_fix {
  letter-spacing: -4px;
  font-size: 0;
}
th {
  text-align: center;
}
table {
  border-collapse: collapse;
}
</style>
