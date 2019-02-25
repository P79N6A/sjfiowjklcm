<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit-outline"
        @click="handleCreate"
      >
        {{
        $t('table.add') }}
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      v-if="requireList.length>0"
      :data="requireList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('table.id')" type="index" align="center" width="50" fixed></el-table-column>
      <el-table-column :label="$t('table.id')" align="center" width="120" fixed prop="_id"></el-table-column>
      <el-table-column label="状态" align="center" width="70">
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-if="scope.row.status=='processing'"
          >{{getStatus(scope.row.status)}}</el-tag>
          <el-tag
            type="info"
            v-else-if="scope.row.status=='rejected'"
          >{{getStatus(scope.row.status)}}</el-tag>
          <el-tag
            type="warning"
            v-else-if="scope.row.status=='completed'"
          >{{getStatus(scope.row.status)}}</el-tag>
          <el-tag
            type="danger"
            v-else-if="scope.row.status=='inspection'||scope.row.status=='confirmed'"
          >{{getStatus(scope.row.status)}}</el-tag>
          <el-tag v-else>{{getStatus(scope.row.status)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="优先级" align="center" width="90">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.emergency==3">普通需求</el-tag>
          <el-tag type="warning" v-else-if="scope.row.emergency==2">重要需求</el-tag>
          <el-tag type="danger" v-else-if="scope.row.emergency==1">紧急需求</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="项目" align="center">
        <template slot-scope="scope">{{scope.row.project.name}}</template>
      </el-table-column>
      <el-table-column label="标题" align="center" prop="title" width="200"></el-table-column>
      <!-- <el-table-column label="内容" align="center" width="50">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击查看内容" placement="top-start">
            <span
              @click="hadleView(scope.row)"
              style="text-align:center;cursor:pointer;margin:0 auto;display:inline-block;width:100%;"
            >
              <i class="el-icon-view"></i>
            </span>
          </el-tooltip>
        </template>
      </el-table-column>-->
      <el-table-column label="收费" align="center" prop="money" width="100">
        <template slot-scope="scope" v-if="scope.row.money">
          <el-tag type="danger">{{scope.row.money}}</el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column label="附件" align="center">
        <template slot-scope="scope">
          <div v-for="(file,i) in scope.row.media" :key="i">
            <a target="_blank" :href="cdnurl+file.src">{{file.name}}</a>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column label="提交时间" align="center" prop="createTime" width="90">
        <template slot-scope="scope">{{scope.row.createTime| parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column label="预计时间" align="center" prop="preTime" width="90">
        <template
          slot-scope="scope"
          v-if="scope.row.preTime"
        >{{scope.row.preTime| parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <!-- <el-table-column label="交付时间" align="center" prop="endTime" width="90">
        <template slot-scope="scope" v-if="scope.row.endTime">{{scope.row.endTime| parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>-->
      <el-table-column label="需求类型" align="center">
        <template slot-scope="scope">
          <el-tag
            type="success"
            v-if="scope.row.type=='om'||scope.row.type=='dev'"
          >{{getType(scope.row.type)}}</el-tag>
          <el-tag type="info" v-else-if="scope.row.type=='ohter'">{{getType(scope.row.type)}}</el-tag>
          <el-tag type="warning" v-else-if="scope.row.type=='app'">{{getType(scope.row.type)}}</el-tag>
          <el-tag type="danger" v-else-if="scope.row.type=='bug'">{{getType(scope.row.type)}}</el-tag>
          <el-tag v-else>{{getType(scope.row.type)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="70" fixed="right">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="回复" placement="top-start">-->
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              ></el-button>
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="dark" content="查看" placement="top-start">
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-view"
                @click="handleView(scope.row)"
              ></el-button>
            </el-tooltip>-->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 列表翻页 -->
    <pagination
      :total="listQuery.totals"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="getRequirements"
      :autoScroll="false"
    />

    <!-- 发送/编辑需求弹窗 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      width="800px"
      v-if="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="requireTemp"
        label-position="right"
        label-width="70px"
      >
        <el-form-item label="紧急程度" prop="name">
          <el-radio-group v-model="requireTemp.emergency" :disabled="dialogStatus=='update'">
            <el-radio
              :label="item.value"
              v-for="item in emergencyType"
              :key="item.value"
            >{{item.name}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="项目" prop="device">
          <el-select
            v-model="requireTemp.project"
            placeholder="请选择所属项目"
            :disabled="dialogStatus=='update'"
          >
            <el-option
              :label="project.name"
              :value="project._id"
              v-for="(project,i) in projectsList"
              :key="i"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题" prop="title">
          <el-input v-model="requireTemp.title" :disabled="dialogStatus=='update'"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="content">
          <tinymce :height="400" v-model="requireTemp.content" v-if="dialogStatus=='create'"></tinymce>
          <div v-else v-html="requireTemp.content" style="border:solid 1px #eee;padding:10px;"></div>
        </el-form-item>

        <!-- <el-form-item label="附件" prop="title" v-if="dialogStatus=='create'">
          <el-upload
            class="upload-demo"
            action="/api/requirements/file"
            :data="requireTemp"
            ref="files"
            multiple
            :file-list="requireTemp.media"
            :auto-upload="false"
            :on-success="handleSuccess"
            :before-upload="handleBefore"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item> -->

        <div v-if="dialogStatus=='update'">
          <hr>
          <hr>
          <el-form-item label="需求类型" prop="type" v-if="dialogStatus=='update'">
            <el-radio-group v-model="requireTemp.type">
              <el-radio v-for="type in typeList" :label="type.value" :key="type.value">{{type.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="相关人员" prop="recId">
            <el-checkbox-group v-model="requireTemp.processor">
              <el-checkbox
                v-for="user in userList"
                :label="user._id"
                :key="user._id"
              >{{user.nickname}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="交付时间" prop="preTime">
            <el-date-picker v-model="requireTemp.preTime" type="datetime" placeholder="选择交付日期时间"></el-date-picker>
          </el-form-item>

          <el-form-item label="需求状态" prop="status">
            <el-select v-model="requireTemp.status" placeholder="请选择所属项目">
              <el-option
                :label="statu.name"
                :value="statu.value"
                v-for="(statu,i) in statusList"
                :key="i"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收费金额" prop="money">
            <el-input v-model="requireTemp.money"></el-input>
          </el-form-item>
        </div>
          <el-form-item>
            <p style="color:red;">1、当日提交的【普通需求】，正常流程下，我方工作人员会在次工作日作出评估。</p>
            <p style="color:red;">2、【紧急需求】将在当日开始处理，所有非BUG类型【紧急需求】，需加收xxx元</p>
            <p style="color:red;">3、需求处理结果，会以站内信通知，也可前往需求列表查看进度 </p>
          </el-form-item>
      </el-form>
      <div v-if="dialogStatus=='update'">
        <hr>进度信息
        <hr>
        <div
          v-for="(answer,i) in answerList"
          :key="i"
          style="background:#eee;border:solid 1px #ccc;padding:10px;margin-bottom:10px;position:relative;"
        >
          <p>{{answer.author.nickname}} 回复:</p>
          <div v-html="answer.content"></div>
          <span
            class="el-icon-circle-close-outline"
            style="position:absolute;top:20px;right:20px;cursor:pointer;font-size:20px;"
            @click="deleteAnswers(answer)"
          ></span>
        </div>
        <div>
          <el-button type="warning" @click="handleAnswer">添加回复</el-button>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?handleAdd():handleUpdate()">
          {{ $t('table.confirm')
          }}
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="添加回复"
      :visible.sync="dialogAnswerVisible"
      width="800px"
      v-if="dialogAnswerVisible"
    >
      <tinymce :height="400" v-model="answerTemp.content"></tinymce>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAnswer" type="primary">提交</el-button>
      </div>
    </el-dialog>
    <!-- <el-dialog
      :title="requireTemp.title"
      :visible.sync="dialogViewVisible"
      width="800px"
      v-if="dialogViewVisible"
    >
      <el-card class="box-card">
        <div v-html="requireTemp.content">需求详情部分</div>
      </el-card>
    </el-dialog>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tinymce from "@/components/Tinymce";
import { getProjects } from "@/api/projects";
import { getUsers } from "@/api/user";
import { getAnswers, addAnswers, deleteAnswers } from "@/api/answers";
import {
  getRequirements,
  addRequiresments,
  updateRequiresments
} from "@/api/requirement";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ComplexTable",
  directives: {
    waves
  },
  data() {
    return {
      requireList: [],
      projectsList: [],
      userList: [],
      answerList: [],
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        totals: 100,
        pages: 0
      },
      listLoading: true,
      dialogStatus: "create",
      textMap: {
        update: "编辑需求",
        create: "新增需求"
      },
      dialogViewVisible: false,
      dialogFormVisible: false,
      dialogAnswerVisible: false,
      requireTemp: {
        status: "",
        author: "",
        title: "",
        content: "",
        project: "",
        type: "other",
        media: [],
        emergency: 3,
        processor: []
      },
      answerTemp: {
        requirements: "",
        content: ""
      },
      requireType: [
        {
          name: "前端",
          value: "web"
        },
        {
          name: "UI",
          value: "ui"
        },
        {
          name: "后台",
          value: "dev"
        },
        {
          name: "运维",
          value: "om"
        },
        {
          name: "APP",
          value: "app"
        },
        {
          name: "其他",
          value: "other"
        },
        {
          name: "BUG",
          value: "bug"
        }
      ],
      emergencyType: [
        {
          name: "紧急",
          value: 1
        },
        // {
        //   name: "重要",
        //   value: 2
        // },
        {
          name: "普通",
          value: 3
        }
      ],
      statusList: [
        {
          name: "待评估",
          value: "evaluation"
        },
        {
          name: "待确价",
          value: "confirmed"
        },
        {
          name: "待处理",
          value: "unprocessed"
        },
        {
          name: "处理中",
          value: "processing"
        },
        {
          name: "待验收",
          value: "inspection"
        },
        {
          name: "已完结",
          value: "completed"
        },
        {
          name: "已拒绝",
          value: "rejected"
        }
      ],
      typeList: [
        {
          name: "前端",
          value: "web"
        },
        {
          name: "UI",
          value: "ui"
        },
        {
          name: "后台",
          value: "dev"
        },
        {
          name: "运维",
          value: "om"
        },
        {
          name: "APP",
          value: "app"
        },
        {
          name: "其他",
          value: "other"
        },
        {
          name: "BUG",
          value: "bug"
        }
      ],
      fileLength: 0,
      checkAll: false,
      isIndeterminate: true
    };
  },
  created() {
    this.getRequirements();
  },
  methods: {
    // 预览文件
    handleOpen(url) {
      window.open(url);
    },
    // 查询需求列表
    getRequirements() {
      this.listLoading = true;
      getRequirements(this.listQuery)
        .then(res => {
          this.listLoading = false;
          this.requireList = res.data.requirements;
          this.listQuery.totals = res.data.totals;
          this.listQuery.pages = res.data.pages;
        })
        .catch(err => {
          console.log(err);
          // this.listLoading = false;
        });
    },
    // 设置收件列表
    getUsers() {
      getUsers()
        .then(res => {
          this.recId = res.data;
          console.log(this.recId);
        })
        .then(err => {});
    },
    // 点击创建按钮
    handleCreate() {
      this.getProjects();
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
      this.requireTemp = {
        status: "",
        author: "",
        title: "",
        content: "",
        project: "",
        type: "other",
        media: [],
        emergency: 3,
        processor: []
      };
      // this.fileLength = 0;
    },
    // 添加需求
    handleAdd() {
      // if (this.fileLength == 0) {
        this.addRequiresments();
      // } else {
      // this.$refs.files.submit();
      // }
    },
    // 更新需求数据
    handleUpdate() {
      updateRequiresments(this.requireTemp)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getRequirements();
          this.dialogFormVisible = false;
        })
        .catch(err => {});
    },
    // 点击更新按钮
    handleEdit(data) {
      this.dialogStatus = "update";
      this.requireTemp = JSON.parse(JSON.stringify(data)); // copy obj
      this.getProjects();
      this.getUsers();
      this.getAnswers();
      this.dialogFormVisible = true;
    },
    // 发送需求
    addRequiresments() {
      addRequiresments(this.requireTemp)
        .then(res => {
          this.getRequirements();
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
    // // 更新文件数据
    // updateFile() {
    //   const postData = {
    //     _id: this.requireTemp._id,
    //     description: this.requireTemp.description,
    //     fileName: this.requireTemp.name + "." + this.requireTemp.type
    //   };
    //   updateMedias(postData)
    //     .then(res => {
    //       this.getMedias();
    //       this.$notify({
    //         title: "成功",
    //         message: "操作成功",
    //         type: "success",
    //         duration: 2000
    //       });
    //     })
    //     .catch(err => {});
    // },
    // 删除事件
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMedias(data).then(res => {
            this.getMedias();
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
    // 预览内容
    hadleView(data) {
      this.dialogViewVisible = true;
      this.requireTemp = data;
    },
    // 点击，添加回复
    handleAnswer() {
      this.dialogAnswerVisible = true;
      this.answerTemp.content = "";
      this.answerTemp.requirements = this.requireTemp._id;
    },
    // 添加回复
    addAnswer() {
      addAnswers(this.answerTemp)
        .then(res => {
          this.dialogAnswerVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getAnswers();
        })
        .catch(err => {});
    },
    // 删除回复
    deleteAnswers(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteAnswers(data).then(res => {
            this.getAnswers();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询用户列表
    getUsers() {
      getUsers()
        .then(res => {
          this.userList = res.data;
        })
        .catch(err => {});
    },
    // 查询回复
    getAnswers() {
      console.log(this.requireTemp);
      getAnswers({
        requirements: this.requireTemp._id
      })
        .then(res => {
          this.answerList = res.data;
        })
        .catch(err => {});
    },
    // 读取项目列表
    getProjects() {
      getProjects()
        .then(res => {
          this.projectsList = res.data;
        })
        .catch(err => {});
    },
    // 文件上传成功
    handleSuccess(file, fileList) {
      this.requireTemp.media.push(file);
      this.fileLength--;
      if (this.fileLength == 0) {
        this.addRequiresments();
      }
    },
    // 文件上传前
    handleBefore(file, fileList) {
      this.fileLength++;
    },
    // 获取状态
    getStatus(key) {
      let name = key;
      this.statusList.some(item => {
        if (item.value == key) {
          name = item.name;
        }
        return item.value == key;
      });
      return name;
    },
    // 获取类型
    getType(key) {
      let name = key;
      this.typeList.some(item => {
        if (item.value == key) {
          name = item.name;
        }
        return item.value == key;
      });
      return name;
    }
  },
  computed: {
    ...mapGetters(["authorities", "cdnurl"])
  },
  components: {
    Tinymce,
    Pagination
  }
};
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.img-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  width: 60px;
  height: 60px;
  display: inline-block;
}

.file-view {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #eee;
  width: 60px;
  height: 60px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  font-size: 18px;
  font-weight: bold;
}

.editor-slide-upload {
  margin-bottom: 20px;

  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
