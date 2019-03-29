<template>
    <div class="contact-box">
      <span class="title">联系我们</span>
      <div class="n-text">
        <div>客服邮箱：{{SETTING.email}}</div>
        <div>投诉邮箱：{{SETTING.SuggessEmail}}</div>
      </div>
      <div class="n-c-box">
        <p class="n-c-title">扫码关注微信</p>
        <p class="n-c-img">
          <img v-lazy="require('@/assets/images/wechat.jpg')">
        </p>
      </div>
    </div>
</template>
<script>
  import {
    SETTING
  } from "@/assets/data"
  export default {
    data() {
      return {
        SETTING,
      };
    }
  }

</script>
<style lang="scss" scoped>
    .contact-box {
      width: 260px;
      text-align: center;
      background: linear-gradient(to bottom, #008edf 0%, #005bad 50%, #0b6dc3 100%);
      border-radius: 10px;
      padding: 30px 15px;
      .title {
        font-size: 18px;
        padding: 6px 30px;
        display: inline-block;
        background: rgb(255, 236, 183);
        /* Old browsers */
        background: -moz-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
        /* FF3.6-15 */
        background: -webkit-linear-gradient(top, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
        /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(to bottom, rgba(255, 236, 183, 1) 0%, rgba(255, 209, 120, 1) 100%);
        /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffecb7', endColorstr='#ffd178', GradientType=0);
        /* IE6-9 */
      }
      .n-text {
        margin-top: 40px;
        background: transparent;
        color: #fff;
        padding: 10px;
        line-height: 1.8;
        text-align: left;
        font-size: 16px;
      }
      .n-c-box {
        margin-top: 20px;
        width: 150px;
        display: inline-block;
        .n-c-title {
          color: #fff;
          font-size: 16px;
          line-height: 50px;
          height: 50px;
          background: rgb(218, 100, 77);
          /* Old browsers */
          background: -moz-linear-gradient(left, rgba(218, 100, 77, 1) 0%, rgba(236, 135, 76, 1) 100%);
          /* FF3.6-15 */
          background: -webkit-linear-gradient(left, rgba(218, 100, 77, 1) 0%, rgba(236, 135, 76, 1) 100%);
          /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to right, rgba(218, 100, 77, 1) 0%, rgba(236, 135, 76, 1) 100%);
          /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#da644d', endColorstr='#ec874c', GradientType=1);
          /* IE6-9 */
        }
        .n-c-img {
          background: #fff;
          padding: 20px 0;
          img {
            width: 90px;
            height: 90px;
            display: inline-blcok;
          }
        }
      }
    }

</style>
