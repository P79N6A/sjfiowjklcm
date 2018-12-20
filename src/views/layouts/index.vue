<template>
  <div class="layouts-container">
    <el-card class="box-card">
      <div slot="header" class="cfx">
        <span>布局列表</span>
      </div>
      <el-table v-loading="listLoading" :data="layoutList" border fit highlight-current-row style="width: 100%;">
        <el-table-column :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="mini" @click="$router.push({ name: 'layoutDesign', query: { layoutId: scope.row._id}})">{{ $t('table.edit') }}</el-button>
              <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">
                {{
                $t('table.delete') }}
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom cfx">
        <el-button icon="el-icon-plus" type="primary" @click="handleCreate">添加布局</el-button>
      </div>
    </el-card>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="800px">
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
          <div class="frameList cfx" v-if="!layoutTemp.value">
            <div class="frames" v-for="(item,i) in frameList" :key="i" :class="{active:selectedFrameId==item._id}"
              @click="selectFrame(item)">
              <div class="frames-content">
                <h3>{{item.name}}</h3>
                <div class="show" v-for="(block,i) in item.value" :key="i">
                  <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :style="{width:`${row.style.width*100/1920}%`}">
                    <!-- 行区域 -->
                    <el-col v-for="(col,j) in row.cols" :span="col.width" :key="i+'-'+r+'-'+j" class="cols">
                      <!-- 格子区域 -->
                      <div>
                        <el-tag type="success" class="ico-width">{{col.text}}</el-tag>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createLayout():updateLayout()">{{ $t('table.confirm')
          }}</el-button>
      </div>
    </el-dialog>
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
        errGif: errGif + "?" + +new Date(),
        ewizardClap: "-6883632d9646",
        dialogVisible: false,
        frameList: null,
        layoutList: null,
        layoutTemp: {
          name: '',
          value: {},
          device: 'pc'
        },
        dialogFormVisible: false,
        selectedFrameId: null,
        dialogStatus: "",
        textMap: {
          update: "Edit",
          create: "Create"
        },
      };
    },
    created() {
      this.getLayouts();
    },
    methods: {
      getFrames() {
        getFrames()
          .then(res => {
            this.frameList = res.data;
          })
          .catch(err => {});
      },
      getLayouts() {
        getLayouts().then(res => {
          this.layoutList = res.data
        }).catch(err => {

        })
      },
      createLayout() {
        console.log(this.layoutTemp);
        addLayouts(this.layoutTemp).then(res => {
          this.getLayouts();
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        }).catch(err => {

        })
      },
      updateLayout(row) {
        updateLayouts(this.layoutTemp).then(res => {
                          this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
        }).catch(err => {
        })
      },
      handleCreate() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true;
        if (!this.frameList) {
          this.getFrames();
        }
      },

      handleUpdate(row) {
        // Object.assign(this.layoutTemp ,row)
        // this.dialogStatus = 'edit'
        // this.dialogFormVisible = true;
        console.log(row)
        this.$router.push({name:'layoutdesign',layoutId:row._id})
      },
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
      handleReset() {
        this.$confirm("此操作将清空原有布局, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {

            this.layoutTemp.value = null;
            this.selectedFrameId=null;
            this.getFrames()
          })
      },
      selectFrame(data) {
        console.log("lksfjlkasjf")
        this.layoutTemp.value = data.value;
        this.selectedFrameId = data._id;
      }
    }
  };

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layouts-container {
    padding: 20px;

    .frameList {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;

      .frames {
        width: 33.33%;
        text-align: center;
        padding: 6px;
        cursor: pointer;

        &.active {
          .frames-content {
            border-color: red;
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
          transition: all .6s;
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
  }

</style>
