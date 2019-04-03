<template>
    <div class="callBox-wechat" v-show="showWechat">
        <div class="callContent-wechat">
          <div class="pop-head">
            <span>专属客服</span> <a @click="$emit('closeBox',false)" class="pop-tell-close"></a>
          </div>
          <div class="pop-c">           
            <img src="./images/wechat.jpg" alt=""> 
            <p>微信扫描二维码，添加专属客服</p>         
          </div>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {

      };
    },
    props: {
      showWechat: Boolean
    },
    methods:{},
    components:{}
  };
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";
  .callBox-wechat{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    .callContent-wechat {
      position: absolute;
      display: block;
      width: 80%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #e3e3e3;
      border-radius: 12px;
      @include f(32px);
      .pop-head {
        height: 44px;
        text-align: center;
        line-height: 44px;
        border-bottom: 1px solid #999;
        color: #333;
        font-weight: bold;
      }
      .pop-tell-close {
        background: url("./images/close.png") no-repeat;
        background-size: auto auto;
        background-size: cover;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 6px;
        right: 6px;
        display: block;
      }
      .pop-c {
        padding: 15px 18px;
        @include f(32px);
        text-align: center;
        p {
          color: #999;
          line-height: 1;
          margin-top: 10px;
        }
        img {
          width: 80%;
        }
      }
    }
  }
</style>
