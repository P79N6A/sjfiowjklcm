<template>
  <transition name="fade">
    <div class="rightTool" v-show="isshow">
      <a :href="SETTING.live800" target="_blank" class="top1"></a>
      <div class="top2"><img src="./images/tel.png" alt="">电话热线 <p>00639663888444</p></div>
      <a :href="'http://wpa.qq.com/msgrd?v=3&uin=' + SETTING.qq + '&site=qq&menu=yes'" target="_blank" class="top3"><img src="./images/qq.png" alt=""> <p>{{SETTING.qq}}</p></a>
      <div class="top4"><p>微信客服</p> <img src="./images/wechat.jpg" alt=""></div>
      <i class="close" @click="isshow = false"></i>
    </div>
  </transition>
</template>
<script>
  import {SETTING,Download} from "@/assets/data"
  import check from "@/util/RegExp"
  import {scrolltool} from "@/vue-extend/scrolltool"
  import {backCall} from "@/controls/common/backCall"
  import {
    generateQRCode
  } from "@/api/show"
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
      }
    },
    methods: {
      generateQRCode(url, size) {
        return generateQRCode(url, size)
      },
      registerIt() {
        this.$bus.$emit('showRegister', true)
      },
      showBackCall(){
        // 弹窗回拨
        this.$prompt('请输入手机号码', '电话回拨', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: check.phone,
          inputErrorMessage: '手机号码格式不正确'
        }).then((confirm) => {
          // 提交弹窗
          this.backCall({phone:confirm.value}).then(res=>{
            toast(res.message)
          }).catch(err=>{
            toast(err.message)
          })
        }).catch((err) => {
          console.log(err)
        });
      }
    }
  }

</script>
<style lang="scss" scoped>
  .rightTool {
    width: 136px;
    height: 369px;
    background: url('./images/bg.png') no-repeat;
    background-size: cover;
    background-position: top center;
    position: fixed;
    top: 26vh;
    // top: 50%;
    // transform: translateY(-50%);
    right: 20px;
    z-index: 999;
    .top1 {
      width: 100%;
      height: 66px;
      display: block;
    }
    .top2 {
      height: 78px;
      text-align: center;
      color: #fff000;
      font-size: 16px;
      padding-top: 10px;
      img {
        margin-right: 6px;
      }
      p {
        padding-top: 8px;
        font-size: 14px;
      }
    }
    .top3 {
      display: block;
      height: 92px;
      text-align: center;
      padding-top: 15px;
      color: #fff000;
      p {
        padding-top: 6px;
      }
    }
    .top4 {
      text-align: center;
      color: #fff000;
      font-size: 16px;
      padding-top: 2px;
      img {
        width: 100px;
      }
    }
    .close {
      background: url('./images/close.png') no-repeat;
      background-size: contain;
      background-position: center;
      position: absolute;
      width: 112px;
      height: 34px;
      display: block;
      right: 13px;
      cursor: pointer;
      bottom: -32px;
    }
  }

</style>
