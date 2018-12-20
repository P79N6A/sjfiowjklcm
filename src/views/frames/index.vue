<template>
  <div class="frames-container">
    <el-card class="box-card">
      <div slot="header" class="cfx">
        <span>框架列表</span>
      </div>
      <div class="frameList cfx">
        <div class="frames" v-for="(item,i) in frameList" :key="i">
          <div class="frames-content">
            <div>
              <!-- 操作按钮区域 -->
              <el-button-group>
                <el-button
                  type="primary"
                  round
                  icon="el-icon-edit"
                  @click="$router.push({ name: 'frameDesign', query: { frameId: item._id}})"
                >编辑</el-button>
                <el-button
                  type="danger"
                  round
                  icon="el-icon-delete"
                  @click="deleteFrame(item._id)"
                >删除</el-button>
              </el-button-group>
            </div>
            <h3>{{item.name}}</h3>
            <div class="show" v-for="(block,i) in item.value" :key="i">
              <el-row v-for="(row,r) in block.rows" :key="i+'-'+r" class="rows" :style="{width:`${row.style.width*100/1920}%`}">
                <!-- 行区域 -->
                <el-col
                  v-for="(col,j) in row.cols"
                  :span="col.width"
                  :key="i+'-'+r+'-'+j"
                  class="cols"
                >
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
      <div class="bottom cfx">
        <router-link :to="{ name: 'frameDesign'}">
          <el-button icon="el-icon-plus" type="primary">添加框架</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getFrames, deleteFrames } from "@/api/frames";
export default {
  data() {
    return {
      dialogVisible: false,
      frameList: null
    };
  },
  created() {
    this.getFrames();
  },
  methods: {
    getFrames() {
      getFrames()
        .then(res => {
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
          deleteFrames({ _id: _id }).then(res => {
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
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.frames-container {
  padding: 20px;
  .frameList {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .frames {
      width: 25%;
      text-align: center;
      padding: 6px;
      .rows{
        background:#eee;
        margin-bottom:2px;
      }
      .frames-content {
        padding: 6px;
        display: block;
        border: solid 1px #ccc;
        border-radius: 6px;
      }
      .cols {
        padding: 2px;
        box-sizing: border-box;
        div {
          border: dashed 1px #ccc;
          padding: 10px 0;
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
