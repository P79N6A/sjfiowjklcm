<template>
  <div>
    <div class="i-tool">
      <div>
        <icons></icons>
      </div>
      <div class="tabs">
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
    <layerSet :layerjson="appJson.value.pageJson[activePageIndex].json[activeTempIndex]">元素设置</layerSet>
    <pageSet :pageSet="appJson.value.pageJson[activePageIndex]">页面设置</pageSet>
    <setting :appJson="appJson">全局场景设置</setting>
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

export default {
  name: "Iheader",
  data() {
    return {
      activeTab: 1,
      activePage: 3
    };
  },
  props: ["appJson", "activePageIndex", "activeTempIndex"],
  methods: {},
  components: { icons, pages, layers, pageSet, setting, layerSet }
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
