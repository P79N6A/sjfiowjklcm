<template>
  <transition name="fade">
    <div class="slotgame-filter" v-show="showFilter">
      <div class="filter-btn" v-for="(mydata,i) in data" :key="i">
        <h3>{{mydata.title}}</h3>
        <ul class="filter_item_content cfx">
          <li
            v-for="(item,i) in mydata.data"
            :class="[{active:item.value==mydata.active},'filter_item']"
            :key="item.value"
          >
            <a href="javascript:;" @click="search(item,i,mydata)">{{item.name}}</a>
            <!-- <a v-else @click="open(item.href, item.name, 900, 640, true, islogin)">{{item.name}}</a> -->
          </li>
          <!-- <li class="filter_item" v-if="mydata.filter=='category'" @click="open(Games.href_bbslot_h5, 'BBIN老虎机', 900, 640, true)">
            <a>BBIN平台</a>
          </li>-->
        </ul>
        <div class="space_border_wrap">
          <div class="space_border"></div>
        </div>
      </div>
      <vButton @click="searching">完成</vButton>
    </div>
  </transition>
</template>
<script>
import { Games, platformData } from "@/assets/data";
import vButton from "mobile/components/form/button";
import openWindow from "@/util/openWindow";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      Games,
      showFilter: false,
      data: {
        platform: {
          title: "游戏平台",
          filter: "category",
          active: "",
          data: platformData
        },
        line: {
          title: "赔付线数",
          filter: "line",
          active: "",
          data: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "全赔",
              value: "100-1024"
            },
            {
              name: "1-15",
              value: "1-15"
            },
            {
              name: "16-40",
              value: "16-140"
            },
            {
              name: "41-100",
              value: "41-100"
            },
            {
              name: "其它",
              value: "1025-2048"
            }
          ]
        },
        type: {
          title: "游戏类型",
          filter: "tag",
          active: "",
          data: [
            {
              name: "全部",
              value: ""
            },
            {
              name: "热门",
              value: "HOT"
            },
            {
              name: "最新",
              value: "NEW"
            },
            {
              name: "经典",
              value: "CLA"
            },
            {
              name: "彩金池",
              value: "AMA"
            },
            {
              name: "多旋转老虎机",
              value: "CIR"
            },
            {
              name: "消消乐游戏",
              value: "ETL"
            }
          ]
        }
      }
    };
  },
  methods: {
    search(item, i, filter) {
      // if (filter.filter == "category" && item.value == "LG") {
      //   if (this.islogin) {
      //     openWindow("/static/page/lg/index.html", "LG老虎机", "900", "640");
      //   } else {
      //     window.toast("请先登录!");
      //   }
      // } else {
        if (filter.active == item.value) return;
        filter.active = item.value;
        this.$bus.$emit("serachGame", filter.filter, item.value);
      // }
    },
    open(url, title, w, h, needLogin, loginState) {
      openWindow(url, title, w, h, needLogin, loginState);
    },
    searching() {
      this.showFilter = false;
    }
  },
  computed: {
    ...mapGetters(["islogin"])
  },
  created() {
    //默认选中PT
    // this.data.platform.active = 'PT2TIGER';
    // if (this.$route.params.type) {
    //    this.data.platform.active = this.$route.params.type;
    // }
    this.$bus.$on("showFilter", EventData => {
      this.showFilter = !this.showFilter;
    });
  },
  components: {
    vButton
  }
};
</script>
<style lang="scss">
@import "~mobile/assets/scss/mixin.scss";

.slotgame-filter {
  padding-top: r(20);
  padding-bottom: r($footer-h);
  position: absolute;
  top: r(86);
  left: 0;
  z-index: 99;
  width: 100%;
  height: 70vh;
  overflow-y: scroll;
  background: $main-bg;
  .filter-btn {
    flex: 1;
    @include f(30px);
    white-space: nowrap;
    span {
      vertical-align: middle;
      margin-right: r(16);
    }
    .iconfont {
      @include f(22px);
    }
  }
  h3 {
    padding-left: r(30);
    // margin-bottom: r(20);
    @include f(26px);
    line-height: 1.3;
    color: $iconcl;
    font-weight: normal;
    &:before {
      content: "";
      display: inline-block;
      width: r(6);
      height: r(26);
      background: $iconcl;
      margin-right: r(15);
      vertical-align: top;
    }
  }
  .filter_item_content {
    padding: r(20);
  }
  .filter_item_content .filter_item {
    float: left;
    margin: 0 0 r(20) 0;
    padding: 0 r(14);
    width: 33.33%;
    box-sizing: border-box;
    height: r(52);
    line-height: r(52);
  }
  .filter_item_content .filter_item a {
    display: block;
    background: #f4faff;
    text-align: center;
    color: #090e1d;
    @include f(24px);
    border-radius: r(25);
  }
  .filter_item_content .filter_item a:active,
  .filter_item_content .filter_item.active a {
    background-image: linear-gradient(-51deg, #ff5544 0%, #ff3751 100%);
    color: #ffffff;
  }

  .space_border {
    margin-bottom: r(20);
    height: 1px;
    width: 100%;
    background: rgba($color: #556ebc, $alpha: 0.5);
  }
}
</style>
