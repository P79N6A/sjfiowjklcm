<template>
  <transition name="fade">
    <ul id="qy-service">
      <input type="hidden" value id="infoValueResult">

      <li>
        <div>
          <router-link :to="{name:'agentarea',params:{tab:'tab1'}}" target="_blank">
            <div class="text-center">
              <i class="cebianlan-sprite agent"></i>
              <p>代理合作</p>
            </div>
          </router-link>
        </div>
      </li>
      <li>
        <div>
          <router-link :to="{name:'vipIndex'}" target="_blank">
            <div class="text-center">
              <i class="cebianlan-sprite vip"></i>
              <p>VIP专区</p>
            </div>
          </router-link>
        </div>
      </li>
      <li>
        <div id="cs-live">
          <a :href="SETTING.live800" target="_blank">
            <div class="text-center">
              <i class="cebianlan-sprite cs"></i>
              <p>在线客服</p>
            </div>
          </a>
        </div>
      </li>
      <li>
        <a href="javascript:void(0);" id="phone_in" @click="showBackCall">
          <div class="text-center">
            <i class="cebianlan-sprite phone"></i>
            <p>电话回拨</p>
          </div>
        </a>
      </li>

      <!-- <li>
        <div id="cs-wechat">
          <div class="text-center">
            <i class="cebianlan-sprite wechat"></i>
            <p>微信客服</p>
          </div>

          <div class="shrink">
            <div class="text-center">
              <img src="/static/images/wechatQr/DEFAULT.png" style="width:100%;">
            </div>
          </div>
        </div>
      </li>-->
      <li>
        <div id="cs-wechat" @click="CusLink($event)">
          <div class="text-center">
            <i class="cebianlan-sprite qq"></i>
            <p>QQ客服</p>
          </div>
        </div>
      </li>
      <li>
        <div id="cs-mail">
          <div class="text-center">
            <i class="cebianlan-sprite mail"></i>
            <p>客服邮箱</p>
          </div>

          <div class="shrink">
            <p class="text-center">
              <a :href="'mailto:'+SETTING.email">
                <p>{{SETTING.email}}</p>
              </a>
              <a v-clipboard:copy="SETTING.email" v-clipboard:success="onCopy" class="send">点击复制</a>
            </p>
          </div>
        </div>
      </li>
      <li>
        <div id="cs-app">
          <router-link
            style="display:block;"
            :to="{name:'aboutIndex',params:{tab:'tab7'}}"
            class="text-center"
          >
            <i class="cebianlan-sprite app"></i>
            <p>防劫持APP</p>
          </router-link>
          <div class="shrink j-agent-download">
            <div class="text-center">
              <p>扫一扫下载奇幻城APP</p>
              <p>不仅“防劫持”</p>
              <p>还能天天领取朋友圈红包</p>
              <div class="qritem">
                <p>奇幻城APP</p>
                <img src="/static/images/base/qrcode.png" width="100%">
              </div>
              <router-link class="fjc" :to="{name:'aboutIndex',params:{tab:'tab7'}}"></router-link>
            </div>
            <div class="space-2"></div>
          </div>
        </div>
      </li>
      <li>
        <div id="cs-goTop" class="text-center" @click="backToTop">
          <i class="cebianlan-sprite top"></i>
          <p>一键置顶</p>
        </div>
      </li>
    </ul>
  </transition>
</template>
<script>
import { SETTING, Download } from "@/assets/data";
import check from "@/util/RegExp";
import { scrolltool } from "@/vue-extend/scrolltool";
import { backCall } from "@/controls/common/backCall";
import { generateQRCode } from "@/api/show";
export default {
  mixins: [scrolltool, backCall],
  name: "",
  data() {
    return {
      SETTING,
      showMyself: true,
      ishover: true,
      Download,
      hover: false,
      isshow: true
    };
  },
  methods: {
    onCopy() {
      window.toast("复制成功");
    },
    CusLink(el) {
      let url =
        "tencent://message/?uin=" +
        this.SETTING.qq +
        "\u0026Site=qq\u0026Menu=yes";
      // el.currentTarget.setAttribute("href", url);
      // let url = 'http://wpa.qq.com/msgrd?v=3&uin=' + this.SETTING.qq + '&site=qq&menu=yes'
      window.open(url);
    },
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    backToTop() {
      this.scrollTo(0);
    },
    registerIt() {
      this.$bus.$emit("showRegister", true);
    },
    showBackCall() {
      // 弹窗回拨
      this.$prompt("请输入手机号码", "电话回拨", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: check.phone,
        inputErrorMessage: "手机号码格式不正确"
      })
        .then(confirm => {
          // 提交弹窗
          this.backCall({
            phone: confirm.value
          })
            .then(res => {
              toast(res.message);
            })
            .catch(err => {
              toast(err.message);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#qy-service {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  z-index: 9000;
  /*overflow: hidden;*/
  right: 20px;
  li {
    position: relative;
    width: 75px;
    height: 60px;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #d6d6d6;
    &:hover {
      border: 1px solid #4db7f4;
    }
    .text-center {
      text-align: center;
      .send {
        display: flex;
        background: #4db7f4;
        color: #fff;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
      }
      .qritem {
        width: 150px;
        height: 188px;
        margin: 10px auto;
        border-radius: 5px;
        border: 1px solid #4db7f4;
        p {
          background: #4db7f4;
          color: #fff;
          height: 36px;
          line-height: 36px;
        }
        img {
          width: 100%;
        }
      }
      .fjc {
        background: url("./images/btn.png") no-repeat top center;
        background-size: contain;
        display: block;
        width: 150px;
        height: 40px;
        margin: 0 auto;
      }
    }
  }
}
.cebianlan-sprite {
  background: url("./images/cebianlan-sprite.png") no-repeat top left;
  width: 27px;
  height: 23px;
  display: inline-block;
  text-align: center;
  margin: 2px 0 -5px;
  &.app {
    background: url(./images/app.png) no-repeat center top;
    background-size: cover;
    width: 34px;
    height: 38px;
  }
  &.agent {
    background: url(./images/daili.png) no-repeat center top;
    background-size: cover;
    width: 40px;
    height: 37px;
  }
  &.cs {
    background: url(./images/kefu.png) no-repeat center top;
    background-size: cover;
    width: 34px;
    height: 41px;
  }
  &.mail {
    background: url(./images/mail.png) no-repeat center top;
    background-size: cover;
    width: 30px;
    height: 38px;
  }
  &.phone {
    background: url(./images/phone.png) no-repeat center top;
    background-size: cover;
    width: 40px;
    height: 32px;
    margin: 5px 0 0px;
  }
  &.qq {
    background: url(./images/qq.png) no-repeat center top;
    background-size: cover;
    width: 32px;
    height: 37px;
  }
  &.top {
    background: url(./images/top.png) no-repeat center top;
    background-size: cover;
    width: 37px;
    height: 40px;
  }
  &.vip {
    background: url(./images/vip.png) no-repeat center top;
    background-size: cover;
    width: 45px;
    height: 38px;
  }
  &.wechat {
    background: url(./images/wechat.png) no-repeat center top;
    background-size: cover;
    width: 46px;
    height: 38px;
  }
}
#qy-service li {
  .shrink {
    position: absolute;
    top: 0px;
    width: 150px;
    right: -220px;
  }
  #cs-wechat .shrink {
    top: -66px;
  }
  #cs-app .shrink {
    top: -165px;
    width: 200px;
  }
}

#cs-mail:hover .shrink,
#cs-app:hover .shrink,
#cs-wechat:hover .shrink {
  right: 80px;
  background: #fff;
  border: 2px solid #4db7f4;
  padding: 10px;
  min-height: 38px;
}

#cs-mail .shrink {
  line-height: 38px;
}
</style>
