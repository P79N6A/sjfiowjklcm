<template>
  <div
    class="serviceLog"
    v-if="data.playerFeedbackList && data.playerFeedbackList.length > 0 && !showLoading"
  >
    <div class="list-item" v-for="(item,i) in data.playerFeedbackList" :key="i">
      <div class="list-item-view">
        <div class="view-title">
          {{item.categoryName}}
          <div class="list-time">{{item.createTime}}</div>
        </div>
      </div>
      <div class="sometips" style="word-break:break-all;">
        反馈内容：{{item.content}}
        <div v-show="item.check">
          <div
            style="text-align: right;"
            v-if="item.replyId"
            @click="showView(item,i);item.check = false"
          >
            <span class="status" v-if="item.status =='UNREAD'"></span>
            <span class="cl-red">【已回复】</span>
            <span class="underLine">点击查看回复详情</span>
          </div>
          <div style="text-align: right;" class="cl-red" v-else>【未回复】</div>
        </div>
      </div>
      <transition name="message">
        <div :ref="item.id" v-show="item.show">
          <div class="list-item-info">
            <div class="fedTime">回复时间：{{item.replyCreateTime}}</div>
            <div>回复内容：</div>
            <div class="fedcontent">{{item.replyContent}}</div>
            <div
              style="text-align: right;"
              class="underLine"
              @click="showView(item,i);item.check = true;"
            >点击收起</div>
          </div>
        </div>
      </transition>
    </div>
    <div class="page-by">
      <div class="btn-warp">
        <div class="iconfont icon-fenyezuiqianye" @click="first"></div>
        <div class="iconfont icon-fenyeshangyiye1" @click="pre"></div>
        <div>
          第
          <input type="text" readonly :value="searchData.currentPage"> 页
        </div>
        <div class="iconfont icon-fenyeshangyiye" @click="next"></div>
        <div class="iconfont icon-fenyezuihouye" @click="last"></div>
      </div>
      <div class="txt-info">共{{data.totalPages}}页,共{{data.totalCount}}笔</div>
    </div>
  </div>
  <div
    class="serviceLog"
    v-else-if="data.playerFeedbackList && !data.playerFeedbackList.length && !showLoading"
  >
    <img class="nodataImg" src="./images/Bitmap@2x.png" alt>
    <p class="nodataText">暂无记录</p>
  </div>
  <div style="padding-top:15vh" v-else>
    <loadding></loadding>
  </div>
</template>
<script>
import loadding from "mobile/components/loadding";
import { getSuggestAndReplyList, readSuggestReplyInfo } from "@/api/user";
export default {
  data() {
    return {
      data: {}, //records
      searchData: {
        //查询条件
        pageSize: 10, 
        currentPage: 1 
      },
      showLoading: true,
    };
  },
  methods: {
    showView(item, i) {
      item.show = !item.show;
      if(item.status == 'READ'){
        return false;
      }
      item.status = 'READ'
      readSuggestReplyInfo({id:item.replyId}).then(res => {
        this.$store.commit("READ_ANDREPLY");
      })
    },
    getSuggestAndReplyList(searchData) {
      getSuggestAndReplyList(searchData).then(res => {
        if (res.success) {
          res.data.playerFeedbackList.forEach(item => {
            item.show = false;
            item.check = true;
          });
          this.data = res.data;
          this.showLoading = false;
        } else {
          window.toast(res.message);
        }
      });
    },
    first() {
      if(this.searchData.currentPage == 1){
        return false;
      }
      this.searchData.currentPage = 1; 
      this.getSuggestAndReplyList(this.searchData);
    },
    pre() {
      if(this.searchData.currentPage == 1){
        return false;
      }
      this.searchData.currentPage -= 1; 
      this.getSuggestAndReplyList(this.searchData);
    },
    next() {
      if(this.searchData.currentPage == this.data.totalPages){
        return false;
      }
      this.searchData.currentPage += 1; 
      this.getSuggestAndReplyList(this.searchData);
    },
    last() {
      if(this.searchData.currentPage == this.data.totalPages){
        return false;
      }
      this.searchData.currentPage = this.data.totalPages; 
      this.getSuggestAndReplyList(this.searchData);
    }
  },
  computed: {},
  activated() {
    //加载数据
    this.getSuggestAndReplyList(this.searchData);
  },
  components: {
    loadding
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

.message-enter-active,
.message-leave-active {
  transition: all 1s;
  overflow: hidden;
}

.message-enter,
.message-leave-to {
  height: 0 !important;
}

.serviceLog {
  @include f(24px);
  padding: r(30);
  .underLine {
    text-decoration: underline;
  }
  .list-item {
    border-radius: r(10);
    background: #ffffff;
    margin-bottom: r(15);
    border: 1px solid #e4e7ed;
    .sometips {
      line-height: 2;
      @include f(28px);
      padding: r(20) r(30);
    }
    .list-item-view {
      position: relative;
      color: #ffffff;
      background: #4db7f4;
      @include f(28px);
      padding: r(20);
      line-height: 1.2;
      .view-title {
        @include f(34px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // margin-bottom: r(6);
        padding-right: r(230);
        .icobjh {
          @include f(34px);
          &.unread {
            color: red;
          }
        }
        .list-time {
          position: absolute;
          right: r(20);
          top: 50%;
          transform: translateY(-50%);
          @include f(24px);
        }
      }
    }
    .list-item-info {
      padding: 0 r(30) r(30);
      // background: #eee;
      line-height: 1.5;
      @include f(28px);
      .fedTime {
        padding: r(20) 0;
      }
      .fedcontent {
        text-indent: 2em;
        padding: r(20) 0;
        color: red;
      }
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

  .page-by {
    @include f(26px);
    margin: r(20) auto;
    .btn-warp {
      padding: 0 r(30);
      text-align: center;
      display: flex;
      height: r(47);
      line-height: r(47);
      justify-content: space-between;
      @include f(28px);
      white-space: nowrap;
      input {
        background: none;
        border: 1px solid #000000;
        width: r(63);
        height: r(47);
        text-align: center;
      }
    }
    .iconfont {
      @include f(36px);
    }
    .txt-info {
      text-align: center;
      line-height: r(70);
    }
  }
  .status {
    display: inline-block;
    background: red;
    width: r(15);
    height: r(15);
    border-radius: 50%;
  }
}
</style>
