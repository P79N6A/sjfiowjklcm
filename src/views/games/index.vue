<template>
  <div class="games-container">
    <div style="padding:20px 10px;background:#eee;">
      <!-- <span>
        <el-button type="warning" icon="el-icon-search" @click="getGames">搜索</el-button>
      </span>-->
      <span>
        <el-button
          type="danger"
          @click="handleCreate"
          icon="el-icon-edit"
          v-show="filterData.platform"
        >添加游戏</el-button>
      </span>
      <span>
        <el-button
          type="danger"
          @click="dialogInsertVisible=true"
          icon="el-icon-edit"
          v-show="filterData.platform"
        >导入</el-button>
      </span>
      <router-link :to="{name: 'platform'}">
        <el-button type="danger" @click="handlePlatform" icon="el-icon-edit">平台管理</el-button>
      </router-link>
    </div>
    <el-form
      label-position="right"
      label-width="80px"
      :model="filterData"
      style="background:#eee;padding:10px;"
    >
      <!-- <el-form-item label="终端：" prop="platform"> -->
      <el-radio-group v-model="filterData.device" size="mini">
        <el-radio-button label="PC">桌面端</el-radio-button>
        <el-radio-button label="MOBILE">手机端</el-radio-button>
      </el-radio-group>
      <br>
      <br>
      <!-- </el-form-item> -->
      <!-- <el-form-item label="类型：" prop="platform"> -->
      <el-radio-group v-model="filterData.platformType" size="mini">
        <el-radio-button label="SLOT">老虎机</el-radio-button>
        <el-radio-button label="LIVE">真人</el-radio-button>
        <el-radio-button label="CHESS">棋牌</el-radio-button>
        <el-radio-button label="LOTTERY">彩票</el-radio-button>
        <el-radio-button label="FISH">捕鱼</el-radio-button>
        <el-radio-button label="SPORT">体育</el-radio-button>
        <el-radio-button label="ESPORT">电竞</el-radio-button>
      </el-radio-group>
      <br>
      <br>
      <!-- </el-form-item> -->
      <!-- <el-form-item label="平台：" prop="platform"> -->
      <el-radio-group v-model="filterData.platform" size="mini">
        <el-radio-button
          :label="item.value"
          v-for="item in platformList"
          :key="item.value"
          v-show="item.platformType==filterData.platformType"
        >{{item.name}}</el-radio-button>
      </el-radio-group>
      <!-- </el-form-item> -->
    </el-form>

    <br>
    <br>

    <el-table
      v-loading="listLoading"
      :data="modelList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      max-height="1000"
    >
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed align="center" label="封面" prop="thumbnail" width="100">
        <template slot-scope="scope">
          <a target="_blank" :href="`${scope.row.icon}`" class="icom-view">
            <img v-lazy="cdnurl+scope.row.icon" :key="scope.row._id">
          </a>
        </template>
      </el-table-column>
      <el-table-column fixed label="中/英名称" width="200">
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
      <el-table-column label="moduleid" prop="moduleid" v-if="filterData.platform=='MG'"></el-table-column>
      <el-table-column label="MG品牌" v-if="filterData.platform=='MG'">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.mgself" type="warning">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支持真钱">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.money" type="warning">是</el-tag>
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
      <el-table-column label="分类" min-width="150px">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.types">{{getTypesName(scope.row.types)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="风格" min-width="150px">
        <template slot-scope="scope">
          <el-tag v-for="(item,key,i) in scope.row.tags" :key="i">{{getTagName(item)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="专属项目" min-width="150px">
        <template slot-scope="scope">
          <el-tag
            v-for="(item,key,i) in scope.row.project"
            :key="i"
            type="warning"
          >{{getProjectName(item)}}</el-tag>
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
                  <el-form-item label="支持真钱" prop="online">
                    <el-switch
                      v-model="gameTemp.money"
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
                  <el-form-item label="封面" prop="thumbnail">
                    <el-upload
                      class="avatar-uploader"
                      action="/api/games/icon"
                      :show-file-list="true"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      :data="gameTemp"
                      :auto-upload="false"
                      list-type="text"
                      ref="gameIcon"
                      :limit="1"
                      :on-change="handleChange"
                      :on-remove="handleRemove"
                    >
                      <a
                        v-if="gameTemp.icon"
                        class="img-view"
                        style="width:120px;height:120px;display:block;"
                        :style="`background-image:url(${gameTemp.icon});`"
                      >
                        <div class="upload-icon">
                          <i class="el-icon-plus"></i>
                        </div>
                      </a>
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <div class="file-info" v-if="gameTemp.thumbnail&&gameTemp.thumbnail.src">
                      <p v-if="gameTemp.thumbnail.src">
                        <a target="_blank" :href="`${cdnurl}${gameTemp.thumbnail.src}`">
                          <i class="el-icon-picture"></i>
                          &nbsp;&nbsp;查看原图{{gameTemp.thumbnail.fileName}}
                        </a>
                      </p>
                    </div>-->
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
                  <el-form-item label="赔付线注" prop="online">
                    <el-input-number v-model="gameTemp.line" :min="0"></el-input-number>
                  </el-form-item>
                </td>
              </tr>
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
                  <el-form-item label="风格" prop="device">
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
                  <el-form-item label="备注" prop="device">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      v-model="gameTemp.description"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="专属项目" prop="project">
                    <el-checkbox-group v-model="gameTemp.project">
                      <el-checkbox
                        :label="item._id"
                        v-for="item in projectsList"
                        :key="item._id"
                      >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
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
        :show-file-list="false"
        :on-change="importExcel"
        :auto-upload="false"
        drag
        multiple
      >
        <!-- <i class="el-icon-plus"></i> -->
        <div>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </div>

        <div class="el-upload__tip" slot="tip">只能上传csv/xlsx文件</div>
      </el-upload>
      <p style="padding:10px;background:#eee;margin-top:10px;">
        <a href="/static/导入模板.xlsx" target="_blank">下载模板文件</a>
      </p>
    </el-dialog>
    <el-dialog
      title="导入列表"
      :visible.sync="dialogInsertTable"
      v-if="insertList.length>0"
      :fullscreen="true"
      :close-on-click-modal="false"
    >
      <el-table
        :data="insertList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        max-height="800"
      >
        <el-table-column type="index" align="center" width="50" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="name">
          <template slot="header">
            <p>name</p>
            <p>中文名</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="eName" label="eName">
          <template slot="header">
            <p>eName</p>
            <p>英文名</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="id">
          <template slot="header">
            <p>id</p>
            <p>游戏ID</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="code" label="code">
          <template slot="header">
            <p>code</p>
            <p>游戏CODE</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="line" width="70" label="line">
          <template slot="header">
            <p>line</p>
            <p>线注</p>
          </template>
        </el-table-column>
        <el-table-column label="MG品牌" v-if="filterData.platform=='MG'">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.mgself" type="warning">是</el-tag>
            <el-tag v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="moduleid" prop="moduleid" v-if="filterData.platform=='MG'"></el-table-column>

        <el-table-column label="gameName" prop="gameName" v-if="filterData.platform=='TTG'"></el-table-column>
        <el-table-column label="gameType" prop="gameType" v-if="filterData.platform=='TTG'"></el-table-column>
        <el-table-column label="支持真钱">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.money" type="warning">是</el-tag>
            <el-tag v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="支持试玩">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.try" type="warning">是</el-tag>
            <el-tag v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="device" width="90" label="device">
          <template slot="header">
            <p>device</p>
            <p>终端</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platformType" width="110" label="platformType">
          <template slot="header">
            <p>platformType</p>
            <p>平台类型</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="platform" width="100" label="platform">
          <template slot="header">
            <p>platform</p>
            <p>游戏平台</p>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding:20px;text-align:right;">
        <el-button @click="insertGame" type="primary">确认导入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import XLSX from "xlsx";
import { getProjects } from "@/api/projects";
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
      // 项目列表
      projectsList: [],
      changeIcon: false,
      //搜索条件
      filterData: {
        device: "PC",
        platformType: "SLOT",
        platform: ""
      },
      // 游戏平台类型
      platformList: [],
      insertList: [],
      // 分类
      typeList: [
        {
          name: "奖池",
          value: "AMA"
        },
        {
          name: "经典",
          value: "CLA"
        },
        {
          name: "迷你",
          value: "MIN"
        },
        {
          name: "电子",
          value: "ELE"
        },
        {
          name: "街机",
          value: "STR"
        },
        {
          name: "其他",
          value: "OTH"
        }
      ],
      // 标签
      tagList: [
        {
          name: "最新",
          value: "NEW"
        },
        {
          name: "热门",
          value: "HOT"
        },
        {
          name: "消消乐",
          value: "ETL"
        },
        {
          name: "多旋转",
          value: "CIR"
        },
        {
          name: "电影",
          value: "MOV"
        },
        {
          name: "卡通",
          value: "CAR"
        },
        {
          name: "少女",
          value: "GIR"
        }
      ],
      gameTemp: {
        platform: "",
        device: "",
        id: "",
        code: "",
        icon: "",
        //mg
        moduleid: "",
        mgself: "",
        // ttg
        gameName: "",
        gameType: "",
        name: "",
        eName: "",
        online: true,
        money: true,
        try: true,
        line: 0,
        thumbnail: "",
        types: "", // 类型
        tags: [],
        project: [],
        description: "" // 备注
      },
      listLoading: true,
      dialogFormVisible: false,
      dialogInsertVisible: false,
      dialogInsertTable: false,
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
    this.$nextTick(() => {
      this.getPlatforms();
      this.getProjects();
    });
  },
  methods: {
    // 查询用户列表
    getProjects() {
      this.listLoading = true;
      getProjects()
        .then(res => {
          this.projectsList = res.data;
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
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
          console.log(this.modelList);
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    // 点击创建游戏按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 文件列表改变
    handleChange(file, fileList) {
      console.log(file);
      this.gameTemp.icon = file.url;
      this.gameTemp.thumbnail = file.name;
      this.changeIcon = true;
    },
    // 文件列表移除
    handleRemove(file, fileList) {
      this.gameTemp.icon = "";
      this.gameTemp.thumbnail = "";
      this.changeIcon = false;
    },
    // 点击编辑游戏按钮
    handleUpdate(row) {
      this.resetTemp();
      this.gameTemp = Object.assign(this.gameTemp, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    // 点击删除游戏按钮
    handleDelete(data) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
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

    // 创建游戏
    createGame() {
      // return;
      addGames({
        gameList: [this.gameTemp]
      })
        .then(res => {
          this.dialogFormVisible = false;
          this.getGames();
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.$refs.gameIcon.submit();
        })
        .catch(err => {});
    },
    // 设置为上线
    toOnline(row) {
      this.gameTemp = Object.assign({}, row); // copy obj
      this.gameTemp.online = true;
      row.online = true;
      this.updateGame();
    },
    // 设置为下架
    toStop(row) {
      this.gameTemp = Object.assign({}, row); // copy obj
      this.gameTemp.online = false;
      row.online = false;
      this.updateGame();
    },
    // 更新游戏
    updateGame() {
      updateGames(this.gameTemp)
        .then(res => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getGames();
          // 有更新封面
          if (this.changeIcon) {
            this.$refs.gameIcon.submit();
          } else {
          }
        })
        .catch(err => {});
    },
    // 重制游戏
    resetTemp() {
      this.gameTemp = {
        platform: this.filterData.platform,
        platformType: this.filterData.platformType,
        device: this.filterData.device,
        id: "",
        code: "",
        icon: "",
        //mg
        moduleid: "",
        mgself: "",
        // ttg
        gameName: "",
        gameType: "",
        name: "",
        eName: "",
        online: true,
        money: true,
        try: true,
        line: 0,
        thumbnail: "",
        types: "", // 类型
        tags: [],
        project: [],
        description: "" // 备注
      };
    },
    // 文件上传成功后
    handleAvatarSuccess(res, file) {
      this.getGames();
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
    // 项目
    getProjectName(key) {
      let name = key;
      this.projectsList.some(item => {
        if (item._id == key) {
          name = item.name;
        }
        return item._id == key;
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

          tabJson[0].sheet.forEach(item => {
            console.log(item.mgself, item.try);
            item.tags = [];
            item.online = true;
            item.platformType = this.filterData.platformType;
            item.platform = this.filterData.platform;
            item.device = this.filterData.device;
            item.mgself = item.mgself == "1" || item.mgself == 1 ? true : false;
            item.money = true;
            item.try = item.try == "0" || item.try == "0" ? false : true;
          });
          this.dialogInsertTable = true;
          this.insertList = tabJson[0].sheet.slice(1);
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
    insertGame() {
      addGames({
        gameList: this.insertList.reverse()
      })
        .then(res => {
          this.dialogFormVisible = false;
          this.dialogInsertVisible = false;
          this.dialogInsertTable = false;
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
  },
  watch: {
    dialogFormVisible(val) {
      if (val) {
        this.getProjects();
      }
    },
    "filterData.device"(val) {
      if (val) {
        this.getGames();
      }
    },
    "filterData.platformType"(val) {
      if (val) {
        this.getGames();
      }
    },
    "filterData.platform"(val) {
      if (val) {
        this.getGames();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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

  .icom-view {
    display: block;
    width: 100%;
    img {
      display: inline-block;
      width: 100%;
      height: auto;
    }
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

  .favicon {
    height: 90px;
    display: block;
  }
}
</style>
