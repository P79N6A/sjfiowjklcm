<template>
  <transition>
    <div class="msg-box" v-show="visible">
      <div class="msg-box-title" v-show="title!=''">
        {{title}}
      </div>
      <div class="msg-box-content" v-html="message">
      </div>
      <div class="msg-box-btn">
        <div v-show="showCancel" @click="action('cancel')" class="msg-btn-cancel">{{cancelText}}</div>
        <div   @click="action('confirm')" class="msg-btn-confirm" v-html="confirmText"></div>
      </div>
    </div>
  </transition>
</template>
<script>
import cover from 'mobile/base/cover/cover';
  export default {
    mixins:[cover],
    props:{
      showCancel:{
        type:Boolean,
        default:false
      },
      showConfirm:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      action(action) {
        this.value = false;
        this.callback(action);
      },
      close(){
        this.value=false;
      }
    },
    data() {
      return {
        title:'提示',
        message:'',
        confirmText: "确定",
        cancelText: "取消",
      };
    }
  };
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";
  .msg-box {
    position: fixed;
    overflow: hidden;
    top: 50%;
    width: 80%;
    z-index: 2;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width:r(750);
    border-radius: 10px;
    text-align: center;
    background: #fff;
    box-sizing: border-box;
  }
  .msg-box-title {
    border-bottom: 1px solid #ccc;
    line-height: r(80);
    background: $cl1;
    color: #fff;
    font-weight: bold;
    @include f(32px);
  }
  .msg-box-content {
    padding:20px 40px;
    color:#666;
    line-height:1.2;
    @include f(32px);
    text-align: left;
    word-break: break-all;
  }
  .msg-box-btn {
    display: flex;
    border-top: 1px #ccc solid;
  }
  .msg-btn-cancel,
  .msg-btn-confirm {
    flex: 1;
    box-sizing: border-box;
    border-right: 1px #ccc solid;
    line-height:r(88);
    color: #000;
    @include f(32px);
    width: 50%;
  }
  .msg-btn-confirm{color:#666;}
</style>
