<template>
  <div class="registerScucces">
    <div class="wp">
      <div class="reg_step">
        <ul>
          <li><i>1</i>会员登录</li>
          <li><i>2</i>注册申请</li>
          <li class="active"><i>3</i>注册成功</li>
          <li><i>4</i>忘记密码</li>
        </ul>
      </div>
      <div class="row">
        <div class="title-content">
          <div class="title-pic"><img src="./images/tips.png" alt=""></div>
          <div class="remind-title">
            <p>奇幻城国际反馈如下：<br>恭喜您，已经成为奇幻城国际会员！</p>
          </div>
        </div>
      </div>
      <div class="row clear">
        <div class="device-box">
          <p class="device-title">1.下载奇幻城APP掌握第一手优惠资讯，包括:安卓、苹果手机及平板电脑</p>
          <p class="device-img" style="margin-top: 40px;"><img src="./images/icon.png" alt=""></p>
        </div>
        <div class="device-box clear">
          <div class="fl"><img src="/static/images/base/qrcode.png" alt="" id="code-img"></div>
          <div class="fl device-content">
            <p class="device-title1">奇幻城国际APP</p>
            <p>①业界首创原生态APP</p>
            <p>②手机支付便捷，秒到帐</p>
            <p>③专属体验金注册即可申请</p>
            <p>④掌上游戏一手悠游</p>
          </div>
        </div>
      </div>
      <div class="row clear">
        <div class="yh-text">2.首存优惠80%</div>
        <div class="yh-text">▍ 领取请点击 ► ①会员中心 ► ②全民自助 ► ③自助存送</div>
      </div>
      <div class="row clear">
        <div class="yh-text">3.次存优惠，最高2,688</div>
        <div class="yh-text">▍ 领取请点击 ► ①会员中心 ► ②全民自助 ► ③自助存送</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }

</script>
<style lang="scss" scoped>
  .registerScucces {
    background: #fff;

    .wp {
      width: 1200px;
      margin: 0 auto;

      .reg_step {
        text-align: center;

        ul li {
          display: inline-block;
          margin-right: 30px;
          padding: 10px 0;
          font-weight: bold;
          color: black;
          text-align: center;
          margin-left: -7px;
          font-size: 14px;
          border-bottom: 2px solid transparent;

          &.active {
            border-bottom: 2px solid red;
          }

          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 18px;
            margin-right: 5px;
            text-align: center;
            border: 1px solid #939393;
            font-size: 16px;
            color: #939393;
          }
        }
      }

      .row {
        margin: 0 0 10px 0;
        padding: 10px 0 10px 30px;
        background: #ececeb;
        zoom: 1;

        &:last-child{
            margin: 0;
        }

        &::before {
          display: table;
          content: " ";
        }

        &::after {
          content: "";
          display: block;
          clear: both;
        }

        .title-content {
          text-align: center;

          .title-pic {
            display: inline-block;
            vertical-align: top;

            img {
              border: 0;
              vertical-align: middle;
            }
          }

          .remind-title {
            display: inline-block;
            margin: 10px 0 0 10px;
            text-align: left;
            color: #4db7f4;
          }
        }

        .device-box {
          width: 50%;
          float: left;
          text-align: center;

          .device-title {
            font-size: 16px;
            text-align: left;
          }

          .device-title1 {
            font-size: 18px;
          }

          .device-content {
            p {
              text-align: left;
              margin-left: 20px;
              line-height: 35px;
            }
          }
        }
      }
    }
  }

  .clear {
    zoom: 1;
    clear: none !important;

    &::before {
      display: table;
      content: " ";
    }

    &::after {
      content: "";
      display: block;
      clear: both;
    }
  }

  .fl {
    float: left;
  }

  .yh-text {
    width: 50%;
    float: left;
    line-height: 50px;
  }

</style>
