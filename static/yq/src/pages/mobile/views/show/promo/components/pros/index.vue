<template>
  <div class="promotions_content">
    <div class="contentBox">
      <a class="promotion_item" v-for="(item,i) in filterAllData" :key="item.id">
        <div class="itemBox" @click="itemClk(item,i)">
          <div class="imgbox">
            <img
              v-lazy="item.activityImageUrl"
              :alt="item.activitySummary"
              :title="item.activitySummary"
            >
          </div>
          <div class="title_wrap">
            <h2>{{item.activityTitle}}</h2>
            <p>{{item.activitySummary}}</p>
            <div class="icon_with_text">查看详情</div>
            <!-- <div
              class="icon_with_text join"
              v-if="item.type == '004'&&islogin"
              @click.stop="joinIn"
            >我要参与</div>-->
          </div>
        </div>
        <info :htmlInfo="htmlInfo" :class="{show:item.id == showOne}"></info>
      </a>
    </div>
  </div>
</template>
<script>
import { scrolltool } from "@/vue-extend/scrolltool";
import { promos } from "@/controls/shows/promos";
import info from "../info";
import { mapGetters } from "vuex";
export default {
  name: "promos-c",
  mixins: [promos, scrolltool],
  data() {
    return {
      htmlInfo: {},
      showOne: null,
      menuInfo: []
    };
  },
  computed: {
    ...mapGetters(["islogin", "isAgent", "isUser"]),
    filterAllData() {
      return this.allData.filter(item => {
        return !this.filtType || item.type == this.filtType;
      });
    }
  },
  methods: {
    itemClk(item, i) {
      if (item.activityUrl == "") {
        if (this.showOne == item.id) {
          this.showOne = null;
        } else {
          this.showOne = item.id;
        }

        // 自动滚动
        let iTarget = document.querySelectorAll(".contentBox .promotion_item");
        console.log(i);
        this.scrollTo(116 * i + 50, 1);
        this.readPros(item.id)
          .then(res => {
            // this.$bus.$emit('showProDetail',res)
            this.htmlInfo = res.data;
            this.htmlInfo.index = i;
          })
          .catch(err => {
            console.log(err);
            window.toast(err.message);
          });
      } else {
        window.location.href = item.activityUrl;
      }
    },
    findActive() {
      if (this.$route.query && this.$route.query["latestPreferential.id"]) {
        const _index = this.allData.findIndex(item => {
          return item.id == this.$route.query["latestPreferential.id"];
        });
        if (_index >= 0) {
          this.itemClk(this.allData[_index], _index);
        }
      }
    },
    joinIn() {
      if (!this.islogin) {
        window.toast("请先登录");
        return false;
      }
      if (this.isUser) {
        this.$router.push({
          name: "user_savesend"
        });
        return false;
      }
      if (this.isAgent) {
        window.toast("代理无法参与");
        return false;
      }
    }
  },
  created() {
    // 筛选事件监听
    this.$bus.$on("filtPros", eventData => {
      this.filtType = eventData;
    });
    this.getPromos("mobile")
      .then(res => {
        // this.menuInfo[0] = res.data.types[3],
        // this.menuInfo[1] = res.data.types[2],
        // this.menuInfo[2] = res.data.types[0],
        // this.menuInfo[3] = res.data.types[1]
        // 设置菜单
        this.$bus.$emit("setProMenu", res.data.types);
        this.findActive();
      })
      .catch(err => {
        window.toast(err.message);
      });
  },
  activated() {
    // 是否要显示
    this.findActive();
  },
  components: {
    info
  }
};
</script>
<style lang="scss" scoped>
@import "~mobile/assets/scss/mixin.scss";
.promotions_content {
  padding: r(20);
}
.show {
  height: auto;
}
.promotion_item {
  display: block;
  padding: r(10);
  margin-bottom: r(20);
  border-radius: r(20);
  overflow: hidden;
  background: #f3f3f3;
  border: 1px solid #dadada;
  .itemBox {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .imgbox {
    width: 50%;
  }
  img {
    display: block;
    width: 100%;
    height: r(180);
  }
  .title_wrap {
    width: 50%;
    position: relative;
    padding: r(10) 0 r(10) r(20);
    h2 {
      @include f(32px);
      font-weight: normal;
      color: #ff0000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p {
      color: #9c6a39;
      line-height: 2;
      @include f(28px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-top: r(20);
    }
  }
  .icon_with_text {
    display: inline-block;
    margin-right: r(6);
    color: #ffffff;
    background: #4db7f4;
    border-radius: r(8);
    padding: r(6);
    @include f(32px);
    &.join {
      margin: 0;
    }
  }
}
</style>
