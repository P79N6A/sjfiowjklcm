<template>
  <div class="search_container clear">
    <div class="search-info fl">
      <div class="search-hd clear" id="j-searchForm">
        <div class="fl">
          <i class="bg-search"></i>
          <label for class="label">搜索游戏：</label>
          <div class="ipt-group">
            <div>
              <input type="text" v-model="inputVal" class="ipt j-ipt">
            </div>
            <div class="select-list j-select"></div>
          </div>
          <button class="btn btn-search j-btnSearch" @click="itemClick">搜索</button>
        </div>
        <div class="fr flex">
          <a
            href="javascript:void(0);"
            class="btn-played"
            v-if="islogin"
            @click="moreSearch('his','yes','his');"
          >最近玩过</a>
          <a
            href="javascript:void(0);"
            class="btn-fav"
            v-if="islogin"
            @click="moreSearch('fav','yes','fav');"
          >我的收藏</a>
          <button id="j-resetBtn" class="btn-reset" @click="reset">重置选择</button>
        </div>
      </div>
      <div class="search-bd clear">
        <div class="filter-content">
          <div class="tab-bd">
            <div class="tab-panel">
              <dl class="search-row">
                <dt>游戏类型：</dt>
                <dd>
                  <a
                    href="javascript:void(0);"
                    @click="searchData.tag = ''"
                    :class="{active:searchData.tag == ''}"
                  >全选</a>
                  <a
                    href="javascript:void(0);"
                    v-for="item in tag"
                    :key="item.value"
                    :class="{active:searchData.tag == item.value}"
                    @click="searchData.tag = item.value"
                  >{{item.name}}</a>
                </dd>
              </dl>
              <dl class="search-row">
                <dt>赔钱线数：</dt>
                <dd>
                  <a
                    href="javascript:void(0);"
                    @click="searchData.line = ''"
                    :class="{active:searchData.line == ''}"
                  >全选</a>
                  <a
                    href="javascript:void(0);"
                    v-for="item in line"
                    :key="item.value"
                    :class="{active:searchData.line == item.value}"
                    @click="searchData.line = item.value"
                  >{{item.name}}</a>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <!-- <div id="pt-download-content" class="download-content" v-show="cur == 'PT'">
          <div style="color: #4db7f4;font-weight: 600;">PT客户端下载</div>
          <div class="clear">
            <div class="down_box fl">
              <div>电脑版</div>
              <div style="padding-top:7px;">
                <a :href="Download.ptpc">
                  <img class="down_pic" src="./images/download.png">
                </a>
              </div>
            </div>
            <div class="down_box fl">
              <div>安卓版</div>
              <div>
                <router-link :to="{name:'downloadIndex'}" target="_blank">
                  <img class="down_pic" :src="generateQRCode(Download.ptMobile,140)">
                </router-link>
              </div>
            </div>
          </div>
        </div>-->
        <div id="pt-download-content" class="download-content" v-show="cur == 'PT2TIGER'">
          <div style="color: #4db7f4;font-weight: 600;">PT国际版下载</div>
          <div class="clear">
            <div class="down_box fl">
              <div>电脑版</div>
              <div style="padding-top:7px;">
                <a :href="Download.pt2pc">
                  <img class="down_pic" src="./images/download.png">
                </a>
              </div>
            </div>
            <div class="down_box fl">
              <div>安卓版</div>
              <div>
                <router-link :to="{name:'downloadIndex'}" target="_blank">
                  <img class="down_pic" :src="generateQRCode(Download.pt2Mobile,140)">
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div id="dt-download-content" class="download-content" v-show="cur == 'DT'">
          <div style="color: #4db7f4;font-weight: 600;">DT客户端扫码下载</div>
          <div class="clear">
            <router-link :to="{name:'downloadIndex'}" target="_blank">
              <div class="down_box fl">
                <div>苹果版</div>
                <div>
                  <img class="down_pic" :src="generateQRCode(Download.dtIos,140)">
                </div>
              </div>
              <div class="down_box fl">
                <div>安卓版</div>
                <div>
                  <img class="down_pic" :src="generateQRCode(Download.dtAndroid,140)">
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="transfer-box fr">
      <div class="transfer-hd">快速转账：</div>
      <div class="transfer-bd" style="padding-bottom:10px;">
        <div class="clear">
          <select name id="transferGameOut" class="select fl" v-model="data.transferGameOut">
            <option value>请选择</option>
            <option v-for="item in Money" :key="item.value" :value="item.value">{{item.name}}</option>
          </select>
          <div class="transferto fl">
            <p>转至</p>
            <p>→</p>
          </div>
          <select
            name
            id="transferGameIn"
            class="select fl"
            v-model="data.transferGameIn"
            :disabled="isdisabled"
          >
            <option value>请选择</option>
            <option
              value="MAIN"
              v-show="data.transferGameOut!='DEPUTY'&&data.transferGameOut!='MAIN'"
            >主账户</option>
            <option
              value="DEPUTU"
              v-show="data.transferGameOut!='MAIN'&&data.transferGameOut!='DEPUTY'"
            >副账户彩金</option>
            <option v-for="item in otherMoney" :key="item.value" :value="item.value">{{item.name}}</option>
          </select>
        </div>
        <div class="text-left" v-if="!islogin">
          <span
            id="transferMoneryOutDiv"
            style="display: inline-block;width: 104px;height: 30px;color:#ea5048;text-align: center"
          >尚未登录！请重新登录！</span>
          <span
            id="transferMoneryInDiv"
            style="display: inline-block;width: 104px;height: 30px;color:#ea5048;float: right;text-align: center"
          >尚未登录！请重新登录！</span>
        </div>
        <div class="text-left">
          <span>输入金额</span>
          <input
            type="text"
            id="transferGameMoney"
            :disabled="!islogin"
            class="input"
            v-model="data.transferGameMoney"
          >
        </div>
        <input type="button" class="btn_transfer1" disabled value="请先登录账户" v-show="!islogin">
        <input type="button" class="btn_transfer" value="确认转账" @click="submitForm" v-show="islogin">
      </div>
    </div>
  </div>
</template>
<script>
import {
  Games,
  Money,
  otherMoney,
  platformData,
  Download
} from "@/assets/data";
import { generateQRCode } from "@/api/show";
import { transfer } from "@/controls/money/transfer";
import { mapGetters } from "vuex";
export default {
  mixins: [transfer],
  data() {
    return {
      Games,
      Money,
      otherMoney,
      platformData,
      Download,
      inputVal: "",
      inputData: [],
      search_result: false,
      cur: "PT",
      searchData: {
        platform: "",
        tag: "",
        line: ""
      },
      line: [
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
          value: "16-40"
        },
        {
          name: "41-100",
          value: "41-100"
        },
        {
          name: "其它",
          value: "1025-2048"
        }
      ],
      tag: [
        {
          name: "热门游戏",
          value: "HOT"
        },
        {
          name: "最新游戏",
          value: "NEW"
        },
        {
          name: "经典游戏",
          value: "CLA"
        },
        {
          name: "彩金池游戏",
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
      ],
      isdisabled: false
    };
  },
  computed: {
    ...mapGetters(["islogin", "wallet"])
  },
  watch: {
    inputVal(val) {
      this.$bus.$emit("searchByInput", val);
    },
    "searchData.platform"(val) {
      this.$bus.$emit("serachGame", "category", val);
    },
    "searchData.tag"(val) {
      this.$bus.$emit("serachGame", "tag", val);
    },
    "searchData.line"(val) {
      this.$bus.$emit("serachGame", "line", val);
    },
    $route(val) {
      this.searchData.platform = val.params.type;
      this.cur = val.params.type;
    },
    "data.transferGameOut"(val) {
      if (val != "MAIN" && val != "DEPUTY") {
        this.data.transferGameIn = "MAIN";
        this.isdisabled = true;
      } else if (val == "MAIN") {
        this.data.transferGameIn = "";
        this.isdisabled = false;
      } else if (val == "DEPUTY") {
        this.data.transferGameIn = "";
        this.isdisabled = false;
      }
    }
  },
  methods: {
    moreSearch(key, value, type) {
      this.$bus.$emit("serachInit");
      this.$bus.$emit("serachGame", key, value);
    },
    submitForm() {
      this.transferSubmit(this.data)
        .then(res => {
          window.toast(res.message);
          // this.resetForm('transferForm')
          this.data.transferGameOut = "";
          this.data.transferGameIn = "";
          this.data.transferGameMoney = "";
        })
        .catch(err => {
          window.toast(err.message);
        });
    },
    generateQRCode(url, size) {
      return generateQRCode(url, size);
    },
    search(val) {
      // 当前tag点击事件
      switch (val) {
        case 1:
          this.$bus.$emit("serachGame", "category", "");
          break;
        case 2:
          this.$bus.$emit("serachGame", "tag", "NEW");
          break;
        case 3:
          this.$bus.$emit("serachGame", "tag", "HOT");
          break;
        case 4:
          // this.$bus.$emit('serachGame', 'tag', 'NEW');
          window.toast("敬请期待!");
          break;
        case 5:
          // this.$bus.$emit('serachGame', 'tag', 'NEW');
          window.toast("敬请期待!");
          break;
        default:
          break;
      }
    },
    itemClick(item) {
      this.$bus.$emit("searchByInput", val);
    },
    reset() {
      this.searchData.platform = "";
      this.searchData.tag = "";
      this.searchData.line = "";
      this.inputVal = "";
      this.search(1);
    }
  },
  components: {},
  created() {
    if (this.$route && this.$route.params.type) {
      this.searchData.platform = this.$route.params.type;
      this.cur = this.$route.params.type;
    }
  }
};
</script>
<style lang="scss" scoped>
.search_container {
  border-bottom: 1px dashed #c9c9c9;
  height: 226px;
}

.search-info {
  .label {
    display: inline-block;
    vertical-align: middle;
    color: #4db7f4;
    text-align: left;
    font-size: 18px;
    font-weight: 600;
  }

  width: 77%;
  padding-top: 15px;
  border-right: 1px dashed #c1c1c1;

  .search-hd {
    height: 55px;
    padding: 7px 17px 0 8px;
    border-bottom: 1px dashed #c1c1c1;
    border-right: 1px dashed #c1c1c1;
    .flex {
      display: flex;
      justify-content: space-between;
      width: 355px;
    }
  }

  .bg-search {
    width: 26px;
    height: 26px;
    margin-right: 7px;
    display: inline-block;
    vertical-align: middle;
    background: url(./images/slot_sprites51.png) -63px -185px;
  }

  .ipt-group {
    width: 255px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    background-color: #fff1f1;
    border-radius: 6px;
    border: 1px solid red;

    .ipt {
      border: none;
      width: 100%;
      padding: 0 10px;
      height: 34px;
      line-height: 34px;
      background-color: transparent;
      color: #c1c1c1;
    }
  }

  .btn-reset {
    width: 114px;
    height: 36px;
    font-size: 16px;
    color: #fff;
    background: #787876;
    border-radius: 7px;
    cursor: pointer;
  }

  .btn-played {
    width: 114px;
    height: 36px;
    font-size: 16px;
    color: #fff;
    background: #787876;
    border-radius: 7px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-fav {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 114px;
    height: 36px;
    font-size: 16px;
    color: #fff;
    background: #787876;
    border-radius: 7px;
    cursor: pointer;
  }

  .search-hd .btn {
    width: 92px;
    height: 36px;
    vertical-align: middle;
    background: #4db7f4;
    border-radius: 7px;
    font-size: 16px;
    color: #fff;
  }

  .select-list {
    display: none;
    position: absolute;
    z-index: 9;
    left: -1px;
    right: -1px;
    top: 31px;
    background: rgb(68, 64, 55);
    border: 1px solid #5c5853;
    border-top: none;
    border-radius: 0 0 8px 8px;

    a {
      display: block;
      color: #c1c1c1;
      padding: 6px 6px 6px 12px;
      text-align: left;

      &:hover {
        background: #3a362a;
      }
    }
  }

  .show-action {
    padding-top: 10px;
    width: 150px;
    text-align: center;
    border-left: 1px dashed #5c5853;
    height: 158px;
  }

  .search-row {
    // height: 38px;
    line-height: 38px;
    margin-bottom: 5px;

    dt,
    dd {
      display: inline-block;
      vertical-align: middle;
    }

    dt {
      margin-right: 20px;
      color: #4db7f4;
    }

    a {
      display: inline-block;
      margin-right: 18px;
      line-height: 28px;
    }
  }

  #tab-ttg .search-row a {
    margin-right: 9px;
  }

  .search-row {
    .active {
      background: #4db7f4;
      padding: 0 7px;
      color: #fff;
      border-radius: 7px;
    }

    .btn-reset {
      width: 56px;
      height: 26px;
      line-height: 26px;
      background: #d9d9d9;
      margin-top: 7px;
      border-radius: 4px;
      margin-right: 0;
    }
  }

  .btn.btn-two {
    color: #fb9b08;
    padding: 10px;
    line-height: 1;
    height: auto;

    .iconfont {
      font-size: 42px;
      display: block;
      margin: 0 auto 10px;
    }
  }

  .search-bd {
    margin-top: 15px;
    padding-left: 30px;
    padding-bottom: 16px;
    border: none;
    overflow: hidden;
    text-align: left;
    border: none;
  }
}

.search-bd {
  .filter-content {
    width: 77%;
    float: left;
    border-right: 1px dashed #c9c9c9;
  }

  .download-content {
    width: 23%;
    float: right;
    text-align: center;

    .down_box {
      width: 50%;
    }

    .down_pic {
      width: 75px;
      height: 75px;
    }
  }
}

.transfer-box {
  width: 23%;
}

.wp1 {
  background: #fff;
}

.transfer-box {
  .transfer-hd {
    font-size: 18px;
    padding: 10px 0 0 20px;
    color: #4db7f4;
    font-weight: 600;
    text-align: left;
  }

  .transfer-bd {
    padding: 15px 0 0 20px;
  }

  .transferto {
    padding: 2px 5px;
    color: #fb9b08;
    text-align: center;
    color: #4db7f4;

    p {
      line-height: 1;
    }
  }

  .select {
    display: inline-block;
    width: 104px;
    height: 32px;
    border: none;
    background: #4db7f4;
    color: #fff;
    padding-left: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .input {
    width: 186px;
    margin-left: 4px;
    margin-top: 11px;
    height: 34px;
    line-height: 34px;
    color: #555;
    border: 1px solid #4db7f4;
    border-radius: 7px;
  }

  .btn_transfer {
    margin-top: 8px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 32px;
    background: #4db7f4;
    color: #fff;
    cursor: pointer;
  }
  .btn_transfer1 {
    margin-top: 8px;
    width: 100%;
    text-align: center;
    font-size: 18px;
    line-height: 32px;
    background: #ccc;
    color: #545454;
    cursor: not-allowed;
  }
}

/* .transfer-box .btn {
    width: 100%;
    background: #fb9b08;
    color: #3b342a;
    font-size: 18px;
} */
</style>
