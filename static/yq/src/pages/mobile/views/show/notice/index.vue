<template>
  <div class="notice-box">
    <div class="tab-bar">
      <div class="tab-ment">
        <span
          v-for="item in tabs"
          :key="item.value"
          :class="{active:cur==item.value}"
          @click="cur=item.value"
        >{{item.name}}</span>
      </div>
      <!-- <div class="tab">
        最新公告(
        <span>{{data.length}}</span>)
      </div>-->
    </div>
    <div class="tab-panel" v-if="data && data.length > 0 && !showLoading">
      <div class="tab-title">
        <div class="tab1"></div>
        <div class="tab2">序号</div>
        <div class="tab3">标题</div>
        <div class="tab4">时间</div>
      </div>
      <div v-for="(item,i) in myNewData" :key="i">
        <div class="tab-content" :class="{'active': index == i}" @click="showView(item,i)">
          <div class="tab1">
            <span class="span-icon">
              <i class="iconfont icon-fangdajing"></i>
            </span>
          </div>
          <div class="tab2">{{(i+1)+(pageIndex-1)*10}}</div>
          <div class="tab3">{{item.title}}</div>
          <div class="tab4">{{item.createtime | Date("yyyy-MM-dd")}}</div>
        </div>
        <transition name="message">
          <div
            class="toggle_content_main"
            v-show=" index == i"
            v-html="item.content.replace(/\r\n/g,'<br>')"
          ></div>
        </transition>
      </div>
      <div
        style="text-align:center;border-bottom:1px solid #ddd;padding-bottom:10px;"
        v-if="showNothing"
      >
        <img src="./images/nothings.png" style="width:42%;margin-bottom:5px;">
        <br>抱歉！暂无记录
      </div>
      <div class="page-by">
        <div class="btn-warp">
          <div class="iconfont icon-fenyezuiqianye" @click="first"></div>
          <div class="iconfont icon-fenyeshangyiye1" @click="pre"></div>
          <div>
            第
            <input type="text" readonly :value="pageIndex"> 页
          </div>
          <div class="iconfont icon-fenyeshangyiye" @click="next"></div>
          <div class="iconfont icon-fenyezuihouye" @click="last"></div>
        </div>
        <div class="txt-info">共{{pageTotal}}页,共{{myData.length}}笔</div>
      </div>
    </div>
    <div style="padding-top:15vh" v-else>
      <loadding></loadding>
    </div>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
import loadding from "mobile/components/loadding";

export default {
  data() {
    return {
      data: [], //records
      myData: [],
      myNewData: [],
      showLoading: true,
      index: null,
      pageIndex: 1,
      tabs: [
        {
          name: "最新通知",
          value: "isNew"
        },
        {
          name: "历史通知",
          value: "isOld"
        }
      ],
      cur: "isNew",
      showNothing: false
    };
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.myData.length / 10);
    }
  },
  watch: {
    cur(val) {
      if (val == "isOld") {
        this.myData = this.data.filter(item => {
          return item.type == "isOld";
        });
      } else {
        this.myData = this.data.filter(item => {
          return item.type == "isNew";
        });
      }
      this.myNewData = this.myData.slice(0, 10);
      this.first();
    },
    myNewData(val) {
      if (val.length > 0) {
        this.showNothing = false;
      } else {
        this.showNothing = true;
      }
    }
  },
  methods: {
    showView(item, i) {
      if (this.index == i) {
        this.index = null;
      } else {
        this.index = i;
      }
      return (item.already = !item.already);
    },
    first() {
      this.pageIndex = 1;
      this.myNewData = this.myData.slice(0, 10);
    },
    pre() {
      if (this.pageIndex == 1) {
        return false;
      } else {
        this.pageIndex -= 1;
        this.myNewData = this.myData.slice(
          (this.pageIndex - 1) * 10,
          this.pageIndex * 10
        );
      }
    },
    next() {
      if (this.pageIndex == this.pageTotal) {
        return false;
      } else {
        this.myNewData = this.myData.slice(
          this.pageIndex * 10,
          (this.pageIndex + 1) * 10
        );
        this.pageIndex += 1;
      }
    },
    last() {
      this.pageIndex = this.pageTotal;
      this.myNewData = this.myData.slice((this.pageTotal - 1) * 10);
    }
  },
  mounted() {
    //加载数据
    getNewAnnouncement().then(res => {
      if (res.success) {
        this.data = res.data.map(item => {
          let createtime = item.createtime.replace(/-/g, "/");
          let now = new Date();
          let dateitem = new Date(createtime);
          if ((now - dateitem) / 1000 / 60 / 60 / 24 < 3) {
            item.type = "isNew";
          } else {
            item.type = "isOld";
          }
          item.already = false;
          return item;
        });
        this.myNewData = this.myData = this.data.filter(item => {
          return item.type == "isNew";
        });
        this.showLoading = false;
      } else {
        window.toast(data.message);
      }
    });
  },
  components: {
    loadding
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";

.message-enter-active,
.message-leave-active {
  transition: all 0.5s;
}
.message-enter,
.message-leave-to {
  opacity: 0;
}

.notice-box {
  padding: r(20);
  .tab-bar {
    margin-bottom: r(20);
    .tab {
      padding: r(20) 0;
      @include f(32px);
      color: #59dbd0;
      border-bottom: 1px solid #59dbd0;
    }
  }
  .tab-panel {
    background-color: #fffcf6;
    border: 1px solid #d1d1d1;
    @include f(30px);
    overflow: hidden;
    .tab-title {
      display: flex;
      text-align: center;
      padding: r(20);
    }
    .tab-content {
      display: flex;
      text-align: center;
      &.active {
        background: #4db7f4;
        color: #ffffff;
        .span-icon {
          transform: rotate(90deg);
        }
      }
      > div {
        padding: r(20);
        box-sizing: border-box;
      }
    }
    .tab1,
    .tab2 {
      flex: 1;
      border-right: 2px solid #ffffff;
      .span-icon {
        display: block;
      }
    }
    .tab3 {
      flex: 4;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-right: 2px solid #ffffff;
    }
    .tab4 {
      flex: 3;
    }
    .toggle_content_main {
      padding: r(20) r(40);
      color: #969696;
      line-height: 1.6;
      @include f(28px);
      background: rgba($color: #4db7f4, $alpha: .1);
    }
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
}
.tab-ment {
  text-align: center;
  width: 88%;
  height: r(80);
  background: #fff;
  border-radius: r(10);
  margin: r(30) auto;
  span {
    display: inline-block;
    height: r(80);
    line-height: r(80);
    text-align: center;
    color: #333333;
    width: 50%;
    cursor: pointer;
    @include f(30px);
    font-weight: 600;
    &.active {
      background: #4db7f4;
      border-radius: r(10);
      color: #fff;
    }
  }
}
</style>
