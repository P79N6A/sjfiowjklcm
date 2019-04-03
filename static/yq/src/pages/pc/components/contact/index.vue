<template>
    <div class="contact-box">
      <span class="title">联系方式：</span>
      <div class="n-text">
        <div>客服邮箱：{{SETTING.email}}</div>
        <div>投诉邮箱：{{SETTING.SuggessEmail}}</div>
      </div>
      <div class="n-c-box">
        <img v-lazy="require('@/assets/images/wechat.jpg')">
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
      text-align: left;
      background: #282828;
      border: 1px solid #cdbe67;
      padding: 30px 15px;
      color: #ffdaa3;
      .title{
        font-size: 20px;
        font-family: "Microsoft YaHei";
        font-weight: bold;
        display: block;
        margin-bottom: 15px;

      }
      .n-text{
        div{
  font-family: "Microsoft YaHei";
  font-size: 14px;
  color: #f7d39e;

        }
      }
      .n-c-box {
        margin-top: 20px;
        width: 223px;
        height: 241px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url('./images/wechatbg.png') no-repeat;
        background-size: cover;
        background-position: top center;
        img{
          width: 200px;
          height: 200px;
          margin-top: 10px;
        }
      }
    }

</style>
