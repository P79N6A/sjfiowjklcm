<template>
  <div class="Layout-container" v-if="layoutTemp">
    <div id="drag-box" ref="imageWrapper" :class="viewLayoutsClass" class="page">
      <div class="show" v-for="(block,i) in layoutTemp.value" :key="i" :class="block.styleSetting.class" :id="block.styleSetting.id"
        :style="[block.styleBg,block.styleStyle,block.styleBorder,block.styleShadow]">
        <!-- 块区域 -->
        <!-- {{block}} -->
        <div v-if="block.isPageView">
          <slot>
            <div>页面内容展示区域</div>
          </slot>
        </div>
        <div v-else>
          <!-- 块区域 -->
          <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :class="row.styleSetting.class" :id="row.styleSetting.id"
            :style="[row.styleBg,row.styleStyle,row.styleBorder,row.styleShadow]">
            <!-- 区块操作按钮 -->
            <!-- 行区域 -->
            <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
              <!-- 格子区域 -->
              <div>
                <!-- 内容-{{col.text}} -->
                <div v-for="(item,i) in col.components" :key="i" style="position:relative;">
                  <sync-component :url="`${cdnurl}${item.src}`" v-if="item.type=='component'"></sync-component>
                  <ishow-component :page-json="item.pageJson" :page-setting="item.pageSetting" v-if="item.type=='ishow'"></ishow-component>
                </div>
                <div>
                  <!-- 内容区域操作按钮 -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getLayoutsOne,
    updateLayouts
  } from "@/api/layouts";
  import {
    mapGetters
  } from "vuex";
  import IshowComponent from "@/components/IshowComponent/main-show.vue";
  import SyncComponent from "vue-async-component";
  export default {
    data() {
      return {
        edittingData: null,
        styleSetting: {},
        styleBg: {},
        styleStyle: {},
        styleBorder: {},
        styleShadow: {},
        componentList: [],
        ishowList: [],
        // 当前el编辑的样式对象
        EditStyle: {
          color: ""
        },
        viewLayoutsClass: "layoutEdit",
        EditStyleShow: false,
        EditType: 1, //根据这个样式编辑弹窗的菜单
        textMap: {
          layout: "整站布局",
          page: "页面布局"
        },
        componentTemp: {
          style: "",
          src: ""
        },
        editCol: null,
        leftActive: false,
        rightActive: false,
        dialogVisible: false, // 样式编辑弹窗
        dialogComVisible: false, // 样式编辑弹窗
        newList: [],
        dataURL: ""
      };
    },
    methods: {
      // 预览布局
      viewLayouts() {},
      // 读取当前布局
      getLayoutsOne(data) {
        getLayoutsOne(data)
          .then(res => {
            // Object.assing(this.layoutTemp, res.data);
            this.layoutTemp = res.data;
          })
          .catch(err => {});
      },
    },
    props: ['layoutTemp'],
    computed: {
      ...mapGetters(["cdnurl"])
    },
    components: {
      SyncComponent,
      IshowComponent
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  .Layout-container {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 84px);
    padding: 20px;

    .page-view {
      font-size: 36px;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      background: #eee;
      border: dashed 2px #ccc;
      margin: 6px 0;
    }
  }

</style>
