<template>
  <div class="layoutsList-container">
      <header class="header">
        <div class="ishow-headerBtn">
          <el-button
            size="small"
            @click="$bus.$emit('openLayoutList','buyLayoutSuccess')"
            type="success"
            icon="el-icon-sold-out"
          >页面市场</el-button>
          <el-button
            size="small"
            @click="handleCreate"
            type="warning"
            icon="el-icon-circle-plus-outline"
          >新建页面</el-button>
        </div>
      </header>

    <el-table
      v-loading="listLoading"
      :data="layoutList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed align="center" label="封面" prop="thumbnail" width="220">
        <template slot-scope="scope">
          <div class="pre-content" v-if="scope.row.thumbnail">
            <img :src="`${cdnurl}/${scope.row.thumbnail}`" style="width:100%;">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>

      <el-table-column label="价格" prop="style">
        <template slot-scope="scope">
          <el-tag>{{scope.row.price}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="标签" prop="tags" min-width="150px">
        <template slot-scope="scope">
          <el-tag v-for="(tag,i) in scope.row.tags" :key="i">{{tag}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="desc" min-width="150px"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isPublic">公开</el-tag>
          <el-tag v-else type="danger">私有</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              type="danger"
              size="mini"
              v-if="scope.row.isPublic"
              @click="toStop(scope.row)"
            >私有</el-button>
            <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">公开</el-button>
            <el-button type="primary" size="mini" @click="edit(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button
              v-if="scope.row.status!='deleted'"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              {{
              $t('table.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
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
                  <div class="rows" v-for="(row,i) in item.value.rows" :key="i">
                    <el-row
                      v-for="(content,r) in row.contents"
                      :key="i+'-'+r"
                      class="contents"
                      :style="{width:content.fullWidth?'100%':'90%',margin:'0 auto'}"
                    >
                      <el-col
                        v-for="(box,j) in content.boxs"
                        :span="box.width"
                        :key="i+'-'+r+'-'+j"
                        class="cols"
                      >
                        <div>
                          <span type="success" class="ico-width">{{box.name}}</span>
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
    <!-- 选择布布局框架 -->
    <LayoutList></LayoutList>
  </div>
</template>

<script>
import LayoutList from "@/components/LayoutList";
import { getFrames } from "@/api/frames";
import { mapGetters } from "vuex";

import {
  getLayouts,
  addLayouts,
  updateLayouts,
  deleteLayouts
} from "@/api/layouts";
import { getToken, setToken, removeToken } from "@/utils/auth";
const styleTemp = {
  bg: {
    backgroundImage: "", // 图片
    backgroundColor: "", // 颜色
    backgroundSize: "", // 大小
    backgroundRepeat: "", // 重复
    backgroundPosition: "", // 位置
    backgroundAttachment: "" // 滚动
  },
  border: {
    borderWidth: 1, // 大小
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
    rotate: 0, // 选装
    overflow: "",
    zIndex: 1
  },
  position: {
    position: "",
    top: "",
    left: "",
    bottom: "",
    right: ""
  },
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};
const configTemp = {
  class: "",
  id: "",
  animation: ""
};
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
        device: getToken("SiteDevice")
        // type: "layout"
      },
      dialogFormVisible: false,
      selectedFrameId: null
    };
  },
  created() {
    this.getLayouts();
    this.$bus.$on('buyLayoutSuccess',eventData=>{
      console.log(eventData);
      this.getLayouts()
    })
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  methods: {
    // 编辑内容
    edit(item) {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        this.$router.push({
          name: "layoutDesign",
          query: {
            layoutId: item._id
          }
        });
      } else {
        this.$router.push({
          name: "layoutDesignMobile",
          query: {
            layoutId: item._id
          }
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
        // type: this.layoutType
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
      this.layoutTemp.value.style = JSON.parse(JSON.stringify(styleTemp));
      this.layoutTemp.value.styleText = "";

      this.layoutTemp.value.rows = this.layoutTemp.value.rows.filter(row => {
        row.config = JSON.parse(JSON.stringify(configTemp));
        row.style = JSON.parse(JSON.stringify(styleTemp));
        row.contents = row.contents.filter(content => {
          content.config = JSON.parse(JSON.stringify(configTemp));
          content.style = JSON.parse(JSON.stringify(styleTemp));
          content.boxs = content.boxs.filter(box => {
            box.components = [];
            box.style = JSON.parse(JSON.stringify(styleTemp));
            box.config = JSON.parse(JSON.stringify(configTemp));
            return box;
          });
          return content;
        });
        return row;
      });
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
    },
    updateLayout(data) {
      updateLayouts(data)
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
    },
    // 设置为上线
    toOnline(row) {
      this.imgTemp = Object.assign({}, row); // copy obj
      this.imgTemp.isPublic = true;
      row.isPublic = true;
      this.updateLayout(row);
    },
    // 设置为下架
    toStop(row) {
      this.imgTemp = Object.assign({}, row); // copy obj
      this.imgTemp.isPublic = false;
      row.isPublic = false;
      this.updateLayout(row);
    }
  },
  watch: {
    layoutType(val) {
      if (val) {
        this.getLayouts();
      }
    }
  },
  components: { LayoutList }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.layoutsList-container {
  padding: 20px;
  .img-view {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #eee;
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 2;
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
      .rows {
        margin-bottom: 2px;
        border: dotted 1px #ccc;
        padding: 2px;
        display: flex;
        flex-flow: column;
        align-items: center;
        .contents {
          padding: 2px;
          margin-bottom: 2px;
          box-sizing: border-box;
          border: 1px solid #337ab7;
          .cols {
            padding: 2px;
            div {
              border: dashed 1px #ccc;
              padding: 10px 0;
              border: dashed 1px #5cb85c;
              font-size: 12px;
              .ico-width {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

}
</style>
