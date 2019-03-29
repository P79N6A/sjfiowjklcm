<template>
  <div style="padding:0.5rem;">
      <input-inline label="游戏账号">
        <input v-model="phone.name" type="text" placeholder="请输入您的游戏账号">
      </input-inline>
      <input-inline label="手机号码">
        <input v-model="phone.phone" type="text" placeholder="请输入绑定手机号码">
      </input-inline>
      <div class="btn_wrap">
        <v-button href="javascript:void(0);" @click="submitPhone" v-show="forbidtime == 0">验证</v-button>
        <p class="txt-center" v-show="forbidtime != 0"><span class="cl-red">{{forbidtime}}</span>秒后可重新获取验证码</p>
      </div>
  </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {loginForgot} from '@/controls/auth/loginForgot'
  export default {
    mixins:[loginForgot],
    data() {
      return {
        forbidtime: 0,
        interval: null, // 计时器
      };
    },
    methods:{
      submitPhone(){
        this.getbackPwdByDx_dc(this.phone).then(res=>{
          window.toast(res.message)
          this.phoneTimer()
        }).catch(err=>{
          window.toast(err.message)
          console.log(err);
        })
      },
      phoneTimer(){
            this.forbidtime = 120;
            let self = this;
            this.interval = setInterval(function(){
              self.forbidtime --;
              if (self.forbidtime == 0) {
                clearInterval(self.interval);
              }
            }, 1000);
      }
    },
    beforeDestroy() {
      window.clearInterval(this.interval)
    },
    components:{
      
    }
  };
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .main_nav_with_arrow {
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
          -webkit-appearance: none;
          -moz-appearance: none;
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
    text-align: center;
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
