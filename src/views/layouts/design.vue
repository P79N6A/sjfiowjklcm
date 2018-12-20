<template>
  <div class="LayoutDesigh-container">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="layoutTemp.name" placeholder="请输入框架名称">
            <template slot="prepend">{{textMap[layoutTemp.type]}}</template>
            <template slot="append">{{layoutTemp.device}}</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button-group>
            <el-button @click="handleEditStyleCode">编辑样式文件</el-button>
            <el-button @click="updateLayouts">保存</el-button>
            <el-button
              @click="viewLayoutsClass?viewLayoutsClass='':viewLayoutsClass='layoutEdit'"
            >预览</el-button>
            <el-button @click="$router.push({name:'layouts'})">取消</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>

    <div id="drag-box" :class="viewLayoutsClass">
      <div class="show" v-for="(block,i) in layoutTemp.value" :key="i" :class="block.class">
        <!-- 块区域 -->
        <div v-if="block.isPageView">
          <el-button-group class="block-controls" v-show="viewLayoutsClass">
            <el-button>{{block.text}}</el-button>
          </el-button-group>
          <div class="page-view">
            <img src="./img/ico-page-view.png">
            <div>页面内容展示区域</div>
          </div>
        </div>
        <div v-else>
          <!-- 块区域 -->
          <el-button-group class="block-controls" v-show="viewLayoutsClass">
            <el-button>{{block.text}}</el-button>
            <el-tooltip class="item" effect="dark" content="点击查看编辑容器的样式" placement="top-start">
              <el-button
                type="danger"
                icon="el-icon-edit-outline"
                @click="EditStyleShow=true;EditStyle=block.style;EditType=1"
              ></el-button>
            </el-tooltip>
            <el-button>
              <input v-model="block.class" placeholder="绑定class">
            </el-button>
          </el-button-group>
          <el-row
            v-for="(row,r) in block.rows"
            :key="i+'-'+r"
            class="rows"
            :style="row.style"
            :class="row.class"
          >
            <!-- 区块操作按钮 -->
            <el-button-group class="row-controls" v-show="viewLayoutsClass">
              <el-button>{{row.text}}</el-button>
              <el-tooltip class="item" effect="dark" content="编辑当前内容区块样式" placement="top-start">
                <el-button
                  type="warning"
                  icon="el-icon-edit-outline"
                  @click="EditStyleShow=true;EditStyle=row.style;EditType=-1"
                ></el-button>
              </el-tooltip>
              <el-button>
                <input v-model="row.class" placeholder="绑定class">
              </el-button>
            </el-button-group>
            <!-- 行区域 -->
            <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
              <!-- 格子区域 -->
              <div>
                <el-tag type="success" class="ico-width">{{ (col.width/24*1200).toFixed(0) }}PX</el-tag>
                <!-- 内容-{{col.text}} -->
                {{col.text}}
                <div>
                  <!-- 内容区域操作按钮 -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 工具栏 -->
    <!-- 模块样式 -->
    <StyleEdit
      :styleData="EditStyle"
      v-model="EditStyleShow"
      :EditType="EditType"
      class="active"
      @changeStyle="changeStyle"
    ></StyleEdit>
    <el-dialog title="编辑当前布局样式文件" :visible.sync="dialogVisible" width="800px">
      <el-input
        type="textarea"
        :autosize="{ minRows: 10, maxRows: 30}"
        placeholder="请输入当前布局样式"
        v-model="layoutTemp.style"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="setStyleCode">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFramesOne,
  getFrames,
  addFrames,
  deleteFrames,
  updateFrames
} from "@/api/frames";
import { getLayoutsOne, updateLayouts } from "@/api/layouts";
import StyleEdit from "./components/StyleEdit";
import html2canvas from "html2canvas";

export default {
  name: "Page401",
  data() {
    return {
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
      layoutTemp: {
        _id: "",
        name: "",
        device: "",
        type: "",
        value: [
          {
            style: {
              width: "1200px",
              margin: "0 auto"
            },
            text: "A",
            rows: [
              {
                style: {
                  width: "1200px",
                  margin: 0
                },
                cols: [
                  {
                    text: "A-1",
                    width: 24
                  },
                  {
                    text: "A-1",
                    width: 24
                  }
                ]
              }
            ]
          },
          {
            style: {
              width: "1200px",
              margin: "0 auto"
            },
            text: "B",
            rows: [
              {
                style: "width:1100px;margin:0 auto;",
                cols: [
                  {
                    text: "B",
                    width: 14
                  },
                  {
                    text: "B",
                    width: 20
                  }
                ]
              }
            ]
          },
          {
            style: {
              width: 1200,
              margin: 0
            },
            text: "C",
            rows: [
              {
                style: "width:1100px;margin:0 auto;",
                cols: [
                  {
                    text: "C4",
                    width: 4
                  },
                  {
                    text: "C5",
                    width: 5
                  },
                  {
                    text: "C6",
                    width: 6
                  },
                  {
                    text: "C7",
                    width: 7
                  },
                  {
                    text: "C8",
                    width: 8
                  }
                ]
              }
            ]
          }
        ]
      },
      leftActive: false,
      rightActive: false,
      dialogVisible: false, // 样式编辑弹窗
      newList: [],
      toDataURL: ""
    };
  },
  mounted() {
    if (this.$route.query.layoutId) {
      this.getLayoutsOne({
        _id: this.$route.query.layoutId
      });
    } else {
      this.$route.go(-1);
    }
  },
  methods: {
    // 预览布局
    viewLayouts() {},
    // 转换成图片
    toImage() {
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png");
        this.dataURL = dataURL;
      });
    },
    // 更新当前布局
    updateLayouts() {
      updateLayouts(this.layoutTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 读取当前布局
    getLayoutsOne(data) {
      getLayoutsOne(data)
        .then(res => {
          // Object.assing(this.layoutTemp, res.data);
          console.log();
          this.layoutTemp = res.data;
          if (!document.querySelector('style[id="layouts"]')) {
            let styleEl = window.document.createElement("style");
            styleEl.setAttribute("id", "layouts");
            styleEl.setAttribute("type", "text/css");
            styleEl.innerText = res.data.style;
            window.document.querySelector("head").appendChild(styleEl);
          } else {
            var layoutStyle = document.querySelector('style[id="layouts"]');
            layoutStyle.innerText = this.layoutTemp.style + ".bug{}";
          }
        })
        .catch(err => {});
    },
    handleEditStyleCode() {
      this.dialogVisible = true;
    },
    // 预览
    viewLayouts() {
      this.viewLayoutsClass = "";
    },
    // 设置style代码
    setStyleCode() {
      var layoutStyle = document.querySelector('style[id="layouts"]');
      layoutStyle.innerHTML = this.layoutTemp.style + ".bug{}";
    },
    // 修改当前样式
    changeStyle(val) {
      console.log(val);
    }
  },
  components: {
    StyleEdit
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import url("//at.alicdn.com/t/font_957526_lqqst93s3j.css");

.iconfont {
  font-size: 12px !important;
}

.LayoutDesigh-container {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 84px);
  padding: 20px;
  #drag-box {
    // padding: 10px;
    // transform:scale(0.8);
    background: #f7f8fb;
  }
  .layoutEdit {
    .show {
      border: dotted 1px #ccc;
      background: #fff;
      padding: 20px 0;
      margin-top: 30px !important;
      position: relative;

      .block-controls {
        position: absolute;
        top: -28px;
        left: -1px;
      }

      input {
        border: none;
        background: none;
        color: #343434;
        text-align: center;
        outline: none;
      }

      .el-row {
        border: solid 1px #343434;
        margin-bottom: 5px !important;
        padding: 10px;
        margin: 10px;
        position: relative;

        .row-controls {
          position: absolute;
          top: -28px;
          right: -1px;
        }

        .el-col {
          padding: 10px;

          > div {
            position: relative;
            border: dashed 1px #409eff;
            padding: 10px;
            text-align: center;
            height: 70px;
            .col-controls {
              position: absolute;
              left: 10px;
              bottom: 10px;
            }
          }

          .ico-width {
            position: absolute;
            top: 5px;
            right: 5px;
          }
        }
      }
    }
  }

  .rightMenu {
    position: absolute;
    z-index: 9;
    transition: all 0.3s;
    top: 0;
    right: 0-300px;
    height: 100%;
    background: yellow;
    overflow: visible;

    &.active {
      right: 0;
    }

    .toggle {
      position: absolute;
      top: 50%;
      right: 100%;
    }
  }
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

// 0,
// 1,
// 2,  old
// 3,  new
// 4
</style>
