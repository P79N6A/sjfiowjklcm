<template>
  <div class="LayoutDesign-container">
    <div class="i-header">
      <div class="content">
        <div id="clone">
          <el-button
            v-show="editting"
            type="danger"
            class="clone-row"
            @click="addRow(moveEndData.from.rowIndex)"
          >添加区块</el-button>
          <el-button
            v-show="editting"
            type="warning"
            @click="addContent(moveEndData.from.rowIndex,moveEndData.from.contentIndex)"
          >添加行</el-button>
          <el-button
            v-show="editting"
            type="primary"
            @click="addCol(moveEndData.from.rowIndex,moveEndData.from.contentIndex)"
          >添加内容块</el-button>
          <i class="el-icon-question" v-show="editting"></i>
        </div>
        <div>
          <el-button @click="editting=!editting" type="success" v-show="editting">预览模式</el-button>
          <el-button @click="editting=!editting" type="warning" v-show="!editting">编辑模式</el-button>
          <el-button @click="dialogFormVisible=true;" type="primary">属性</el-button>
          <el-button @click="editStyle(layoutTemp.value.style)" type="primary">样式</el-button>
          <el-button @click="updateLayouts" type="primary">保存</el-button>
          <el-button @click="$router.push({name:'layout'})" type="danger">退出</el-button>
        </div>
      </div>
    </div>

    <div v-html="`<style>${layoutTemp.value.styleText}</style>`"></div>
    <!-- 页面操作区域 -->
    <div
      class="drag-box"
      id="drag"
      ref="imageWrapper"
      :style="getStyle(layoutTemp.value.style)"
      v-if="layoutTemp._id"
    >
      <div
        class="rows"
        v-for="(row,i) in layoutTemp.value.rows"
        :key="i"
        :class="{active:i==moveEndData.from.rowIndex,preview:!editting,editting:editting}"
        @click="moveEndData.from.rowIndex=i"
        :style="getStyle(row.style)"
      >
        <div class="btns-row" v-show="editting">
          <i class="el-icon-setting" @click="editStyle(row.style)"></i>
          <i class="el-icon-rank row-move"></i>
          <i class="el-icon-circle-close-outline" @click="removeRow(i)"></i>
          <input v-model="row.name">
        </div>
        <div
          class="contents"
          v-for="
        (content,j) in row.contents"
          :key="j"
          :class="{active:moveEndData.from.rowIndex==i&&j==moveEndData.from.contentIndex,preview:!editting,editting:editting}"
          @click="moveEndData.from.contentIndex=j"
          :style="[getStyle(content.style),{width:content.fullWidth?'100%':layoutTemp.value.contentWidth+'px'}]"
        >
          <div class="btns-content" v-show="editting">
            <input v-model="content.name">
            <i class="el-icon-setting" @click="editStyle(content.style)"></i>
            <i
              class="iconfont icon-smaller"
              @click="content.fullWidth=false"
              v-show="content.fullWidth==true"
            ></i>
            <i
              class="iconfont icon-bigger"
              @click="content.fullWidth=true"
              v-show="content.fullWidth==false"
            ></i>
            <i class="el-icon-rank content-move"></i>
            <i class="el-icon-circle-close-outline" @click="removeContent(row,r)"></i>
          </div>
          <el-row class="cols">
            <el-col
              class="box"
              v-for="(box,k) in content.boxs"
              :key="k"
              :span="box.width"
              :class="{preview:!editting,editting:editting}"
              :style="getStyle(box.style)"
            >
              <el-tag
                type="success"
                class="ico-width"
                v-show="editting"
              >{{(layoutTemp.value.contentWidth*box.width/24).toFixed(0)}}PX</el-tag>
              <div class="btns-box" v-show="editting">
                <i class="el-icon-setting" @click="editStyle(box.style)"></i>
                <i class="el-icon-d-arrow-left" @click="box.width>2?box.width--:null"></i>
                <i class="el-icon-d-arrow-right" @click="box.width<24?box.width++:null"></i>
                <i class="el-icon-rank box-move"></i>
                <i class="el-icon-circle-close-outline" @click="removeCol(content,k)"></i>
                <i class="el-icon-circle-plus" @click="handleAddComponent(box)"></i>
              </div>
              <div class="view">
                <!-- 格子区域 -->
                <div
                  v-for="(item,l) in box.components"
                  :key="l"
                  style="position:relative;"
                  :class="{'components-col':viewLayoutsClass}"
                >
                  <!-- 内容组件渲染 -->
                  <ishow-pre :ishow-id="item._id"></ishow-pre>
                  <div class="el-control" v-show="editting">
                    <el-button type="danger" @click="removeEl(box,i)">删除</el-button>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 样式编辑 -->
    <StyleEdit class="active" :styleTemp="styleTemp" v-if="layoutTemp._id"></StyleEdit>
    <!-- 组件添加器 -->
    <el-dialog title="添加组件" :visible.sync="dialogComVisible" width="1000px">
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
      <!-- <el-input placeholder="请输入新增组件地址" v-model="componentTemp.src"></el-input> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogComVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="addCom">{{ $t('table.confirm') }}</el-button>
      </div>-->
    </el-dialog>
    <!-- 高级样式 -->
    <el-dialog title="设置" width="800px" :visible.sync="dialogFormVisible">
      <el-form ref="dataFormKey" :model="layoutTemp" label-position="right" label-width="80px">
        <el-form-item label="*名称" prop="name">
          <el-input v-model="layoutTemp.name"/>
        </el-form-item>
        <el-form-item label="*主体宽度">
          <el-input v-model="layoutTemp.value.contentWidth"/>
        </el-form-item>
        <el-form-item label="*主体宽度">
          <el-input
            type="textarea"
            v-model="layoutTemp.value.styleText"
            :autosize="{ minRows: 10, maxRows: 20}"
            placeholder="请粘贴入style样式内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import html2canvas from "html2canvas";
// 数据集合操作
import { addCategories, deleteCategories } from "@/api/categories";
// 单个数据操作
import { addContents, deleteContents } from "@/api/contents";
// 获取自定义组件
import { getIshows } from "@/api/ishow";
// 布局操作
import { getLayoutsOne, updateLayouts } from "@/api/layouts";
// 组件
import StyleEdit from "./components/StyleEdit";
import IshowPre from "@/components/H5Preview";
import Sortable from "sortablejs";

import { getToken, setToken, removeToken } from "@/utils/auth";
const byId = function(id) {
  return document.getElementById(id);
};
export default {
  name: "Page401",
  data() {
    return {
      moveEndData: {
        from: {
          rowIndex: 0,
          contentIndex: 0,
          elIndex: 0
        },
        to: {
          rowIndex: 0,
          contentIndex: 0,
          elIndex: 0
        }
      },
      dialogFormVisible: false,
      //======old======//
      edittingData: null,
      styleTemp: {},
      styleBg: {},
      styleStyle: {},
      styleBorder: {},
      styleShadow: {},
      // 功能组件
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
        value: []
      },
      editCol: null,
      leftActive: false,
      rightActive: false,
      editting: true,
      dialogVisible: false, // 样式编辑弹窗
      dialogComVisible: false, // 样式编辑弹窗
      dialogContentVisible: false, // 组件配置编辑
      dialogCategoryVisible: false, // 数据集合
      dialogStyleVisible: false, // 高级样式
      newList: [],
      dataURL: "",
      EditModelId: "",
      EditContentId: "",
      EditCategoryId: ""
    };
  },
  mounted() {
    if (this.$route.query.layoutId) {
      getLayoutsOne({
        _id: this.$route.query.layoutId
      })
        .then(res => {
          this.layoutTemp = res.data;
          this.$nextTick(() => {
            this.colMoveSet();
          });
        })
        .catch(err => {});
    } else {
      this.$route.go(-1);
    }
  },
  methods: {
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
    // 编辑布局样式
    handleEditStyle(data) {
      this.edittingData = data;
      this.EditStyleShow = true;
      this.styleTemp = JSON.parse(JSON.stringify(data.styleTemp || {}));
      this.styleBg = JSON.parse(JSON.stringify(data.styleBg || {}));
      this.styleStyle = JSON.parse(JSON.stringify(data.styleStyle || {}));
      this.styleBorder = JSON.parse(JSON.stringify(data.styleBorder || {}));
      this.styleShadow = JSON.parse(JSON.stringify(data.styleShadow || {}));
    },
    updataStyle(styleData) {
      this.edittingData.styleTemp = JSON.parse(
        JSON.stringify(styleData.styleTemp)
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
    /**
     * 内容区块移动
     * index，当前区块位置
     * type，移动类型
     * 1,向后移动一位
     * -1，向前移动一位
     */
    colMoveSet() {
      // 拖拽cols
      const $this = this;
      new Sortable(byId("clone"), {
        group: {
          name: "rows",
          pull: "clone",
          put: false // Do not allow items to be put into this list
        },
        draggable: ".clone-row",
        handle: ".clone-row",
        animation: 150,
        sort: false // To disable sorting: set sort to false
      });
      Sortable.create(byId("drag"), {
        group: "rows",
        draggable: ".rows",
        handle: ".row-move",
        animation: 150,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          console.log(evt);
          // 筛出数据
          const targetCol = $this.layoutTemp.value.rows.splice(
            evt.oldIndex,
            1
          )[0];
          // 插入数据
          $this.layoutTemp.value.rows.splice(evt.newIndex, 0, targetCol);
          // 更改数据，强制渲染当前列表
          const newArray = $this.layoutTemp.value.rows.slice(0);
          $this.layoutTemp.value.rows = [];
          // 数据变化后再次刷新
          $this.$nextTick(() => {
            $this.layoutTemp.value.rows = newArray;
            $this.$nextTick(() => {
              $this.colMoveSet();
            });
          });
        },
        // Element is chosen
        onChoose: function(/**Event*/ evt) {
          console.log("onChoose");
          $this.moveEndFunc = true;

          // evt.oldIndex;  // element index within parent
        },

        // Element dragging started
        onStart: function(/**Event*/ evt) {
          console.log("onStart");
        },

        // Element dragging ended
        // onEnd: function (/**Event*/evt) {
        //   console.log('onEnd')
        //   // var itemEl = evt.item;  // dragged HTMLElement
        //   // evt.to;    // target list
        //   // evt.from;  // previous list
        //   // evt.oldIndex;  // element's old index within old parent
        //   // evt.newIndex;  // element's new index within new parent
        // },

        // Element is dropped into the list from another list
        onAdd: function(/**Event*/ evt) {
          console.log("onAdd");
          console.log(evt);
          // same properties as onEnd
        },

        // Changed sorting within list
        // onUpdate: function (/**Event*/evt) {
        //   console.log("onUpdate")
        //   // same properties as onEnd
        // },

        // Called by any change to the list (add / update / remove)
        onSort: function(/**Event*/ evt) {
          console.log("onSort");
          // same properties as onEnd
        },

        // Element is removed from the list into another list
        onRemove: function(/**Event*/ evt) {
          console.log("onRemove");
          // same properties as onEnd
        },

        // Attempt to drag a filtered element
        onFilter: function(/**Event*/ evt) {
          console.log("onFilter");
          // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
        },

        // Event when you move an item in the list or between lists
        onMove: function(/**Event*/ evt, /**Event*/ originalEvent) {
          console.log("onMove");
          // Example: http://jsbin.com/tuyafe/1/edit?js,output
          // evt.dragged; // dragged HTMLElement
          // evt.draggedRect; // TextRectangle {left, top, right и bottom}
          // evt.related; // HTMLElement on which have guided
          // evt.relatedRect; // TextRectangle
          // originalEvent.clientY; // mouse position
          // return false; — for cancel
        },

        // Called when creating a clone of element
        onClone: function(/**Event*/ evt) {
          console.log("onClone");
          // var origEl = evt.item;
          // var cloneEl = evt.clone;
        }
      });
      [].forEach.call(byId("drag").getElementsByClassName("rows"), function(
        block,
        i
      ) {
        Sortable.create(block, {
          group: "content",
          draggable: ".contents",
          handle: ".content-move",
          animation: 150,
          setData: function(dataTransfer) {
            dataTransfer.setData("Text", "");
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
            // 把数组根据dom的拖拽，做出新的排序
            console.log(i);
            if ($this.moveEndFunc) {
              $this.moveEndData.from.rowIndex = i;
              $this.moveEndData.from.elIndex = evt.oldIndex;
              $this.moveEndData.to.rowIndex = i;
              $this.moveEndData.to.elIndex = evt.newIndex;
            }
            // 筛出数据
            const targetCol = $this.layoutTemp.value.rows[
              $this.moveEndData.from.rowIndex
            ].contents.splice($this.moveEndData.from.elIndex, 1)[0];
            // 插入数据
            $this.layoutTemp.value.rows[
              $this.moveEndData.to.rowIndex
            ].contents.splice($this.moveEndData.to.elIndex, 0, targetCol);
            // 更改数据，强制渲染当前列表
            const newArray = $this.layoutTemp.value.rows.slice(0);
            $this.layoutTemp.value.rows = [];
            // 数据变化后再次刷新
            $this.$nextTick(() => {
              $this.layoutTemp.value.rows = newArray;
              $this.$nextTick(() => {
                $this.colMoveSet();
              });
            });
          },
          // Element is chosen
          onChoose: function(/**Event*/ evt) {
            console.log("onChoose", i);
            $this.moveEndData.from.rowIndex = i;
            $this.moveEndFunc = true;
            // evt.oldIndex;  // element index within parent
          },

          // Element dragging started
          onStart: function(/**Event*/ evt) {
            console.log("onStart");
            evt.oldIndex; // element index within parent
          },

          // Element dragging ended
          // onEnd: function (/**Event*/evt) {
          //   console.log('onEnd')
          //   // var itemEl = evt.item;  // dragged HTMLElement
          //   // evt.to;    // target list
          //   // evt.from;  // previous list
          //   // evt.oldIndex;  // element's old index within old parent
          //   // evt.newIndex;  // element's new index within new parent
          // },

          // Element is dropped into the list from another list
          onAdd: function(/**Event*/ evt) {
            console.log("onAdd");
            $this.moveEndData.to.rowIndex = i;

            // same properties as onEnd
          },

          // Changed sorting within list
          // onUpdate: function (/**Event*/evt) {
          //   console.log("onUpdate")
          //   // same properties as onEnd
          // },

          // Called by any change to the list (add / update / remove)
          onSort: function(/**Event*/ evt) {
            console.log("onSort");
            // same properties as onEnd
          },

          // Element is removed from the list into another list
          onRemove: function(/**Event*/ evt) {
            console.log("onRemove");
            $this.moveEndData.from.rowIndex = i;
            $this.moveEndFunc = false;
            // same properties as onEnd
          },

          // Attempt to drag a filtered element
          onFilter: function(/**Event*/ evt) {
            console.log("onFilter");
            // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
          },

          // Event when you move an item in the list or between lists
          onMove: function(/**Event*/ evt, /**Event*/ originalEvent) {
            console.log("onMove");
            // Example: http://jsbin.com/tuyafe/1/edit?js,output
            // evt.dragged; // dragged HTMLElement
            // evt.draggedRect; // TextRectangle {left, top, right и bottom}
            // evt.related; // HTMLElement on which have guided
            // evt.relatedRect; // TextRectangle
            // originalEvent.clientY; // mouse position
            // return false; — for cancel
          },

          // Called when creating a clone of element
          onClone: function(/**Event*/ evt) {
            console.log("onClone");
            // var origEl = evt.item;
            // var cloneEl = evt.clone;
          }
        });
        [].forEach.call(block.getElementsByClassName("cols"), function(el, j) {
          Sortable.create(el, {
            group: "box",
            draggable: ".box",
            handle: ".box-move",
            animation: 150,
            setData: function(dataTransfer) {
              dataTransfer.setData("Text", "");
              // to avoid Firefox bug
              // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            },
            onEnd: evt => {
              // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
              // 把数组根据dom的拖拽，做出新的排序
              if ($this.moveEndFunc) {
                $this.moveEndData.from.rowIndex = i;
                $this.moveEndData.from.contentIndex = j;
                $this.moveEndData.from.elIndex = evt.oldIndex;
                $this.moveEndData.to.rowIndex = i;
                $this.moveEndData.to.contentIndex = j;
                $this.moveEndData.to.elIndex = evt.newIndex;
              }
              // 筛出数据
              const targetCol = $this.layoutTemp.value.rows[
                $this.moveEndData.from.rowIndex
              ].contents[$this.moveEndData.from.contentIndex].boxs.splice(
                $this.moveEndData.from.elIndex,
                1
              )[0];
              // 插入数据
              $this.layoutTemp.value.rows[
                $this.moveEndData.to.rowIndex
              ].contents[$this.moveEndData.to.contentIndex].boxs.splice(
                $this.moveEndData.to.elIndex,
                0,
                targetCol
              );
              // 更改数据，强制渲染当前列表
              const newArray = $this.layoutTemp.value.rows.slice(0);
              $this.layoutTemp.value.rows = [];
              // 数据变化后再次刷新
              $this.$nextTick(() => {
                $this.layoutTemp.value.rows = newArray;
                $this.$nextTick(() => {
                  $this.colMoveSet();
                });
              });
            },
            // Element is chosen
            onChoose: function(/**Event*/ evt) {
              console.log("onChoose", i, j);
              $this.moveEndData.from.rowIndex = i;
              $this.moveEndData.from.contentIndex = j;
              $this.moveEndFunc = true;

              // evt.oldIndex;  // element index within parent
            },

            // Element dragging started
            onStart: function(/**Event*/ evt) {
              console.log("onStart");
              // evt.oldIndex; // element index within parent
            },

            // Element dragging ended
            // onEnd: function (/**Event*/evt) {
            //   console.log('onEnd')
            //   // var itemEl = evt.item;  // dragged HTMLElement
            //   // evt.to;    // target list
            //   // evt.from;  // previous list
            //   // evt.oldIndex;  // element's old index within old parent
            //   // evt.newIndex;  // element's new index within new parent
            // },

            // Element is dropped into the list from another list
            onAdd: function(/**Event*/ evt) {
              console.log("onAdd", i, j);
              console.log(`第${i}块，第${j}行，插入元素`);
              console.log(evt);
              $this.moveEndData.to.rowIndex = i;
              $this.moveEndData.to.contentIndex = j;
              $this.moveEndData.to.elIndex = evt.newIndex;
              $this.moveEndFunc = false;
              // same properties as onEnd
            },

            // Changed sorting within list
            // onUpdate: function (/**Event*/evt) {
            //   console.log("onUpdate")
            //   // same properties as onEnd
            // },

            // Called by any change to the list (add / update / remove)
            onSort: function(/**Event*/ evt) {
              // console.log("onSort");
              // same properties as onEnd
            },

            // Element is removed from the list into another list
            onRemove: function(/**Event*/ evt) {
              console.log("onRemove", i, j);
              console.log(`第${i + 1}块，第${j + 1}行，删除元素`);
              $this.moveEndFunc = false;
              $this.moveEndData.from.rowIndex = i;
              $this.moveEndData.from.contentIndex = j;
              $this.moveEndData.from.elIndex = evt.oldIndex;
              $this.moveEndFunc = false;
              // same properties as onEnd
            },

            // Attempt to drag a filtered element
            onFilter: function(/**Event*/ evt) {
              // console.log("onFilter");
              // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
            },

            // Event when you move an item in the list or between lists
            onMove: function(/**Event*/ evt, /**Event*/ originalEvent) {
              // console.log("onMove");
              // Example: http://jsbin.com/tuyafe/1/edit?js,output
              // evt.dragged; // dragged HTMLElement
              // evt.draggedRect; // TextRectangle {left, top, right и bottom}
              // evt.related; // HTMLElement on which have guided
              // evt.relatedRect; // TextRectangle
              // originalEvent.clientY; // mouse position
              // return false; — for cancel
            },

            // Called when creating a clone of element
            onClone: function(/**Event*/ evt) {
              console.log("onClone", i, j);
              console.log(evt);
              // var origEl = evt.item;
              // var cloneEl = evt.clone;
            }
          });
        });
      });
    },
    addContent(rowIndex, contentIndex) {
      const newRow = {
        fullWidth: false,
        name: "新内容区块",
        boxs: [],
        config: {
          animation: "",
          id: "",
          class: ""
        },
        style: {
          bg: {
            backgroundImage: "", // 图片
            backgroundColor: "", // 颜色
            backgroundSize: "", // 大小
            backgroundRepeat: "", // 重复
            backgroundPosition: "", // 位置
            backgroundAttachment: "" // 滚动
          },
          border: {
            borderWidth: 0, // 大小
            borderRadius: 0, // 圆角
            borderColor: "", // 边框颜色
            borderStyle: "" // 边框样式
          },
          shadow: {
            shadowColor: "", // 颜色
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: ""
          },
          base: {
            width: "", // 长
            height: "", // 高
            opacity: 100, // 透明
            rotate: "", // 选装
            cursor: "",
            overflow: ""
          },
          position: {
            position: "",
            top: "",
            left: "",
            bottom: "",
            right: "",
            zIndex: ""
          }
        }
      };
      this.layoutTemp.value.rows[rowIndex].contents.splice(
        contentIndex + 1,
        0,
        newRow
      );
      if (this.layoutTemp.value.rows[rowIndex].contents.length > 1) {
        this.moveEndData.from.contentIndex = contentIndex + 1;
      } else {
        this.moveEndData.from.contentIndex = 0;
      }
      this.$nextTick(() => {
        this.colMoveSet();
      });
    },
    /**
     * 删除行
     * block，block数组
     * i，当前行在block里的序号
     *  */
    removeContent(block, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        block.contents.splice(index, 1);
      });
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
      this.getIshows();
      this.dialogComVisible = true;
    },
    // 添加组件逻辑
    addCom(item, type) {
      item.type = type;
      // 选中的是系统组件库

      // ishow，直接添加
      const _ishow = {
        type: "ishow",
        _id: item._id,
        name: item.name
      };
      this.editCol.components.push(Object.assign({}, _ishow));
      this.dialogComVisible = false;
    },
    removeEl(col, index) {
      console.log(col);
      console.log(index);
      col.components.splice(index, 1)[0];
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
    /**
     * index，当前区块位置
     * 删除当前区块
     *  */
    removeBlock(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.layoutTemp.value.splice(index, 1)[0];
      });
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
    removeRow(index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.layoutTemp.value.rows.splice(index, 1)[0];
      });
    },
    /** 添加 */
    addRow(rowIndex) {
      const newBlock = {
        config: {
          animation: "",
          id: "",
          class: ""
        },
        name: "区块new",
        contents: [],
        style: {
          bg: {
            backgroundImage: "", // 图片
            backgroundColor: "", // 颜色
            backgroundSize: "", // 大小
            backgroundRepeat: "", // 重复
            backgroundPosition: "", // 位置
            backgroundAttachment: "" // 滚动
          },
          border: {
            borderWidth: 0, // 大小
            borderRadius: 0, // 圆角
            borderColor: "", // 边框颜色
            borderStyle: "" // 边框样式
          },
          shadow: {
            shadowColor: "", // 颜色
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: ""
          },
          base: {
            width: "", // 长
            height: "", // 高
            opacity: 100, // 透明
            rotate: "", // 选装
            cursor: "",
            overflow: ""
          },
          position: {
            position: "",
            top: "",
            left: "",
            bottom: "",
            right: "",
            zIndex: ""
          }
        }
      };
      this.layoutTemp.value.rows.splice(rowIndex + 1, 0, newBlock);
      if (this.layoutTemp.value.rows.length > 1) {
        this.moveEndData.from.rowIndex = rowIndex + 1;
      } else {
        this.moveEndData.from.rowIndex = 0;
      }
      this.$nextTick(() => {
        // this.rowMoveSet();
        this.colMoveSet();
      });
    },
    // 移动格子
    moveCol(row, index, type) {
      if (Math.abs(type)) {
        const targetCol = row.cols.splice(index, 1)[0];
        console.log(targetCol);
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
    removeCol(col, index) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        col.boxs.splice(index, 1);
      });
      // this.layout.splice(evt.newIndex, 0, targetRow)
    },
    /** 添加 */
    addCol(rowIndex, contentIndex) {
      let newCol = {
        name: "新内容",
        width: 24,
        components: []
      };
      this.layoutTemp.value.rows[rowIndex].contents[contentIndex].boxs.push(
        newCol
      );
      this.$nextTick(() => {
        this.colMoveSet();
      });
    },
    editStyle(style) {
      this.styleTemp = style;
      this.$bus.$emit("openStyleSet");
    },
    getStyle(style) {
      return {
        // 基础
        // width: style.base.width + "px",
        height: style.base.height ? style.base.height + "px" : "auto",
        transform: `rotate(${style.base.rotate}deg)`,
        opacity: style.base.opacity / 100,
        overflow: style.base.overflow,
        zIndex: style.base.zIndex,
        // 定位
        position: style.position.position,
        left: style.position.left + "px",
        right: style.position.right + "px",
        top: style.position.top + "px",
        bottom: style.position.bottom + "px",
        // 边框
        borderWidth: style.border.borderWidth + "px",
        borderRadius: style.border.borderRadius + "px",
        borderColor: style.border.borderColor,
        borderStyle: style.border.borderStyle,
        // 背景
        backgroundImage: `url('${this.cdnurl}${style.bg.backgroundImage}')`,
        backgroundColor: style.bg.backgroundColor,
        backgroundSize: style.bg.backgroundSize,
        backgroundRepeat: style.bg.backgroundRepeat,
        backgroundPosition: style.bg.backgroundPosition,
        backgroundAttachment: style.bg.backgroundAttachment,
        // 阴影
        boxShadow: `${style.shadow.shadowColor} ${style.shadow.shadowX}px ${
          style.shadow.shadowY
        }px ${style.shadow.shadowFuzzy}px ${style.shadow.shadowDire}px ${
          style.shadow.shadowinSet ? "inset" : ""
        }`,
        paddingTop: style.padding.top + "px",
        paddingRight: style.padding.right + "px",
        paddingBottom: style.padding.bottom + "px",
        paddingLeft: style.padding.left + "px"
      };

      return `background:blue;`;
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    dialogContentVisible(val) {
      if (!val && this.dialogCategoryVisible) {
        this.$refs.contentList.getContents();
      }
    }
  },
  components: {
    StyleEdit,
    IshowPre
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.iconfont {
  font-size: 12px !important;
}

.LayoutDesign-container {
  position: relative;
  overflow: hidden;
  min-height: calc(100vh - 84px);

  .i-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fafafa;
    border-bottom: solid 1px #ccc;
    height: 60px;

    .content {
      width: 1200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input {
      border: none;
      border-bottom: solid 1px #eee;
      margin-right: 20px;
      background: none;
      outline: none;
      padding: 4px;
    }
  }

  // .layout-view {
  //   .el-row {
  //     position: relative;
  //   }
  // }

  .drag-box {
    min-height: calc(100vh - 60px);

    .rows {
      position: relative;
      margin-bottom: 50px;
      display: flex;
      flex-flow: column;
      align-items: center;

      &.active {
        border: dotted 1px red;
      }

      &.editting {
        padding: 5px;
        border: dotted 1px #ccc;
        min-height: 100px;
      }

      &.preview {
        border: none;
        padding: 0;
        min-height: 0;
        overflow: hidden;
      }

      > .btns-row {
        position: absolute;
        top: -25px;
        left: 5px;
        z-index: 9999;
      }

      .contents {
        position: relative;

        &.active {
          border: solid 1px red;
        }

        &.editting {
          margin-top: 10px;
          min-height: 100px;
          border: 1px solid #337ab7;
          padding: 15px 5px 10px 5px;
          box-sizing: content-box;
        }

        &.preview {
          min-height: 0;
          border: none;
          padding: 0;
          overflow: hidden;
        }

        &:first-child {
          margin-top: none;
        }

        > .btns-content {
          right: 5px;
          top: 1px;
          position: absolute;
        z-index: 9999;

        }

        .box {
          position: relative;
          margin-top: 10px;
          padding-bottom: 5px;

          &:first-child {
            margin-top: none;
          }

          &.editting {
            margin-top: 10px;
            padding-bottom: 5px;

            .view {
              border: dashed 1px #5cb85c;
              min-height: 90px;
            }
          }

          &.preview {
            margin-top: 0;
            padding-bottom: 0;

            .view {
              border: none;
              min-height: 0;
            }
          }

          > .btns-box {
            left: 5px;
            bottom: -10px;
            position: absolute;
          }

          .ico-width {
            left: 12px;
            top: 12px;
            position: absolute;
          }

          .view {
            overflow: hidden;

            .text-input {
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-size: 14 px;
              width: 50%;
              height: 60%;
              text-align: center;
            }

            .components-col {
              &:hover {
                .el-control {
                  opacity: 1;
                }
              }

              .el-control {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.1);
                opacity: 0;
                display: flex;
                justify-content: center;
                align-content: center;
                flex-direction: column;
                // justify-items: center;
              }
            }
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
