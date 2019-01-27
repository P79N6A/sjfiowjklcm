<template>
  <div class="item-container">
    <div>
      <span>
        <el-select v-model="filterData.device" placeholder="请选择终端类型">
          <el-option label="PC" value="PC"></el-option>
          <el-option label="MOBILE" value="MOBILE"></el-option>
        </el-select>
      </span>
      <span>
        <el-select v-model="filterData.platform" placeholder="请选择游戏平台">
          <el-option :label="item.name" :value="item.value" v-for="item in platformList" :key="item.value"></el-option>
        </el-select>
      </span>
      <span>
        <el-button type="warning" icon="el-icon-search" @click="getList">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate">添加游戏</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleSort">保存排序</el-button>
      </span>

      <!-- <span>
        <el-button type="danger" @click="dialogInsertVisible=true" icon="el-icon-edit">导出</el-button>
      </span>-->
    </div>
    <br>
    <br>
    <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%" id="contents">
      <el-table-column align="center" label="序号" width="65" type="index" fixed></el-table-column>
      <el-table-column align="center" label="封面" prop="icon" width="80" fixed>
        <template slot-scope="scope">
          <a target="_blank" v-if="scope.row.game.icon" :href="`${cdnurl}${scope.row.game.icon}`" class="img-view"
            :style="`background-image:url(${cdnurl}${scope.row.game.icon});`"></a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" prop="name">
        <template slot-scope="scope">
          <div>
            <span v-if="scope.row.name">{{scope.row.name}}</span>
            <span v-else>{{scope.row.game.name}}</span>
          </div>
          <div>
            <span v-if="scope.row.eName">{{scope.row.eName}}</span>
            <span v-else>{{scope.row.game.eName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="id/code" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.game.id}}</span>
          </div>
          <div>
            <span>{{scope.row.game.code}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="线注" prop="line">
        <template slot-scope="scope">
          <el-tag>{{scope.row.game.line}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="MG品牌" v-if="filterData.platform=='MG'">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.game.mgself" type="warning">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="支持试玩">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.game.try" type="warning">是</el-tag>
          <el-tag v-else>否</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="游戏类型">
        <template slot-scope="scope">
          {{getTypesName(scope.row.game.types)}}
        </template>
      </el-table-column>
      <el-table-column label="游戏标签">
        <template slot-scope="scope">
          <div v-if="scope.row.game.tags.length>0">
            <el-tag type="warning" v-for="(item,i) in scope.row.game.tags" :key="i">{{getTagName(item)}}</el-tag>
          </div>
          <div v-if="scope.row.tags.length>0">
            <el-tag type="primary" v-for="(item,i) in scope.row.tags" :key="i">{{getTagName(item)}}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.game.online" type="success">上线</el-tag>
          <el-tag v-else type="danger">下架</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="description">
        <template slot-scope="scope">{{scope.row.game.description}}</template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width" fixed>
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="scope.row.status!='deleted'" size="mini" type="danger" @click="handleDelete(scope.row)">
              {{
              $t('table.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 从系统库倒入数据 -->
    <el-dialog title="从系统导入游戏" :visible.sync="dialogFormVisible" width="900px" :close-on-click-modal="false" v-if="dialogFormVisible">
      <div class="game-list">
        <div v-for="game in gameList" :key="game._id" class="games" @click="handleClick(game._id)">
          <div :class="{active:selectGames.includes(game._id)}">
            <div class="img-view" :style="`background-image:url(${cdnurl}${game.icon});`" v-if="game.icon"></div>
            <div v-else class="img-view"></div>
            <div>{{game.name}}</div>
            <div>{{game.eName}}</div>
            <p>{{game._id}}</p>
          </div>
        </div>
      </div>
      <div style="text-align:right;">
        <el-button type="warning" @click="allItems">全选/取消</el-button>
        <el-button type="primary" @click="addItems">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑游戏" :visible.sync="dialogEditVisible" width="900px" :close-on-click-modal="false" v-if="dialogEditVisible">
      <table>
        <tbody>
          <tr>
            <td>游戏封面:</td>
            <td>
              <a target="_blank" v-if="editItem.game.icon" :href="`${cdnurl}${editItem.game.icon}`" class="img-view"
                :style="`background-image:url('${cdnurl}${editItem.game.icon}');`"></a>
            </td>
            <td>
              游戏名称:
            </td>
            <td>
              {{editItem.game.name}}<br>
              {{editItem.game.eName}}
            </td>
            <td>
              游戏ID/Code:
            </td>
            <td>
              {{editItem.game.id}}<br>
              {{editItem.game.code}}
            </td>
          </tr>
          <tr>
            <td>游戏类型:</td>
            <td>{{editItem.game.types}}</td>
            <td>
              游戏平台:
            </td>
            <td>
              {{editItem.game.platform}}
            </td>
            <td>
              游戏终端
            </td>
            <td>
              {{editItem.game.device}}
            </td>
          </tr>
          <tr>
            <td 游戏标签></td>
            <td colspan="5">
              <el-checkbox-group v-model="editItem.game.tags" disabled>
                <el-checkbox :label="tag" v-for="tag in editItem.game.tags" :key="tag" readonly>{{getTagName(tag)}}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox-group v-model="editItem.tags">
                <el-checkbox :label="tag.value" v-for="tag in tagList" :key="tag.value" v-if="!editItem.game.tags.includes(tag.value)">{{tag.name}}</el-checkbox>
              </el-checkbox-group>
            </td>
          </tr>
          <tr>
            <td>游戏备注</td>
            <td colspan="5">
              <el-input type="textarea" v-model="editItem.description">

              </el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <el-button @click="updateItem" type="primary">
          提交
        </el-button>
      </div>
      {{editItem}}
    </el-dialog>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import {
    fetchList
  } from "@/api/article";
  import {
    getGames
  } from "@/api/games";
  import {
    getItems,
    addItems,
    updateItems,
    sortItems,
    deleteItems
  } from "@/api/items";
  import Sortable from "sortablejs";
  import {
    getPlatforms
  } from "@/api/platforms";
  import {
    getToken,
    setToken,
    removeToken
  } from "@/utils/auth";
  export default {
    name: "DragTable",
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: "success",
          draft: "info",
          deleted: "danger"
        };
        return statusMap[status];
      }
    },
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        sortable: null,
        //搜索条件
        filterData: {
          device: getToken("SiteDevice"),
          platform: "DT"
        },
        // 游戏平台类型
        platformList: [],
        dialogFormVisible: false,
        dialogEditVisible: false,
        dialogInsertVisible: false,
        gameList: [],
        // 从系统库中选中的游戏
        selectGames: [],
        editItem: null,
        // 分类
        typeList: [{
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
            name: "其他",
            value: "OTH"
          },
          {
            name: "电子",
            value: "ELE"
          },
          {
            name: "街机",
            value: "STR"
          }
        ],
        // 标签
        tagList: [{
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
      };
    },
    created() {
      this.getPlatforms();
      this.getList();
    },
    computed: {
      ...mapGetters(["cdnurl"])
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
      // 点击从系统导入
      handleCreate() {
        this.getGames();
      },
      // 点击编辑按钮
      handleUpdate(data) {
        this.editItem = JSON.parse(JSON.stringify(data))
        this.dialogEditVisible = true;
      },
      updateItem() {
        updateItems(this.editItem).then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success",
            duration: 2000
          });
          this.getList();
          this.dialogEditVisible = false;
        }).catch(err => {

        })
      },
      // 点击删除按钮
      handleDelete(data) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            deleteItems(data).then(res => {
              this.getList();
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
      // 查询游戏库列表
      getGames() {
        let search = Object.assign({},
          JSON.parse(JSON.stringify(this.filterData))
        );
        search.online = true;
        getGames(search)
          .then(res => {
            this.gameList = res.data.filter(game => {
              return !this.oldList.includes(game._id);
            });

            if (this.gameList.length == 0) {
              this.$notify({
                title: "提示",
                message: "系统库没有可添加的数据",
                type: "warning",
                duration: 2000
              });
            } else {
              this.dialogFormVisible = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 点击选中游戏按钮
      handleClick(_id) {
        let _index = this.selectGames.findIndex(item => {
          return item == _id;
        });
        if (_index >= 0) {
          this.selectGames.splice(_index, 1);
        } else {
          this.selectGames.push(_id);
        }
      },
      // 保存排序
      handleSort() {
        let sortOps = [];
        for (let i = 0; i < this.list.length; i++) {
          sortOps.push({
            _id: this.list[i]._id,
            sort: i + 1
          });
        }
        sortItems({
            gameList: sortOps,
            platform: this.filterData.platform
          })
          .then(res => {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 全选
      allItems() {
        if (this.selectGames.length == this.gameList.length) {
          this.selectGames = [];
        } else {
          this.selectGames = [];
          this.gameList.forEach(game => {
            this.selectGames.push(game._id);
          });
        }
      },
      // 确认添加至大厅
      addItems(ids) {
        if (this.selectGames.length == 0) {
          this.$notify({
            title: "提示",
            message: "没有要添加的数据",
            type: "warning",
            duration: 2000
          });
          this.dialogFormVisible = false;
          return;
        }
        addItems({
            gameList: this.selectGames,
            device: this.filterData.device,
            platform: this.filterData.platform
          })
          .then(res => {
            this.$notify({
              title: "成功",
              message: "操作成功",
              type: "success",
              duration: 2000
            });
            this.getList();
            this.selectGames = [];
            this.dialogFormVisible = false;
          })
          .catch(err => {});
      },

      // 读取大厅数据
      getList() {
        this.listLoading = true;
        getItems(this.filterData).then(response => {
          this.list = response.data;
          this.oldList = this.list.map(v => v.game._id)
          this.listLoading = false;
          this.$nextTick(() => {
            if (this.list.length > 1) {
              this.setSort();
            }
          });
        });
      },
      // 拖拽排序
      setSort() {
        const el = document.querySelectorAll("#contents  table > tbody")[0];
        console.log(el)
        Sortable.create(el, {
          ghostClass: "sortable-ghost", // Class name for the drop placeholder,
          setData: function (dataTransfer) {
            dataTransfer.setData("Text", "");
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: evt => {
            // 这里特殊处理，真实dom和虚拟dom，否则无法拖拽成功【有待优化】
            // 把数组根据dom的拖拽，做出新的排序
            const targetRow = this.list.splice(evt.oldIndex, 1)[0];
            this.list.splice(evt.newIndex, 0, targetRow);
            const newArray = this.list.slice(0);
            this.list = [];
            // 数据变化后再次刷新
            this.$nextTick(() => {
              this.list = newArray;
            });
          }
        });
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
    }
  };

</script>

<style lang="scss">
  .item-container {
    padding: 30px;

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

    .sortable-ghost {
      opacity: 0.8;
      // color: #fff !important;
      // background: #42b983 !important;
    }

    .icon-star {
      margin-right: 2px;
    }

    .el-table__row {
      cursor: move;
    }

    .drag-handler {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .show-d {
      margin-top: 15px;
    }

    .game-list {
      display: flex;
      flex-wrap: wrap;

      .games {
        width: 20%;
        padding: 10px;

        >div {
          border: solid 1px #eee;
          border-radius: 6px;
          text-align: center;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.7;
          box-shadow: 0 0 3px 3px #eee;

          &:hover,
          &.active {
            box-shadow: 0 0 6px 2px #409eff;
            border: solid 1px #409eff;
          }
        }

        .img-view {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: contain;
          background-color: #eee;
          width: 100%;
          height: 130px;
          display: inline-block;
          line-height: 2;
        }
      }
    }
  }

</style>
