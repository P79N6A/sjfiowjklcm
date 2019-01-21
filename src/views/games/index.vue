<template>
  <div class="games-container">
    <div>
      <span>
        <el-select v-model="filterData.device" placeholder="请选择终端类型">
          <el-option label="PC" value="PC"></el-option>
          <el-option label="MOBILE" value="MOBILE"></el-option>
        </el-select>
      </span>
      <span>
        <el-select v-model="filterData.platform" placeholder="请选择游戏平台">
          <el-option
            :label="item.name"
            :value="item.value"
            v-for="item in platformList"
            :key="item.value"
          ></el-option>
        </el-select>
      </span>
      <span>
        <el-button type="warning" icon="el-icon-search" @click="getGames">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate" icon="el-icon-edit">添加游戏</el-button>
      </span>
      <span>
        <el-button type="danger" @click="dialogInsertVisible=true" icon="el-icon-edit">导入</el-button>
      </span>
      <router-link :to="{name: 'platform'}" style="float:right;">
        <el-button type="danger" @click="handlePlatform" icon="el-icon-edit">平台管理</el-button>
      </router-link>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="modelList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed align="center" label="封面" prop="thumbnail" width="80">
        <template slot-scope="scope">
          <a
            target="_blank"
            v-if="true||scope.row.thumbnail&&scope.row.thumbnail.src"
            :href="`${cdnurl}${scope.row.thumbnail.src}`"
            class="img-view"
            :style="`background-image:url(${cdnurl}${scope.row.thumbnail.src});`"
          ></a>
        </template>
      </el-table-column>
      <!-- :href="`${cdnurl}${scope.row.thumbnail.src}`" -->
      <el-table-column fixed label="名称">
        <template slot-scope="scope">
          <div>{{scope.row.name}}</div>
          <div>{{scope.row.eName}}</div>
        </template>
      </el-table-column>
      <el-table-column label="ID/CODE">
        <template slot-scope="scope">
          <div>{{scope.row.id}}</div>
          <div>{{scope.row.code}}</div>
        </template>
      </el-table-column>
      <el-table-column label="线注" prop="line"></el-table-column>
      <el-table-column label="MG品牌" v-if="filterData.platform=='MG'">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.mgself" type="warning">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支持试玩">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.try" type="warning">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="gameName" prop="gameName" v-if="filterData.platform=='TTG'"></el-table-column>
      <el-table-column label="gameType" prop="gameType" v-if="filterData.platform=='TTG'"></el-table-column>
      <el-table-column label="分类" min-width="150px" prop="role.authorities">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.types">{{getTypesName(scope.row.types)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="风格" min-width="150px" prop="role.authorities">
        <template slot-scope="scope">
          <el-tag v-for="(item,key,i) in scope.row.tags" :key="i">{{getTagName(item)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.online">上架</el-tag>
          <el-tag v-else type="danger">下架</el-tag>
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
              v-if="scope.row.online"
              @click="toStop(scope.row)"
            >下架</el-button>
            <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">上架</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleUpdate(scope.row)"
            >{{ $t('table.edit') }}</el-button>
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
    <!-- 翻页,后续加上 -->
    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
    <!-- 编辑弹窗 -->
    <el-dialog
      :title="`游戏数据--${textMap[dialogStatus]}`"
      :visible.sync="dialogFormVisible"
      width="900px"
      :close-on-click-modal="false"
      v-if="dialogFormVisible"
    >
      <el-form ref="dataForm" :model="gameTemp" label-position="right" label-width="80px">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>基本数据</span>
          </div>
          <table style="width:100%;">
            <tbody>
              <tr>
                <td>
                  <el-form-item label="游戏平台" prop="platform">
                    <el-select v-model="gameTemp.platform" placeholder="请选择所属平台">
                      <el-option
                        :label="item.name"
                        :value="item.value"
                        v-for="item in platformList"
                        :key="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终端类型" prop="device">
                    <el-select v-model="gameTemp.device" placeholder="请选择终端类型">
                      <el-option label="PC" value="PC"></el-option>
                      <el-option label="MOBILE" value="MOBILE"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="ID" prop="id">
                    <el-input v-model="gameTemp.id"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="CODE" prop="code">
                    <el-input v-model="gameTemp.code"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="moduleid" prop="moduleid" v-if="gameTemp.platform=='MG'">
                    <el-input v-model="gameTemp.moduleid"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="MG品牌" prop="mgself" v-if="gameTemp.platform=='MG'">
                    <el-switch
                      v-model="gameTemp.mgself"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="gameName" prop="gameName" v-if="gameTemp.platform=='TTG'">
                    <el-input v-model="gameTemp.gameName"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="gameType" prop="gameType" v-if="gameTemp.platform=='TTG'">
                    <el-input v-model="gameTemp.gameType"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="中文名称" prop="name">
                    <el-input v-model="gameTemp.name"/>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="英文名称" prop="eName">
                    <el-input v-model="gameTemp.eName"/>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="在线状态" prop="online">
                    <el-switch
                      v-model="gameTemp.online"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="支持试玩" prop="try">
                    <el-switch
                      v-model="gameTemp.try"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="是"
                      inactive-text="否"
                    ></el-switch>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="赔付线注" prop="online">
                    <el-input-number v-model="gameTemp.line" :min="0"></el-input-number>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="封面" prop="thumbnail">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/media"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :data="gameTemp"
                    >
                      <a
                        v-if="gameTemp.thumbnail&&gameTemp.thumbnail.src"
                        class="img-view"
                        style="width:120px;height:120px;display:block;"
                        :style="`background-image:url(${cdnurl}${gameTemp.thumbnail.src});`"
                      >
                        <div class="upload-icon">
                          <i class="el-icon-plus"></i>
                        </div>
                      </a>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="file-info" v-if="gameTemp.thumbnail&&gameTemp.thumbnail.src">
                      <p v-if="gameTemp.thumbnail.src">
                        <a target="_blank" :href="`${cdnurl}${gameTemp.thumbnail.src}`">
                          <i class="el-icon-picture"></i>
                          &nbsp;&nbsp;查看原图{{gameTemp.thumbnail.fileName}}
                        </a>
                      </p>
                    </div>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
        <br>
        <br>

        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>其他</span>
          </div>
          <table style="width:100%;">
            <tbody>
              <tr>
                <td>
                  <el-form-item label="游戏类型" prop="platform">
                    <el-radio-group v-model="gameTemp.types">
                      <el-radio
                        :label="type.value"
                        v-for="type in typeList"
                        :key="type.value"
                      >{{type.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="终端类型" prop="device">
                    <el-checkbox-group v-model="gameTemp.tags">
                      <el-checkbox
                        :label="tag.value"
                        v-for="tag in tagList"
                        :key="tag.value"
                      >{{tag.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    v-model="gameTemp.description"
                  ></el-input>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createGame():updateGame()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 批量导入数据 -->
    <el-dialog
      title="批量导入"
      :visible.sync="dialogInsertVisible"
      width="400px"
      :close-on-click-modal="false"
    >
      <el-upload
        ref="upload"
        action="/"
        list-type="picture-card"
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <p>
        <a href="/static/导入模板.xlsx" target="_blank">下载模板文件</a>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import XLSX from "xlsx";
import { getGames, addGames, updateGames, deleteGames } from "@/api/games";
import waves from "@/directive/waves"; // Waves directive
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { getPlatforms } from "@/api/platforms";
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
      //搜索条件
      filterData: {
        device: "PC",
        platform: "DT"
      },
      // 游戏平台类型
      platformList: [],
      // 分类
      typeList: [
        { name: "奖池", value: "AMA" },
        { name: "经典", value: "CLA" },
        { name: "迷你", value: "MIN" },
        { name: "其他", value: "OTH" },
        { name: "电子", value: "ELE" },
        { name: "街机", value: "STR" }
      ],
      // 标签
      tagList: [
        { name: "消消乐", value: "ETL" },
        { name: "多旋转", value: "CIR" },
        { name: "电影", value: "MOV" },
        { name: "卡通", value: "CAR" },
        { name: "少女", value: "GIR" }
      ],
      gameTemp: {
        platform: "",
        device: "",
        id: "",
        code: "",
        //mg
        moduleid: "",
        mgself: "",
        // ttg
        gameName: "",
        gameType: "",
        name: "",
        eName: "",
        online: false,
        try: true,
        line: 0,
        thumbnail: {},
        types: "", // 类型
        tags: [],
        description: "" // 备注
      },

      listLoading: true,
      dialogFormVisible: false,
      dialogInsertVisible: false,
      dialogStatus: "",
      textMap: {
        update: "Edit",
        create: "Create"
      },
      // 不重要的值
      total: 0,

      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      }
    };
  },
  created() {
    this.getPlatforms();
    this.getGames({});
  },
  methods: {
    // 查询平台列表
    getPlatforms() {
      getPlatforms()
        .then(res => {
          this.platformList = res.data;
        })
        .catch(err => {});
    },
    // 查询用户列表
    getGames() {
      this.listLoading = true;
      getGames(this.filterData)
        .then(res => {
          this.modelList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 点击创建模型按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击编辑模型按钮
    handleUpdate(row) {
      this.gameTemp = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击删除模型按钮
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteGames(data).then(res => {
            this.getGames();
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

    // 创建模型
    createGame() {
      // return;
      addGames({ gameList: [this.gameTemp] })
        .then(res => {
          this.dialogFormVisible = false;
          this.getGames();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 设置为上线
    toOnline(row) {
      this.gameTemp = Object.assign({}, row); // copy obj
      this.gameTemp.online = true;
      this.updateGame();
    },
    // 设置为下架
    toStop(row) {
      this.gameTemp = Object.assign({}, row); // copy obj
      this.gameTemp.online = false;
      this.updateGame();
    },
    // 更新模型
    updateGame() {
      updateGames(this.gameTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.getGames();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
        })
        .catch(err => {});
    },
    // 重制模型
    resetTemp() {
      this.gameTemp = {
        platform: "",
        device: "",
        id: "",
        code: "",
        //mg
        moduleid: "",
        mgself: "",
        // ttg
        gameName: "",
        gameType: "",
        name: "",
        eName: "",
        online: false,
        try: true,
        line: 0,
        thumbnail: {},
        types: "", // 类型
        tags: [],
        description: "" // 备注
      };
    },
    // 文件上传成功后
    handleAvatarSuccess(res, file) {
      this.gameTemp.thumbnail = {
        _id: res._id,
        fileName: file.name,
        src: res.src
      };
    },
    // 文件上传前
    beforeAvatarUpload(file) {
      const isImg = file.type.includes("image");
      if (!isImg) {
        this.$message.error("只能上传图片类型文件!");
      }
      return isImg;
    },
    // 获取标签
    getTagName(key) {
      let name = key;
      this.tagList.some(item => {
        if (item.value == key) {
          name = item.name;
        }
        return item.value == key;
      });
      return name;
    },
    // 获取分类名
    getTypesName(key) {
      let name = key;
      this.typeList.some(item => {
        if (item.value == key) {
          name = item.name;
        }
        return item.value == key;
      });
      return name;
    },
    //导入EXCEL
    importExcel(file) {
      // let file = file.files[0] // 使用传统的input方法需要加上这一步
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson;
          console.log("lkslk;ajsdflkdsj");
          console.log(tabJson);
          tabJson[0].sheet.forEach(item => {
            item.tags = [];
            item.thumbnail = {
              src: "",
              fileName: "",
              _id: ""
            };
          });
          addGames({ gameList: tabJson[0].sheet })
            .then(res => {
              this.dialogFormVisible = false;
              this.getGames();
              this.$notify({
                title: "成功",
                message: "操作成功",
                type: "success",
                duration: 2000
              });
            })
            .catch(err => {});
          // xlsxJson就是解析出来的json数据,数据格式如下
          // [
          //   {
          //     sheetName: sheet1
          //     sheet: sheetData
          //   }
          // ]
        }
      });
    },
    // 分析文件
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
        // reader.readAsBinaryString(file) // 传统input方法
      });
    },
    handlePlatform() {
      let routeData = this.$router.resolve({
        name: "platform"
      });
    }
  },
  computed: {
    ...mapGetters(["cdnurl"])
  }
};
</script>
<style lang="scss">
.games-container {
  padding: 30px;
  .model-table {
    width: 100%;
    table-layout: fixed;

    td {
      padding: 6px;
    }
  }

  .selectTempForm {
    background: #eee;
    padding: 20px 10px 10px;
  }
  .img-view {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    background-color: #eee;
    width: 60px;
    height: 60px;
    display: inline-block;
    line-height: 2;
    &:hover {
      .upload-icon {
        background: none;
      }
    }
    .upload-icon {
      background: rgba(0, 0, 0, 0.1);
      transition: all 0.4s;
      color: #409eff;
      height: 100%;
      line-height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 50px;
        font-weight: bold;
        width: 120px;
        height: 120px;
        line-height: 120px;
      }
    }
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: auto;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .favicon {
    height: 90px;
    display: block;
  }
}
</style>
