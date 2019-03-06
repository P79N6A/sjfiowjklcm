<template>
  <div class="svgs-container">
    <div>
      <span>
        <el-button type="warning" icon="el-icon-search" @click="getSvgs">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate" icon="el-icon-edit">添加素材</el-button>
      </span>
    </div>
    <br>
    <el-row>
      <el-col :span="2">
        风格：
      </el-col>
      <el-col :span="22">
        <el-radio-group v-model="filterData.style" size="mini">
          <el-radio-button :label="type.value" v-for="type in styleList" :key="type.value">{{type.name}}</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <br>
    <!-- <el-row>
      <el-col :span="2">
        价格：
      </el-col>
      <el-col :span="22">
        <el-tag>所有</el-tag>
        <el-tag>0-10</el-tag>
        <el-tag>10-20</el-tag>
        <el-tag>20-30</el-tag>
        <el-tag>30-40</el-tag>
        <el-tag>40-50</el-tag>
      </el-col>
    </el-row>
    <br> -->
    <el-row>
      <el-col :span="2">
        节日：
      </el-col>
      <el-col :span="22">
        <el-radio-group v-model="filterData.festival" size="mini">
          <el-radio-button :label="type.value" v-for="type in festivalList" :key="type.value">{{type.name}}</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <br>
    <el-table v-loading="listLoading" :data="imgList" border fit highlight-current-row style="width: 100%;">
      <el-table-column fixed :label="$t('table.id')" type="index" align="center" width="50"></el-table-column>
      <el-table-column fixed align="center" label="预览" prop="thumbnail" width="120">
        <template slot-scope="scope">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" :id="scope.row._id"
            x="0px" y="0px" width="100%" height="100%" :viewBox="scope.row.viewBox">
            <path :d="scope.row.value" fill="#eee"></path>
          </svg>
        </template>
      </el-table-column>
      <el-table-column label="价格" prop="style">
        <template slot-scope="scope">
          <el-tag>{{scope.row.price}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type">
      </el-table-column>
      <el-table-column label="节日">
        <template slot-scope="scope">
          {{getFesName(scope.row.festival)}}
        </template>
      </el-table-column>
      <el-table-column label="风格">
        <template slot-scope="scope">
          {{getStyleName(scope.row.style)}}
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="desc" min-width="150px"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isPublic">公开</el-tag>
          <el-tag v-else type="danger">私有</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="danger" size="mini" v-if="scope.row.isPublic" @click="toStop(scope.row)">私有</el-button>
            <el-button type="success" size="mini" v-else @click="toOnline(scope.row)">公开</el-button>
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">
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
    <el-dialog :title="`游戏数据--${textMap[dialogStatus]}`" :visible.sync="dialogFormVisible" width="900px"
      :close-on-click-modal="false" v-if="dialogFormVisible">
      <el-form ref="dataForm" :model="svgTemp" label-position="right" label-width="80px">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>基本数据</span>
          </div>
          <table style="width:100%;">
            <tbody>
              <tr>
                <td>
                  <el-form-item label="画布" prop="viewBox">
                    <el-input v-model="svgTemp.viewBox" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="公开" prop="isPublic">
                    <el-switch v-model="svgTemp.isPublic" active-color="#13ce66" inactive-color="#ff4949" active-text="是"
                      inactive-text="否"></el-switch>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="预览">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px"
                      y="0px" width="100%" height="100%" :viewBox="svgTemp.viewBox" xml:space="preserve"
                      preserveAspectRatio="xMaxYMax meet" v-if="svgTemp.value">
                      <path :d="svgTemp.value" fill="#eee"></path>
                    </svg>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="svg编码" prop="value">
                    <el-input v-model="svgTemp.value" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" />
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="价格" prop="price">
                    <el-input v-model="svgTemp.price" />
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="节日" prop="festival">
                    <el-radio-group v-model="svgTemp.festival">
                      <el-radio :label="type.value" v-for="type in festivalList" :key="type.value">{{type.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="描述" prop="desc">
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 8}" v-model="svgTemp.desc"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="风格" prop="style">
                    <el-radio-group v-model="svgTemp.style" size="mini">
                      <el-radio :label="type.value" v-for="type in styleList" :key="type.value">{{type.name}}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createGame():updateGame()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import XLSX from "xlsx";
  import {
    getSvgs,
    addSvgs,
    updateSvgs,
    deleteSvgs
  } from "@/api/svgs";
  import waves from "@/directive/waves"; // Waves directive
  import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
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
        changeIcon: false,
        //搜索条件
        filterData: {
          // 设置
          price: '',
          type: '',
          festival: '',
          style: '',
          value: '',
          color: '',
        },
        // 风格分类
        styleList: [{
          name: '全部',
          value: ''
        }, {
          name: '3D',
          value: '3D'
        }, {
          name: '卡通',
          value: 'CARTON'
        }, {
          name: '简约',
          value: 'SIMPLE'
        }],
        // 节日分类
        festivalList: [{
            name: "全部",
            value: ""
          },
          {
            name: "新年",
            value: "NEWYEAR"
          },
          {
            name: "圣诞",
            value: "CHRISTMAS"
          },
          {
            name: "情人节",
            value: "VALENTINE"
          },
          {
            name: "清明",
            value: "QINGMNIG"
          },
          {
            name: "中秋",
            value: "MIDAUTUMN"
          } //Mid-autumn
        ],
        svgTemp: {
          isPublic: true,
          desc: '',
          // 设置
          price: 0, // 价格
          festival: '', // 节日相关
          style: '' // 风格
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
        imgList: [],
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
      this.getSvgs({});
    },
    methods: {
      // 查询用户列表
      getSvgs() {
        this.listLoading = true;
        getSvgs(this.filterData)
          .then(res => {
            this.imgList = res.data.filter(item => {
              item.icon = `${this.cdnurl}${item.icon}?v=${new Date().getTime()}`;
              return item;
            });
            this.listLoading = false;
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
      // 点击编辑游戏按钮
      handleUpdate(row) {
        this.svgTemp = Object.assign({}, row); // copy obj
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
            deleteSvgs(data).then(res => {
              this.getSvgs();
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
        addSvgs(this.svgTemp)
          .then(res => {
            this.dialogFormVisible = false;
            this.getSvgs();
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
        this.svgTemp = Object.assign({}, row); // copy obj
        this.svgTemp.isPublic = true;
        row.isPublic = true;
        this.updateGame();
      },
      // 设置为下架
      toStop(row) {
        this.svgTemp = Object.assign({}, row); // copy obj
        this.svgTemp.isPublic = false;
        row.isPublic = false;
        this.updateGame();
      },
      // 更新游戏
      updateGame() {
        updateSvgs(this.svgTemp)
          .then(res => {
            this.getSvgs()
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
      // 重制游戏
      resetTemp() {
        this.svgTemp = {
          isPublic: true,
          desc: '',
          value: '',
          // 设置
          price: 0, // 价格
          festival: '', // 节日相关
          style: '' // 风格
        }
      },
      // 获取标签
      getFesName(key) {
        let name = key;
        this.festivalList.some(item => {
          if (item.value == key) {
            name = item.name;
          }
          return item.value == key;
        });
        return name;
      },
      // 获取分类名
      getStyleName(key) {
        let name = key;
        this.styleList.some(item => {
          if (item.value == key) {
            name = item.name;
          }
          return item.value == key;
        });
        return name;
      }
    },
    computed: {
      ...mapGetters(["cdnurl"])
    }
  };

</script>
<style lang="scss">
  .svgs-container {
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
