<template>
  <div class="pages-container">
    <el-container class="views">
      <el-aside class="side">
        <div class="menus">
          <div class="title cfx">页面</div>
          <div class="tree">
            <el-tree
              v-show="!hideMenu"
              :data="treeData"
              node-key="id"
              :expand-on-click-node="true"
              :icon-class="'=='"
              default-expanded-keys="pc"
              :highlight-current="true"
              @node-click="nodeClick"
            ></el-tree>
          </div>
          <div class="btns">
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="handleCreate"
              style="width:145px;"
            >添加页面</el-button>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="layout-view" :class="device">
          <div class="title">页面概览</div>
          <div class="content">
            <Layout
              :short-id="selectNode.value.content"
              v-if="selectNode.value&&selectNode.value.content"
            ></Layout>
          </div>
          <div class="footer">
            <el-button-group>
              <el-button type="success" @click="editLayout(selectNode.value.content)">编辑</el-button>
              <el-button type="success" @click="handleUpdate">属性</el-button>
              <el-button type="danger" @click="handleDelete">删除</el-button>
            </el-button-group>
          </div>
        </div>
      </el-main>
    </el-container>
    <!-- 页面内容编辑 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form ref="dataForm" :model="pagesTemp" label-position="right" label-width="90px">
        <el-form-item label="*页面名称" prop="name">
          <el-input v-model="pagesTemp.name"/>
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pagesTemp.path" placeholder="/url (格式)">
            <template slot="prepend">～域名</template>
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="页面外框" prop="layout">
          <el-select v-model="pagesTemp.layout" placeholder="请选择页面外框">
            <el-option :label="item.name" :value="item._id" v-for="(item,i) in layoutList" :key="i"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="页面内容" prop="layout">
          <span class="addPage" @click="dialogLayoutVisible=true"></span>
        </el-form-item>
        <!-- <el-form-item label="用户状态" prop="needLogin">
          <el-switch style="display: block" v-model="pagesTemp.needLogin" active-color="#13ce66" inactive-color="#ff4949"
            active-text="需要登陆状态" inactive-text="非登陆状态"></el-switch>
        </el-form-item>-->
        <el-form-item label="备注" prop="remarks">
          <el-input
            v-model="pagesTemp.remarks"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10}"
          />
        </el-form-item>
        <el-form-item label="发布状态" prop="status">
          <el-switch
            style="display: block"
            v-model="pagesTemp.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <hr>
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="pagesTemp.title"/>
        </el-form-item>
        <el-form-item label="页面关键字" prop="keywords">
          <el-input v-model="pagesTemp.keywords"/>
        </el-form-item>
        <el-form-item label="页面描述" prop="description">
          <el-input
            v-model="pagesTemp.description"
            :autosize="{ minRows: 3, maxRows: 10}"
            type="textarea"
          />
        </el-form-item>
        <hr>

        <el-form-item label="头部代码" prop="script">
          <el-input
            :autosize="{ minRows: 3, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.head"
            placeholder="代码将插入至<head>标签末尾"
          />
        </el-form-item>

        <el-form-item label="底部代码" prop="style">
          <el-input
            :autosize="{ minRows: 3, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.foot"
            placeholder="代码将插入至<body>标签末尾"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createPage():updatePage()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogLayoutVisible" width="1000px">
      <div class="layout-list">
        <div
          class="item"
          :class="{active:pagesTemp.content==item.shortId}"
          v-for="(item,i) in contentList"
          :key="i"
          @click="pagesTemp.content=item.shortId"
        >
          <div class="icon" :style="`background-image:url('${cdnurl}${item.thumbnail}')`"></div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Layout from "./views";
import { getPages, addPages, updatePages, deletePages } from "@/api/pages";
import { getLayouts } from "@/api/layouts";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { mapGetters } from "vuex";
export default {
  components: {
    Layout
  },
  data() {
    return {
      hideMenu: false,
      pageList: null,
      device: getToken("SiteDevice"),
      columns: [
        {
          text: "页面地址",
          value: "url",
          width: 200
        },
        {
          text: "名称",
          value: "name"
        },
        {
          text: "创建时间",
          value: "createTime"
        },
        {
          text: "备注",
          value: "description"
        }
      ],
      treeData: [],
      selectNode: {},
      dialogFormVisible: false,
      dialogLayoutVisible: false,
      dialogStatus: "create",
      textMap: {
        update: "更新页面信息",
        create: "创建新页面"
      },
      pagesTemp: {
        _id: "",
        // 布局数据
        // layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        remarks: "",
        needLogin: "",
        status: "draft",
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        head: "",
        foot: ""
      },
      layoutList: [],
      contentList: [],
      $iframe: null
    };
  },
  methods: {
    // 获取页面列表
    getContents() {
      getLayouts()
        .then(res => {
          this.contentList = res.data;
        })
        .catch(err => {});
    },
    editLayout(shortId) {
      if (getToken("SiteDevice").toUpperCase() == "PC") {
        this.$router.push({
          name: "layoutDesign",
          query: {
            shortId: shortId
          }
        });
      } else {
        this.$router.push({
          name: "layoutDesignMobile",
          query: {
            shortId: shortId
          }
        });
      }
    },
    // 点击创建操作
    handleCreate() {
      this.resetPageTemp();
      this.getContents();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    //点击更新操作，没有用到
    handleUpdate() {
      this.resetPageTemp();
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.getContents();
      // 复制值
      this.pagesTemp = JSON.parse(JSON.stringify(this.selectNode.value));
      this.pagesTemp.layout = this.pagesTemp.layout || "";
      this.pagesTemp.content = this.pagesTemp.content || "";
      this.pagesTemp._id = this.selectNode.id;
    },
    // 删除数据
    handleDelete() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deletePages({
            _id: this.selectNode.id
          }).then(res => {
            this.getPages();
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
    // 重置页面模型
    resetPageTemp() {
      this.pagesTemp = {
        _id: "",
        // 布局数据
        // layout: "",
        content: "",
        // 页面其余参数
        name: "",
        path: "",
        remarks: "",
        needLogin: "",
        status: "draft",
        // device: getToken("SiteDevice"),
        // 页头基本配置
        title: "",
        keywords: "",
        description: "",
        // 其他配置
        head: "",
        foot: ""
      };
    },
    getThumbnailByShortId(){
      
    },
    // 获取页面
    getPages() {
      getPages()
        .then(res => {
          this.treeData = res.data;
        })
        .catch(err => {});
    },
    // 创建页面
    createPage() {
      addPages(this.pagesTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.dialogFormVisible = false;
          this.getPages();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 更新页面
    updatePage() {
      updatePages(this.pagesTemp)
        .then(res => {
          this.getPages();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 点击树节点
    nodeClick($obj, $node, $el) {
      this.selectNode = $obj;
      // if (this.$iframe && this.selectNode.value) {
      //   this.$iframe.postMessage(this.selectNode, "*");
      // }
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  },
  mounted() {
    this.getPages();
    // this.$iframe = this.$refs["iframeView"].contentWindow;
  }
};
</script>
<style lang="scss">
.pages-container {
  padding: 20px;
  .el-main {
    padding: 0;
  }
  .addPage {
    display: inline-block;
    width: 150px;
    height: 150px;
    border: dashed 1px #eee;
    border-radius: 10px;
    cursor: pointer;
    transition:all 0.3s;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
    &:hover {
      border: dashed 1px #409eff;
    }
  }
  .views {
    .side {
      width: 350px;
      .menus {
        border: solid 1px #ddd;
        box-shadow: 1px 1px 6px 2px #eee;
        border-radius: 4px;
      }
      .title {
        padding: 15px 20px;
        background: #eee;
      }
      .tree {
        min-height: 300px;
      }
      .btns {
        padding: 15px 20px;
        background: #eee;
      }
    }
  }
  .layout-view {
    margin-left: 50px;
    border: solid 1px #ddd;
    box-shadow: 1px 1px 6px 2px #eee;
    border-radius: 4px;
    .title {
      padding: 15px 20px;
      background: #eee;
    }
    .content {
      min-height: 300px;
      background: #fff;
    }
    .footer {
      padding: 15px 20px;
      background: #eee;
    }
  }
  .layout-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    .item {
      text-align: center;
      width: 170px;
      margin: 10px;
      border: solid 2px #eee;
      border-radius: 10px;
      padding: 5px;
      box-shadow: 0 0 3px 3px #eee;
      &.active {
        box-shadow: 0 0 6px 2px #409eff;
        border: solid 1px #409eff;
      }
      .icon {
        display: inline-block;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        width: 150px;
        height: 150px;
      }
    }
  }
}
</style>
