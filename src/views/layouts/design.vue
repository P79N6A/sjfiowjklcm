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
          <el-button >{{block.text}}</el-button>
          <el-tooltip class="item" effect="dark" content="点击查看编辑容器的样式" placement="top-start">
            <el-button  type="danger" icon="el-icon-edit-outline" @click="EditStyleShow=true;EditStyle=block.style;EditType=1"></el-button>
          </el-tooltip>
        </el-button-group>
        <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :style="row.style">
          <!-- 区块操作按钮 -->
          <el-button-group class="row-controls">
            <el-button >{{row.text}}</el-button>
            <el-tooltip class="item" effect="dark" content="编辑当前内容区块样式" placement="top-start">
              <el-button  type="warning" icon="el-icon-edit-outline" @click="EditStyleShow=true;EditStyle=row.style;EditType=-1"></el-button>
            </el-tooltip>
          </el-button-group>
          <!-- 行区域 -->
          <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
            <!-- 格子区域 -->
            <div>
              <el-tag type="success" class="ico-width">{{ (col.width/24*100).toFixed(2) }}%</el-tag>
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
  import {getLayoutsOne} from '@/api/layouts'
  import StyleEdit from "./components/StyleEdit";

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
                  text: "鸽子",
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
      if (this.$route.query.layoutId) {
        this.getLayoutsOne({
          _id: this.$route.query.layoutId
        });
      }else{
        this.$route.go(-1);
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
      getLayoutsOne(data) {
        getLayoutsOne(data)
          .then(res => {
            this.frameTemp = res.data;
            this.layoutData = res.data.value;
            this.colMoveSet();
          })
          .catch(err => {});
      },
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
