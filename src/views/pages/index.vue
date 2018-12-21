<template>
  <div class="pages-container">
    <tree-table :data="data" :columns="columns" border/>
    <div slot="footer" style="margin:20px 0;">
      <el-button type="primary" @click="handleCreate">创建页面</el-button>
    </div>
    <div v-for="(item,i) in pageList" :key="i">{{item.path}}</div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      {{pagesTemp}}
      <el-form ref="dataForm" :model="pagesTemp" label-position="right" label-width="90px">
        <el-form-item label="*页面名称" prop="name">
          <el-input v-model="pagesTemp.name"/>
        </el-form-item>
        <el-form-item label="页面路径" prop="url">
          <el-input v-model="pagesTemp.path"/>
        </el-form-item>
        <el-form-item label="说明" prop="Remarks">
          <el-input v-model="pagesTemp.Remarks"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            style="display: block"
            v-model="pagesTemp.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="发布"
            inactive-text="草稿"
            active-value="pushed"
            inactive-value="draft"
          ></el-switch>
        </el-form-item>
        <el-form-item label="适配终端" prop="device">
          <el-select v-model="pagesTemp.device" placeholder="请选择页面适用终端">
            <el-option label="PC端" value="pc"></el-option>
            <el-option label="MOBILE端" value="MOBILE"></el-option>
          </el-select>
        </el-form-item>
        <hr>
        <el-form-item label="页面标题" prop="title">
          <el-input v-model="pagesTemp.title"/>
        </el-form-item>
        <el-form-item label="页面关键字" prop="keywords">
          <el-input v-model="pagesTemp.keywords"/>
        </el-form-item>
        <el-form-item label="页面描述" prop="description">
          <el-input v-model="pagesTemp.description"/>
        </el-form-item>
        <hr>
        <el-form-item label="页面脚本" prop="script">
          <el-input
            :autosize="{ minRows: 10, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.script"
          />
        </el-form-item>
        <el-form-item label="页面样式" prop="style">
          <el-input
            :autosize="{ minRows: 10, maxRows: 100}"
            type="textarea"
            v-model="pagesTemp.style"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createPages():updatePages()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from "./components/TreeTable";
import {
  getPages,
  addPages,
  updatePages,
  deletePages,
  rememberPages
} from "@/api/pages";
export default {
  components: {
    treeTable
  },
  data() {
    return {
      pageList: null,
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
      data: [
        {
          name: "首页",
          url: "/index",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "老虎机大厅",
          url: "/slot",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "真人大厅",
          url: "/real",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "体育大厅",
          url: "/sport",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "棋牌大厅",
          url: "/chess",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "彩票",
          url: "/lottery",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "优惠大厅",
          url: "/promos",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "下载中心",
          url: "/download",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "vip专属福利",
          url: "/vip",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "代理加盟",
          url: "/Cooperation",
          createTime: "2018-12-12",
          description: "无"
        },
        {
          name: "关于我们",
          url: "/about",
          createTime: "2018-12-12",
          description: "无",
          children: [
            {
              name: "平台介绍",
              url: "/aboutus",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "服务优势",
              url: "/service",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "隐私保护",
              url: "/protect",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "理性博彩",
              url: "/play",
              createTime: "2018-12-12",
              description: "无"
            },
            {
              name: "女郎福利",
              url: "/girls",
              createTime: "2018-12-12",
              description: "无"
            }
          ]
        }
      ],
      dialogFormVisible: false,
      dialogStatus: "create",
      textMap: {
        update: "更新页面信息",
        create: "创建新页面"
      },
      pagesTemp: {
        name: "",
        path: "",
        Remarks: "",
        status: "draft",
        device: "",
        title: "",
        keywords: "",
        description: "",
        script: "",
        style: ""
      }
    };
  },
  methods: {
    handleCreate() {
      this.dialogStatus = "create";
      this.resetPageTemp();
      this.dialogFormVisible = true;
    },
    handleUpdate(data) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      Object.assign(this.pagesTemp, data);
    },
    resetPageTemp() {
      this.pagesTemp = {
        name: "",
        path: "",
        Remarks: "",
        status: false,
        device: "",
        title: "",
        keywords: "",
        description: "",
        script: "",
        style: ""
      };
    },
    getPages() {
      getPages()
        .then(res => {
          this.pageList = res.data;
        })
        .catch(err => {});
    },
    createPages() {
      console.log(this.pagesTemp);
      addPages(this.pagesTemp)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    uplatePages() {
      updatePages(this.pagesTemp)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getPages();
  }
};
</script>
<style lang="scss" scope>
.pages-container {
  padding: 20px;
}
</style>
