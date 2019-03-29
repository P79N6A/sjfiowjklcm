<template>
  <!-- <div class="promotion">
    <ul>
      <li v-for="item in  allData" :key="item.id"  v-if="!filtType || item.type == filtType">
        <img v-lazy="item.activityImageUrl"  :alt="item.activitySummary" :title="item.activitySummary" :src="item.activityImageUrl">
        <p><button @click="itemClk(item)">点击查看<span>&gt;</span></button></p>
      </li>
    </ul>
  </div>-->
  <div class="list-container">
    <div class="container">
      <!-- ngRepeat: item in promo.DataList -->
      <div
        class="promo-box ng-scope"
        v-for="item in allData"
        v-if="!filtType || item.type == filtType"
        style
        :key="item.id"
      >
        <div class="promo-item">
          <div class="time ng-binding">{{item.activityStartTime}}至{{item.activityEndTime || '待定'}}</div>
          <div class="row card-row">
            <div class="left">
              <div class="card card-info">
                <div class="card-title center ng-binding">{{item.activityTitle}}</div>
                <div class="card-content">
                  <div class="row short-describe">
                    <span class="ng-binding">{{item.activitySummary}}</span>
                  </div>
                </div>
                <div class="card-action">
                  <a href="javascript:void(0);" @click="itemClk(item)">查看活动</a>
                  <a href="javascript:void(0);" class="ng-binding unlike">{{item.typeName}}</a>
                </div>
              </div>
            </div>
            <div class="left">
              <div class="card">
                <div class="card-image">
                  <img :src="item.activityImageUrl" :key="item.id">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end ngRepeat: item in promo.DataList -->
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
      }
    };
  },
  methods: {
    itemClk(item, i) {
      this.readPros(item.id)
        .then(res => {
          this.$bus.$emit("showProDetail", res);
        })
        .catch(err => {
          console.log(err);
          window.toast(err.message);
        });
    }
  },
  created() {
    // 筛选事件监听
    this.$bus.$on("filtPros", eventData => {
      console.log(eventData);

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
  }
};
</script>
<style lang="scss" scoped>
.list-container {
  display: block;
  padding-top: 40px;
  padding-bottom: 20px;
  width: 100%;
  min-height: 188px;
  box-shadow: inset 0 20px 20px -20px #0d1932;
  // background: url(./images/bg.jpg) repeat-y top;
  background: linear-gradient(270deg, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9, #313de1, #2b9cd8, #354ee8, #2b9dd9);
  background-size: 1000% 1000%;
  -webkit-animation: ocean-wave 60s ease infinite;
  animation: ocean-wave 60s ease infinite;
  .promo-box {
    padding-left: 47px;
    .promo-item {
      padding: 40px;
      padding-left: 50px;
      border-left: 2px solid hsla(0, 0%, 72%, 0.6);
      width: 100%;
      &:first-child {
        padding-top: 0;
      }
      .time {
        color: #fff;
        &:before {
          content: " ";
          display: block;
          position: absolute;
          background: url(./images/t_point.png) no-repeat;
          width: 21px;
          height: 21px;
          margin-left: -62px;
        }
      }
      .card-row {
        margin-top: 20px;
        display: flex;
        .left {
          &:first-child {
            flex: 1;
          }
          &:last-child {
            flex: 2;
          }
        }
      }
      .card {
        width: 90%;
        height: 307px;
        margin: 0;
        &.card-info {
          width: 100%;
          background: url(./images/bg.jpg) no-repeat center;
          color: #fff;
        }
        .card-content {
          position: relative;
          height: 200px;
          .short-describe {
            height: 72px;
            display: block;
            word-break: break-all;
          }
          .sec-btn {
            display: inline-block;
            padding: 2px 9px;
            border: 1px solid #2293fc;
            border-radius: 50px;
            margin-left: 7px;
            font-size: 12px;
          }
          .card-content-row {
            position: absolute;
            bottom: -5px;
            right: 20px;
          }
        }
        .card-title {
          background: #2293fc;
          font-size: 16px;
          color: #fff;
          padding: 15px 0;
        }
        .card-action {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          text-align: center;
          a {
            width: 50%;
            color: #2293fc;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            border-left: 1px solid #efefef;
            i {
              vertical-align: bottom;
            }
            &.unlike {
              color: #787878;
              cursor: default;
              &:hover {
                color: #787878;
              }
            }
            &:hover {
              color: #2293fc;
            }
            &:first-child {
              border-left: none;
            }
          }
        }
      }
      .card-image img {
        width: 100%;
        height: 307px;
      }
    }
  }
}
.pagination ul {
  margin: 0;
  li a {
    color: hsla(0, 0%, 100%, 0.7);
  }
}
@-webkit-keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}


@keyframes ocean-wave {
  0% {
    background-position: 0 55%;
  }

  50% {
    background-position: 100% 46%;
  }

  to {
    background-position: 0 55%;
  }
}
</style>
