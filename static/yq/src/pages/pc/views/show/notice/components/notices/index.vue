<template>
  <div>
    <div class="notice-container cfx">
      <div class="line"></div>
      <div class="fl">
        <div
          class="notice-item"
          v-for="(item,i) in data"
          :key="i"
          v-if="i%2==0&&(item.type=='isNew'||(item.type=='isOld'&&showHistory))"
        >
          <div class="date">{{item.createtime | Date}}</div>
          <div class="title">{{item.title}}</div>
          <div class="info" v-html="item.content.replace(/\r\n/g,'<br>')"></div>
          <div class="icos">
            <span class="triangle"></span>
            <span class="circle"></span>
          </div>
        </div>
      </div>
      <div class="fr" style="margin-top:40px;">
        <div
          class="notice-item"
          v-for="(item,i) in data"
          :key="i"
          v-if="i%2==1&&(item.type=='isNew'||(item.type=='isOld'&&showHistory))"
        >
          <div class="date">{{item.createtime | Date}}</div>
          <div class="title">{{item.title}}</div>
          <div class="info" v-html="item.content.replace(/\r\n/g,'<br>')"></div>
          <div class="icos">
            <span class="circle"></span>
            <span class="triangle"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="cfx history" @click="showHistory=!showHistory">
      <span v-if="!showHistory">查看历史公告</span>
      <span v-else>收起历史公告</span>
    </div>
  </div>
</template>
<script>
import { getNewAnnouncement } from "@/api/show";
import { SETTING } from "@/assets/data";
// 这里需要添加一个功能，点击进来后自动打开某个公告的详情
export default {
  data() {
    return {
      cur: {},
      show: false,
      SETTING,
      data: [],
      showHistory: false
    };
  },

  methods: {
    itemClk(item, i) {
      item.already = !item.already;
      // this.cur=item;
    },
    checkOpen() {
      // 看下是否有带参数过来，自动展开对应的的详情
      if (this.$route.params && this.$route.params.id) {
        const _index = this.data.findIndex(item => {
          return item.id == this.$route.params.id;
        });
        if (_index >= 0) {
          this.itemClk(this.data[_index]);
        }
      }
    }
  },
  created() {
    //加载数据
    getNewAnnouncement().then(res => {
      if (res.success) {
        this.data = res.data.map(item => {
          let now = new Date();
          let date = new Date(item.createtime);
          if ((now - date) / 1000 / 60 / 60 / 24 <= 3) {
            item.type = "isNew";
          } else {
            item.type = "isOld";
          }
          item.already = false;
          return item;
        });
      } else {
        toast(data.message);
      }
    });
  },
  activated() {
    this.checkOpen();
  }
};
</script>
<style lang="scss" scoped>
.notice-container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 30px;

  .line {
    position: absolute;
    height: 100%;
    width: 2px;
    background: #ccc;
    transform: translateX(-50%);
    left: 50%;
  }
  .notice-item {
    .date {
      font-size: 22px;
      font-weight: bold;
      color: #333;
      padding-bottom: 10px;
    }
    .title {
      font-size: 22px;
      color: red;
      padding-bottom: 10px;
    }
    .info {
      color: rgb(143, 106, 62);
      font-size: 14px;
    }
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 520px;
    margin-top: 40px;
    position: relative;
  }
  .fl {
    .notice-item {
      margin-left: 46px;
      .date,
      .title {
        text-align: right;
      }
    }
    .icos {
      position: absolute;
      left: 100%;
      top: 48%;
      width: 80px;
      text-align: left;
      .triangle {
        display: inline-block;
        background: #fff;
        border-top: solid 1px #ddd;
        border-right: solid 1px #ddd;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        transform: rotate(45deg) translateX(-60%);
      }
      .circle {
        display: inline-block;
        width: 20px;
        height: 20px;
        z-index: 10;
        border-radius: 50%;
        background: #4db7f4;
      }
    }
  }
  .fr {
    .notice-item {
      margin-right: 46px;
      .date,
      .title {
        text-align: left;
      }
    }
    .icos {
      position: absolute;
      right: 100%;
      top: 48%;
      width: 80px;
      text-align: right;
      .triangle {
        display: inline-block;
        background: #fff;
        border-top: solid 1px #ddd;
        border-right: solid 1px #ddd;
        width: 20px;
        height: 20px;
        transform: rotate(-135deg) translateX(-60%);
      }
      .circle {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        z-index: 10;
        border-radius: 50%;
        background: #4db7f4;
      }
    }
  }
}
.history {
  width: 1200px;
  margin: 10px auto;
  height: 50px;
  line-height: 50px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  background: #4db7f4;
  border-radius: 5px;
  transition: all 0.3s;
  cursor: pointer;
}
</style>
