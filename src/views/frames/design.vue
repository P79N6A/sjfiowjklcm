<template>
  <div class="FrameDesigh-container">
    <div class="i-header">
      <div class="content">
        <div id="clone">
          <el-button type="danger" class="clone-row" @click="addRow(moveEndData.from.rowIndex)">添加区块</el-button>
          <el-button type="warning" @click="addContent(moveEndData.from.rowIndex,moveEndData.from.contentIndex)">添加行</el-button>
              <el-button type="primary" @click="addCol(moveEndData.from.rowIndex,moveEndData.from.contentIndex)">
              添加内容块
            </el-button>
          <i class="el-icon-question"></i>
        </div>
        <div>
          <el-button @click="dialogFormVisible=true;" type="primary">设置</el-button>
          <el-button @click="frameTemp._id?updateFrame():addFrames()" type="primary">保存</el-button>
          <el-button @click="$router.push({name:'frames'})" type="warning">退出</el-button>
        </div>
      </div>
    </div>
    <!-- 操作部分 -->
    <div class="drag-box" id="drag">
      <div class="rows" v-for="(row,i) in frameTemp.value.rows" :key="i" :class="{active:i==moveEndData.from.rowIndex}" @click="moveEndData.from.rowIndex=i">
        <div class="btns-row">
          <i class="el-icon-rank row-move"></i>
          <i class="el-icon-circle-close-outline" @click="removeRow(i)"></i>
          <input v-model="row.name">
        </div>
        <div class="contents" v-for="(content,j) in row.contents" :key="j" :style="`width:${content.fullWidth?'100%':frameTemp.value.contentWidth+'px'}`" :class="{active:moveEndData.from.rowIndex==i&&j==moveEndData.from.contentIndex}" @click="moveEndData.from.contentIndex=j">
          <div class="btns-content">
            <input v-model="content.name">
            <i class="iconfont icon-smaller" @click="content.fullWidth=false" v-show="content.fullWidth==true"></i>
            <i class="iconfont icon-bigger" @click="content.fullWidth=true" v-show="content.fullWidth==false"></i>
            <i class="el-icon-rank content-move"></i>
            <i class="el-icon-circle-close-outline" @click="removeContent(row,r)"></i>
          </div>
          <el-row class="cols">
            <el-col class="box" v-for="(box,k) in content.boxs" :key="k" :span="box.width">
              <el-tag type="success" class="ico-width">{{frameTemp.value.contentWidth*box.width/24}}PX</el-tag>
              <div class="btns-box">
                <i class="el-icon-d-arrow-left" @click="box.width>2?box.width--:null"></i>
                <i class="el-icon-d-arrow-right" @click="box.width<24?box.width++:null"></i>
                <i class="el-icon-rank box-move"></i>
                <i class="el-icon-circle-close-outline" @click="removeCol(content,k)"></i>
              </div>
              <div class="view">
                <input v-model="box.name" class="text-input">

              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <!-- 工具栏 -->
    <el-dialog :visible.sync="dialogFormVisible" width="800px" title="属性设置">
      <el-form ref="dataFormKey" :model="frameTemp" label-position="right" label-width="80px">
        <el-form-item label="*布局名称" prop="name">
          <el-input v-model="frameTemp.name" />
        </el-form-item>
        <el-form-item label="*主体宽度">
          <el-input v-model="frameTemp.value.contentWidth" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getFramesOne,
    updateFrames,
    addFrames
  } from "@/api/frames";

  import Sortable from "sortablejs";
  import {
    getToken,
    setToken,
    removeToken
  } from "@/utils/auth";

  var byId = function (id) {
    return document.getElementById(id);
  };
  export default {
    data() {
      return {
        dialogFormVisible: false,
        moveEndFunc:false,
        activeRow:0,
        activeContent:0,
        moveEndData:{
          from:{
            rowIndex:0,
            contentIndex:0,
            elIndex:0
          },
          to:{
            rowIndex:0,
            contentIndex:0,
            elIndex:0
          }
        },
        textMap: {
          layout: "整站框架",
          page: "页面框架"
        },
        frameTemp: {
          _id: "",
          name: "",
          device: getToken("SiteDevice"),
          type: "",
          value: {
            rows: [{
              name: '区块1',
              contents: [{
                name: '行块1',
                fullWidth: true,
                boxs: [{
                  name: '内容块1',
                  width: 4
                }, {
                  name: '内容块2',
                  width: 4
                }, {
                  name: '内容块3',
                  width: 4
                }]
              }, {
                name: '行块1',
                fullWidth: false,
                boxs: [{
                  name: '内容块1',
                  width: 4
                }, {
                  name: '内容块2',
                  width: 4
                }, {
                  name: '内容块3',
                  width: 4
                }]
              }]
            }, {
              name: '区块1',
              contents: [{
                name: '行块1',
                fullWidth: true,
                boxs: [{
                  name: '内容块1',
                  width: 4
                }, {
                  name: '内容块2',
                  width: 4
                }, {
                  name: '内容块3',
                  width: 4
                }]
              }, {
                name: '行块1',
                fullWidth: false,
                boxs: [{
                  name: '内容块1',
                  width: 4
                }, {
                  name: '内容块2',
                  width: 4
                }, {
                  name: '内容块3',
                  width: 4
                }]
              }]
            }],
            contentWidth: 1200
          }
        },
        leftActive: false,
        rightActive: false,
        dialogVisible: false,
        newList: []
      };
    },
    mounted() {
      // if (this.$route.query.frameType) {
      // 判断是否有frameType
      // this.frameTemp.type = this.$route.query.frameType;
      if (this.$route.query.frameId) {
        // 查看数据库已有模板
        this.getFrame({
          _id: this.$route.query.frameId
        });
      } else {
        // 新模板
        // if (this.$route.query.frameType == "layout") {
        //   this.frameTemp.value = this.layoutData;
        // } else if (this.$route.query.frameType == "page") {
        // this.frameTemp.value = this.pageData;
        // }
      }
      // } else {
      //   this.$router.go(-1);
      // }
      // 渲染
      this.$nextTick(() => {
        this.colMoveSet();
      });
    },
    methods: {
      //读取框架数据
      getFrame(data) {
        getFramesOne(data)
          .then(res => {
            this.frameTemp = res.data;
            // this.layoutData = res.data.value;
            this.$nextTick(() => {
              this.colMoveSet();
            });
          })
          .catch(err => {});
      },
      // 添加框架
      addFrames() {
        addFrames(this.frameTemp)
          .then(res => {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
            this.$router.push({
              name: "frames"
            });
          })
          .catch(err => {});
      },
      // 更新框架数据
      updateFrame() {
        updateFrames(this.frameTemp)
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
                name: 'rows',
                pull: 'clone',
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
              setData: function (dataTransfer) {
                dataTransfer.setData("Text", "");
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
              },
              onEnd: evt => {
                console.log(evt);
                                  // 筛出数据
                  const targetCol = 
                  $this.frameTemp.value.rows.splice(
                    evt.oldIndex,
                    1
                  )[0];
                  // 插入数据
                  $this.frameTemp.value.rows.splice(
                    evt.newIndex,
                    0,
                    targetCol
                  );
                  // 更改数据，强制渲染当前列表
                  const newArray = $this.frameTemp.value.rows.slice(0);
                  $this.frameTemp.value.rows= [];
                  // 数据变化后再次刷新
                  $this.$nextTick(() => {
                    $this.frameTemp.value.rows= newArray;
                    $this.$nextTick(() => {
                      $this.colMoveSet()
                    });
                  });
              },
              // Element is chosen
              onChoose: function ( /**Event*/ evt) {
                console.log("onChoose");
                $this.moveEndFunc=true;

                // evt.oldIndex;  // element index within parent
              },

              // Element dragging started
              onStart: function ( /**Event*/ evt) {
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
              onAdd: function ( /**Event*/ evt) {
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
              onSort: function ( /**Event*/ evt) {
                console.log("onSort");
                // same properties as onEnd
              },

              // Element is removed from the list into another list
              onRemove: function ( /**Event*/ evt) {
                console.log("onRemove");
                // same properties as onEnd
              },

              // Attempt to drag a filtered element
              onFilter: function ( /**Event*/ evt) {
                console.log("onFilter");
                // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
              },

              // Event when you move an item in the list or between lists
              onMove: function ( /**Event*/ evt, /**Event*/ originalEvent) {
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
              onClone: function ( /**Event*/ evt) {
                console.log("onClone");
                // var origEl = evt.item;
                // var cloneEl = evt.clone;
              }
            });
        [].forEach.call(byId("drag").getElementsByClassName("rows"), function (
          block,
          i
        ) {
             Sortable.create(block, {
              group: "content",
              draggable: ".contents",
              handle: ".content-move",
              animation: 150,
              setData: function (dataTransfer) {
                dataTransfer.setData("Text", "");
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
              },
              onEnd: evt => {
                // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
                // 把数组根据dom的拖拽，做出新的排序
                console.log(i)
                  if($this.moveEndFunc){
                    $this.moveEndData.from.rowIndex=i;
                    $this.moveEndData.from.elIndex=evt.oldIndex;
                    $this.moveEndData.to.rowIndex=i;
                    $this.moveEndData.to.elIndex=evt.newIndex;
                  }
                  // 筛出数据
                  const targetCol = 
                  $this.frameTemp.value.rows[$this.moveEndData.from.rowIndex].contents.splice(
                    $this.moveEndData.from.elIndex,
                    1
                  )[0];
                  // 插入数据
                  $this.frameTemp.value.rows[$this.moveEndData.to.rowIndex].contents.splice(
                    $this.moveEndData.to.elIndex,
                    0,
                    targetCol
                  );
                  // 更改数据，强制渲染当前列表
                  const newArray = $this.frameTemp.value.rows.slice(0);
                  $this.frameTemp.value.rows= [];
                  // 数据变化后再次刷新
                  $this.$nextTick(() => {
                    $this.frameTemp.value.rows= newArray;
                    $this.$nextTick(() => {
                      $this.colMoveSet()
                    });
                  });
              },
              // Element is chosen
              onChoose: function ( /**Event*/ evt) {
                console.log("onChoose",i);
                $this.moveEndData.from.rowIndex=i;
                $this.moveEndFunc=true;
                // evt.oldIndex;  // element index within parent
              },

              // Element dragging started
              onStart: function ( /**Event*/ evt) {
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
              onAdd: function ( /**Event*/ evt) {
                console.log("onAdd");
                $this.moveEndData.to.rowIndex=i;

                // same properties as onEnd
              },

              // Changed sorting within list
              // onUpdate: function (/**Event*/evt) {
              //   console.log("onUpdate")
              //   // same properties as onEnd
              // },

              // Called by any change to the list (add / update / remove)
              onSort: function ( /**Event*/ evt) {
                console.log("onSort");
                // same properties as onEnd
              },

              // Element is removed from the list into another list
              onRemove: function ( /**Event*/ evt) {
                console.log("onRemove");
                $this.moveEndData.from.rowIndex=i;
                $this.moveEndFunc=false;
                // same properties as onEnd
              },

              // Attempt to drag a filtered element
              onFilter: function ( /**Event*/ evt) {
                console.log("onFilter");
                // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
              },

              // Event when you move an item in the list or between lists
              onMove: function ( /**Event*/ evt, /**Event*/ originalEvent) {
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
              onClone: function ( /**Event*/ evt) {
                console.log("onClone");
                // var origEl = evt.item;
                // var cloneEl = evt.clone;
              }
            });
          [].forEach.call(block.getElementsByClassName("cols"), function (el, j) {
            Sortable.create(el, {
              group: "box",
              draggable: ".box",
              handle: ".box-move",
              animation: 150,
              setData: function (dataTransfer) {
                dataTransfer.setData("Text", "");
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
              },
              onEnd: evt => {
                // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
                // 把数组根据dom的拖拽，做出新的排序
                  if($this.moveEndFunc){
                    $this.moveEndData.from.rowIndex=i;
                    $this.moveEndData.from.contentIndex=j;
                    $this.moveEndData.from.elIndex=evt.oldIndex;
                    $this.moveEndData.to.rowIndex=i;
                    $this.moveEndData.to.contentIndex=j;
                    $this.moveEndData.to.elIndex=evt.newIndex;
                  }
                  // 筛出数据
                  const targetCol = $this.frameTemp.value.rows[$this.moveEndData.from.rowIndex].contents[$this.moveEndData.from.contentIndex].boxs.splice(
                    $this.moveEndData.from.elIndex,
                    1
                  )[0];
                  // 插入数据
                  $this.frameTemp.value.rows[$this.moveEndData.to.rowIndex].contents[$this.moveEndData.to.contentIndex].boxs.splice(
                    $this.moveEndData.to.elIndex,
                    0,
                    targetCol
                  );
                  // 更改数据，强制渲染当前列表
                  const newArray = $this.frameTemp.value.rows.slice(0);
                  $this.frameTemp.value.rows= [];
                  // 数据变化后再次刷新
                  $this.$nextTick(() => {
                    $this.frameTemp.value.rows= newArray;
                    $this.$nextTick(() => {
                      $this.colMoveSet()
                    });
                  });

              },
              // Element is chosen
              onChoose: function ( /**Event*/ evt) {
                console.log("onChoose",i,j);
                $this.moveEndData.from.rowIndex=i;
                $this.moveEndData.from.contentIndex=j;
                $this.moveEndFunc=true;

                // evt.oldIndex;  // element index within parent
              },

              // Element dragging started
              onStart: function ( /**Event*/ evt) {
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
              onAdd: function ( /**Event*/ evt) {
                console.log("onAdd",i,j);
                console.log(`第${i}块，第${j}行，插入元素`)
                console.log(evt)
                $this.moveEndData.to.rowIndex=i;
                $this.moveEndData.to.contentIndex=j;
                $this.moveEndData.to.elIndex=evt.newIndex;
                $this.moveEndFunc=false;
                // same properties as onEnd
              },

              // Changed sorting within list
              // onUpdate: function (/**Event*/evt) {
              //   console.log("onUpdate")
              //   // same properties as onEnd
              // },

              // Called by any change to the list (add / update / remove)
              onSort: function ( /**Event*/ evt) {
                // console.log("onSort");
                // same properties as onEnd
              },

              // Element is removed from the list into another list
              onRemove: function ( /**Event*/ evt) {
                console.log("onRemove",i,j);
                console.log(`第${i+1}块，第${j+1}行，删除元素`)
                $this.moveEndFunc=false;
                $this.moveEndData.from.rowIndex=i;
                $this.moveEndData.from.contentIndex=j;
                $this.moveEndData.from.elIndex=evt.oldIndex;
                $this.moveEndFunc=false;
                // same properties as onEnd
              },

              // Attempt to drag a filtered element
              onFilter: function ( /**Event*/ evt) {
                // console.log("onFilter");
                // var itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
              },

              // Event when you move an item in the list or between lists
              onMove: function ( /**Event*/ evt, /**Event*/ originalEvent) {
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
              onClone: function ( /**Event*/ evt) {
                console.log("onClone",i,j);
                console.log(evt)
                // var origEl = evt.item;
                // var cloneEl = evt.clone;
              }
            });
          });
        });
      },
      addRow(rowIndex) {
        const newBlock = {
          name: "区块new",
          contents: []
        };
        this.frameTemp.value.rows.splice(rowIndex + 1, 0, newBlock);
        if(this.frameTemp.value.rows.length>1){
          this.moveEndData.from.rowIndex=rowIndex+1;
        }else{
          this.moveEndData.from.rowIndex=0;
        }
        this.$nextTick(() => {
          // this.rowMoveSet();
          this.colMoveSet();
        });
      },
      /**
       * index，当前区块位置
       * 删除当前区块
       *  */
      removeRow(index) {
        this.frameTemp.value.rows.splice(index, 1)[0];
      },
      /**
       * 删除行
       * block，block数组
       * i，当前行在block里的序号
       *  */
      removeContent(block, index) {
        block.contents.splice(index, 1);
      },
      /** 添加 */
      addContent(rowIndex, contentIndex) {
        const newRow = {
          fullWidth: false,
          name: "新内容区块",
          boxs: []
        };
        this.frameTemp.value.rows[rowIndex].contents.splice(contentIndex + 1, 0, newRow);
        if(this.frameTemp.value.rows[rowIndex].contents.length>1){
          this.moveEndData.from.contentIndex=contentIndex+1
        }else{
          this.moveEndData.from.contentIndex=0
        }
        this.$nextTick(() => {
          this.colMoveSet();
        });
      },
      /** 添加 */
      addCol(rowIndex, contentIndex) {
        let newCol = {
          name: "新内容",
          width: 24
        };
        // console.log(this.frameTemp.value.rows[rowIndex].contents[contentIndex])
        this.frameTemp.value.rows[rowIndex].contents[contentIndex].boxs.push(newCol);
        this.$nextTick(() => {
          this.colMoveSet();
        });
      },
      removeCol(col, index) {
        col.boxs.splice(index, 1);
      },
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import url("//at.alicdn.com/t/font_957526_lqqst93s3j.css");

  .iconfont {
    font-size: 12px !important;
  }

  .FrameDesigh-container {
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

    .drag-box {
      background: #fff;
      min-height: calc(100vh - 60px);
      padding: 50px;

      .rows {
        min-height: 100px;
        padding: 10px;
        border: dotted 1px #ccc;
        position: relative;
        margin-bottom: 50px;
        display: flex;
        flex-flow: column;
        align-items: center;
        &.active{
          border: dotted 1px red;
        }
        >.btns-row {
          position: absolute;
          top: -25px;
          left: 5px;
        }

        .contents {
          min-height: 100px;
          border: 1px solid #337ab7;
          padding: 20px;
          position: relative;
          margin-top: 10px;
          &.active{
            border: solid 1px red;
          }
          &:first-child {
            margin-top: none;
          }

          >.btns-content {
            right: 5px;
            top: 1px;
            position: absolute;
          }

          .box {
            position: relative;
            margin-top: 10px;
            padding: 5px;

            &:first-child {
              margin-top: none;
            }

            >.btns-box {
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
              border: dashed 1px #5cb85c;
              min-height: 90px;

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
            }

          }
        }
      }
    }
  }

</style>
