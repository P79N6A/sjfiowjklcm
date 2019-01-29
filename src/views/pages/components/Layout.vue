<template>
  <div class="layout-view">
    <div v-html="`<style>${layoutTemp.styleText}</style>`"></div>
    <div id="drag-box" ref="imageWrapper" :class="[viewLayoutsClass]" class="page" :style="[layoutTemp.style.styleBg,layoutTemp.style.styleStyle,layoutTemp.style.styleBorder,layoutTemp.style.styleShadow]">
      <div class="show" v-for="(block,i) in layoutTemp.value" :key="i">
        <div v-if="block.isPageView">
          <div class="page-view">
            <slot>
              <div>页面内容展示区域</div>
            </slot>
          </div>
        </div>
        <div v-else :class="[block.styleSetting.class,block.styleSetting.enterAnimation,'animated']" :id="block.styleSetting.id"
          :style="[block.styleBg,block.styleStyle,block.styleBorder,block.styleShadow]" style="display:flex;justify-content: center;flex-direction: column;">
          <!-- 块区域 -->
          <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :class="[row.styleSetting.class,row.styleSetting.enterAnimation,'animated']"
            :id="row.styleSetting.id" :style="[row.styleBg,row.styleStyle,row.styleBorder,row.styleShadow,{width:row.fullWidth?'100%':'1200px'}]">
            <!-- 区块操作按钮 -->
            <!-- 行区域 -->
            <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
              <!-- 格子区域 -->
              <div>
                <!-- <el-tag type="danger" class="ico-width" v-show="viewLayoutsClass">
                    {{ (col.width/24*1200).toFixed(0)
                    }}PX
                  </el-tag>-->
                <div v-for="(item,i) in col.components" :key="i" style="position:relative;" :class="{'components-col':viewLayoutsClass}">
                  <!-- 每个组件区域 -->
                  <div>
                    <!-- 异步vue组件 -->
                    <sync-component :url="`${cdnurl}${item.src}`" v-if="item.type=='component'" :data-id="item.dataId"
                      :category-id="item.categoryId"></sync-component>
                    <!-- 自定义ishow组件 -->
                    <ishow-component :ishow-id="item._id" v-if="item.type=='ishow'"></ishow-component>
                  </div>
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
  import IshowComponent from "./Ishow";
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
      }
    },
    props: ["layoutTemp"],
    computed: {
      ...mapGetters(["cdnurl"])
    },
    components: {
      SyncComponent,
      IshowComponent
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .Layouts-container {
    position: relative;
    overflow: hidden;

    .show {
      >div {
        display: flex;
        justify-content: center;
      }
    }
  }

</style>
