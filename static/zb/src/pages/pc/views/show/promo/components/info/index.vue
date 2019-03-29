<template>
  <transition name="fade">
    <!-- <div class="promo-info" v-show="showWindow">
        <div class="promo-info-wrap">
          <h1>{{showDatas.activityTitle || ''}}</h1>
          <img src="./images/close.png" @click="showWindow=false">
          <div class="promo-info-content">
            <div class="content-info">
              <iframe ref="iframe" width="100%" height="520" src="" frameborder="0"></iframe>
            </div>
          </div>
        </div>
    </div> -->
    <div class="modal modal-large ng-scope open" v-show="showWindow">
      <div class="modal-header ng-binding">
        {{showDatas.activityTitle || ''}}
        <a href="javascript:void(0);" @click="showWindow=false" class="modal-action modal-close right">
          <i class="material-icons">关闭</i>
        </a>
      </div>
      <div class="modal-header2">
        <span class="ng-binding">{{showDatas.activityStartTime}}至{{showDatas.activityEndTime || '待定'}}</span>
        <a href="javascript:void(0);" class="right ng-binding color-text color-mark-text-hover" style="">
          <i class="material-icons" style="vertical-align: bottom;"></i>
        </a>
      </div>
      <!-- <div class="modal-content promo-content ng-binding" v-html="showDatas.activityContent"></div> -->
      <div class="modal-content promo-content ng-binding">
        <div class="content-info">
          <iframe ref="iframe" width="100%" height="520" src="" frameborder="0"></iframe>
        </div>
      </div>
      <div class="modal-footer1">
        <a href="javascript:void(0);" class="cancel" @click="showWindow=false" >关闭</a>
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
        showWindow: false,
        showDatas: {}
      }
    },
    methods: {
      setiframe(obj) {
        this.showWindow = true;
        this.showDatas = obj
        // this.showDatas.activityContent = content
        let ifrm = this.$refs.iframe;
        const doc = ifrm.contentDocument ? ifrm.contentDocument : ifrm.contentWindow.document;
        doc.open();
        doc.write(this.showDatas.activityContent);
        doc.body.style['overflow-y'] = 'visible';
        doc.body.style['margin'] = 0;
        doc.close();
      }
    },
    created() {
      this.$bus.$on('showProDetail', eventData => {
        this.setiframe(eventData.data)
      })
    },
  }

</script>
<style lang="scss" scoped>  
  .modal:not(.modal-large) {
  background: none;
  width: 453px;
  box-shadow: 0 0;
  overflow: hidden;
  top: 0;
  bottom: 0;
  max-height: 661px;
  .modal-content, .modal-footer1, .modal-header2 {
    width: 413px;
    margin: 0 auto;
    position: relative;
    z-index: -1;
  }
  > div:not(.modal-header):not(.modal-header2):not(.modal-content):not(.modal-footer1) {
    position: relative;
    z-index: -1;
  }
  .modal-header {
    background: url(./images/info_icon.png) no-repeat;
    display: block;
    width: 163px;
    height: 173px;
    position: relative;
    margin: 0 auto -91px;
    color: #fff;
    text-align: center;
    padding-top: 100px;
  }
  .modal-header2 {
    height: 35px;
    border-radius: 10px 10px 0 0;
    // background: #fff;
    box-shadow: 0 10px 20px 2px hsla(0, 0%, 47%, 0.5);
  }
  .closeBtn {
    position: absolute;
    right: 15px;
    margin-top: 8px;
    img {
      width: 10px;
    }
    &:hover img {
      -webkit-animation-name: rotateIn;
      animation-name: rotateIn;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
  }
  .show-pwd-btn {
    position: absolute;
    right: 11px;
    top: 9px;
  }
  .color-blue {
    color: #2293fc;
  }
  .modal-content {
    overflow-y: auto;
    max-height: 455px;
    background: #fff;
    padding-top: 48px;
    color: #787878;
    margin-top: -1px;
    box-shadow: 0 17px 20px 2px hsla(0, 0%, 47%, 0.5);
  }
  .modal-footer1 {
    text-align: center;
    background: #fff;
    // border-radius: 0 0 10px 10px;
    height: 66px;
    // box-shadow: 0 15px 20px 2px hsla(0, 0%, 47%, 0.5);
    position: relative;
    margin-top: -1px;
    .cancel {
      display: inline-block;
      width: 182px;
      height: 41px;
      padding-top: 8px;
    }
    .confirm {
      display: inline-block;
      width: 182px;
      height: 41px;
      padding-top: 8px;
      background: url(./images/confirm.png) no-repeat;
      color: #fff;
    }
    .cancel {
      background: url(./images/cancel.png) no-repeat;
      color: #787878;
    }
  }
}

.modal-large {
  width: 840px;
  box-shadow: 0 0;
  overflow: hidden;
  top: 0;
  bottom: 0;
  border-radius: 10px;
  max-height: 690px;
  // background : url(./images/bg.jpg) no-repeat center;
  background :#69cdfc;
  .modal-content, .modal-footer1, .modal-header, .modal-header2 {
    // width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: -1;
  }
  > div {
    padding: 10px 16px;
  }
  .modal-header {
    background: #3ec1fe;
    font-size: 16px;
    color: #fff;
    // border-radius: 10px 10px 0 0;
    // box-shadow: 0 10px 20px 2px hsla(0, 0%, 47%, 0.5);
    a {
      color: #fff;
    }
    .modal-close:hover i {
      -webkit-animation-name: rotateIn;
      animation-name: rotateIn;
      -webkit-animation-duration: 1s;
      animation-duration: 1s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
  }
  .modal-header2 {
    // background: #f6f8fa;
    border-bottom: 2px dotted #efefef;
    color: #fff;
  }
  .modal-content {
    overflow-y: auto;
    max-height: 567px;
    padding: 0;
    // background: #fff;
    box-shadow: 0 17px 20px 2px #3ec1fe;
    padding: 10px 16px;
  }
  .modal-footer1 {
    text-align: center;
    // background: #fff;
    border-radius: 0 0 10px 10px;
    height: 66px;
    box-shadow: 0 15px 20px 2px hsla(0, 0%, 47%, 0.5);
    position: relative;
    margin-top: -1px;
    .cancel {
      display: inline-block;
      width: 182px;
      height: 41px;
      padding-top: 8px;
    }
    .confirm {
      display: inline-block;
      width: 182px;
      height: 41px;
      padding-top: 8px;
      background: url(./images/confirm.png) no-repeat;
      color: #fff;
    }
    .cancel {
      background: url(./images/cancel.png) no-repeat;
      color: #787878;
    }
  }
}


</style>
