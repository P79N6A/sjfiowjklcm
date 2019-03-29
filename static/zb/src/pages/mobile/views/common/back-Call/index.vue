<template>
  <!-- <div style="padding: 0.5rem">
    <input-inline label="联系号码">
      <input v-model="backCallData.phone" type="text" placeholder="输入联系号码" maxlength="16">
    </input-inline>
    <v-button @click="submit">电话回拨</v-button>
  </div> -->
    <div class="callBox" v-show="showWindow">
        <div class="callContent">
          <div class="pop-head">
            <span>免费电话</span> <a @click="$emit('closeBox',false)" class="pop-tell-close"></a>
          </div>
          <div class="pop-c">           
            <div class="p">请输入您的联系电话，1分钟内给您回电。</div>  
            <div class="pop-input">
              <input v-model="backCallData.phone" type="text" placeholder="输入联系号码" maxlength="16">
            </div>     
            <a @click="submit" class="pop-btn call_back_btn">申请回拨</a>      
          </div>
        </div>
    </div>
</template>
<script>
  import check from "@/util/RegExp"
  import {backCall} from "@/controls/common/backCall"
  import { mapGetters } from 'vuex';
  export default {
    mixins:[backCall],
    data() {
      return {
      };
    },
    props: {
      showWindow: Boolean
    },
    methods:{
      submit(){
        // 调用回拨
        this.backCall(this.backCallData).then(res=>{
          window.toast(res.message)
        }).catch(err=>{
          window.toast(err.message)
        })
      }
    },
    computed: {
      ...mapGetters(["islogin"])
    },
    components:{}
  };
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
  .callBox {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    .callContent {
      position: absolute;
      display: block;
      width: 80%;
      height: 232px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: $cl1;
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
        .p {
          color: #999;
          margin-bottom: 12px;
          text-align: left;
          line-height: 1;
        }
        .pop-input {
          border-bottom: 1px solid #ccc;
          height: 40px;
          margin-bottom: 14px;
          position: relative;
          padding-right: 58px;
          input {
            width: 100%;
            height: 100%;
            background-color: $cl1;
            border: none;
            vertical-align: top;
            color: $cl6;
          }
        }
        .pop-btn {
          display: block;
          width: 100%;
          height: 45px;
          line-height: 45px;
          color: $main-cl;
          background: $cl1;
          border-radius: 6px;
          text-align: center;
        }
      }
    }
  }
</style>
