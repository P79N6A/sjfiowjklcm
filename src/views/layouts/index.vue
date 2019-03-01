<template>
  <div class="layoutsList-container">
    <el-card class="box-card">
      <div class="layoutList cfx">
        <div v-for="(item,i) in layoutList" :key="i">
          <div class="title">{{item.name}}</div>
          <div class="layouts">
            <div class="layouts-content">
              <div class="control">
                <!-- 操作按钮区域 -->
                <el-button-group>
                  <el-button type="primary" round icon="el-icon-edit" @click="editFrame(item)">编辑</el-button>
                  <el-button
                    type="danger"
                    round
                    icon="el-icon-delete"
                    @click="handleDelete(item)"
                  >删除</el-button>
                </el-button-group>
              </div>
              <img :src="item.screenShot" style="display:block;width:100%;">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom cfx">
        <el-button icon="el-icon-plus" type="primary" @click="handleCreate">添加布局</el-button>
      </div>

      <!-- 创建布局 -->
      <el-dialog title="创建布局" :visible.sync="dialogFormVisible" width="1000px">
        <el-form ref="dataFormKey" :model="layoutTemp" label-position="right" label-width="80px">
          <el-form-item label="*布局名称" prop="name">
            <el-input v-model="layoutTemp.name"/>
          </el-form-item>
          <el-form-item label="*布局终端" prop="device">
            <el-select v-model="layoutTemp.device" placeholder="请选择框架适用终端" disabled>
              <el-option label="PC端" value="pc"></el-option>
              <el-option label="MOBILE端" value="MOBILE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*选择框架" prop="value">
            <div class="framesList cfx">
              <div
                class="frames"
                v-for="(item,i) in framesList"
                :key="i"
                :class="{active:selectedFrameId==item._id}"
                @click="selectFrame(item)"
              >
                <div class="frames-content">
                  <h3>{{item.name}}</h3>
                  <div class="show" v-for="(block,i) in item.value" :key="i">
                    <div v-if="block.isPageView" style="background:#aaa;">
                      <img src="./img/ico-page-view.png">页面
                    </div>
                    <div>
                      <el-row
                        v-for="(row,r) in block.rows"
                        :key="i+'-'+r"
                        class="rows"
                        :style="{width:row.fullWidth?'100%':'90%',margin:'0 auto'}"
                      >
                        <el-col
                          v-for="(col,j) in row.cols"
                          :span="col.width"
                          :key="i+'-'+r+'-'+j"
                          class="cols"
                        >
                          <div>
                            <span type="success" class="ico-width">{{col.text}}</span>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
          <el-button type="primary" @click="createLayout">{{ $t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import errGif from "@/assets/401_images/401.gif";
import { getFrames } from "@/api/frames";
import {
  getLayouts,
  addLayouts,
  updateLayouts,
  deleteLayouts
} from "@/api/layouts";
import { getToken, setToken, removeToken } from "@/utils/auth";
export default {
  name: "Page401",
  data() {
    return {
      layoutType: "layout",
      dialogVisible: false,
      layoutList: null,
      framesList: null,
      layoutTemp: {
        name: "",
        value: {},
        device: getToken("SiteDevice"),
        type: "layout",
        style: {
          styleSetting: {
            class: "",
            id: ""
          },
          styleBg: {
            backgroundImage: "",
            backgroundPosition: "",
            backgroundSize: "",
            backgroundRepeat: "",
            backgroundColor: "",
            backgroundAttachment: ""
          },
          styleStyle: {
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            opacity: 100,
            margin: "",
            padding: "",
            rotate: "",
            width: "",
            height: ""
          },
          styleBorder: {
            borderWidth: "",
            borderColor: "",
            borderStyle: "",
            borderRadius: ""
          },
          styleShadow: {
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: "",
            shadowColor: ""
          }
        }
      },
      dialogFormVisible: false,
      selectedFrameId: null
    };
  },
  created() {
    this.getLayouts();
  },
  methods: {
    editFrame(item) {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        this.$router.push({
          name: "layoutDesign",
          query: { layoutId: item._id }
        });
      } else {
        this.$router.push({
          name: "layoutDesignMobile",
          query: { layoutId: item._id }
        });
      }
    },
    // 读取框架列表
    getFrames() {
      getFrames()
        .then(res => {
          this.framesList = res.data;
        })
        .catch(err => {});
    },
    // 获取布局列表
    getLayouts() {
      getLayouts({
        type: this.layoutType
      })
        .then(res => {
          this.layoutList = res.data;
        })
        .catch(err => {});
    },
    // 创建布局
    createLayout() {
      if (!this.layoutTemp.name || !this.layoutTemp.value) {
        this.$notify({
          title: "提示",
          message: "请完善布局数据",
          type: "warning",
          duration: 2000
        });
        return;
      }
      this.layoutTemp.type = this.layoutType;
      this.layoutTemp.value = this.layoutTemp.value.filter(item => {
        if (!item.isPageView) {
          item.styleSetting = {
            class: "",
            id: ""
          };
          item.styleBg = {
            backgroundImage: "",
            backgroundPosition: "",
            backgroundSize: "",
            backgroundRepeat: "",
            backgroundColor: "",
            backgroundAttachment: ""
          };
          item.styleStyle = {
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            opacity: 100,
            margin: "",
            padding: "",
            rotate: "",
            width: "",
            height: ""
          };
          item.styleBorder = {
            borderWidth: "",
            borderColor: "",
            borderStyle: "",
            borderRadius: ""
          };
          item.styleShadow = {
            shadowWidth: "",
            shadowRadius: "",
            shadowDire: "",
            shadowColor: ""
          };
          item.rows = item.rows.filter(row => {
            row.class = "";
            row.styleSetting = {
              class: "",
              id: ""
            };
            item.styleBg = {
              backgroundImage: "",
              backgroundPosition: "",
              backgroundSize: "",
              backgroundRepeat: "",
              backgroundColor: "",
              backgroundAttachment: ""
            };
            item.styleStyle = {
              position: "",
              left: "",
              right: "",
              top: "",
              bottom: "",
              opacity: 100,
              margin: "",
              padding: "",
              rotate: "",
              width: "",
              height: ""
            };
            item.styleBorder = {
              borderWidth: "",
              borderColor: "",
              borderStyle: "",
              borderRadius: ""
            };
            item.styleShadow = {
              shadowWidth: "",
              shadowRadius: "",
              shadowDire: "",
              shadowColor: ""
            };
            item.rows = item.rows.filter(row => {
              row.class = "";
              row.styleSetting = {
                class: "",
                id: ""
              };
              row.styleBg = {
                backgroundImage: "",
                backgroundPosition: "",
                backgroundSize: "",
                backgroundRepeat: "",
                backgroundColor: "",
                backgroundAttachment: ""
              };
              row.styleStyle = {
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                opacity: 100,
                margin: "",
                padding: "",
                rotate: "",
                width: "",
                height: ""
              };
              row.styleBorder = {
                borderWidth: "",
                borderColor: "",
                borderStyle: "",
                borderRadius: ""
              };
              row.styleShadow = {
                shadowWidth: "",
                shadowRadius: "",
                shadowDire: "",
                shadowColor: ""
              };
              row.cols = row.cols.filter(col => {
                col.components = [];
                return col;
              });
              return row;
            });
            return row;
          });
        }
        return item;
      });
      // return;
      addLayouts(this.layoutTemp)
        .then(res => {
          this.getLayouts();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 创建按钮点击事件
    handleCreate(type) {
      this.dialogFormVisible = true;
      this.getFrames({
        type: this.layoutType
      });
    },
    // 删除布局
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteLayouts({
            _id: row._id
          }).then(res => {
            this.getLayouts();
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选中布局
    selectFrame(data) {
      this.layoutTemp.value = data.value;
      this.selectedFrameId = data._id;
    }
  },
  watch: {
    layoutType(val) {
      if (val) {
        this.getLayouts();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layoutsList-container {
  padding: 20px;

  .layoutList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .show {
      background: #eee;
    }
    .title {
      text-align: center;
    }
    .layouts {
      width: 300px;
      text-align: center;
      cursor: pointer;
      margin: 10px;
      overflow: hidden;
      border: solid 1px #ccc;
      border-radius: 6px;
      height: 350px;
      &:hover {
        overflow-y: scroll;
      }

      .rows {
        // background: #eee;
        margin-bottom: 2px;
      }

      .layouts-content {
        padding: 6px;
        display: block;
        position: relative;
        font-size: 12px;
        transition: all 0.6s;
        min-height: 100%;
        &:hover {
          .control {
            display: block;
          }
        }

        .control {
          z-index: 9;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.2);
          display: none;
          padding-top: 100px;
        }
      }

      .cols {
        padding: 2px;
        box-sizing: border-box;

        div {
          border: dashed 1px #ccc;
          padding: 2px 0;

          .ico-width {
            font-size: 12px;
          }
        }
      }
    }
  }
  .framesList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .show {
      background: #eee;
    }

    .frames {
      width: 270px;
      margin: 10px;
      text-align: center;
      height: 350px;
      overflow: hidden;
      border: solid 1px #ccc;
      border-radius: 6px;
      cursor: pointer;
      &.active {
        border-color: #409eff;
        box-shadow: 0 0 4px 2px #ccc;
      }
      &:hover {
        overflow-y: scroll;
      }

      .frames-content {
        padding: 6px;
        display: block;
        position: relative;
      }

      .cols {
        padding: 2px;
        box-sizing: border-box;

        > div {
          border: dashed 1px #ccc;
          padding: 10px 0;

          .ico-width {
            font-size: 12px;
          }
        }
      }
    }
  }
  .bottom {
    border-top: solid 1px #ebeef5;
    margin-top: 20px;
    padding-top: 20px;
  }

  .page-view {
    background: #e4e7ed;
    font-size: 14px;
    flex-direction: column;
    // height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
  }
}
</style>
