<template>
  <div class="layoutsList-container">
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
          <div class="pre-content">
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
}
</style>
