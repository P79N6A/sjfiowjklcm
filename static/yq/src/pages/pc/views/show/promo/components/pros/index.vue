<template>
  <div id="j-promotion-list" class="promotion-list tab-bd clear">
    <div
      class="slider1"
      v-for="item in allData"
      :key="item.id"
      v-if="!filtType || item.type == filtType"
    >
      <div class="promotion-item">
        <div class="promotion-info">
          <div class="pic">
            <img :src="item.activityImageUrl" alt>
          </div>
          <div class="promotion-intro">
            <div class="clear">
              <h3 class="title">{{item.activityTitle}}</h3>
              <div class="type_name">{{title[item.type]}}</div>
            </div>
            <div class="subtitle">{{item.activitySummary}}</div>
            <div
              class="active_time"
            >活动时间:{{item.activityStartTime.substr(0,10)}}至{{item.activityEndTime.substr(0,10)}}</div>
            <button class="btn-info" @click="itemClk(item)">点击查看详情>></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { promos } from "@/controls/shows/promos";
import { queryLatestPreferential } from "@/api/show";
export default {
  name: "promos-c",
  mixins: [promos],
  data() {
    return {
      cur: {},
      show: false,
      filter: "",
      myData: {
        types: [],
        records: []
      },
      title: {
        "001": "老虎机/棋牌",
        "002": "真人/体育",
        "003": "彩票/捕鱼",
        "004": "其他优惠"
      },
      actId: "",
      htmlInfo: null
    };
  },
  methods: {
    itemClk(item, i) {
      if (this.actId == item.id) {
        this.actId = null;
      } else {
        if (item.activityUrl == "") {
          this.readPros(item.id)
            .then(res => {
              this.$bus.$emit("showProDetail", res);
              // let reg = /<body[^>]*>([\s\S]*)<\/body>/;
              // this.actId = item.id;
              // this.htmlInfo = reg.exec(res.data.activityContent)[1];
              // this.htmlInfo = res.data.activityContent
            })
            .catch(err => {
              console.log(err);
              window.toast(err.message);
            });
        } else {
          window.location.href = item.activityUrl;
        }
      }
    }
  },
  created() {
    // 筛选事件监听
    this.$bus.$on("filtPros", eventData => {
      this.filtType = eventData;
    });
    this.getPromos("pc")
      .then(res => {
        // 设置菜单
        this.$bus.$emit("setProMenu", res.data.types);
      })
      .catch(err => {
        window.toast(err.message);
      });
    console.log(this.$route.query);
    if (this.$route.query && this.$route.query["latestPreferential.id"]) {
      this.readPros(this.$route.query["latestPreferential.id"])
        .then(res => {
          this.$bus.$emit("showProDetail", res);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
    if (this.$route.query && this.$route.query["showid"]) {
      this.readPros(this.$route.query["showid"])
        .then(res => {
          this.$bus.$emit("showProDetail", res);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#j-promotion-list {
  padding: 20px 20px;
  background: #fff;

  .slider1 {
    float: left;
    position: relative;
    margin-right: 20px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .promotion-item {
      width: 373px;
      height: 397px;
      float: left;
      padding: 12px;
      margin-bottom: 20px;
      color: #6b6b6b;
      background: #fff;
      border: 1px solid #9f7d5e;

      .promotion-info {
        position: relative;

        .pic {
          width: 350px;
          overflow: hidden;

          img {
            height: 215px;
            width: 100%;
          }
        }

        .promotion-intro {
          padding: 18px 0 25px;
          overflow: auto;

          .title {
            float: left;
            font-size: 16px;
            color: #59dbd0;
            line-height: 30px;
          }

          .type_name {
            width: 80px;
            float: right;
            line-height: 30px;
            background: #59dbd0;
            text-align: center;
            color: #fff;
          }

          .subtitle {
            margin: 5px 0 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .active_time {
            margin-bottom: 8px;
          }

          .btn-info {
            width: 100%;
            line-height: 40px;
            color: #fff;
            text-align: center;
            background: #4db7f4;
            transition: all 0.3s;
            cursor: pointer;
            &:hover,
            &:focus {
              outline: none;
            }
          }
        }
      }
      &:hover {
        background: #fd4747 !important;
        color: #fff !important;
        .title {
          color: #fff !important;
        }
        .type_name {
          background: #fff !important;
          color: #fd4747 !important;
        }
        .btn-info {
          background: #fff !important;
          color: #59dbd0 !important;
        }
      }
    }
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
