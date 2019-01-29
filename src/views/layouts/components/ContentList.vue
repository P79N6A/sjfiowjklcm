<template>
  <div class="category-list">
    <div v-if="showList">
      <div class="list">
        <div class="item" @click="selectCategory=null" :class="{active:selectCategory==null}">创建新数据集</div>
        <div
          class="item"
          v-for="(item,i) in categoryList"
          :key="i"
          @click="selectCategory=item._id"
          :class="{active:selectCategory==item._id}"
        >{{item.name}}</div>
      </div>
      <el-card class="box-card" v-if="selectCategory==null">
        <el-form ref="form" :model="categoryTemp" label-width="120px">
          <el-form-item label="集合名称">
            <el-input v-model="categoryTemp.name"></el-input>
          </el-form-item>
          <el-form-item label="集合说明">
            <el-input v-model="categoryTemp.description"></el-input>
          </el-form-item>
        </el-form>
      </el-card>
      <div style="padding:10px;">
        <el-button type="primary" @click="changeCategory">确认</el-button>
      </div>
    </div>
    <div v-else>
      <div class="filter-container">
        <el-button-group>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="handleCreate"
          >添加数据</el-button>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-edit"
            @click="showList=true"
          >更改数据源</el-button>
        </el-button-group>
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
        <!-- 渲染系统内置数据 -->
        <el-table-column
          align="center"
          label="封面"
          prop="thumbnail"
          v-if="modelTemp.system.thumbnail"
          width="80"
        >
          <template slot-scope="scope">
            <a
              target="_blank"
              v-if="scope.row.thumbnail&&scope.row.thumbnail.src"
              :href="`${cdnurl}${scope.row.thumbnail.src}`"
              class="img-view"
              :style="`background-image:url('${cdnurl}${scope.row.thumbnail.src}');`"
            ></a>
          </template>
        </el-table-column>
        <el-table-column label="标题" align="center" prop="title" v-if="modelTemp.system.title"></el-table-column>
        <el-table-column label="摘要" align="center" prop="abstract" v-if="modelTemp.system.abstract"></el-table-column>
        <el-table-column label="标签" align="center" prop="tags" v-if="modelTemp.system.tags">
          <template slot-scope="scope">
            <el-tag v-for="(tag,i) in scope.row.tags" :key="i">{{tag}}</el-tag>
          </template>
        </el-table-column>
        <!-- 内容太多了，以缩略图展示 -->
        <el-table-column
          label="内容"
          prop="content"
          v-if="modelTemp.system.content"
          width="50"
          align="center;"
        >
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="点击查看内容" placement="top-start">
              <span
                @click="hadleView(scope.row.content)"
                style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
              >
                <svg-icon icon-class="documentation"/>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
        <!-- 渲染扩展字段 -->
        <el-table-column
          :label="extend.name"
          align="center"
          v-for="(extend,i) in modelTemp.extensions"
          :key="i"
        >
          <template slot-scope="scope">
            <div
              v-if="scope.row.extensions[extend.key]&&(extend.type=='media'||extend.type=='image')"
            >
              <!-- 普通多媒体 -->
              <el-tooltip
                v-if="extend.type=='media'&&scope.row.extensions[extend.key].src"
                class="item"
                effect="dark"
                content="访问源文件"
                placement="top-start"
              >
                <a
                  target="_blank"
                  :href="`${cdnurl}${scope.row.extensions[extend.key].src}`"
                  style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
                >
                  <svg-icon icon-class="documentation"/>
                  <!-- {{scope.row.extensions[extend.key]}} -->
                  {{scope.row.extensions[extend.key].fileName}}
                </a>
              </el-tooltip>
              <!-- 图片 -->
              <el-tooltip
                v-else-if="extend.type=='image'&&scope.row.extensions[extend.key].src"
                class="item"
                effect="dark"
                content="访问源文件"
                placement="top-start"
              >
                <a
                  target="_blank"
                  :href="`${cdnurl}${scope.row.extensions[extend.key].src}`"
                  class="img-view"
                  :style="`background-image:url('${cdnurl}${scope.row.extensions[extend.key].src}');`"
                ></a>
              </el-tooltip>
            </div>
            <div v-else>
              <!-- 文本域 -->
              <el-tooltip
                v-if="extend.type=='textarea'"
                class="item"
                effect="dark"
                content="点击查看内容"
                placement="top-start"
              >
                <span
                  @click="hadleView(scope.row.extensions[extend.key])"
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
                :content="scope.row.extensions[extend.key]"
                placement="top-start"
              >
                <span
                  style="display:block;padding:4px;border-radius:6px;width:100%;height:30px;"
                  :style="{background:scope.row.extensions[extend.key]}"
                ></span>
              </el-tooltip>
              <!-- 时间 -->
              <div
                v-else-if="extend.type=='date'"
              >{{scope.row.extensions[extend.key]| parseTime('{y}-{m}-{d} {h}:{i}')}}</div>
              <!-- 其他文本 -->
              <div v-else>{{scope.row.extensions[extend.key]}}</div>
            </div>
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
              <el-tooltip class="item" effect="dark" content="编辑该数据" placement="top-start">
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
                ></el-button>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" content="预览该详情" placement="top-start">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-view"
                  @click="handleOpen(`${cdnurl}${scope.row.src}`)"
                ></el-button>
              </el-tooltip>-->
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
    </div>
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
import { getCategoryOne, getCategories, addCategories } from "@/api/categories";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}
export default {
  name: "ComplexTable",
  components: {
    Pagination
  },
  directives: {
    waves
  },
  data() {
    return {
      contentList: null,
      categoryList: null,
      selectCategory: null,
      showList: true,
      modelTemp: null,
      categoryTemp: {
        type: "content",
        model: "",
        name: "",
        path: "",
        description: ""
      },
      total: 0,
      // 查询条件
      listQuery: {
        _id: "",
        currentPage: "1",
        pageSize: "20"
      },
      listLoading: true
    };
  },
  created() {
    // 读取数据列表
    // this.getContents();
    // 读取数据模型
    console.log("categoryId");
    if (this.categoryId) {
      this.showList = false;
      this.getContents();
      this.getCategoryOne();
      this.selectCategory = this.categoryId;
    } else {
      this.getCategories();
    }
  },
  methods: {
    // 查询数据分类列表
    getContents() {
      this.listLoading = true;
      this.listQuery._id = this.categoryId;
      getContents(this.listQuery)
        .then(res => {
          this.showList = false;
          this.contentList = res.data.contents;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 获取数据集列表
    getCategories() {
      getCategories({ type: "content", model: this.modelId })
        .then(res => {
          this.categoryList = res.data;
        })
        .catch(err => {});
    },
    // 更改数据集
    changeCategory() {
      if (this.selectCategory) {
        // 选择系统原有的数据集
        this.categoryId = this.selectCategory;
        this.$emit("updateCategory", this.categoryId);
        this.getContents();
        this.getCategoryOne();
      } else {
        // 新建数据集
        this.addCategories();
      }
    },
    // 获取当前数据集合的数据
    getCategoryOne() {
      getCategoryOne({
        _id: this.categoryId
      })
        .then(res => {
          // 保存数据模型
          this.modelTemp = res.data.model;
          // 保存数据集
        })
        .catch(err => {});
    },
    // 新建数据分类
    addCategories() {
      this.categoryTemp.model = this.modelId;
      this.categoryTemp.path = new Date();
      console.log(this.categoryTemp);
      addCategories(this.categoryTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "创建成功",
            type: "success",
            duration: 2000
          });
          this.categoryId = res.data._id;
          this.$emit("updateCategory", this.categoryId);
          this.getContents();
          this.getCategoryOne();
        })
        .catch(err => {});
    },
    // 点击创建按钮
    handleCreate() {
      // this.dialogStatus = "create";
      // this.dialogFormVisible = true;
      this.$emit("createContent");
    },
    // 点击编辑按钮
    handleUpdate(row) {
      // 传数据
      this.$emit("updateContent", row);
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
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  props: {
    categoryId: {
      type: String,
      default: ""
    },
    modelId: {
      type: String,
      default: ""
    }
  },
  watch: {
    showList(val) {
      if (val) {
        this.getCategories();
      }
    }
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