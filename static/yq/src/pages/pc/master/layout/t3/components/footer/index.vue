<template>
  <!--底部内容-->
  <div id="footer-bg" class="cfx">
    <div class="footer">
      <div class="footer_advantage">
        <div class="wp cfx">
          <div class="advan_box">
            <div class="bg_box">
              <div class="bg-demo"></div>
            </div>
            <div class="advan_text">
              <div>试玩体验</div>
              <div>上百款游戏，不用花钱照样玩!</div>
            </div>
          </div>
          <div class="advan_box">
            <div class="bg_box">
              <div class="bg-deposit"></div>
            </div>
            <div class="advan_text">
              <div>存款平均到帐速度</div>
              <div class="time_text">
                <span class="counter minute">{{depositMin}}分</span>
                <span class="counter second">{{depositSec}}秒</span>
              </div>
            </div>
          </div>
          <div class="advan_box last_item">
            <div class="bg_box">
              <div class="bg-withdraw"></div>
            </div>
            <div class="advan_text">
              <div>取款平均到帐速度</div>
              <div class="time_text">
                <span class="counter minutetwo">{{drawmoneyMin}}分</span>
                <span class="counter secondtwo">{{drawmoneySec}}秒</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="foot_links cfx">
        <div class="wp">
          <a href="/static/page/newTutorial/index.html">新手指南</a>
          <router-link class="clickable" :to="{name:'aboutIndex',params:{tab:'tab6'}}">免责声明</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab2'}}">用户协议</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab1'}}">关于我们</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab4'}}">隐私保护</router-link>
          <a
            href="javascript:;"
            onclick="alert('[提示]开始进行缓存清除，完毕后将会刷新网站！');window.location.reload(true);"
          >清除缓存</a>
          <router-link :to="{name:'agentarea'}" target="_blank">合作代理</router-link>
        </div>
      </div>

      <div class="platform">
        <div class="wp">
          <div>
            <div>合作伙伴:</div>
            <ul style="height: auto;overflow: auto;">
              <li>
                <a class="bg-dc_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-dt_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-pt_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-mg_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-pg_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-ag_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-qt_logo" href="javascript:void(0)"></a>
              </li>
              <!-- <li>
                <a class="bg-ne_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-et_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-n2_logo" href="javascript:void(0)"></a>
              </li>-->
              <li>
                <a class="bg-ebet_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-sb_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-sky_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-vr_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-kyqp_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-sunbet_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-fanya_logo" href="javascript:void(0)"></a>
              </li>
              <!-- <li>
                <a class="bg-mglive_logo" href="javascript:void(0)"></a>
              </li>-->
              <li>
                <a class="bg-cq9_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-pgs_logo" href="javascript:void(0)"></a>
              </li>
            </ul>
          </div>

          <div>
            <div>监管机构:</div>
            <ul style="height: auto;overflow: auto;">
              <li @click="licenseShow = true">
                <a
                  class="bg-pagcor_logo clickable"
                  href="javascript:void(0)"
                  data-load-remote="/tpl/modal/license.jsp"
                ></a>
              </li>
              <li>
                <a class="bg-18_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-tst_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-chrome_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-ff_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-ie_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-safari_logo" href="javascript:void(0)"></a>
              </li>
              <li>
                <a class="bg-flash_logo" href="javascript:void(0)"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="copyright">
        <div class="wp">
          <div>
            奇幻城国际持有菲律宾 PAGCOR合法博彩执照&nbsp;&nbsp;版权为奇幻城国际所有&nbsp;&nbsp;PT游戏是由PT TransPacific在的授权下部署&nbsp;
            <img
              src="./images/pagcor_xs.png"
              class="clickable"
              data-load-remote="/tpl/modal/license.jsp"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="license" v-if="false">
      <div>
        <div class="l-head">
          <h3>牌照展示</h3>
          <h3>License Show</h3>
          <span class="close"></span>
        </div>
        <div class="l-content">
          <div class="text">千赢国际持有菲律宾 PAGCOR 合法博彩执照</div>
          <div class="text">如欲查阅更多关于菲律宾PAGCOR资讯，请进入</div>
          <a
            href="http://www.pagcor.ph/contact-us.php"
            target="_blank"
            class="link"
          >http://www.pagcor.ph/contact-us.php</a>
          <div class="pic">
            <img src="./images/license.jpg">
          </div>
          <div>
            <a href="./images/license.jpg" target="_blank">
              <img src="./images/zoom.png">点击放大牌照
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="licenseShow" v-show="licenseShow">
      <div class="licenseImg">
        <div class="btn-close" @click="licenseShow = false">X</div>
        <img src="./images/i1.png" alt>
        <img src="./images/i2.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
import { WEBCONFIG, SETTING } from "@/assets/data";
export default {
  data() {
    return {
      WEBCONFIG,
      SETTING,
      depositMin: null,
      depositSec: null,
      drawmoneyMin: null,
      drawmoneySec: null,
      licenseShow: false
    };
  },
  props: {},
  methods: {
    randomNum1() {
      this.depositMin = (Math.random() * 1).toFixed(0) * 1;
      let num = this.depositMin;
      let step = (this.depositMin * 16) / 2000;
      let start = 0;
      let old = 0;
      let $this = this;
      let interval = setInterval(function() {
        start = start + step;
        if (start >= num) {
          clearInterval(interval);
          interval = undefined;
          start = num;
        }
        let t = start.toFixed(0) * 1;
        if (t == old) {
          return;
        }
        old = t;
        $this.depositMin = old;
      }, 16);
    },
    randomNum2() {
      this.depositSec = (Math.random() * 60).toFixed(0) * 1;
      let num = this.depositSec;
      let step = (this.depositSec * 16) / 2000;
      let start = 0;
      let old = 0;
      let $this = this;
      let interval = setInterval(function() {
        start = start + step;
        if (start >= num) {
          clearInterval(interval);
          interval = undefined;
          start = num;
        }
        let t = start.toFixed(0) * 1;
        if (t == old) {
          return;
        }
        old = t;
        $this.depositSec = old;
      }, 16);
    },
    randomNum3() {
      this.drawmoneyMin = (Math.random() * 8 + 2).toFixed(0) * 1;
      let num = this.drawmoneyMin;
      let step = (this.drawmoneyMin * 16) / 2000;
      let start = 0;
      let old = 0;
      let $this = this;
      let interval = setInterval(function() {
        start = start + step;
        if (start >= num) {
          clearInterval(interval);
          interval = undefined;
          start = num;
        }
        let t = start.toFixed(0) * 1;
        if (t == old) {
          return;
        }
        old = t;
        $this.drawmoneyMin = old;
      }, 16);
    },
    randomNum4() {
      this.drawmoneySec = (Math.random() * 60).toFixed(0) * 1;
      let num = this.drawmoneySec;
      let step = (this.drawmoneySec * 16) / 2000;
      let start = 0;
      let old = 0;
      let $this = this;
      let interval = setInterval(function() {
        start = start + step;
        if (start >= num) {
          clearInterval(interval);
          interval = undefined;
          start = num;
        }
        let t = start.toFixed(0) * 1;
        if (t == old) {
          return;
        }
        old = t;
        $this.drawmoneySec = old;
      }, 16);
    }
  },
  computed: {},
  created() {
    this.randomNum1();
    this.randomNum2();
    this.randomNum3();
    this.randomNum4();
  },
  components: {}
};
</script>
<style lang="scss" scoped>
#footer-bg {
  .footer {
    .footer_advantage {
      height: 130px;
      padding-top: 28px;
      background: #fff;
      color: #000;

      .advan_box {
        width: 453px;
        float: left;

        .bg_box {
          width: 80px;
          height: 80px;
          float: left;
          padding: 17px 0 0 17px;
          margin-right: 10px;
          border: 1px solid #bdbdbd;
          border-radius: 15px;

          .bg-demo {
            width: 45px;
            height: 45px;
            background: url(./images/footer_sprites.png) -10px -1062px;
          }

          .bg-deposit {
            width: 46px;
            height: 45px;
            background: url(./images/footer_sprites.png) -10px -997px;
          }

          .bg-withdraw {
            width: 46px;
            height: 45px;
            background: url(./images/footer_sprites.png) -10px -1127px;
          }
        }

        .advan_text {
          height: 80px;
          padding-top: 16px;
          float: left;

          div {
            &:first-child {
              font-size: 18px;
            }
            &:last-child {
              color: #c7c7c7;
            }
          }

          .time_text {
            font-size: 18px;
            color: #ff6666;

            .counter {
              color: #ff6666;
            }
          }
        }
      }
      .last_item {
        width: 234px;
      }
    }
    .foot_links {
      height: 60px;
      text-align: center;
      color: #fff;
      background: #2c2d2e;
      border-top: 1px solid #232425;
      border-bottom: 1px solid #232425;
      a {
        margin: 0 20px;
        color: #fff;
        line-height: 60px;
      }
    }
    .platform {
      padding: 20px 0 10px 0;
      background: #2c2d2e;
      color: #fff;
      li {
        width: 130px;
        height: 45px;
        float: left;
        margin: 0 5px 10px;
        background: #282829;
        text-align: center;
        a {
          width: 130px;
          height: 45px;
          display: block;
          cursor: default;
        }
      }
      .bg-dc_logo {
        background: url(./images/footer_sprites.png) 22px -883px;
      }
      .bg-dt_logo {
        background: url(./images/dt_logo.png) no-repeat center;
      }
      .bg-pt_logo {
        background: url(./images/footer_sprites.png) -6px -386px;
      }
      .bg-mg_logo {
        background: url(./images/footer_sprites.png) -6px -830px;
      }
      .bg-pg_logo {
        background: url(./images/footer_sprites.png) 1px -577px;
      }
      .bg-ag_logo {
        background: url(./images/footer_sprites.png) 14px -479px;
      }
      .bg-qt_logo {
        background: url(./images/footer_sprites.png) -6px -341px;
      }
      .bg-ttg_logo {
        background: url(./images/footer_sprites.png) 0 -528px;
      }
      .bg-ne_logo {
        background: url(./images/footer_sprites.png) 4px -210px;
      }
      .bg-et_logo {
        background: url(./images/footer_sprites.png) -4px -779px;
      }
      .bg-n2_logo {
        background: url(./images/footer_sprites2.png) 16px 1px;
      }
      .bg-ebet_logo {
        background: url(./images/footer_sprites.png) 4px -208px;
      }
      .bg-sb_logo {
        background: url(./images/footer_sprites2.png) 19px -87px;
      }
      .bg-sky_logo {
        background: url(./images/sky-sw.png) no-repeat center;
      }
      .bg-vr_logo {
        background: url(./images/vr.png) no-repeat center;
      }
      .bg-kyqp_logo {
        background: url(./images/kyqp.png) no-repeat center;
      }
      .bg-sunbet_logo {
        background: url(./images/sunbet.png) no-repeat center;
      }
      .bg-pagcor_logo {
        background: url(./images/footer_sprites.png) 1px -84px;
      }
      .bg-18_logo {
        background: url(./images/footer_sprites.png) 41px -431px;
      }
      .bg-tst_logo {
        background: url(./images/footer_sprites.png) 22px -294px;
      }
      .bg-ff_logo {
        background: url(./images/footer_sprites.png) 11px -168px;
      }
      .bg-chrome_logo {
        background: url(./images/footer_sprites.png) 11px -42px;
      }
      .bg-ie_logo {
        background: url(./images/footer_sprites.png) -2px -253px;
      }
      .bg-safari_logo {
        background: url(./images/footer_sprites.png) 6px -126px;
      }
      .bg-flash_logo {
        background: url(./images/footer_sprites.png) 2px -1px;
      }
      .bg-fanya_logo {
        background: url(./images/fanya.png) no-repeat center;
      }
      .bg-mglive_logo {
        background: url(./images/mglive.png) no-repeat center;
      }
      .bg-cq9_logo {
        background: url(./images/cq9.png) no-repeat center;
      }
      .bg-pgs_logo {
        background: url(./images/pg.png) no-repeat center;
      }
    }
    .copyright {
      height: 60px;
      background: #1d1d1d;
      .wp div {
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 60px;
      }
      .bg-pagcor_xs {
        width: 69px;
        height: 15px;
        display: inline-block;
        background: url(./images/footer_sprites.png) -218px -256px;
      }
    }
  }
  .license {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    > div {
      width: 400px;
      border-radius: 6px;
      overflow: hidden;
    }
    .l-head {
      position: relative;
      padding: 10px 0;
      background: url(./images/modal-bg.png) no-repeat center top;
      h3 {
        width: 100%;
        line-height: 1.2;
        font-size: 28px;
        color: #fff;
        text-align: center;
        font-weight: normal;
      }
      .close {
        width: 60px;
        height: 60px;
        cursor: pointer;
        background: url(./images/X.png) no-repeat;
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 20px;
        margin-right: 20px;
        display: block;
      }
    }
    .l-content {
      background: #fff;
      font-size: 16px;
      text-align: center;
      line-height: 2;
      .text {
        color: #333333;
      }
      .link {
        color: #9e7c54;
      }
      .pic {
        img {
          width: 260px;
        }
      }
    }
  }
  .licenseShow {
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    text-align: center;
    &::before {
      content: "";
      height: 100%;
      display: inline-block;
      vertical-align: middle;
    }
    .licenseImg {
      position: relative;
      width: 800px;
      vertical-align: middle;
      height: 800px;
      display: inline-block;
      background: #e6e6e6;
      border-radius: 10px;
    }
    .btn-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      color: #4db7f4;
      height: 40px;
      line-height: 33px;
      text-align: center;
      width: 40px;
      font-size: 32px;
      // background: #868484  ;
      border: 4px solid #4db7f4;
    }
  }
}

.wp {
  width: 1200px;
  margin: 0 auto;
}

.clickable {
  cursor: pointer !important;
}

a {
  text-align: center;
  text-decoration: none;
  color: inherit;
}
</style>
