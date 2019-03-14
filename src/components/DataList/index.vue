<template>
  <div class="category-list">
    <el-dialog title="数据" :visible.sync="dialogVisible" width="1000px">
      <div class="filter-container">
        <el-button-group>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
          >添加数据</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleSave">保存修改</el-button>
        </el-button-group>
      </div>
      <el-table
        :data="dataList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        v-if="modelTemp"
      >
        <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
        <!-- 渲染扩展字段 -->
        <el-table-column
          :label="extend.name"
          align="center"
          v-for="(extend,i) in modelTemp.value"
          :key="i"
        >
          <template slot-scope="scope">
            <!-- 多媒体 -->
            <el-tooltip
              v-if="(extend.type=='media'||extend.type=='image')&&scope.row[extend.key]"
              class="item"
              effect="dark"
              content="访问源文件"
              placement="top-start"
            >
              <a
                target="_blank"
                :href="`${cdnurl}${scope.row[extend.key]}`"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
                <!-- {{scope.row[extend.key].fileName}} -->
              </a>
            </el-tooltip>
            <!-- 富文本 -->
            <el-tooltip
              v-else-if="extend.type=='rtf'"
              class="item"
              effect="dark"
              content="点击查看内容"
              placement="top-start"
            >
              <span
                @click="hadleView(scope.row[extend.key])"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
              </span>
            </el-tooltip>
            <!-- 文本域 -->
            <el-tooltip
              v-else-if="extend.type=='textarea'"
              class="item"
              effect="dark"
              content="点击查看内容"
              placement="top-start"
            >
              <span
                @click="hadleView(scope.row[extend.key])"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
              </span>
            </el-tooltip>
            <!-- 颜色 -->
            <el-tooltip
              v-else-if="extend.type=='color'"
              class="item"
              effect="dark"
              :content="scope.row[extend.key]"
              placement="top-start"
            >
              <span
                style="display:block;padding:4px;border-radius:6px;width:100%;height:30px;"
                :style="{background:scope.row[extend.key]}"
              ></span>
            </el-tooltip>
            <!-- 时间 -->
            <div
              v-else-if="extend.type=='date'"
            >{{scope.row[extend.key]| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
            <!-- 开关 -->
            <div v-else-if="extend.type=='switch'">
              <el-tag type="success" v-if="scope.row[extend.key]">是</el-tag>
              <el-tag type="danger" v-else>否</el-tag>
            </div>
            <!-- 开关 -->
            <div v-else-if="extend.type=='checkbox'">
              <el-tag
                type="success"
                v-for="(item,i) in scope.row[extend.key]"
                :key="i"
                style="margin-right:4px;"
              >{{item}}</el-tag>
              <!-- <el-tag type="danger" v-else>否</el-tag> -->
            </div>
            <!-- 其他文本 -->
            <div v-else>{{scope.row[extend.key]}}</div>
          </template>
        </el-table-column>
        <!-- 操作部分 -->
        <el-table-column
          fixed="right"
          :label="$t('table.actions')"
          align="center"
          width="230"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope">
            <el-button-group>
              <!-- <el-button
                type="danger"
                size="mini"
                v-if="scope.row.online"
                @click="toStop(scope.row)"
              >下架</el-button>
              <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">上线</el-button>-->
              <el-tooltip class="item" effect="dark" content="编辑该数据" placement="top-start">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row,scope.$index)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除该数据" placement="top-start">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row)"
                  icon="el-icon-delete"
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getContents,
  addContents,
  deleteContents,
  updateContents
} from "@/api/contents";
import { getModelOne } from "@/api/model";

import { getCategoryOne, getCategories, addCategories } from "@/api/categories";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
export default {
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      dialogVisible: false,
      modelTemp: null,
      modelId: "",
      dataList: "",
      editIndex: ""
    };
  },
  created() {
    this.$bus.$on("showDataList", eventData => {
      this.dialogVisible = true;
      this.emitEvent = eventData.emitEvent;
      this.modelId = eventData.modelId;
      this.dataList = eventData.dataList || [];
      this.getModelOne();
    });
    this.$bus.$on("saveContent", eventData => {
      if (this.editIndex.toString()) {
        this.dataList[this.editIndex] = eventData;
        let _newList = JSON.parse(JSON.stringify(this.dataList));
        this.dataList = [];
        this.$nextTick(() => {
          this.dataList = _newList;
        });
      } else {
        this.dataList.push(eventData);
      }
    });
  },
  methods: {
    getModelOne() {
      getModelOne({
        _id: this.modelId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data;
          // 保存表单模型
          this.resetContentTemp();
        })
        .catch(err => {});
    },
    // 点击创建按钮
    handleCreate() {
      this.edittingData = null;
      this.$bus.$emit("editContent", {
        modelId: this.modelId,
        contentTemp: null,
        emitEvent: "saveContent"
      });
    },
    // 点击编辑按钮
    handleUpdate(row, $index) {
      // 传数据
      this.editIndex = $index;
      this.$bus.$emit("editContent", {
        modelId: this.modelId,
        contentTemp: this.dataList[$index],
        emitEvent: "saveContent"
      });
    },
    handleSave() {
      this.$bus.$emit(this.emitEvent, this.dataList);
      this.dialogVisible = false;
    },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log("准备删除数据");
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  }
};
</script>
<style lang="scss">
.category-list {
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
  .list {
    display: flex;
    justify-content: start;
    .item {
      width: 25%;
      padding: 10px;
      border: dashed 2px #eee;
      margin: 10px;
      transition: all 0.3s;
      cursor: pointer;
      &:hover,
      &.active {
        border: dashed 2px #66b1ff;
      }
    }
  }
}
</style>