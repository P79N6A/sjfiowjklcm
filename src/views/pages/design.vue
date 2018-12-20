<template>
  <div class="LayoutDesigh-container">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="frameTemp.name" placeholder="请输入框架名称" />
        </el-col>
        <el-col :span="4">
          <el-select v-model="frameTemp.device" placeholder="请选择框架适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button @click="frameTemp._id?updateFrame():addFrames()">保存</el-button>
          <el-button @click="$router.push({name:'frames'})">取消</el-button>
        </el-col>
      </el-row>
    </el-header>

    <div id="drag-box">
      <div class="show" v-for="(block,i) in layoutData" :key="i">
        <!-- 块区域 -->
        <el-button-group class="block-controls">
          <el-button circle><input v-model="block.text"></el-button>
          <el-tooltip class="item" effect="dark" content="点击查看编辑容器的样式" placement="top-start">
            <el-button circle type="danger" icon="el-icon-edit-outline" @click="EditStyleShow=true;EditStyle=block.style;EditType=1"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="向上移动" placement="top-start" v-if="i!=0">
            <el-button circle type="danger" icon="el-icon-upload2" @click="moveBlock(i,-1)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="向下移动" placement="top-start" v-if="i!=layoutData.length-1">
            <el-button circle type="danger" icon="el-icon-download" @click="moveBlock(i,1)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="在后面追加一个容器" placement="top-start">
            <el-button circle type="danger" icon="el-icon-plus" @click="addBlock(i)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除当前容器" placement="top-start">
            <el-button circle type="danger" icon="el-icon-close" @click="removeBlock(i)"></el-button>
          </el-tooltip>
        </el-button-group>
        <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :style="row.style">
          <!-- 区块操作按钮 -->
          <el-button-group class="row-controls">
            <el-button circle><input v-model="row.text"></el-button>
            <el-tooltip class="item" effect="dark" content="编辑当前内容区块样式" placement="top-start">
              <el-button circle type="warning" icon="el-icon-edit-outline" @click="EditStyleShow=true;EditStyle=row.style;EditType=-1"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向上移动" placement="top-start">
              <el-button circle type="warning" icon="el-icon-upload2" @click="moveRow(block,r,-1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="向下移动" placement="top-start">
              <el-button circle type="warning" icon="el-icon-download" @click="moveRow(block,r,1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="固定居中宽度" placement="top-start">
              <el-button circle type="warning" icon="iconfont icon-smaller" @click="row.style.width='1200px'"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="通屏100%宽度" placement="top-start">
              <el-button circle type="warning" icon="iconfont icon-bigger" @click="row.style.width='100%'"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="在后面追加内容区块" placement="top-start">
              <el-button circle type="warning" icon="el-icon-plus" @click="addRow(block,r)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除当前内容区块" placement="top-start">
              <el-button circle type="warning" icon="el-icon-close" @click="removeRow(block,r)"></el-button>
            </el-tooltip>
          </el-button-group>
          <!-- 行区域 -->
          <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
            <!-- 格子区域 -->
            <div>
              <el-tag type="success" class="ico-width">{{ (col.width/24*100).toFixed(2) }}%</el-tag>
              <!-- 内容-{{col.text}} -->
              <input v-model="col.text" placeholder="内容区域">
              <div>
                <!-- 内容区域操作按钮 -->
                <el-button-group class="col-controls">
                  <el-tooltip class="item" effect="dark" content="减小格子宽度" placement="top-start">
                    <el-button circle type="primary" icon="el-icon-zoom-out" @click="smaller(col)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="增加格子宽度" placement="top-start">
                    <el-button circle type="primary" icon="el-icon-zoom-in" @click="bigger(col)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="在后面追加格子" placement="top-start">
                    <el-button circle type="primary" icon="el-icon-circle-plus" @click="addCol(row,j)"></el-button>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除当前格子" placement="top-start">
                    <el-button circle type="primary" icon="el-icon-circle-close" @click="removeCol(row,j)"></el-button>
                  </el-tooltip>
                </el-button-group>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 工具栏 -->
    <!-- 模块样式 -->
    <StyleEdit :styleData="EditStyle" v-model="EditStyleShow" :EditType="EditType" class="active" @changeStyle="changeStyle"></StyleEdit>
    <!-- <el-button :icon="leftActive?'el-icon-arrow-left':'el-icon-arrow-right'" type="primary" class="toggle" @click="leftActive=!leftActive" /> -->
    <!-- 系统快捷布局 -->
    <!-- <el-aside :class="{active:rightActive}" class="rightMenu">
      <div class="rows"></div>
      <el-button :icon="rightActive?'el-icon-arrow-right':'el-icon-arrow-left'" type="primary" class="toggle" @click="rightActive=!rightActive" />
    </el-aside>-->
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

  import Sortable from "sortablejs";
  import StyleEdit from "./components/StyleEdit";

  var byId = function (id) {
    return document.getElementById(id);
  };
  export default {
    name: "Page401",
    data() {
      return {
        EditStyle: {
          color: ""
        },
        EditStyleShow: false,
        EditType:1,
        frameTemp: {
          _id: "",
          name: "",
          device: "",
          value: [{
              style: {
                width: "1200px",
                margin: "0 auto"
              },
              text: "A",
              rows: [{
                style: {
                  width: "1200px",
                  margin: 0
                },
                cols: [{
                    text: "A-1",
                    width: 24
                  },
                  {
                    text: "A-1",
                    width: 24
                  }
                ]
              }]
            },
            {
              style: {
                width: "1200px",
                margin: "0 auto"
              },
              text: "B",
              rows: [{
                style: "width:1100px;margin:0 auto;",
                cols: [{
                    text: "B",
                    width: 14
                  },
                  {
                    text: "B",
                    width: 20
                  }
                ]
              }]
            },
            {
              style: {
                width: 1200,
                margin: 0
              },
              text: "C",
              rows: [{
                style: "width:1100px;margin:0 auto;",
                cols: [{
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
              }]
            }
          ]
        },
        layoutData: [{
            style: {
              margin: 0
            },
            text: "A",
            rows: [{
              style: {
                width: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 0,
                marginBottom: 0
              },
              text: '内容区块1',
              cols: [{
                  text: "格子",
                  width: 24
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }]
          },
          {
            style: {
              margin: "0 auto"
            },
            text: "B",
            rows: [{
              style: {
                width: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 0,
                marginBottom: 0
              },
              text: '内容区块2',
              cols: [{
                  text: "格子",
                  width: 12
                },
                {
                  text: "格子",
                  width: 12
                }
              ]
            }]
          },
          {
            style: {
              margin: 0
            },
            text: "c",
            rows: [{
              style: {
                width: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: 0,
                marginBottom: 0
              },
              text: '内容区块3',
              cols: [{
                  text: "格子",
                  width: 6
                },
                {
                  text: "格子",
                  width: 6
                },
                {
                  text: "格子",
                  width: 6
                },
                {
                  text: "格子",
                  width: 6
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }]
          }
        ],
        leftActive: false,
        rightActive: false,
        dialogVisible: false,
        newList: []
      };
    },
    mounted() {
      console.log(this.$route);
      if (this.$route.query.frameId) {
        this.getFrame({
          _id: this.$route.query.frameId
        });
      } else {
        this.colMoveSet();
      }
    },
    methods: {
      addFrames() {
        this.frameTemp.value = this.layoutData;
        addFrames(this.frameTemp)
          .then(res => {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
            this.$router.push({
              name: 'frames'
            })
          })
          .catch(err => {});
      },
      updateFrame() {
        this.frameTemp.value = this.layoutData;
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
      getFrame(data) {
        getFramesOne(data)
          .then(res => {
            this.frameTemp = res.data;
            this.layoutData = res.data.value;
            this.colMoveSet();
          })
          .catch(err => {});
      },
      changeStyle(val) {
        console.log(val);
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
        [].forEach.call(byId("drag-box").getElementsByClassName("show"), function (
          block,
          i
        ) {
          [].forEach.call(block.getElementsByClassName("rows"), function (el, j) {
            console.log("col-set");
            Sortable.create(el, {
              group: "cols" + i,
              draggable: ".cols",
              handle: ".cols",
              animation: 150,
              setData: function (dataTransfer) {
                dataTransfer.setData("Text", "");
                // to avoid Firefox bug
                // Detail see : https://github.com/RubaXa/Sortable/issues/1012
              },
              onEnd: evt => {
                // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
                // 把数组根据dom的拖拽，做出新的排序
                const targetCol = $this.layoutData[i].rows[j].cols.splice(
                  evt.oldIndex,
                  1
                )[0];
                $this.layoutData[i].rows[j].cols.splice(
                  evt.newIndex,
                  0,
                  targetCol
                );
                // 更高数据，强制渲染当前列表
                const newArray = $this.layoutData[i].rows[j].cols.slice(0);
                $this.layoutData[i].rows[j].cols = [];
                // 数据变化后再次刷新
                $this.$nextTick(() => {
                  $this.layoutData[i].rows[j].cols = newArray;
                });
              },
              // Element is chosen
              onChoose: function ( /**Event*/ evt) {
                console.log("onChoose");
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
          });
        });
      },
      rowMoveSet() {
        // 拖拽row
        [].forEach.call(byId("drag-box").getElementsByClassName("show"), function (
          el,
          i
        ) {
          console.log("row-set");
          Sortable.create(el, {
            group: "rows" + i,
            animation: 150,
            draggable: ".rows",
            handle: ".rows",
            onEnd: evt => {
              console.log(evt);
            }
          });
        });
      },
      addBlock(index) {
        const newBlock = {
          style: {
            width: "1200px",
            margin: "0 auto"
          },
          text: "内容区块",
          rows: [{
            style: {
              width: "1200px",
              margin: "0 auto"
            },
            cols: [{
              text: "格子",
              width: 24
            }]
          }]
        };
        this.layoutData.splice(index + 1, 0, newBlock);
        this.$nextTick(() => {
          // this.rowMoveSet();
          this.colMoveSet();
        });
      },
      moveBlock(index, type) {
        if (Math.abs(type)) {
          const targetBlock = this.layoutData.splice(index, 1)[0];
          this.layoutData.splice(index + type, 0, targetBlock);
        } else {
          return;
        }
      },
      /**
       * index，当前区块位置
       * 删除当前区块
       *  */
      removeBlock(index) {
        this.layoutData.splice(index, 1)[0];
      },
      /**
       * col，当前栅栏object
       * 栅栏缩小
       * */
      smaller(col) {
        if (col.width > 1) {
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
      /** move row
       *
       */
      moveRow(block, index, type) {
        console.log(block);
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
        console.log(block);
        console.log(index);
        block.rows.splice(index, 1);
      },
      /** 添加 */
      addRow(block, index) {
        const newRow = {
          style: {
            width: "1200px",
            margin: "0 auto"
          },
          cols: [{
            text: "新内容",
            width: 24
          }]
        };
        block.rows.splice(index + 1, 0, newRow);
        this.$nextTick(() => {
          // this.rowMoveSet();
          this.colMoveSet();
        });
      },
      /**
       * 删除栅栏
       * row，row数组
       * i，当前栅栏的序号
       *  */
      removeCol(row, index) {
        row.cols.splice(index, 1);
        // this.layout.splice(evt.newIndex, 0, targetRow)
      },
      /** 添加 */
      addCol(row, index) {
        const newCol = {
          text: "新格子",
          width: 24
        };
        row.cols.splice(index + 1, 0, newCol);
        this.$nextTick(() => {
          // this.rowMoveSet();
          this.colMoveSet();
        });
      },
      setSortBlock() {
        const el = document.querySelectorAll(".drag-box")[0];
        Sortable.create(el, {
          ghostClass: "sortable-ghost", // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData("Text", "");
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            is.layoutData.splice(evt.oldIndex, 1)[0];
            // this.layoutData.splice(evt.newIndex, 0, targetRow)
            // this.$nextTick(() => {
            // const targetRow = this.layoutData.splice(evt.oldIndex, 1)[0]
            // this.layoutData.splice(evt.newIndex, 0, targetRow)
            // this.setSort()
            // })
            setTimeout(() => {
              const targetRow = this.layoutData.splice(evt.oldIndex, 1)[0];
              this.layoutData.splice(evt.newIndex, 0, targetRow);
            }, 300);
            console.log(evt);
            // for show the changes, you can delete in you code
            // const tempIndex = this.layout.splice(evt.oldIndex, 1)[0]
            // this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        });
      },
      setSort(el, group) {
        // const el = document.querySelectorAll('.show')
        Sortable.create(el, {
          ghostClass: "sortable-ghost", // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData("Text", "");
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          group: group,
          onEnd: evt => {
            // const targetRow = this.layout.splice(evt.oldIndex, 1)[0]
            // this.layout.splice(evt.newIndex, 0, targetRow)
            // for show the changes, you can delete in you code
            // const tempIndex = this.layout.splice(evt.oldIndex, 1)[0]
            // this.newList.splice(evt.newIndex, 0, tempIndex)
          }
        });
      },
      getEl() {
        const els = document.querySelectorAll(".show");
        for (var i = 0; i < els.length; i++) {
          this.setSort(els[i], "rows");
        }
        // const
      }
    },
    components: {
      StyleEdit
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss">
  @import url('//at.alicdn.com/t/font_957526_lqqst93s3j.css');

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

          >div {
            position: relative;
            border: dashed 1px #409eff;
            padding: 10px;
            text-align: center;
            height: 70px;
            cursor: move;



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

  // 0,
  // 1,
  // 2,  old
  // 3,  new
  // 4

</style>
