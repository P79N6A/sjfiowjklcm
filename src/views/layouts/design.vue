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
            <!-- <el-button @click="toImage">toIMg</el-button> -->
            <el-button
              @click="viewLayoutsClass?viewLayoutsClass='':viewLayoutsClass='layoutEdit'"
            >预览</el-button>
            <el-button @click="$router.push({name:'layout'})">取消</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>
    <div id="drag-box" ref="imageWrapper" :class="viewLayoutsClass" class="page">
      <div class="show" v-for="(block,i) in layoutTemp.value" :key="i" :class="block.styleSetting.class" :id="block.styleSetting.id" :style="[block.styleBg,block.styleStyle,block.styleBorder,block.styleShadow]">
        <!-- 块区域 -->
        <!-- {{block}} -->
        <!-- <div v-if="block.isPageView">
          <el-button-group class="block-controls" v-show="viewLayoutsClass">
            <el-button>{{block.text}}</el-button>
          </el-button-group>
          <div class="page-view">
            <img src="./img/ico-page-view.png">
            <div>页面内容展示区域</div>
          </div>
        </div> -->
        <div>
          <!-- 块区域 -->
          <el-button-group class="block-controls" v-show="viewLayoutsClass">
            <el-button v-if="block.text">{{block.text}}</el-button>
            <el-tooltip class="item" effect="dark" content="点击查看编辑容器" placement="top-start">
              <el-button type="danger" icon="el-icon-edit-outline" @click="handleEditStyle(block)"></el-button>
            </el-tooltip>
          </el-button-group>
          <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :class="row.styleSetting.class" :id="row.styleSetting.id" :style="[row.styleBg,row.styleStyle,row.styleBorder,row.styleShadow]">
            <!-- 区块操作按钮 -->
            <el-button-group class="row-controls" v-show="viewLayoutsClass">
              <el-button v-if="row.text">{{row.text}}</el-button>
              <el-tooltip class="item" effect="dark" content="编辑当前内容区块" placement="top-start">
                <el-button type="warning" icon="el-icon-edit-outline" @click="handleEditStyle(row)"></el-button>
              </el-tooltip>
            </el-button-group>
            <!-- 行区域 -->
            <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
              <!-- 格子区域 -->
              <div v-if="col.isPageView" style="background:#eee;">
                <img src="./img/ico-page-view.png" style="height:60px;">
                <el-tag type="danger">页面内容展示区域</el-tag>
              </div>
              <div v-else>
                <el-tag type="danger" class="ico-width" v-show="viewLayoutsClass">
                  {{ (col.width/24*1200).toFixed(0)
                  }}PX
                </el-tag>
                <!-- 内容-{{col.text}} -->
                <div v-for="(item,i) in col.components" :key="i" style="position:relative;">
                  <el-button-group class="components-controls" v-show="viewLayoutsClass">
                    <el-button v-if="item.text">{{item.text}}</el-button>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="向前移动"
                      placement="top-start"
                      v-if="i!=0"
                    >
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-upload2"
                        @click="moveComponent(col.components,i,-1)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="向后移动"
                      placement="top-start"
                      v-if="i!=col.components.length-1"
                    >
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-download"
                        @click="moveComponent(col.components,i,1)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除当前容器" placement="top-start">
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-close"
                        @click="removeComponent(col.components,i)"
                      ></el-button>
                    </el-tooltip>
                  </el-button-group>
                  <div>
                    <sync-component :url="`${cdnurl}${item.src}`" v-if="item.type=='component'"></sync-component>
                    <ishow-component
                      :page-json="item.pageJson"
                      :page-setting="item.pageSetting"
                      v-if="item.type=='ishow'"
                    ></ishow-component>
                  </div>
                </div>
                <div v-show="viewLayoutsClass" style="padding:4px;">
                  {{col.text}}
                  <el-button @click="handleAddComponent(col)">点击添加组件</el-button>
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
    <!-- 工具栏 -->
    <!-- 模块样式 -->
    <StyleEdit
      v-model="EditStyleShow"
      class="active"
      :styleSetting="styleSetting"
      :styleBg="styleBg"
      :styleStyle="styleStyle"
      :styleBorder="styleBorder"
      :styleShadow="styleShadow"
      @updataStyle="updataStyle"
    ></StyleEdit>
    <!-- 布局样式 -->
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
    <!-- 组件添加器 -->
    <el-dialog title="添加组件" :visible.sync="dialogComVisible" width="1000px">
      <el-tabs type="border-card">
        <el-tab-pane label="系统组件">
          <div class="component-list cfx">
            <el-card
              :body-style="{ padding: '0px' }"
              v-for="item in componentList"
              :key="item._id"
              class="card"
            >
              <img src="/favicon.ico" class="image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom cfx">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="danger" class="button" @click="addCom(item,'component')">选中</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的组件">
          <div class="component-list cfx">
            <el-card
              :body-style="{ padding: '0px' }"
              v-for="item in ishowList"
              :key="item._id"
              class="card"
            >
              <img src="/favicon.ico" class="image">
              <div style="padding: 14px;">
                <span>{{item.name}}</span>
                <div class="bottom cfx">
                  <!-- <time class="time">{{ currentDate }}</time> -->
                  <el-button type="danger" class="button" @click="addCom(item,'ishow')">选中</el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <el-input placeholder="请输入新增组件地址" v-model="componentTemp.src"></el-input> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogComVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="addCom">{{ $t('table.confirm') }}</el-button>
      </div>-->
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
import { getIshows } from "@/api/ishow";
import { getComponents, addComponents } from "@/api/components";
// import { getComponents } from "@/api/components";
import { getLayoutsOne, updateLayouts } from "@/api/layouts";
import StyleEdit from "./components/StyleEdit";
import html2canvas from "html2canvas";
import { mapGetters } from "vuex";
import IshowComponent from "@/components/IshowComponent/main-show.vue";
import SyncComponent from "vue-async-component";
export default {
  name: "Page401",
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
      layoutTemp: {
        _id: "",
        name: "",
        device: "",
        screenShot: "",
        type: "",
        value: []
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
    //获取ishow列表
    getIshows() {
      getIshows().then(response => {
        if (response.data && response.data.length) {
          console.info(response.data);
          this.ishowList = response.data;
        }
        //console.info(response)
        //console.info(JSON.parse(response.data))
      });
    },
    // 获取组件列表
    getComponents() {
      getComponents().then(response => {
        if (response.data && response.data.length) {
          this.componentList = response.data;
        }
      });
    },
    // 编辑布局样式
      handleEditStyle(data){
        this.edittingData=data
        this.EditStyleShow=true;
        this.styleSetting=JSON.parse(JSON.stringify(data.styleSetting));
        this.styleBg=JSON.parse(JSON.stringify(data.styleBg));
        this.styleStyle=JSON.parse(JSON.stringify(data.styleStyle));
        this.styleBorder=JSON.parse(JSON.stringify(data.styleBorder));
        this.styleShadow=JSON.parse(JSON.stringify(data.styleShadow));
      },
      updataStyle(styleData){
        this.edittingData.styleSetting=JSON.parse(JSON.stringify(styleData.styleSetting))
        this.edittingData.styleBg=JSON.parse(JSON.stringify(styleData.styleBg))
        this.edittingData.styleStyle=JSON.parse(JSON.stringify(styleData.styleStyle))
        this.edittingData.styleBorder=JSON.parse(JSON.stringify(styleData.styleBorder))
        this.edittingData.styleShadow=JSON.parse(JSON.stringify(styleData.styleShadow))
      },
    // 移动组件
    moveComponent(components, index, type) {
      if (Math.abs(type)) {
        const targetBlock = components.splice(index, 1)[0];
        components.splice(index + type, 0, targetBlock);
      } else {
        return;
      }
    },
    // 删除组件
    removeComponent(components, index) {
      components.splice(index, 1)[0];
    },
    // 预览布局
    viewLayouts() {},
    // 转换成图片
    toImage() {
      this.viewLayoutsClass = "";
      this.$nextTick(() => {});
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      })
        .then(canvas => {
          let dataURL = canvas.toDataURL("image/png");
          this.dataURL = dataURL;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加组件点击
    handleAddComponent(col) {
      this.editCol = col;
      this.getComponents();
      this.getIshows();
      this.componentTemp = {
        style: "",
        src: ""
      };
      this.dialogComVisible = true;
    },
    // 添加组件逻辑
    addCom(item, type) {
      item.type = type;
      this.editCol.components.push(Object.assign({}, item));
      this.dialogComVisible = false;
    },
    // 更新当前布局
    updateLayouts() {
      this.viewLayoutsClass = "";
      this.$nextTick(() => {
        window.setTimeout(() => {
          html2canvas(this.$refs.imageWrapper, {
            backgroundColor: null
          })
            .then(canvas => {
              let dataURL = canvas.toDataURL("image/png");
              this.dataURL = dataURL;
              this.layoutTemp.screenShot = dataURL;
              updateLayouts(this.layoutTemp)
                .then(res => {
                  this.$notify({
                    title: "成功",
                    message: "操作成功",
                    type: "success",
                    duration: 2000
                  });
                  // this.$router.push({name:'layout'})
                })
                .catch(err => {});
            })
            .catch(err => {
              console.log(err);
            });
        }, 500);
      });
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
    // 编辑css样式
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
  computed: {
    ...mapGetters(["cdnurl"])
  },
  components: {
    StyleEdit,
    SyncComponent,
    IshowComponent
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
    // background: #f7f8fb;
  }

  .layoutEdit {
    .show {
      border: dotted 1px #ccc;
      // background: #fff;
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
        // padding: 10px;
        margin: 10px;
        position: relative;

        .row-controls {
          position: absolute;
          top: -28px;
          right: -1px;
        }

        .el-col {
          // padding: 10px;

          > div {
            position: relative;
            border: dashed 1px #409eff;
            // padding: 10px;
            text-align: center;
            min-height: 70px;

            .col-controls {
              position: absolute;
              left: 10px;
              bottom: 10px;
            }
            .components-controls {
              position: absolute;
              top: 0;
              left: 50%;
              z-index: 9;
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
.component-list {
  .card {
    width: 180px;
    float: left;
    margin: 6px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }
}
// 0,
// 1,
// 2,  old
// 3,  new
// 4
</style>
