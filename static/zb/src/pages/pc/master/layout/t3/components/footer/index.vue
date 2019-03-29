<template>
  <!--底部内容-->
  <div class="footer">
    <div class="footer-website">
      <div class="content-warp">
        <div class="row tutorial-links">
          <router-link :to="{name:'aboutIndex',params:{tab:'tab1'}}" class="bdnone">关于我们</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab4'}}">博彩责任</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab3'}}">隐私政策</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab6'}}">联系我们</router-link>
          <router-link :to="{name:'aboutIndex',params:{tab:'tab21'}}">帮助中心</router-link>
        </div>
      </div>
    </div>
    <div class="footer-btm">
      <div class="content txt-center footerimg" style="width: 1230px;">
        <img src="./images/ag1.png" alt>
        <img src="./images/pt1.png" alt>
        <img src="./images/mg1.png" alt>
        <img src="./images/sunbet1.png" alt>
        <img src="./images/bbin1.png" alt>
        <img src="./images/ig1.png" alt>
        <img src="./images/og1.png" alt>
        <img src="./images/fanya1.png" alt>
        <img src="./images/kyqp.png" alt>
        <img src="./images/sb1.png" alt>
      </div>
      <div class="footer-tips">
        <div class="fr tips-r">
          推荐浏览器
          <a href="https://www.google.com/intl/zh-CN_ALL/chrome/" target="_blank">
            <img src="./images/c1s.png">
          </a>
          <a href="https://www.mozilla.org/zh-CN/firefox/new/" target="_blank">
            <img src="./images/c2s.png">
          </a>
          <a href="https://www.apple.com/cn/safari/" target="_blank">
            <img src="./images/c3s.png">
          </a>
          <a
            href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads"
            target="_blank"
          >
            <img src="./images/c4s.png">
          </a>
        </div>
      </div>
      <p class="p">众博娛樂所提供的产品和服务，是由澳门特别行政区 The Macao Special Administrative Region.授权和监管。选择我们，您将拥有最可靠的资金保障和优质的服务。</p>
      <p class="p" style="padding-bottom: 40px;">Copyright © 众博娛樂 reserved</p>
    </div>
  </div>
</template>
<script>
import { WEBCONFIG } from "@/assets/data";
export default {
  data() {
    return {
      WEBCONFIG
    };
  },
  props: {},
  methods: {},
  computed: {},
  created() {},
  components: {}
};
</script>
<style lang="scss" scoped>
.footer {
  background: #0d1012;
  .footer-website {
    text-align: center;
    height: 79px;
    line-height: 79px;
    color: #fff;
    border-bottom: 2px solid #2c2c30;
  }
  .footer-website a {
    color: #3ec1fe;
    font-size: 14px;
    padding: 0 40px;
    border-left: #3ec1fe solid 1px;
  }
  .footer-website a.bdnone {
    border: none;
  }
  .footer-website img {
    margin-top: -5px;
    width: 94px;
  }
  .footer-btm {
    padding-top: 10px;
  }
  .footer-btm .p{
    color: #f55151;
    text-align: center
  }
  .friend-link {
    text-align: center;
    line-height: 87px;
  }
  .friend-link a {
    margin: 0 5px;
  }
  .footer-tips {
    color: #3ec1fe;
    line-height: 31px;
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0 0px 0px;
  }
  .footer-tips .tips-r{
    margin-top: -62px;
  }
  .footer-tips p {
    display: inline-block;
  }
  .footer-contact {
    height: 66px;
    line-height: 66px;
    background: #19191c;
    a {
      display: inline-block;
      text-align: center;
      padding: 0 10px 0 40px;
      margin-left: 30px;
      color: #868c97;
      position: relative;
      &:first-child {
        margin-left: 0;
      }

      strong {
        color: #968e64;
      }
    }
  }
}

.footerimg {
  img {
    margin-bottom: 10px;
    height: 45px;
  }
}
</style>
