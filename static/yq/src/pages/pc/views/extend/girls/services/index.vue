<template>
  <div class="index-services">
    <div class="content">
      <div class="box">
        <p class="title">产品优势</p>
        <div class="wells">
          <div class="icos">
            <img src="./images/well1.png">
          </div>
          <div class="text">
            <p>线上真人娱乐</p>
            <p>美女荷官发牌，身临其境，百家齐乐</p>
          </div>
        </div>
        <div class="wells">
          <div class="icos">
            <img src="./images/well2.png">
          </div>
          <div class="text">
            <p>深海捕鱼</p>
            <p>享受不一样的体验，金币爆不停</p>
          </div>
        </div>
        <div class="wells">
          <div class="icos">
            <img src="./images/well3.png">
          </div>
          <div class="text">
            <p>千款老虎机</p>
            <p>多个平台任你选择，千万奖金等你爆</p>
          </div>
        </div>
      </div>
      <div class="box">
        <p class="title">产品优势</p>
        <div class="contact">
          <span class="icobjh bjh-service"></span>
          客服邮箱：{{SETTING.email}}
        </div>
        <div class="contact">
          <span class="icobjh bjh-tele"></span>
          投诉建议邮箱：{{SETTING.SuggessEmail}}
        </div>
        <div class="contact">
          <span class="icobjh bjh-wechat"></span>微信服务号二维码&nbsp;&nbsp;&nbsp;&nbsp;微信公众号二维码
        </div>
        <div class="c-code">
          <img v-lazy="'/static/images/wechat-service.jpg'">
          <img v-lazy="'/static/images/wechat.jpg'">
        </div>
      </div>
      <div class="box">
        <p class="title">服务优势</p>
        <p class="title2">24小时客服团队&nbsp;&nbsp;全年无休</p>
        <div class="times">
          <div class="text">
            <div>
              <p class="t-title">存款</p>
              <p>平均到账时间</p>
            </div>
            <div>
              <span class="t-sec">15</span>秒
            </div>
          </div>
          <div class="bar">
            <div class="b-color" style="width:12%"></div>
          </div>
        </div>
        <div class="times">
          <div class="text">
            <div>
              <p class="t-title">取款</p>
              <p>平均到账时间</p>
            </div>
            <div>
              <span class="t-sec">20</span>秒
            </div>
          </div>
          <div class="bar">
            <div class="b-color" style="width:20%"></div>
          </div>
        </div>
        <p class="tips">*以上存取款平均时间仅供参考。</p>
        <p class="tips">*银行维护期间除外，详情咨询在线客服。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { SETTING } from "@/assets/data/";
export default {
  name: "",
  data() {
    return {
      SETTING
    };
  }
};
</script>
<style lang="scss">
.index-services {
  background: #373738;
  padding: 20px;
  .content {
    display: flex;
    justify-content: space-between;
  }
  .box {
    .title {
      color: #ffdc93;
      font-size: 18px;
      line-height: 20px;
      position: relateive;
      margin-bottom: 20px;
      &:before {
        content: "";
        display: inline-block;
        width: 4px;
        height: 20px;
        border-radius: 4px;
        background: #ffdc93;
        vertical-align: middle;
        margin-right: 15px;
        // position:absolte;
      }
    }
  }
  .wells {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .icos {
      text-align: left;
      width: 95px;
      img {
        display: inline-block;
      }
    }
    .text {
      margin-left: 10px;
      color: #fff;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .contact {
    margin-bottom: 20px;
    .icobjh {
      color: #ffdc93;
      font-size: 30px;
      margin-right: 18px;
      vertical-align: middle;
    }
    color: #fff;
    font-size: 14px;
  }
  .c-code {
    text-align: left;
    padding-left: 50px;
    img {
      display: inline-block;
      width: 100px;
      height: 100px;
      background: #fff;
      border-radius: 6px;
      padding: 4px;
      margin: 0 5px;
    }
  }
  .title2 {
    color: #fff;
    font-size: 18px;
    margin-bottom: 30px;
  }
  .times {
    color: #fff;
    font-size: 14px;
    margin-bottom: 12px;
    .text {
      display: flex;
      .t-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .t-sec {
        color: #ffdc93;
        font-size: 44px;
      }
    }
    .bar {
      margin-top: 10px;
      background: #000;
      border-radius: 20em;
      overflow: hidden;
      height: 6px;
      .b-color {
        background: #ffdc93;
        height: 100%;
        border-radius: 20em;
        min-width: 10%;
      }
    }
  }
  .tips {
    color: #fff;
    font-size: 12px;
    line-height: 1.8;
  }
}
</style>
