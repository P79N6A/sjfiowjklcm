<template>
  <div class="layouts-container">
    <el-card class="box-card">
      <el-tabs type="border-card" v-model="layoutType">
        <el-tab-pane label="整站布局" name="layout">
          <div class="layoutList cfx">
            <div class="frames" v-for="(item,i) in layoutList" :key="i">
              <div>
                <!-- 操作按钮区域 -->
                <el-button-group>
                  <el-button type="primary" round icon="el-icon-edit" @click="$router.push({ name: 'layoutDesign', query: { layoutId: item._id,layoutType:'layout'}})">编辑</el-button>
                  <el-button type="danger" round icon="el-icon-delete" @click="handleDelete(item)">删除</el-button>
                </el-button-group>
              </div>
              <div>{{item.name}}</div>
              <br />
              <div class="frames-content">
                <img :src="item.screenShot" style="display:block;width:100%;">
              </div>
            </div>
          </div>
          <div class="bottom cfx">
            <el-button icon="el-icon-plus" type="primary" @click="handleCreate">添加框架</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="页面布局" name="page">
          <div class="layoutList cfx">
            <div class="frames" v-for="(item,i) in layoutList" :key="i">
              <div>
                <!-- 操作按钮区域 -->
                <el-button-group>
                  <el-button type="primary" round icon="el-icon-edit" @click="$router.push({ name: 'layoutDesign', query: { layoutId: item._id,layoutType:'layout'}})">编辑</el-button>
                  <el-button type="danger" round icon="el-icon-delete" @click="handleDelete(item)">删除</el-button>
                </el-button-group>
              </div>
              <div>{{item.name}}</div>
              <br />
              <div class="frames-content">
                <img :src="item.screenShot" style="display:block;width:100%;">
              </div>
            </div>
          </div>
          <div class="bottom cfx">
            <el-button icon="el-icon-plus" type="primary" @click="handleCreate">添加框架</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog title="创建布局" :visible.sync="dialogFormVisible" width="800px">
        <el-form ref="dataFormKey" :model="layoutTemp" label-position="right" label-width="80px">
          <el-form-item label="*布局名称" prop="name">
            <el-input v-model="layoutTemp.name" />
          </el-form-item>
          <el-form-item label="*布局终端" prop="device">
            <el-select v-model="layoutTemp.device" placeholder="请选择框架适用终端">
              <el-option label="PC端" value="pc"></el-option>
              <el-option label="MOBILE端" value="MOBILE"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="*选择框架" prop="value">
            <div class="layoutList cfx">
              <div class="frames" style="width:50%;" v-for="(item,i) in framesList" :key="i" :class="{active:selectedFrameId==item._id}"
                @click="selectFrame(item)">
                <div class="frames-content">
                  <h3>{{item.name}}</h3>
                  <div class="show" v-for="(block,i) in item.value" :key="i">
                    <div v-if="block.isPageView">
                      <div class="page-view">
                        <img src="./img/ico-page-view.png">
                        <div>页面内容展示区域</div>
                      </div>
                    </div>
                    <el-row v-else v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows">
                      <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
                        <div>
                          <el-tag type="success" class="ico-width">{{col.text}}</el-tag>
                        </div>
                      </el-col>
                    </el-row>
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
  import {
    getFrames
  } from "@/api/frames";
  import {
    getLayouts,
    addLayouts,
    updateLayouts,
    deleteLayouts
  } from "@/api/layouts";
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
          device: "pc",
          type: "layout",
          style: ""
        },

        dialogFormVisible: false,
        selectedFrameId: null
      };
    },
    created() {
      this.getLayouts();
    },
    methods: {
      // 读取框架列表
      getFrames() {
        getFrames({
            type: this.layoutType
          })
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
          item.class = "";
          item.styleSetting = {
            class: "",
            id: "",
          }
          item.styleBg = {
            backgroundImage: '',
            backgroundPosition: '',
            backgroundSize: '',
            backgroundRepeat: '',
            backgroundColor: '',
            backgroundAttachment: ''
          }
          item.styleStyle = {
            position: '',
            left: '',
            right: '',
            top: '',
            bottom: '',
            opacity: 100,
            margin: 0,
            padding: 0,
            rotate: 0,
            width: '',
            height: '',
          }
          item.styleBorder = {
            borderWidth: '',
            borderColor: '',
            borderStyle: '',
            borderRadius: '',
          }
          item.styleShadow = {
            shadowWidth: '',
            shadowRadius: '',
            shadowDire: '',
            shadowColor: '',
          }
          item.rows = item.rows.filter(row => {
            row.class = "";
            row.styleSetting = {
              class: "",
              id: "",
            }
            row.styleBg = {
              backgroundImage: '',
              backgroundPosition: '',
              backgroundSize: '',
              backgroundRepeat: '',
              backgroundColor: '',
              backgroundAttachment: ''
            }
            row.styleStyle = {
              position: '',
              left: '',
              right: '',
              top: '',
              bottom: '',
              opacity: 100,
              margin: 0,
              padding: 0,
              rotate: 0,
              width: '',
              height: '',
            }
            row.styleBorder = {
              borderWidth: '',
              borderColor: '',
              borderStyle: '',
              borderRadius: '',
            }
            row.styleShadow = {
              shadowWidth: '',
              shadowRadius: '',
              shadowDire: '',
              shadowColor: '',
            }
            row.cols = row.cols.filter(col => {
              col.components = [];
              return col
            })
            return row;
          });
          return item;
        });
        console.log(this.layoutTemp)
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
  .layouts-container {
    padding: 20px;

    .layoutList {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;

      .frames {
        width: 25%;
        text-align: center;
        padding: 6px;
        cursor: pointer;

        &.active {
          .frames-content {
            border-color: #409eff;
            box-shadow: 0 0 4px 2px #ccc;
          }
        }

        .rows {
          background: #eee;
          margin-bottom: 2px;
        }

        .frames-content {
          padding: 6px;
          display: block;
          border: solid 1px #ccc;
          border-radius: 6px;
          font-size: 12px;
          transition: all 0.6s;
          height: 200px;
          overflow: hidden;

          &:hover {
            overflow-y: scroll;
          }
        }

        .cols {
          padding: 2px;
          box-sizing: border-box;

          div {
            border: dashed 1px #ccc;
            padding: 2px 0;
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
