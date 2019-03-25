<template>
  <div class="content-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin:10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{
        $t('table.add') }}
      </el-button>
      <el-button type="danger" @click="handleSort">保存排序</el-button>
      <span style="float:right;" v-if="categoryTemp">数据集合:{{categoryTemp.name}}</span>
    </div>
    <el-table
      v-loading="listLoading"
      :data="contentList"
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
            v-if="(extend.type=='media'||extend.type=='image')&&scope.row.value[extend.key]"
            class="item"
            effect="dark"
            content="访问源文件"
            placement="top-start"
          >
            <a
              target="_blank"
              :href="`${cdnurl}${scope.row.value[extend.key]}`"
              style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
            >
              <svg-icon icon-class="documentation"/>
              <!-- {{scope.row.value[extend.key].fileName}} -->
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
              @click="hadleView(scope.row.value[extend.key])"
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
              @click="hadleView(scope.row.value[extend.key])"
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
            :content="scope.row.value[extend.key]"
            placement="top-start"
          >
            <span
              style="display:block;padding:4px;border-radius:6px;width:100%;height:30px;"
              :style="{background:scope.row.value[extend.key]}"
            ></span>
          </el-tooltip>
          <!-- 时间 -->
          <div
            v-else-if="extend.type=='date'"
          >{{scope.row.value[extend.key]| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
          <!-- 开关 -->
          <div v-else-if="extend.type=='switch'">
            <el-tag type="success" v-if="scope.row.value[extend.key]">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </div>
          <!-- 开关 -->
          <div v-else-if="extend.type=='checkbox'">
            <el-tag
              type="success"
              v-for="(item,i) in scope.row.value[extend.key]"
              :key="i"
              style="margin-right:4px;"
            >{{item}}</el-tag>
            <!-- <el-tag type="danger" v-else>否</el-tag> -->
          </div>
          <!-- 其他文本 -->
          <div v-else>{{scope.row.value[extend.key]}}</div>
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
            <el-button
              type="danger"
              size="mini"
              v-if="scope.row.online"
              @click="toStop(scope.row)"
            >下架</el-button>
            <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">上线</el-button>
            <el-tooltip class="item" effect="dark" content="编辑该数据" placement="top-start">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
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
    <!-- 内容编辑弹窗,必须用v-if，促发文本域编辑器的重新渲染，可能会有其他问题，后续排查 -->
    <!-- 文本预览 -->
    <el-dialog title="内容域预览" :visible.sync="dialogViewVisible" width="1300px">
      <el-tabs type="border-card" v-model="tabActive">
        <el-tab-pane name="device_pc">
          <span slot="label">
            <i class="el-icon-date"></i> 电脑模式预览
          </span>
          <div class="mac">
            <div class="color-picker">
              <div>预览背景</div>
              <el-color-picker v-model="backColor" size="medium"></el-color-picker>
            </div>
            <div class="content" :style="{backgroundColor:backColor}">
              <iframe :ref="`device_pc`" width="100%" height="100%" src frameborder="0"></iframe>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane name="device_mobile">
          <span slot="label">
            <i class="el-icon-date"></i> 手机模式预览
          </span>
          <div class="iphone">
            <div class="color-picker">
              <span class="color-text">预览背景</span>
              <el-color-picker v-model="backColor" size="mini"></el-color-picker>
            </div>
            <div class="content" :style="{backgroundColor:backColor}">
              <iframe :ref="`device_mobile`" width="460" height="100%" src frameborder="0"></iframe>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <contentEdit></contentEdit>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getContents,
  deleteContents,
  updateContents,
  sortComponents,
  addContents,
  getContentOne
} from "@/api/contents";
import { getCategoryOne } from "@/api/categories";

import waves from "@/directive/waves"; // Waves directive
import Sortable from "sortablejs";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import contentEdit from "@/components/Content";

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
export default {
  name: "ComplexTable",
  directives: {
    waves
  },
  data() {
    return {
      contentList: null,
      categoryTemp: null,
      modelTemp: null,
      edittingContent: null,
      total: 0,
      listQuery: {
        _id: this.$route.query.categoryId,
        currentPage: "1",
        pageSize: "20"
      },

      listLoading: true,
      dialogViewVisible: false,
      tabActive: "",
      viewContent: "内容预览",
      backColor: "#f7f8fb",
      dialogStatus: "",
      isthumbnail: false,
      contentKey: null,
      mustImg: false,
      textMap: {
        update: "Edit",
        create: "Create"
      }
    };
  },
  created() {
    // 读取数据列表
    this.getContents();
    // 读取数据模型
    this.getCategoryOne();
    this.$bus.$on("saveContent", eventData => {
      this.edittingContent.value = eventData;
      this.edittingContent.category = this.$route.query.categoryId;
      console.log(this.edittingContent);
      // return;
      if (this.edittingContent._id) {
        this.updateContents(this.edittingContent);
      } else {
        this.addContents(this.edittingContent);
      }
    });
  },
  methods: {
    // 查询数据分类列表
    getContents() {
      this.listLoading = true;
      getContents(this.listQuery)
        .then(res => {
          this.contentList = res.data.contents;
          this.listLoading = false;
          this.$nextTick(() => {
            this.setSort();
          });
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 获取当前数据集合的数据
    getCategoryOne() {
      getCategoryOne({
        _id: this.$route.query.categoryId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.model;
          // 保存数据集
          this.categoryTemp = res.data;
        })
        .catch(err => {});
    },
    // 新增数据
    addContents(data) {
      addContents(data)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
          this.getContents();
        })
        .catch(err => {});
    },
    // 更新数据
    updateContents(data) {
      updateContents(data)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.getContents();
        })
        .catch(err => {});
    },
    // 设置为上线
    toOnline(row) {
      row.online = true;
      this.updateContents(row);
    },
    // 设置为下架
    toStop(row) {
      row.online = false;
      this.updateContents(row);
    },
    // 点击创建按钮
    handleCreate() {
      this.edittingContent = {};
      this.$bus.$emit("editContent", {
        modelId: this.modelTemp._id,
        contentTemp: null,
        emitEvent: "saveContent"
      });
    },
    // 点击编辑按钮
    handleUpdate(row) {
      getContentOne({ _id: row._id })
        .then(res => {
          this.edittingContent = res.data;
          this.$bus.$emit("editContent", {
            modelId: this.modelTemp._id,
            contentTemp: res.data.value,
            emitEvent: "saveContent"
          });
        })
        .catch(err => {});
    },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteContents(data).then(res => {
            this.getContents();
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 预览
    hadleView(content) {
      return
      this.dialogViewVisible = true;
      this.viewContent = `<link href="/static/css/scroll.css" rel="stylesheet"></link>${content}`;
      this.tabActive = "device_pc";
    },
    // 预览iframe
    setiframe(iframe, content) {
      this.$nextTick(() => {
        let ifrm = this.$refs[iframe];
        const doc = ifrm.contentDocument
          ? ifrm.contentDocument
          : ifrm.contentWindow.document;
        doc.open();
        doc.write(content);
        doc.body.style["overflow"] = "hidden";
        doc.body.style["margin"] = 0;
        // 计算高度
        ifrm.style.height = doc.body.scrollHeight + "px";
        doc.close();
      });
    },
    // 保持排序
    handleSort() {
      let sortOps = [];
      for (let i = 0; i < this.contentList.length; i++) {
        sortOps.push({
          _id: this.contentList[i]._id,
          sort: i + 1
        });
      }
      sortComponents({ gameList: sortOps })
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getContents();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 拖拽排序
    setSort() {
      const el = document.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
          // 把数组根据dom的拖拽，做出新的排序
          const targetRow = this.contentList.splice(evt.oldIndex, 1)[0];
          this.contentList.splice(evt.newIndex, 0, targetRow);
          const newArray = this.contentList.slice(0);
          this.contentList = [];
          // 数据变化后再次刷新
          this.$nextTick(() => {
            this.contentList = newArray;
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  watch: {
    // tab切换
    tabActive(val) {
      this.setiframe(val, this.viewContent);
    },
    dialogViewVisible() {
      this.setiframe(this.tabActive, this.viewContent);
    }
  },
  components: { contentEdit }
};
</script>
<style lang="scss" scoped>
.content-container {
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

  // mac预览
  .mac {
    background: url(./img/bg_mac.png) center center no-repeat/100% 100%;
    width: 100%;
    height: 729px;
    overflow-y: hidden;
    position: relative;
    .color-picker {
      position: absolute;
      text-align: center;
      line-height: 2;
      top: 20px;
      right: 30px;
    }
    .content {
      width: 896px;
      height: 553px;
      overflow-y: scroll;
      margin-top: 64px;
      margin-left: 167px;
      padding: 10px;
    }
    iframe {
      width: 100%;
      height: 1305px;
      margin: 0 auto;
      display: block;
    }
  }
  .iphone {
    background: url(./img/bg_iphone.png) center center no-repeat/100% 100%;
    width: 380px;
    margin: 0 auto;
    height: 729px;
    overflow-x: hidden;
    overflow-y: hidden;
    position: relative;
    .color-picker {
      position: absolute;
      text-align: center;
      top: 10px;
      left: 36px;
      vertical-align: middle;
      .color-text {
        line-height: 36px;
        vertical-align: middle;
        float: left;
        color: #eee;
        padding-right: 21px;
      }
    }
    .content {
      width: 338px;
      height: 673px;
      overflow-y: scroll;
      margin-top: 41px;
      margin-left: 20px;
      padding: 10px;
      border-radius: 0 0 20px 30px;
    }
    iframe {
      width: 100%;
      height: 1305px;
      margin: 0 auto;
      display: block;
    }
  }
}
</style>