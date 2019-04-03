<template>
  <div class="message-inside" v-if="data.pageContents && data.pageContents.length > 0 && !showLoading">
    <div class="list-item" v-for="(item,i) in data.pageContents" :key="i">
      <div class="list-item-view" @click="showView(item,i)">
        <span class="unread" v-if="!item.read"></span>
        <div class="view-title">
          <!-- <span class="icobjh bjh-email  unread" v-if="!item.read"></span>
          <span class="icobjh bjh-ready" v-else></span> -->
          {{item.title}}
          <div class="list-time">{{item.createDate}}</div>
        </div>       
      </div>
        <transition enter-active-class="animated bounce" leave-active-class="animated flipOutX">
          <div :ref="item.id" v-show="item.show">
            <div class="list-item-info">
              <div v-html="item.html"></div>
              </div>
          </div>
        </transition>
    </div>
    <pageBy :data="data" @search="search"></pageBy>
  </div>
  <div class="message-inside" v-else-if="data.pageContents && !data.pageContents.length && !showLoading">
    <img class="nodataImg" src="./images/Bitmap@2x.png" alt="">
    <p class="nodataText">暂无站内信</p>
  </div>
  <div style="padding-top:15vh" v-else>
    <loadding></loadding>
  </div>
</template>
<script>
  import {getMessageByUser, readMsg} from "@/api/show";
  import pageBy from "mobile/components/page-by.vue";
  import loadding from "mobile/components/loadding"
  export default {
    data() {
      return {
        data: {},  //records
        viewList: {},
        searchData: { //查询条件
          total: "10", //true string
          v: "",    //true string
          size: "10",  // true string
          pageIndex: "1"//
        },
        showLoading:true
      };
    },
    methods: {
      showView(item, i) {
        if (item.touch === true) {
          item.show = !item.show;
          return;
        }
        readMsg({msgID: item.id}).then((data) => {
          if(data.data.content){
            this.$store.commit("READ_MESSAGE"); // 已读站内信
            let html = data.data.content.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />")
            this.$set(item, 'html', html);
            item.read = true;
            item.hadGet = true;
          }
          item.touch = true;
          this.$nextTick(() => {
            item.show = true;
          });
        }).catch(err=>{
          console.log(err)
          window.toast("读取站内信失败,请稍后尝试")
        });
      },
      search(index) {
        if(!isNaN(index)&&this.searchData.pageIndex!=index){
          this.searchData.pageIndex=index;
        }
        getMessageByUser(this.searchData).then(res => {
          if (res.success) {
            res.data.pageContents.forEach((item, i) => {
              item.show = false;
              item.touch = false;
              item.html = '';
            });
            this.data = res.data;
            this.showLoading =false;
          } else {
            window.toast(res.message);
          }
        })
      }
    },
    computed: {},
    activated() {
      //加载数据
     this.search();
    },
    components: {
      pageBy,loadding
    }
  }
</script>
<style lang="scss">
  @import "~mobile/assets/scss/mixin.scss";

  .message-enter-active, .message-leave-active {
    transition: all 1s;
    overflow: hidden;
  }

  .message-enter,
  .message-leave-to {
    height: 0 !important;
  }

  .message-inside {
    @include f(24px);
    padding: r(30);
    .list-item {
      border-radius: r(10);
      background: #ffffff;
      margin-bottom: r(15);
      border: 1px solid #e4e7ed;
      .list-item-view {
        position: relative;
        color: #333;
        @include f(28px);
        padding: r(20);
        line-height: 1.2;
        .view-title {
          @include f(34px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin-bottom: r(6);
          color: $cl1;
          padding-right: r(230);
          .icobjh{
            @include f(34px);
            &.unread{
              color:#ea5048;
            }
          }
          .list-time {
            position: absolute;
            right: r(20);
            top: 50%;
            transform: translateY(-50%);
            color: #888888;
            @include f(24px)
          }
        }
      }
      .list-item-info {
        padding:0 r(30) r(30);
        // background: #eee;
        line-height: 1.5;
        @include f(24px);
      }
    }
    .nodataImg {
      width: r(250);
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: r(10);
      margin-top: r(420);
    }
    .nodataText {
      text-align: center;
      color: #888888;
    }
    .unread {
      position: absolute;
      left: r(5);
      top: 50%;
      transform: translateY(-50%);
      width: r(10);
      height: r(10);
      background: #FF3B30;
      border-radius: 50%;
    }
  }
</style>
