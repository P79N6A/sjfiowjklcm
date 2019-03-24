<template>
  <div class="Layout-view">
    <!-- 页面操作区域 -->
    <div class="drag-box" id="drag" ref="imageWrapper">
      <div class="rows" v-for="(row,i) in layoutTemp.value.rows" 
      :key="i" 
        >
        <div class="contents" v-for="
        (content,j) in row.contents" :key="j" 
          :style="{width:content.fullWidth?'100%':'90%'}"
          >
          <el-row class="cols">
            <el-col class="box" v-for="(box,k) in content.boxs" :key="k" :span="box.width">
              <div class="view">
                <!-- 格子区域 -->
                <div v-for="(item,i) in box.components" :key="i" style="position:relative;" :class="{'components-col':viewLayoutsClass}">
                  <!-- 内容组件渲染 -->
                  {{item.name}}
                  <!-- <ishow-pre :ishow-id="item._id" :short-id="item.shortId"></ishow-pre> -->
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
  import IshowPre from "@/components/H5Preview";
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
            getStyle(style){

        return {
            // 基础
            // width: style.base.width + "px",
            height: style.base.height?style.base.height + "px":'auto',
            transform: `rotate(${style.base.rotate}deg)`,
            opacity: style.base.opacity / 100,
            overflow:style.base.overflow,
            zIndex:style.base.zIndex,
            // 定位
            position:style.position.position,
            left:style.position.left+'px',
            right:style.position.right+'px',
            top:style.position.top+'px',
            bottom:style.position.bottom+'px',
            // 边框
            borderWidth: style.border.borderWidth + "px",
            borderRadius: style.border.borderRadius + "px",
            borderColor: style.border.borderColor,
            borderStyle: style.border.borderStyle,
            // 背景
            "backgroundImage": `url('${this.cdnurl}${style.bg.backgroundImage}')`,
            "backgroundColor":style.bg.backgroundColor,
            "backgroundSize": style.bg.backgroundSize,
            "backgroundRepeat": style.bg.backgroundRepeat,
            "backgroundPosition": style.bg.backgroundPosition,
            "backgroundAttachment":style.bg.backgroundAttachment,
            // 阴影
            boxShadow: `${style.shadow.shadowColor} ${
              style.shadow.shadowX
            }px ${style.shadow.shadowY}px ${
              style.shadow.shadowFuzzy
            }px ${style.shadow.shadowDire}px ${
              style.shadow.shadowinSet ? "inset" : ""
            }`
        }

        return `background:blue;`
      }
    },
    props: ["layoutTemp"],
    computed: {
      ...mapGetters(["cdnurl"])
    },
    components: {
      IshowPre
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .Layout-view {
    position: relative;
    overflow: hidden;
   .drag-box {
      // min-height: calc(100vh - 60px);
      .rows {
        position: relative;
        display: flex;
        flex-flow: column;
        align-items: center;
        background:#fff;
        // margin-bottom:10px;
        padding:10px;
        &:nth-child(2n-1){
          background:#f7f8fb;
        }
        .contents {
          position: relative;
          margin:4px;
        border:solid 1px #bbb;
        box-shadow: 1px 1px 10px 2px #eee;
        min-height:50px;
        padding:6px;
        border-radius:3px;
          .box {
            position: relative;
            border:dashed 1px #eee;
            min-height:30px;
            .view {
              overflow: hidden;
              .components-col{
                border:solid 1px #eee;
                border-left:2px #409EFF solid;
                padding:4px;
                padding-left:10px;
                margin:4px;
              }
              // background:red;
            }
          }
        }
      }
    }
  }

</style>
