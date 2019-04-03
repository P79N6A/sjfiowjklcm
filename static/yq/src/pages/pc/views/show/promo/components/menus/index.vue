<template>
  <div class="aside-promotion">
    <ul id="i-tab-promotion" class="tab-promotion clear">
      <li :class="{active:filter==''}">
        <a href="javascript:void(0);" @click="setMenu('')">
          <i class="bg-all_type"></i>全部
        </a>
      </li>
      <li :class="{active:filter==item.typeId}" v-for="(item,i) in menuData" :key="item.typeId + i">
        <a href="javascript:void(0);" @click="setMenu(item.typeId)">
          <i :class="item.ico"></i>
          {{title[item.typeId]}}
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      filter: "",
      title: {
        "001": "老虎机/棋牌",
        "002": "真人/体育",
        "003": "彩票/捕鱼",
        "004": "其他优惠"
      },
      myData: {
        types: []
      },
      menuData: []
    };
  },
  computed: {
    filterData() {
      if (this.filter == "") {
        return this.myData.records;
      }
      return this.myData.records.filter((item, i) => {
        return item.type == this.filter;
      });
    }
  },
  watch: {},
  methods: {
    setMenu(type) {
      this.filter = type;
      this.$bus.$emit("filtPros", type);
    }
  },
  created() {
    this.$bus.$on("setProMenu", eventData => {
      for (let i = 0; i < eventData.length; i++) {
        switch (eventData[i].typeId) {
          case "001":
            eventData[i].ico = "bg-for_forum";
            break;
          case "002":
            eventData[i].ico = "bg-long_term";
            break;
          case "003":
            eventData[i].ico = "bg-time_limit";
            break;
          default:
            eventData[i].ico = "bg-mobile_only";
            break;
        }
      }
      this.menuData = eventData;
    });
  }
};
</script>
<style lang="scss" scoped>
.tab-promotion {
  li {
    width: 20%;
    float: left;
    text-align: center;
    border-right: 1px solid #fff;
    &.active {
      a {
        background: #fff;
        color: #4db7f4;
        .bg-all_type {
          background: url(./images/pro_sprites.png) -10px -98px;
        }
        .bg-for_forum {
          background: url(./images/pro_sprites.png) -183px -10px;
        }
        .bg-long_term {
          background: url(./images/pro_sprites.png) -96px -98px;
        }
        .bg-time_limit {
          background: url(./images/pro_sprites.png) -10px -10px;
        }
        .bg-mobile_only {
          background: url(./images/pro_sprites.png) -142px -53px;
        }
      }
    }
    a {
      height: 60px;
      line-height: 60px;
      font-size: 18px;
      display: block;
      color: #fff;
      background: #4db7f4;
      position: relative;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      -ms-transition: 0.3s;
      text-align: center;
      text-decoration: none;
      .bg-all_type {
        width: 23px;
        height: 23px;
        background: url(./images/pro_sprites.png) -53px -98px;
      }
      .bg-for_forum {
        width: 24px;
        height: 24px;
        background: url(./images/pro_sprites.png) -227px -10px;
      }
      .bg-long_term {
        width: 21px;
        height: 23px;
        background: url(./images/pro_sprites.png) -142px -10px;
      }
      .bg-time_limit {
        width: 24px;
        height: 24px;
        background: url(./images/pro_sprites.png) -54px -54px;
      }
      .bg-mobile_only {
        width: 17px;
        height: 24px;
        background: url(./images/pro_sprites.png) -142px -97px;
      }
      i {
        margin-right: 8px;
        display: inline-block;
        vertical-align: sub;
      }
    }
  }
  &:last-child {
    border-right: none;
  }
}
.clear {
  zoom: 1;

  &::after {
    content: "";
    display: block;
    clear: both;
  }
}
</style>
