<template>
  <div>
    <div class="i-tool">
      <div>
        <icons :history="history" :historyIndex="historyIndex"></icons>
      </div>
      <div class="tabs" v-show="showMenu">
        <div class="title">
          <span class="menu" @click="activeTab=1" :class="{active:activeTab==1}">
            <i class="el-icon-menu"></i> 图层管理
          </span>
          <span class="menu" @click="activeTab=2" :class="{active:activeTab==2}">
            <i class="el-icon-tickets"></i> 页面管理
          </span>
        </div>
        <div class="tab-show" v-show="activeTab==1">
          <layers
            :tempJson="appJson.value.pageJson[activePageIndex].json"
            :activeTempIndex="activeTempIndex"
          ></layers>
        </div>
        <div class="tab-show" v-show="activeTab==2">
          <pages
            :pageJson="appJson.value.pageJson"
            :activePageIndex="activePageIndex"
            :activeTempIndex="activeTempIndex"
          ></pages>
        </div>
      </div>
    </div>
    <layerSet
      :layerjson="appJson.value.pageJson[activePageIndex].json[activeTempIndex]"
      :pages="appJson.value.pageJson"
    >元素设置</layerSet>
    <pageSet :pageSet="appJson.value.pageJson[activePageIndex]">页面设置</pageSet>
    <setting :appJson="appJson">全局场景设置</setting>
    <imgList>图片资源框</imgList>
    <svgList>图片资源框</svgList>
    <componentList>系统组件资源框</componentList>
    <contentEdit>数据编辑</contentEdit>
    <!-- <dataOne>单个数据</dataOne> -->
    <dataList>数据列表</dataList>
  </div>
</template>

<script>
import icons from "./icons.vue";
import layers from "./layers.vue";
import pages from "./pages.vue";
// 其他菜单
import pageSet from "./pageSet.vue";
import layerSet from "./layerSet.vue";
import setting from "./setting.vue";
// 媒体资源相关
import imgList from "@/components/ImgList";
import svgList from "@/components/svgList";
import componentList from "@/components/componentList";
// 组建数据相关
import contentEdit from "@/components/Content";

// import dataOne from "@/components/dataOne";
// import dataList from "@/components/dataList";

export default {
  name: "Iheader",
  data() {
    return {
      activeTab: 1,
      activePage: 3,
      showMenu: true
    };
  },
  props: [
    "appJson",
    "activePageIndex",
    "activeTempIndex",
    "historyIndex",
    "history"
  ],
  methods: {},
  created() {
    this.$bus.$on("setMenus", eventData => {
      this.showMenu = !this.showMenu;
    });
  },
  components: {
    icons,
    pages,
    layers,
    pageSet,
    setting,
    layerSet,
    imgList,
    svgList,
    componentList,
    contentEdit,
    // dataOne,
    // dataList
  }
};
</script>

<style scoped lang="scss">
.i-tool {
  display: flex;
  height: calc(100vh - 50px);
  .tabs {
    width: 100%;
    background: #fff;
    .title {
      display: flex;
      .menu {
        flex: 1;
        color: #343434;
        background: #eee;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          background: #409eff;
          color: #fff;
        }
      }
    }
    .tab-show {
      width: 230px;
      height: calc(100vh - 90px);
      padding-right: 8px;
      &:hover {
        padding-right: 0;
        overflow-y: scroll;
      }
    }
  }
}
</style>
