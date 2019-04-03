<template>
  <div class="ysf-tech">
    <div class="ysf-content">
      <div class="ysf-show">
        <div v-if="index==0" class="tech-img">
          <p>
            <span class="tech-red">1</span> / 4 下载云闪付APP</p>
          <img src="./images/yun-01.jpg">
          <p>首次使用需下载云闪付APP， 扫描以上二维码即可下载</p>
        </div>
        <div v-if="index==1" class="tech-img">
          <p>
            <span class="tech-red">2</span> / 4 使用手机号验证轻松完成注册。</p>
          <img src="./images/yun-02.jpg">
          <p>填写手机号和验证码后，即可设置密码完成注册。</p>
        </div>
        <div v-if="index==2" class="tech-img">
          <p>
            <span class="tech-red">3</span> / 4 在云闪付APP内绑定银行卡</p>
          <img src="./images/yun-03.gif">
          <p>点击首页“立即添加您的银行卡”，录入银行卡号或拍卡识别，即可完成绑卡。</p>
        </div>
        <div v-if="index==3" class="tech-img">
          <p>
            <span class="tech-red">4</span> / 4 扫收款码支付</p>
          <img src="./images/yun-04.jpg">
          <p>点击首页“扫一扫”，扫描在官网获取的收款二维码，输入付款金额去支付。</p>
        </div>
        <div class="ysf-control cfx">
          <span class="fl" @click="control(false)">
            <img src="./images/control_left.png">
          </span>
          <span class="fr" @click="control(true)">
            <img src="./images/control_right.png">
          </span>
        </div>
      </div>
      <div class="btns">
        <span class="t_btn" @click="$bus.$emit('goOn',false)" >继续转账</span>
      </div>
    </div>

  </div>

</template>
<script>
  export default {
    data() {
      return {
        index: 0,
      };
    },
    methods: {
      control(isNext) {
        if (isNext) {
          if (this.index < 3) {
            this.index++;
          }
        } else {
          if (this.index > 0) {
            this.index--;
          }
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  @import "~mobile/assets/scss/mixin.scss";
  .ysf-tech {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    .ysf-content {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #fff;
      color: #333;
      .ysf-show {
        padding: r(20) r(80);
        position: relative;
        .tech-img {
          width: 90%;
          margin: 0 auto;
          .tech-red {
            color: red;
            font-size: 1.2em;
          }
          img {
            display: block;
            width: 100%;
          }
          p {
            margin: 10px 0;
          }

        }
        .ysf-control {
          position: absolute;
          width: 100%;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
      .btns {
        margin-bottom: r(40);
        text-align: center;
        .t_btn {
          padding: r(20);
          @include f(36px);
          border-radius: 6px;
          display: inline-block;
          width: 45%;
          box-sizing: border-box;
          margin: 0 r(10);
          background: #0088fe;
          color: #fff;
        }
      }
    }
  }

  h3 {
    color: red;
  }

</style>
