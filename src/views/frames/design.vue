<template>
  <div class="LayoutDesigh-container">
    <el-header>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="frameTemp.name" placeholder="请输入框架名称">
            <template slot="prepend">{{textMap[frameTemp.type]}}</template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select v-model="frameTemp.device" placeholder="请选择框架适用终端">
            <el-option label="PC端" value="PC"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button @click="frameTemp._id?updateFrame():addFrames()">保存</el-button>
          <el-button @click="$router.push({name:'frames'})">取消</el-button>
        </el-col>
      </el-row>
    </el-header>
    <div id="drag-box" ref="imageWrapper" :class="frameTemp.device">
      <div class="show" v-for="(block,i) in frameTemp.value" :key="i">
        <!-- 块区域 -->
          <el-button-group class="block-controls">
            <el-button>
              <input v-model="block.text">
            </el-button>
            <el-tooltip class="item" effect="dark" content="向上移动" placement="top-start" v-if="i!=0">
              <el-button circle type="danger" icon="el-icon-upload2" @click="moveBlock(i,-1)"></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="向下移动"
              placement="top-start"
              v-if="i!=frameTemp.value.length-1"
            >
              <el-button circle type="danger" icon="el-icon-download" @click="moveBlock(i,1)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="在后面追加一个容器" placement="top-start">
              <el-button circle type="danger" icon="el-icon-plus" @click="addBlock(i)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除当前容器" placement="top-start">
              <el-button circle type="danger" icon="el-icon-close" @click="removeBlock(i)"></el-button>
            </el-tooltip>
          </el-button-group>
          <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :class="frameTemp.device">
            <!-- 区块操作按钮 -->
            {{r}}--{{block.rows.length-1}}
            <el-button-group class="row-controls">
              <el-button>
                <input v-model="row.text">
              </el-button>
              <el-tooltip class="item" effect="dark" content="向上移动" placement="top-start" v-if="r!=0">
                <el-button
                  circle
                  type="warning"
                  icon="el-icon-upload2"
                  @click="moveRow(block,r,-1)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="向下移动" placement="top-start">
                <el-button
                  circle
                  type="warning"
                  icon="el-icon-download"
                  @click="moveRow(block,r,1)"
                  v-if="r!=block.rows.length-1"
                ></el-button>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" content="固定居中宽度" placement="top-start">
                <el-button
                  circle
                  type="warning"
                  icon="iconfont icon-smaller"
                  @click="row.style.width='1200px'"
                ></el-button>
              </el-tooltip> -->
              <!-- <el-tooltip class="item" effect="dark" content="通屏100%宽度" placement="top-start">
                <el-button
                  circle
                  type="warning"
                  icon="iconfont icon-bigger"
                  @click="row.style.width='100%'"
                ></el-button>
              </el-tooltip> -->
              <el-tooltip class="item" effect="dark" content="在后面追加内容区块" placement="top-start">
                <el-button circle type="warning" icon="el-icon-plus" @click="addRow(block,r)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除当前内容区块" placement="top-start">
                <el-button circle type="warning" icon="el-icon-close" @click="removeRow(block,r)"></el-button>
              </el-tooltip>
            </el-button-group>
            <!-- 行区域 -->
            <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols" :class="frameTemp.device">
              <!-- 格子区域 -->
              <div>
                <div v-if="col.isPageView" style="color:red;border:solid 1px red;background:#eee;height:100%;">
                  <img src="./img/ico-page-view.png" style="height:100%;">
                  页面布局展示区域
                </div>
                <div v-else>
                  <input v-model="col.text" placeholder="内容区域">
                </div>
                <el-tag type="success" class="ico-width">{{ (col.width/24*1200).toFixed(0) }}PX</el-tag>
                <!-- 内容-{{col.text}} -->
                <div>
                  <!-- 内容区域操作按钮 -->
                  <el-button-group class="col-controls">
                    <el-tooltip class="item" effect="dark" content="减小格子宽度" placement="top-start">
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-zoom-out"
                        @click="smaller(col)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="增加格子宽度" placement="top-start">
                      <el-button circle type="primary" icon="el-icon-zoom-in" @click="bigger(col)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="在后面追加格子" placement="top-start">
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-circle-plus"
                        @click="addCol(row,j)"
                      ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除当前格子" placement="top-start">
                      <el-button
                        circle
                        type="primary"
                        icon="el-icon-circle-close"
                        @click="removeCol(row,j)"
                      ></el-button>
                    </el-tooltip>
                  </el-button-group>
                </div>
              </div>
            </el-col>
          </el-row>
      </div>
    </div>
    <!-- 工具栏 -->
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

var byId = function(id) {
  return document.getElementById(id);
};
export default {
  data() {
    return {
      EditStyle: {
        color: ""
      },
      EditStyleShow: false,
      EditType: 1,
      textMap: {
        layout: "整站框架",
        page: "页面框架"
      },
      frameTemp: {
        _id: "",
        name: "",
        device: "PC",
        type: "",
        value: []
      },

      // 外框布局模型
      layoutData: [
        {
          text: "A",
          rows: [
            {
              text: "内容区块1",
              cols: [
                {
                  text: "格子",
                  width: 24
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }
          ]
        },
        {
          text: "B",
          rows: [{
              text: "内容区块2",
              cols: [
                {
                  text: "格子",
                  width: 12
                },
                {
                  text: "格子",
                  width: 12,
                  isPageView:true
                }
              ]
            }
          ]
        },
        {
          text: "c",
          rows: [
            {
              text: "内容区块3",
              cols: [
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
                  width: 6
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }
          ]
        }
      ],
      // 页面布局模型
      pageData: [
        {
          text: "A",
          rows: [
            {
              text: "内容区块1",
              cols: [
                {
                  text: "格子",
                  width: 24
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }
          ]
        },
        {
          text: "B",
          rows: [
            {
              text: "内容区块2",
              cols: [
                {
                  text: "格子",
                  width: 12
                },
                {
                  text: "格子",
                  width: 12
                }
              ]
            }
          ]
        },
        {
          text: "c",
          rows: [
            {
              text: "内容区块3",
              cols: [
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
                  width: 6
                },
                {
                  text: "格子",
                  width: 24
                }
              ]
            }
          ]
        }
      ],
      leftActive: false,
      rightActive: false,
      dialogVisible: false,
      newList: []
    };
  },
  mounted() {
    if (this.$route.query.frameType) {
      // 判断是否有frameType
      this.frameTemp.type = this.$route.query.frameType;
      if (this.$route.query.frameId) {
        // 查看数据库已有模板
        this.getFrame({
          _id: this.$route.query.frameId
        });
      } else {
        // 新模板
        if (this.$route.query.frameType == "layout") {
          this.frameTemp.value = this.layoutData;
        } else if (this.$route.query.frameType == "page") {
          this.frameTemp.value = this.pageData;
        }
      }
    } else {
      this.$router.go(-1);
    }
    // 渲染
    console.log(this.frameTemp);
    this.$nextTick(() => {
      this.colMoveSet();
    });
  },
  methods: {
    addFrames() {
      // this.frameTemp.value = this.layoutData;
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
    updateFrame() {
      // this.frameTemp.value = this.layoutData;
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
          // this.layoutData = res.data.value;
          this.$nextTick(() => {
            this.colMoveSet();
          });
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
      console.log("col-set");
      const $this = this;
      [].forEach.call(byId("drag-box").getElementsByClassName("show"), function(
        block,
        i
      ) {
        [].forEach.call(block.getElementsByClassName("rows"), function(el, j) {
          console.log("col-set");
          Sortable.create(el, {
            group: "cols" + i,
            draggable: ".cols",
            handle: ".cols",
            animation: 150,
            setData: function(dataTransfer) {
              dataTransfer.setData("Text", "");
              // to avoid Firefox bug
              // Detail see : https://github.com/RubaXa/Sortable/issues/1012
            },
            onEnd: evt => {
              // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
              // 把数组根据dom的拖拽，做出新的排序
              const targetCol = $this.frameTemp.value[i].rows[j].cols.splice(
                evt.oldIndex,
                1
              )[0];
              $this.frameTemp.value[i].rows[j].cols.splice(
                evt.newIndex,
                0,
                targetCol
              );
              // 更高数据，强制渲染当前列表
              const newArray = $this.frameTemp.value[i].rows[j].cols.slice(0);
              $this.frameTemp.value[i].rows[j].cols = [];
              // 数据变化后再次刷新
              $this.$nextTick(() => {
                $this.frameTemp.value[i].rows[j].cols = newArray;
              });
            },
            // Element is chosen
            onChoose: function(/**Event*/ evt) {
              console.log("onChoose");
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
        });
      });
    },
    rowMoveSet() {
      // 拖拽row
      [].forEach.call(byId("drag-box").getElementsByClassName("show"), function(
        el,
        i
      ) {
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
        },
        text: "内容区块",
        rows: [
          {
            style: {
              // width: "1200px",
              margin: "0 auto"
            },
            cols: [
              {
                text: "格子",
                width: 24
              }
            ]
          }
        ]
      };
      this.frameTemp.value.splice(index + 1, 0, newBlock);
      this.$nextTick(() => {
        // this.rowMoveSet();
        this.colMoveSet();
      });
    },
    moveBlock(index, type) {
      if (Math.abs(type)) {
        console.log("move-block");
        const targetBlock = this.frameTemp.value.splice(index, 1)[0];
        this.frameTemp.value.splice(index + type, 0, targetBlock);
        this.$nextTick(() => {
          this.colMoveSet();
        });
      } else {
        return;
      }
    },
    /**
     * index，当前区块位置
     * 删除当前区块
     *  */
    removeBlock(index) {
      this.frameTemp.value.splice(index, 1)[0];
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
      block.rows.splice(index, 1);
    },
    /** 添加 */
    addRow(block, index) {
      const newRow = {
        style: {
          width: "1200px",
          margin: "0 auto"
        },
        cols: [
          {
            text: "新内容",
            width: 24
          }
        ]
      };
      block.rows.splice(index + 1, 0, newRow);
      this.$nextTick(() => {
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
        setData: function(dataTransfer) {
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
        setData: function(dataTransfer) {
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
    padding:4px;
    &.PC{
      width:100%;
    }
    &.MOBILE{
      width:540px;
      margin:0 auto;
    }
  }

  .show {
    border: dotted 1px #ccc;
    background: #fff;
    padding: 20px 0;
    margin-top: 30px !important;
    position: relative;

    .block-controls {
      position: absolute;
      top: -20px;
      left: -1px;
    }

    input {
      border: none;
      background: none;
      color: #343434;
      text-align: center;
      outline: none;
    }

    .rows {
      border: solid 1px #343434;
      margin-bottom: 5px !important;
      padding: 5px;
      margin: 10px auto;
      position: relative;
      &.PC{
        width:1200px;
      }
      &.MOBILE{
        width:100%;
        padding:2px;
      }
      .row-controls {
        position: absolute;
        top: -21px;
        right: -1px;
      }

      .cols {
        padding: 5px;
          &.PC{
          }
          &.MOBILE{
            padding:4px;
            >div{
              padding:2px;
            }
          }
        > div {
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
  .page-view {
    font-size: 36px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }
  .el-button-group .el-button{
    padding:3px;
    input{
      height:12px;
    }
  }
}

// 0,
// 1,
// 2,  old
// 3,  new
// 4
</style>
