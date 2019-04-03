<template>
  <div class="download-content">
    <div class="download-item" :class="{active:cur == 'app'}">
      <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo"><img src="./images/app.jpg" alt=""></div>
          <div class="item-demo-context">奇幻城APP下载</div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">下载方式1：</p>
            <p class="ways-text">使用手机浏览器输入下载地址</p>
            <input class="ways-code ways-url" readonly type="text" :value="Download.app">
            <a href="javascript:void(0);"
            v-clipboard:copy="Download.app"
            v-clipboard:success="onCopy">点击复制</a>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">下载方式2:</p>
            <p class="ways-text">使用扫码软件进行扫描 </p>
            <div class="ways-code">
              <div class="app-container app-container1">
                <!-- <img :src="generateQRCode(Download.app)" alt=""><br>APP -->
                <img src="/static/images/base/qrcode.png" alt=""><br>APP
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">奇幻城国际app支持 :</p>
            <p class="ways-text">完美支持安卓版/IOS版</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon1.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo">
            <img src="./images/dt-demo.jpg" alt="">
          </div>
          <div class="item-demo-context">
            DT老虎机
          </div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">二维码扫描下载：</p>
            <p class="ways-text">使用扫码软件进行扫描</p>
            <div class="ways-code">
              <div class="app-container app-container1"><img :src="generateQRCode(Download.dtIos)" alt=""><br>DT苹果APP
              </div>
              <div class="app-container"><img :src="generateQRCode(Download.dtAndroid)" alt=""><br>DT安卓APP
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">DT老虎机APP支持：</p>
            <p class="ways-text">完美支持安卓版/IOS版</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon1.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo">
            <img src="./images/pt-demo.jpg" alt="">
            <div class="item-demo-context">
              PT老虎机
            </div>
          </div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">二维码扫描下载：</p>
            <p class="ways-text">使用扫码软件进行扫描</p>
            <div class="ways-code">
              <div class="app-container app-container1"><img :src="generateQRCode(Download.ptMobile)" alt=""><br>PT安卓APP
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">PT游戏客户端下载： </p>
            <p class="ways-text">登录客户端请在账号前加<span>大写{{WEBCONFIG.PtBefore}}</span></p>
            <div class="ways-code">
              <div class="app-container app-container1">
                <div class="app-down app-down-bgcolor1"><a :href="Download.ptpc"><i></i>下载点一</a></div>

              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">PT老虎机支持：</p>
            <p class="ways-text">完美支持安卓版/PC客户端</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon2.png" alt=""></div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo">
            <img src="./images/pt2-demo.jpg" alt="">
            <div class="item-demo-context">
              PT国际版
            </div>
          </div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">二维码扫描下载：</p>
            <p class="ways-text">使用扫码软件进行扫描</p>
            <div class="ways-code">
              <div class="app-container app-container1"><img :src="generateQRCode(Download.pt2Mobile)" alt=""><br>PT国际版安卓APP
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">PT国际版游戏客户端下载： </p>
            <p class="ways-text">登录客户端请在账号前加<span>大写{{WEBCONFIG.PtBefore}}</span></p>
            <div class="ways-code">
              <div class="app-container app-container1">
                <div class="app-down app-down-bgcolor1"><a :href="Download.pt2pc"><i></i>下载点一</a></div>
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">PT国际版支持：</p>
            <p class="ways-text">完美支持安卓版/PC客户端</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon2.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo">
            <img src="./images/ag-demo.jpg" alt="">
          </div>
          <div class="item-demo-context">
            AG真人
          </div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">下载方式1:</p>
            <p class="ways-text">使用手机浏览器输入下载地址</p>
            <input class="ways-code ways-url" readonly type="text" :value="Download.agMobile">
            <a href="javascript:void(0);"
            v-clipboard:copy="Download.agMobile"
            v-clipboard:success="onCopy">点击复制</a>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">下载方式2:</p>
            <p class="ways-text">使用扫码软件进行扫描 </p>
            <div class="ways-code">
              <div class="app-container app-container1"><img :src="generateQRCode(Download.agMobile)" alt=""><br>安卓APP
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">奇幻城国际app支持 :</p>
            <p class="ways-text">完美支持安卓版</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon3.png" alt="" style="width:65px!important;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="item-row">
        <div class="item-col-2">
          <div class="item-demo-logo">
            <img src="./images/agfish-demo.jpg" alt="">
          </div>
          <div class="item-demo-context">
            AG捕鱼王
          </div>
        </div>
        <div class="item-col-4">
          <div class="download-ways">
            <p class="ways-title">下载方式1:</p>
            <p class="ways-text">使用手机浏览器输入下载地址</p>
            <input class="ways-code ways-url" readonly type="text" :value="Download.ag">
            <a href="javascript:void(0);"
            v-clipboard:copy="Download.ag"
            v-clipboard:success="onCopy">点击复制</a>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">下载方式2:</p>
            <p class="ways-text">使用扫码软件进行扫描 </p>
            <div class="ways-code">
              <div class="app-container app-container1">
                <img :src="generateQRCode(Download.ag)" alt="">
                <br>
                安卓APP
              </div>
              <div class="app-container">
              </div>
            </div>
          </div>
        </div>
        <div class="item-col-3">
          <div class="download-ways">
            <p class="ways-title">奇幻城国际app支持 :</p>
            <p class="ways-text">完美支持安卓版</p>
            <div class="ways-code">
              <div class="app-container"><img src="./images/icon3.png" alt="" style="width:65px!important;"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="download-item " :class="{active:cur == 'tool'}">
      <div class="item-row item-row-height row">
        <div class="col-xs-3 line">
          <div class="browser-download">
            <img src="./images/chrome.png" alt="">
          </div>
          <div class="browser-download">
            <a href="https://app.sjltech.cn/down/ChromeSetup.exe">谷歌浏览器下载</a>
          </div>
        </div>

        <div class="col-xs-3 line">
          <div class="browser-download">
            <img src="./images/firefox.png" alt="">
          </div>
          <div class="browser-download">
            <a href="https://app.sjltech.cn/down/Firefox-latest.exe">火狐浏览器下载</a>
          </div>
        </div>

        <div class="col-xs-3 line">
          <div class="browser-download">
            <img src="./images/flash.png" alt="">
          </div>
          <div class="browser-download">

            <a href="https://app.sjltech.cn/down/flashplayer27pp_ga_install.exe">Flash Player下载</a>
          </div>
        </div>
      </div>

      <div class="item-row item-row-height row">
        <div class="col-xs-3 ">
          <div class="browser-download">
            <img src="./images/fly2.png" alt="">
          </div>
        </div>
        <div class="col-xs-5">
          <div class="pt-accelerator">
            <span>PT加速器下载</span>感觉太慢？立即下载加速器
            <a href="https://app.sjltech.cn/down/PT_VPN_v1.1.exe">立即下载</a>
          </div>
        </div>
        <div class="col-xs-4">
          <div class="browser-download">
            <img src="./images/fly.png" alt="">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  import {
    generateQRCode
  } from "@/api/show"
  import {
    SETTING,
    WEBCONFIG,
    Download
  } from "@/assets/data"
  export default {
    name: "",
    data() {
      return {
        SETTING,
        WEBCONFIG,
        Download,
        cur: "app",
        // data:['PT客户端','AG客户端']
      }
    },
    props: {},
    computed: {},
    watch: {},
    methods: {
      onCopy() {
        window.toast("复制成功");
      },
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      }
    },
    created() {
      this.generateQRCode("text")
      this.$bus.$on('getDownloadPage', eventData => {
        this.cur = eventData
      })
    },
    activated() {},
    components: {}
  }

</script>
<style lang="scss" scoped>
  .download-content {
    width: 1202px;
    margin: 30px auto 0;
    overflow: hidden;

    .download-item {
      display: none;

      &.active {
        display: block;
      }
    }
  }

  .download-item {
    .item-row {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 264px;
      margin-bottom: 30px;
      border: 1px solid #ccc;
      background: #fff;
    }

    .item-row-height {
      height: 200px;
      margin: 0 0 30px;
    }

    .item-row {
      .item-col-2 {
        float: left;
        width: 20%;
        height: 264px;
      }

      .item-col-3 {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
        width: 24%;
        height: 264px;
        padding-left: 30px;
      }
      .item-col-4 {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        float: left;
        width: 27.6%;
        height: 264px;
        padding-left: 30px;
      }
    }
  }

  .item-demo-logo {
    height: 214px;
  }

  .item-demo-context {
    height: 49px;
    line-height: 49px;
    background: #4db7f4;
    font-size: 18px;
    color: #fff;
    text-align: center;
  }

  .download-ways {
    margin-top: 25px;

    .ways-title {
      margin-bottom: 20px;
      font-size: 14px;
      color: #fd4747;
    }

    .ways-text {
      margin-bottom: 20px;
      font-size: 14px;
      color: #787876;

      span {
        color: #fd4747;
      }
    }

    .ways-code {
      font-size: 14px;
      overflow: hidden;
    }

    .ways-url {
      width: 80%;
      padding: 10px;
      color: #fd4747;
      background: #f5f1ee;
      border: 1px solid #4db7f4;
      display: inline-block;
    }

    .ways-code {
      .app-container {
        float: left;
        margin: 0 15px;
        text-align: center;
      }

      .app-container1 {
        margin-left: 0;
      }

      .app-container {
        img {
          margin-bottom: 5px;
          width: 118px;

          &.ebet {
            margin-bottom: 5px;
            width: 58px;
          }
        }

        .app-down {
          margin-bottom: 10px;

          a {
            display: block;
            width: 200px;
            height: 40px;
            line-height: 40px;
            color: #fff;
            font-size: 14px;
            background: #4db7f4;
            -webkit-transition: all .5s;
            -moz-transition: all .5s;
            -ms-transition: all .5s;
            -o-transition: all .5s;
            transition: all .5s;

            &:hover {
              background: #fd4747;
            }

            i {
              display: inline-block;
              width: 25px;
              height: 23px;
              vertical-align: middle;
              background: url(./images/down-icon.png) no-repeat center;
            }
          }
        }
      }
    }
  }

  .download-item .item-row {
    .line {
      height: 100%;
      border-right: 1px solid #ccc;
    }

    .browser-download {
      text-align: center;
      padding-top: 25px;
    }

    .pt-accelerator a,
    .browser-download a {
      display: inline-block;
      width: 128px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #fff;
      background: #4db7f4;
      border-radius: 5px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }

    .pt-accelerator a:hover,
    .browser-download a:hover {
      background: #fd4747;
    }

    .pt-accelerator {
      padding-top: 16%;
      font-size: 18px;
      color: #333;
      text-align: center;

      span {
        color: #fd4747;
      }
    }
  }

  .app-container .icon3 {
    background: url(./images/icon2.png) no-repeat right;
    background-size: 250%;
    width: 45px;
    display: inline-block;
    height: 45px;
  }
  [class*="col-"] {
      padding-right: 0px;
      padding-left: 0px;
      display: inline-block;
  }
  .col-xs-3{
    width: 25%;
    float: left;
  }
</style>
