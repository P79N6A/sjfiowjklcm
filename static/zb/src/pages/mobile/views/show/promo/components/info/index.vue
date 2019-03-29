<template>
  <transition name="fade">
    <div class="prefer_box" v-show="showWindow">
      <div class="prefer_content">
        <div class="prefer_title" @click="showWindow=false">
          <span class="iconay ay-guanbi"></span>
          <!-- <img :src="resdata.data.newImageUrl" alt=""> -->
        </div>
        <div class="prefer_title1">{{this.resdata.data.activityTitle}}</div>
        <div class="prefer_detail">
          <iframe  ref="iframe" style="height:100%;" width="100%"  cl src="" frameborder="0">
          </iframe>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import util from '@/util/util'
  import {
    findLatestPreferentialById
  } from "@/api/show"

  export default {
    name: "",
    data() {
      return {
        showWindow:false,
        showDatas:{
          activityTitle:'',
          activityContent:''
        },
        resdata:{
          data:{
            newImageUrl:''
          }
        }
      }
    },
    methods: {
      setiframe(title,content) {
        this.showWindow=true;
        this.showDatas.activityTitle = title
        this.showDatas.activityContent = content
        let ifrm = this.$refs.iframe;
        const doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
          doc.open();
          doc.write(content);
          doc.body.style['overflow-y'] = 'visible';
          doc.body.style['margin'] = 0;
          doc.close();
      }
    },
    created() {
      this.$bus.$on('showProDetail', eventData=>{
        this.setiframe(eventData.data.activityTitle,eventData.data.activityContent)
        this.resdata = eventData
      })
    },
  }

</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

   .promotion_toggle_all {
    position: fixed;
    right: 5%;
    bottom: 15%;
    border-radius: r(8);
    padding: r(8);
    border: solid 2px $cl1;
    text-align: center;
    color: $cl1;
    background-color: #fff;
    .iconay {
      @include f(36px);
    }
  }

  .prefer_box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    .prefer_content {
      position: absolute;
      display: block;
      width: 90%;
      height: 75%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      padding: r(20);
      text-align: center;
      // border:solid;
      .prefer_title {
        position:absolute;
        right:0;
        top:r(15);
        .iconay {
          @include f(50px);
          color: #1e327e;
          padding: r(20);
          position: relative;
          /*top: r(-30);
          background: $cl1;
          border-radius: 20em;*/
        }
      }
      .prefer_title1 {
      	width: 90%;
      	height: r(40);
      	line-height: r(40);
      	text-align: center;
      	font-size: r(36);
      	color: #1e327e;
      	font-weight: 900;
      	margin-bottom: r(20);
      	overflow: hidden;
      	text-overflow: ellipsis;
      	white-space: nowrap;
      }
      .prefer_detail {
        height: 85%;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
      }
      .btn_register {
        background-color: #bda059;
        margin-top:r(20);
        padding: r(10) r(80);
        border-radius: r(5);
        color:#ffffff;
        @include f(30px);
      }
    }
  }
</style>
