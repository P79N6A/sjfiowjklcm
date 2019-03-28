<template>
  <div class="sidebar">
    <div class="i-sidebar">
      <div class="item" :class="{active:filterData.type=='view'}" @click="filterData.type='view'">
        <i class="el-icon-share"></i>
        <p>元素模板</p>
      </div>
      <div class="item" :class="{active:filterData.type=='func'}" @click="filterData.type='func'">
        <i class="el-icon-menu"></i>
        <p>功能模板</p>
      </div>
      <!-- <div class="item" :class="{active:filterData.type=='page'}" @click="filterData.type='page'">
        <i class="el-icon-document"></i>
        <p>单页模板</p>
      </div>-->
      <div class="item" @click="$bus.$emit('openComList')">
        <i class="el-icon-sold-out"></i>
        <p>模版商城</p>
      </div>
    </div>
    <div class="i-select" v-show="filterData.type">
      <el-tabs v-model="filterData.class" v-show="filterData.type=='view'">
        <el-tab-pane label="文本模板" name="text"></el-tab-pane>
        <el-tab-pane label="图片模板" name="img"></el-tab-pane>
        <el-tab-pane label="图文模板" name="imgtext"></el-tab-pane>
      </el-tabs>
      <div v-show="filterData.type=='func'">
        <el-dropdown size="medium" @command="handleCommand">
          <span class="el-dropdown-link" :class="{active:filterData.class=='user'}">用户信息</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{class:'user',key:'login'}">登陆模块</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'register'}">注册模块</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'findback'}">找回密码</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'datumn'}">完善资料</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'bank'}">银行卡列表</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'pwd'}">登陆密码</el-dropdown-item>
            <el-dropdown-item :command="{class:'user',key:'payword'}">提款密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="medium" @command="handleCommand">
          <span class="el-dropdown-link" :class="{active:filterData.class=='money'}">金流</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{class:'money',key:'deposit'}">存款</el-dropdown-item>
            <el-dropdown-item :command="{class:'money',key:'withdraw'}">提款</el-dropdown-item>
            <el-dropdown-item :command="{class:'money',key:'transfer'}">户内转账</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="medium">
          <span class="el-dropdown-link">优惠领取</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>首存</el-dropdown-item>
            <el-dropdown-item>体验金</el-dropdown-item>
            <el-dropdown-item>洗码</el-dropdown-item>
            <el-dropdown-item>生日礼金</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="medium">
          <span class="el-dropdown-link" :class="{active:filterData.class=='log'}">记录查询</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{class:'log',key:'1'}">首存</el-dropdown-item>
            <el-dropdown-item :command="{class:'log',key:'2'}">体验金</el-dropdown-item>
            <el-dropdown-item :command="{class:'log',key:'31'}">洗码</el-dropdown-item>
            <el-dropdown-item :command="{class:'log',key:'1'}">生日礼金</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="medium">
          <span class="el-dropdown-link">营销</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>专属福利</el-dropdown-item>
            <el-dropdown-item>专属客服</el-dropdown-item>
            <el-dropdown-item>洗码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown size="medium">
          <span class="el-dropdown-link">其他</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>站内信</el-dropdown-item>
            <el-dropdown-item>意见反馈</el-dropdown-item>
            <el-dropdown-item>网站公告</el-dropdown-item>
            <el-dropdown-item>侧边工具栏</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="com-list">
        <div class="com-item" v-for="(com,i) in componentList" :key="i" @click="selectCom(com)">
          <div class="com-view" :style="`background-image:url('${cdnurl}${com.thumbnail}')`"></div>
        </div>
      </div>
    </div>
    <div class="i-buttons" v-show="filterData.type">
      <el-tooltip class="item" effect="dark" content="收起菜单" placement="right">
        <span class="item" @click="filterData.type=null">
          <i class="el-icon-caret-left"></i>
        </span>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { getComponents } from "@/api/components";
import { mapGetters } from "vuex";
export default {
  name: "Iheader",

  data() {
    return {
      sideActive: null,
      activeName: "",
      commondType: "",
      commondValue: "",
      componentList: [],
      filterData: {
        type: "",
        class: "",
        key: ""
      }
    };
  },
  props: ["activeTempIndex"],
  computed: {
    ...mapGetters(["cdnurl"])
  },
  methods: {
    handleCommand(data) {
      this.filterData.class = data.class;
      this.filterData.key = data.key;
      this.getComponents();
    },
    // 获取组件列表
    getComponents() {
      getComponents(this.filterData).then(response => {
        if (response.data) {
          this.componentList = response.data;
        }
      });
    },
    selectCom(item) {
      this.$bus.$emit("addTemp", { type: "vue", data: item });
    }
  },
  watch: {
    "filterData.type"(val) {
      this.filterData.class = "";
      this.filterData.key = "";
      this.getComponents();
    },
    "filterData.class"(val) {
      this.getComponents();
    },
    "filterData.key"(val) {
      this.getComponents();
    }
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  width: 70px;
  border-right: solid 1px #ccc;
  height: 100%;
  z-index: 999;
  position: relative;
  .i-sidebar {
    .item {
      padding: 15px 0;
      cursor: pointer;
      transition: all 0.6s;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &:hover,
      &.active {
        color: #fff;
        background: #409eff;
      }
      i {
        font-size: 20px;
      }
      p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
      }
    }
  }
  .i-select {
    background: #fff;
    width: 260px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 70px;
    border-right: solid 1px #ccc;
    .el-dropdown-link {
      cursor: pointer;
      color: #333;
      border-bottom: solid 1px #fff;
      margin: 4px;
      padding: 4px 0;
      display: inline-block;
      min-width: 75px;
      text-align: center;
      font-size: 14px;
      &.active {
        color: #409eff;
        border-bottom: solid 1px #409eff;
      }
    }
    .com-list {
      .com-item {
        height: 94px;
        cursor: pointer;
        margin-bottom: 10px;
        &:hover {
          box-shadow: 1px 1px 8px 0 rgba(0, 0, 0, 0.6);
        }
        .com-view {
          height: 100%;
          width: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          // background-color: #fff;
          background-position: center center;
        }
      }
    }
  }
  .i-buttons {
    position: absolute;
    top: 0;
    left: 330px;
    background: #fff;
    border-left: solid 1px #eee;
    border-right: solid 1px #eee;
    height: 100%;
    .item {
      display: block;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      &.warning {
        background: #e6a23c !important;
        color: #fff;
      }

      &:hover {
        background: #409eff;
        color: #fff;
      }
    }
  }
}
</style>