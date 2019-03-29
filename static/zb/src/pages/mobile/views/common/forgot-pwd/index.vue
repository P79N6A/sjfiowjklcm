<template>
  <div class="page_content_wrap">
    <div class="ul_auto_wrap main_nav_with_arrow_Julien forgot-pwd-part">
      <ul class="cfx">
        <li class="active">
          <router-link :to="{name:'forgotpwdPhone'}">
            <img src="./images/icon_mobile.png">
            <span class="img_text">短信找回</span>
          </router-link>
          <span class="arrow_down"></span>
        </li>
        <li>
        <router-link :to="{name:'forgotpwdEmail'}">
            <img src="./images/icon_mail02.png" >
            <span class="img_text">邮箱找回</span>
          </router-link>
        </li>
        <li data-href="user_rebate_content">
          <a target="_blank" :href="SETTING.live800">
            <img src="./images/icon_chat03.png" >
            <span class="img_text">客服找回</span>
          </a>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {SETTING} from "@/assets/data"
  import check from "@/util/RegExp"
  export default {
    data() {
      return {
        SETTING,
      };
    },
    methods:{
    }
  };
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .forgot-pwd-part {
    border-bottom: 1px solid #ddd;
    background: #eee;
    ul li {
      display: block;
      float: left;
      position: relative;
      padding-bottom: 6px;
      width: 33.33%;
      text-align: center;
      box-sizing:border-box;
      a{
        display: block;
        padding: 10px 0;
        &.active{
          border-color: transparent;
          color: #d03328;
          box-shadow: 0 0 0;
        }
        img{
          display: block;
          width:r(40*2);
          height:auto;
          margin:r(10) auto   r(20);

        }
      }
    }
  }
  .layout_form03 {
    padding: r(10) 0 r(20);
    .form_field_warp {
      padding-left: r(15*2);
      padding-right: r(15*2);
    }
  }
  .form_field {
      position: relative;
      height: r(42*2);
      line-height: r(42*2);
      border: 1px solid #ccc;
      padding: 0 r(12*2);
      border-radius: 50em;
      margin-bottom: r(16*2);
      background: #fff;
      .form_field_input {
        overflow: hidden;
        margin: 0 0 0 70px;
        height: 100%;
        white-space: nowrap;
        input,select,option {
          padding: 0;
          width: 100%;
          height: 100%;
          border: none;
          outline: none;
          background: none;
          @include f(28px);
          color: #333;
          appearance: none;
      }
    }
    &.form_field_cap_code {
        // margin-right: r(110*2);
        .right_label {
          top: r(-4);
          right: r(6);
          height: 100%;
          position: absolute;
          img {
            vertical-align: middle;
            border-radius: 20em;
            height: r(40*2);
            width:auto;
        }
      }
    }
    &.with_right_label {
      position: relative;
    }
  }
  .btn_wrap {
    // padding-left: r(35);
    // padding-right: r(45);
    margin-bottom: r(12);
    .btn01, .btn02 {
        display: inline-block;
        text-align: center;
        width: 90%;
        height:r(44*2);
        line-height: r(44*2);
        @include f(30px);
        color: #fff;
        border-radius: 100px;
        font-weight: 700;
        background: $cl1;
        border: none;
    }
  }
</style>
