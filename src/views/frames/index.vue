<template>
  <div class="framesList-container">
    <el-card class="box-card">
      <el-tabs type="border-card" v-model="frameType">
        <el-tab-pane label="整站框架" name="layout">
          <div class="frameList cfx">
            <div v-for="(item,i) in frameList" :key="i">
              <h3>{{item.name}}</h3>
              <div class="frames">
                <div class="frames-content">
                  <div class="control">
                    <!-- 操作按钮区域 -->
                    <el-button-group>
                      <el-button
                        type="primary"
                        round
                        icon="el-icon-edit"
                        @click="$router.push({ name: 'frameDesign', query: { frameId: item._id,frameType:'layout'}})"
                      >编辑</el-button>
                      <el-button
                        type="danger"
                        round
                        icon="el-icon-delete"
                        @click="deleteFrame(item._id)"
                      >删除</el-button>
                    </el-button-group>
                  </div>
                  <div class="show" v-for="(block,i) in item.value" :key="i">
                    <div v-if="block.isPageView" style="background:#aaa;">
                      <img src="./img/ico-page-view.png">页面展示区域
                    </div>
                    <div v-else>
                      <el-row
                        v-for="(row,r) in block.rows"
                        :key="i+'-'+r"
                        class="rows"
                        :style="{width:row.fullWidth?'100%':'90%',margin:'0 auto'}"
                      >
                        <!-- 行区域 -->
                        <el-col
                          v-for="(col,j) in row.cols"
                          :span="col.width"
                          :key="i+'-'+r+'-'+j"
                          class="cols"
                        >
                          <!-- {{row}} -->
                          <!-- 格子区域 -->
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
          </div>
          <div class="bottom cfx">
            <router-link :to="{ name: 'frameDesign',query:{frameType:'layout'}}">
              <el-button icon="el-icon-plus" type="primary">添加框架</el-button>
            </router-link>
          </div>
        </el-tab-pane>
        <el-tab-pane label="页面框架" name="page">
          <div class="frameList cfx">
            <div v-for="(item,i) in frameList" :key="i">
              <h3>{{item.name}}</h3>
              <div class="frames">
                <div class="frames-content">
                  <div class="control">
                    <!-- 操作按钮区域 -->
                    <el-button-group>
                      <el-button
                        type="primary"
                        round
                        icon="el-icon-edit"
                        @click="$router.push({ name: 'frameDesign', query: { frameId: item._id,frameType:'page'}})"
                      >编辑</el-button>
                      <el-button
                        type="danger"
                        round
                        icon="el-icon-delete"
                        @click="deleteFrame(item._id)"
                      >删除</el-button>
                    </el-button-group>
                  </div>
                  <div class="show" v-for="(block,i) in item.value" :key="i">
                    <el-row
                      v-for="(row,r) in block.rows"
                      :key="i+'-'+r"
                      class="rows"
                      :style="{width:row.fullWidth?'100%':'90%',margin:'0 auto'}"
                    >
                      <!-- 行区域 -->
                      <el-col
                        v-for="(col,j) in row.cols"
                        :span="col.width"
                        :key="i+'-'+r+'-'+j"
                        class="cols"
                      >
                        <!-- 格子区域 -->
                        <div>
                          <div type="success" class="ico-width">{{col.text}}</div>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom cfx">
            <router-link :to="{ name: 'frameDesign',query:{frameType:'page'}}">
              <el-button icon="el-icon-plus" type="primary">添加框架</el-button>
            </router-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getFrames, deleteFrames } from "@/api/frames";
export default {
  data() {
    return {
      dialogVisible: false,
      frameList: null,
      frameType: "layout"
    };
  },
  created() {
    this.getFrames();
  },
  methods: {
    getFrames() {
      getFrames({
        type: this.frameType
      })
        .then(res => {
          console.log(res.data);
          this.frameList = res.data;
        })
        .catch(err => {});
    },
    deleteFrame(_id) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteFrames({
            _id: _id
          }).then(res => {
            this.getFrames();
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
    }
  },
  watch: {
    frameType(val) {
      if (val) {
        this.getFrames();
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.framesList-container {
  padding: 20px;

  .frameList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;

    .show {
      background: #eee;
    }

    .frames {
      width: 300px;
      margin: 10px;
      text-align: center;
      height: 350px;
      overflow: hidden;
      border: solid 1px #ccc;
      border-radius: 6px;

      &:hover {
        overflow-y: scroll;
      }

      .rows {
        margin-bottom: 2px;
      }

      .frames-content {
        padding: 6px;
        display: block;
        position: relative;
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
