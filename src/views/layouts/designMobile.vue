<template>
  <div class="LayoutDesign-container">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="layoutTemp.name" placeholder="请输入框架名称">
            <template slot="prepend">{{textMap[layoutTemp.type]}}</template>
          </el-input>
        </el-col>
        <el-col :span="10">
          <el-button-group>
            <el-button @click="handleEditStyle(layoutTemp.style)">页面样式</el-button>
            <el-button @click="editFrame=!editFrame">页面布局</el-button>
            <el-button @click="updateLayouts">保存</el-button>
            <el-button @click="viewLayoutsClass?viewLayoutsClass='':viewLayoutsClass='layoutEdit'"><span v-if="viewLayoutsClass">预览</span><span
                v-else>编辑</span></el-button>
            <el-button @click="$router.push({name:'layout'})">取消</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-header>
    <el-input type="textarea" v-model="testStyle">
    </el-input>
    <div v-html="`<style>${testStyle}</style>`"></div>
    <!-- 页面操作区域 -->
    <div class="layout-view">
      <div id="drag-box" ref="imageWrapper" :class="[viewLayoutsClass]" class="page" :style="[layoutTemp.style.styleBg,layoutTemp.style.styleStyle,layoutTemp.style.styleBorder,layoutTemp.style.styleShadow]">
        <div class="show" v-for="(block,i) in layoutTemp.value" :key="i">
          <div v-if="block.isPageView">
            <el-button-group class="block-controls" v-show="viewLayoutsClass">
              <el-button>{{block.text}}</el-button>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="向上移动" placement="top-start" v-if="i!=0">
                <el-button circle type="danger" icon="el-icon-upload2" @click="moveBlock(i,-1)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="向下移动" placement="top-start" v-if="i!=layoutTemp.value.length-1">
                <el-button circle type="danger" icon="el-icon-download" @click="moveBlock(i,1)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="在后面追加一个容器" placement="top-start">
                <el-button circle type="danger" icon="el-icon-plus" @click="addBlock(i)"></el-button>
              </el-tooltip>
            </el-button-group>
            <div class="page-view">
              <img src="./img/ico-page-view.png">
              <div>页面内容展示区域</div>
            </div>
          </div>
          <div v-else :class="[block.styleSetting.class,block.styleSetting.enterAnimation,'animated']" :id="block.styleSetting.id"
            :style="[block.styleBg,block.styleStyle,block.styleBorder,block.styleShadow]" style="display:flex;justify-content: center;">
            <!-- 块区域 -->
            <el-button-group class="block-controls" v-show="viewLayoutsClass">
              <el-button>
                <input v-if="editFrame" v-model="block.text">
                <span v-else>
                  {{block.text}}
                </span>
              </el-button>
              <el-tooltip class="item" effect="dark" content="编辑当前容器" placement="top-start">
                <el-button type="danger" icon="el-icon-edit-outline" @click="handleEditStyle(block)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="向上移动" placement="top-start" v-if="i!=0">
                <el-button circle type="danger" icon="el-icon-upload2" @click="moveBlock(i,-1)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="向下移动" placement="top-start" v-if="i!=layoutTemp.value.length-1">
                <el-button circle type="danger" icon="el-icon-download" @click="moveBlock(i,1)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="在后面追加一个容器" placement="top-start">
                <el-button circle type="danger" icon="el-icon-plus" @click="addBlock(i)"></el-button>
              </el-tooltip>
              <el-tooltip v-show="editFrame" class="item" effect="dark" content="删除当前容器" placement="top-start">
                <el-button circle type="danger" icon="el-icon-close" @click="removeBlock(i)"></el-button>
              </el-tooltip>
            </el-button-group>
            <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :class="[row.styleSetting.class,row.styleSetting.enterAnimation,'animated']"
              :id="row.styleSetting.id" :style="[row.styleBg,row.styleStyle,row.styleBorder,row.styleShadow,{width:row.fullWidth?'100%':'1200px'}]">
              <!-- 区块操作按钮 -->
              <el-button-group class="row-controls" v-show="viewLayoutsClass">
                <el-button>
                  <input v-if="editFrame" v-model="row.text">
                  <span v-else>
                    {{row.text}}
                  </span>
                </el-button>
                <el-tooltip class="item" effect="dark" content="编辑当前内容区块" placement="top-start">
                  <el-button type="warning" icon="el-icon-edit-outline" @click="handleEditStyle(row)"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="向上移动" placement="top-start" v-if="r!=0">
                  <el-button circle type="warning" icon="el-icon-upload2" @click="moveRow(block,r,-1)"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="向下移动" placement="top-start">
                  <el-button circle type="warning" icon="el-icon-download" @click="moveRow(block,r,1)" v-if="r!=block.rows.length-1"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="固定居中宽度" placement="top-start" v-if="row.fullWidth">
                  <el-button circle type="warning" icon="iconfont icon-smaller" @click="row.fullWidth=false"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="通屏100%宽度" placement="top-start" v-if="!row.fullWidth">
                  <el-button circle type="warning" icon="iconfont icon-bigger" @click="row.fullWidth=true"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="在后面追加内容区块" placement="top-start">
                  <el-button circle type="warning" icon="el-icon-plus" @click="addRow(block,r)"></el-button>
                </el-tooltip>
                <el-tooltip v-show="editFrame" class="item" effect="dark" content="删除当前内容区块" placement="top-start">
                  <el-button circle type="warning" icon="el-icon-close" @click="removeRow(block,r)"></el-button>
                </el-tooltip>
              </el-button-group>
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
                    <el-button-group class="components-controls" v-show="viewLayoutsClass">
                      <el-button v-if="item.text">{{item.text}}</el-button>
                      <el-tooltip class="item" effect="dark" content="向前移动" placement="top-start" v-if="i!=0">
                        <el-button circle type="primary" icon="el-icon-upload2" @click="moveComponent(col.components,i,-1)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="向后移动" placement="top-start" v-if="i!=col.components.length-1">
                        <el-button circle type="primary" icon="el-icon-download" @click="moveComponent(col.components,i,1)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="组件设置" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-setting" @click="editComponent(item)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="组件数据设置" placement="top-start" v-if="item.categoryModel">
                        <el-button circle type="primary" icon="el-icon-tickets" @click="editData(item)"></el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="删除该组件" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-close" @click="removeComponent(col.components,i)"></el-button>
                      </el-tooltip>
                    </el-button-group>
                    <div>
                      <!-- 异步vue组件 -->
                      <sync-component :url="`${cdnurl}${item.src}`" v-if="item.type=='component'" :data-id="item.dataId"
                        :category-id="item.categoryId"></sync-component>
                      <!-- 自定义ishow组件 -->
                      <ishow-component :ishow-id="item._id" v-if="item.type=='ishow'"></ishow-component>
                    </div>
                  </div>
                  <div v-show="viewLayoutsClass" style="padding:4px;position:absolute;left:10px;bottom:10px;z-index:99;">
                    <el-button-group v-show="viewLayoutsClass">
                      <el-button>{{col.text}}</el-button>
                      <el-tooltip class="item" effect="dark" content="点击添加组件" placement="top-start">
                        <el-button type="danger" @click="handleAddComponent(col)" icon="el-icon-plus"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="向前移动" placement="top-start" v-if="j!=0">
                        <el-button circle type="primary" icon="el-icon-upload2" @click="moveCol(row,j,-1)"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="向后移动" placement="top-start" v-if="j!=row.cols.length-1">
                        <el-button circle type="primary" icon="el-icon-download" @click="moveCol(row,j,1)"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="减小格子宽度" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-zoom-out" @click="smaller(col)"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="增加格子宽度" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-zoom-in" @click="bigger(col)"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="在后面追加格子" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-circle-plus" @click="addCol(row,j)"></el-button>
                      </el-tooltip>
                      <el-tooltip v-show="editFrame" class="item" effect="dark" content="删除当前格子" placement="top-start">
                        <el-button circle type="primary" icon="el-icon-circle-close" v-if="row.cols.length>1" @click="removeCol(row,j)"></el-button>
                      </el-tooltip>
                    </el-button-group>
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
    <!-- 样式编辑 -->
    <el-dialog title="样式编辑" :visible.sync="EditStyleShow" width="600px" v-if="EditStyleShow">
      <StyleEdit class="active" :styleSetting="styleSetting" :styleBg="styleBg" :styleStyle="styleStyle" :styleBorder="styleBorder"
        :styleShadow="styleShadow" @updataStyle="updataStyle"></StyleEdit>
    </el-dialog>
    <!-- 组件添加器 -->
    <el-dialog title="添加组件" :visible.sync="dialogComVisible" width="1000px">
      <el-tabs type="border-card">
        <el-tab-pane label="系统组件">
          <div class="component-list cfx">
            <el-card :body-style="{ padding: '0px' }" v-for="item in componentList" :key="item._id" class="card">
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
            <el-card :body-style="{ padding: '0px' }" v-for="item in ishowList" :key="item._id" class="card">
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
    <!-- 数据编辑窗口 -->
    <el-dialog title="数据编辑" width="900px" :visible.sync="dialogContentVisible">
      <content-edit v-if="dialogContentVisible" :content-id="EditContentId" :model-id="EditModelId" :category-id="EditCategoryId"></content-edit>
    </el-dialog>
    <!-- 组件数据集合 -->
    <el-dialog title="组件数据集合" width="1000px" :visible.sync="dialogCategoryVisible">
      <content-list v-if="dialogCategoryVisible" :model-id="EditModelId" :category-id="EditCategoryId" @updateCategory="updateCategory"
        @createContent="createContent" @updateContent="updateContent" ref="contentList"></content-list>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import html2canvas from "html2canvas";
  // 数据集合操作
  import {
    addCategories,
    deleteCategories
  } from "@/api/categories";
  // 单个数据操作
  import {
    addContents,
    deleteContents
  } from "@/api/contents";
  // 获取自定义组件
  import {
    getIshows
  } from "@/api/ishow";
  // 获取系统组件
  import {
    getComponents
  } from "@/api/components";
  // 布局操作
  import {
    getLayoutsOne,
    updateLayouts
  } from "@/api/layouts";
  // 组件
  import StyleEdit from "./components/StyleEdit";
  import IshowComponent from "./components/Ishow";
  import SyncComponent from "vue-async-component";
  import ContentEdit from "./components/Content";
  import ContentList from "./components/ContentList";
  import {
    getToken,
    setToken,
    removeToken
  } from "@/utils/auth";
  export default {
    name: "Page401",
    data() {
      return {
        testStyle:'',
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
        layoutTemp: {
          _id: "",
          name: "",
          device: getToken("SiteDevice"),
          screenShot: "",
          type: "",
          value: [],
          style: {
            styleBg: {},
            styleStyle: {},
            styleBorder: {},
            styleShadow: {}
          }
        },
        editCol: null,
        leftActive: false,
        rightActive: false,
        editFrame: false,
        dialogVisible: false, // 样式编辑弹窗
        dialogComVisible: false, // 样式编辑弹窗
        dialogContentVisible: false, // 组件配置编辑
        dialogCategoryVisible: false, // 数据集合
        newList: [],
        dataURL: "",
        EditModelId: "",
        EditContentId: "",
        EditCategoryId: ""
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
      handleEditFrame() {
        console.log('klafj');
        this.editFrame = true;
      },
      // 新建数据分类
      addCategories() {
        addCategories(this.categoryTemp)
          .then(res => {
            this.getCategories();
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          })
          .catch(err => {});
      },
      //获取ishow列表
      getIshows() {
        getIshows().then(response => {
          if (response.data && response.data.length) {
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
      createContent(data) {
        console.log(data);
        this.EditContentId = "";
        this.dialogContentVisible = true;
      },
      updateContent(data) {
        console.log(data);
        this.EditContentId = data._id;
        this.dialogContentVisible = true;
      },
      // 编辑布局样式
      handleEditStyle(data) {
        this.edittingData = data;
        this.EditStyleShow = true;
        this.styleSetting = JSON.parse(JSON.stringify(data.styleSetting || {}));
        this.styleBg = JSON.parse(JSON.stringify(data.styleBg || {}));
        this.styleStyle = JSON.parse(JSON.stringify(data.styleStyle || {}));
        this.styleBorder = JSON.parse(JSON.stringify(data.styleBorder || {}));
        this.styleShadow = JSON.parse(JSON.stringify(data.styleShadow || {}));
      },
      updataStyle(styleData) {
        this.edittingData.styleSetting = JSON.parse(
          JSON.stringify(styleData.styleSetting)
        );
        this.edittingData.styleBg = JSON.parse(JSON.stringify(styleData.styleBg));
        this.edittingData.styleStyle = JSON.parse(
          JSON.stringify(styleData.styleStyle)
        );
        this.edittingData.styleBorder = JSON.parse(
          JSON.stringify(styleData.styleBorder)
        );
        this.edittingData.styleShadow = JSON.parse(
          JSON.stringify(styleData.styleShadow)
        );
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
      editComponent(component) {
        // 组件配置
        this.dialogContentVisible = true;
        this.EditContentId = component.dataId;
        this.EditModelId = component.configModel;
        this.EditCategoryId = "";
        // }
      },
      editData(item) {
        // 组件内容
        console.log(item);
        this.edittingData = item;
        this.EditCategoryId = item.categoryId;
        this.EditModelId = item.categoryModel;
        this.dialogCategoryVisible = true;
      },
      updateCategory(categoryId) {
        this.edittingData.categoryId = categoryId;
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
        this.dialogComVisible = true;
      },
      // 添加组件逻辑
      addCom(item, type) {
        item.type = type;
        // 选中的是系统组件库
        if (type == "component") {
          // 创建组件配置数据
          const _contentTemp = {
            abstract: "",
            category: "",
            content: "",
            thumbnail: "",
            media: [],
            extensions: {},
            isSingle: true
          };
          addContents(_contentTemp)
            .then(res => {
              // 设置数据id
              item.dataId = res.data._id;
              // 插入新组件
              const _component = {
                type: "component",
                src: item.src,
                // dataType: item.dataType,
                configModel: item.configModel,
                categoryModel: item.categoryModel,
                dataId: res.data._id,
                categoryId: "",
                _id: item._id,
                name: item.name
              };
              // 这里要调整
              this.editCol.components.push(Object.assign({}, _component));
              this.dialogComVisible = false;
            })
            .catch(err => {});
        } else if (type == "ishow") {
          // ishow，直接添加
          const _ishow = {
            type: "ishow",
            _id: item._id,
            sce: item.src,
            name: item.name,
            description: item.description
          };
          this.editCol.components.push(Object.assign({}, _ishow));
          this.dialogComVisible = false;
        }
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
                    this.viewLayoutsClass = "layoutEdit";
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
            this.layoutTemp = res.data;
          })
          .catch(err => {});
      },
      // 预览
      viewLayouts() {
        this.viewLayoutsClass = "";
      },
      // 框架结构
      // 移动位置
      moveBlock(index, type) {
        if (Math.abs(type)) {
          const targetBlock = this.layoutTemp.value.splice(index, 1)[0];
          this.layoutTemp.value.splice(index + type, 0, targetBlock);
          // this.$nextTick(() => {
          //   this.colMoveSet();
          // });
        } else {
          return;
        }
      },
      // 添加容器
      addBlock(index) {
        const newBlock = {
          "styleShadow": {
            "shadowColor": "",
            "shadowDire": "",
            "shadowRadius": "",
            "shadowWidth": ""
          },
          "styleBorder": {
            "borderRadius": "",
            "borderStyle": "",
            "borderColor": "",
            "borderWidth": ""
          },
          "styleStyle": {
            "height": "",
            "width": "",
            "rotate": "",
            "padding": "",
            "margin": "",
            "opacity": 100,
            "bottom": "",
            "top": "",
            "right": "",
            "left": "",
            "position": ""
          },
          "styleBg": {
            "backgroundAttachment": "",
            "backgroundColor": "",
            "backgroundRepeat": "",
            "backgroundSize": "",
            "backgroundPosition": "",
            "backgroundImage": ""
          },
          "styleSetting": {
            "id": "",
            "class": ""
          },
          "text": "c",
          "rows": [{
            "styleShadow": {
              "shadowColor": "",
              "shadowDire": "",
              "shadowRadius": "",
              "shadowWidth": ""
            },
            "styleBorder": {
              "borderRadius": "",
              "borderStyle": "",
              "borderColor": "",
              "borderWidth": ""
            },
            "styleStyle": {
              "height": "",
              "width": "",
              "rotate": "",
              "padding": "",
              "margin": "",
              "opacity": 100,
              "bottom": "",
              "top": "",
              "right": "",
              "left": "",
              "position": ""
            },
            "styleBg": {
              "backgroundAttachment": "",
              "backgroundColor": "",
              "backgroundRepeat": "",
              "backgroundSize": "",
              "backgroundPosition": "",
              "backgroundImage": ""
            },
            "styleSetting": {
              "id": "",
              "class": ""
            },
            "class": "",
            "text": "内容区块3",
            "fullWidth": false,
            "cols": [{
                "components": [

                ],
                "text": "格子",
                "width": 6
              },
              {
                "components": [

                ],
                "text": "格子",
                "width": 6
              },
              {
                "components": [

                ],
                "text": "格子",
                "width": 6
              },
              {
                "components": [

                ],
                "text": "格子",
                "width": 6
              },
              {
                "components": [

                ],
                "text": "格子",
                "width": 24
              }
            ]
          }]
        };
        this.layoutTemp.value.splice(index + 1, 0, newBlock);
        this.$nextTick(() => {
          // this.rowMoveSet();
          // this.colMoveSet();
        });
      },
      /**
       * index，当前区块位置
       * 删除当前区块
       *  */
      removeBlock(index) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            this.layoutTemp.value.splice(index, 1)[0];
          })
      },
      /** move row
       *
       */
      moveRow(block, index, type) {
        if (Math.abs(type)) {
          const targetBlock = block.rows.splice(index, 1)[0];
          block.rows.splice(index + type, 0, targetBlock);
        } else {
          return;
        }
      },
      /**
       * 删除行
       * block，block数组
       * i，当前行在block里的序号
       *  */
      removeRow(block, index) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            block.rows.splice(index, 1);
          })
      },
      /** 添加 */
      addRow(block, index) {
        const newRow = {
          "styleShadow": {
            "shadowColor": "",
            "shadowDire": "",
            "shadowRadius": "",
            "shadowWidth": ""
          },
          "styleBorder": {
            "borderRadius": "",
            "borderStyle": "",
            "borderColor": "",
            "borderWidth": ""
          },
          "styleStyle": {
            "height": "",
            "width": "",
            "rotate": "",
            "padding": "",
            "margin": "",
            "opacity": 100,
            "bottom": "",
            "top": "",
            "right": "",
            "left": "",
            "position": ""
          },
          "styleBg": {
            "backgroundAttachment": "",
            "backgroundColor": "",
            "backgroundRepeat": "",
            "backgroundSize": "",
            "backgroundPosition": "",
            "backgroundImage": ""
          },
          "styleSetting": {
            "id": "",
            "class": ""
          },
          "class": "",
          "text": "内容区块2",
          "fullWidth": false,
          "cols": [{
              "components": [

              ],
              "text": "格子",
              "width": 12
            },
            {
              "components": [

              ],
              "text": "格子",
              "width": 12
            }
          ]
        }
        block.rows.splice(index + 1, 0, newRow);
        this.$nextTick(() => {
          // this.colMoveSet();
        });
      },
      // 移动格子
      moveCol(row, index, type) {
        if (Math.abs(type)) {
          const targetCol = row.cols.splice(index, 1)[0];
          console.log(targetCol)
          row.cols.splice(index + type, 0, targetCol);
        } else {
          return;
        }
      },
      /**
       * col，当前栅栏object
       * 栅栏缩小
       * */
      smaller(col) {
        if (col.width > 3) {
          col.width--;
        }
      },
      /**
       * col，当前栅栏object
       * 栅栏加宽
       */
      bigger(col) {
        if (col.width < 24) {
          col.width++;
        }
      },
      /**
       * 删除栅栏
       * row，row数组
       * i，当前栅栏的序号
       *  */
      removeCol(row, index) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            row.cols.splice(index, 1);
          })
        // this.layout.splice(evt.newIndex, 0, targetRow)
      },
      /** 添加 */
      addCol(row, index) {
        const newCol = {
          components: [],
          text: "格子",
          width: 24
        };
        row.cols.splice(index + 1, 0, newCol);
        this.$nextTick(() => {
          // this.rowMoveSet();
          this.colMoveSet();
        });
      },
    },
    computed: {
      ...mapGetters(["cdnurl"])
    },
    watch: {
      dialogContentVisible(val) {
        console.log("sfjlksafjlkjlks;lks");
        if (!val && this.dialogCategoryVisible) {
          console.log("sa;fjlskadjf");
          this.$refs.contentList.getContents();
        }
      }
    },
    components: {
      StyleEdit,
      SyncComponent,
      IshowComponent,
      ContentEdit,
      ContentList
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import url("//at.alicdn.com/t/font_957526_lqqst93s3j.css");

  .iconfont {
    font-size: 12px !important;
  }

  .LayoutDesign-container {
    position: relative;
    overflow: hidden;
    min-height: calc(100vh - 84px);
    padding: 20px;

    .layout-view {
      width:540px;
      margin:0 auto;
      .el-row {
        position: relative;
      }
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
          // box-shadow:0 0 2px 2px #343434;
          position: relative;
          margin: 10px auto;

          .row-controls {
            position: absolute;
            top: -28px;
            right: -1px;
          }

          .el-col {
            // padding: 10px;

            >div {
              position: relative;
              box-shadow: 0 0 1px 1px #eee;
              // padding: 10px;
              text-align: center;
              min-height: 70px;

              &:hover {
                box-shadow: 0 0 1px 1px #409eff
              }
            }

            .components-col {
              min-height: 30px;

              &:hover {
                .components-controls {
                  display: block;
                }
              }
            }

            .components-controls {
              position: absolute;
              display: none;
              top: 10px;
              left: 10px;
              z-index: 9;
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

</style>
