<template>
  <div class="item-container">
    <div>
      <!-- <span>
        <el-select v-model="filterData.device" placeholder="请选择终端类型">
          <el-option label="PC" value="PC"></el-option>
          <el-option label="MOBILE" value="MOBILE"></el-option>
        </el-select>
      </span>-->
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
        <el-button type="warning" icon="el-icon-search" @click="getList">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate" icon="el-icon-edit">添加</el-button>
      </span>
      <span>
        <el-button type="danger" @click="dialogInsertVisible=true" icon="el-icon-edit">导出</el-button>
      </span>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="序号" width="65" type="index"></el-table-column>
      <el-table-column align="center" label="封面" prop="thumbnail" width="80">
        <template slot-scope="scope">
          <a
            target="_blank"
            v-if="scope.row.thumbnail&&scope.row.thumbnail.src"
            :href="`${cdnurl}${scope.row.thumbnail.src}`"
            class="img-view"
            :style="`background-image:url(${cdnurl}${scope.row.thumbnail.src});`"
          ></a>
          <a
            target="_blank"
            v-else-if="scope.row.game.thumbnail&&scope.row.game.thumbnail.src"
            :href="`${cdnurl}${scope.row.game.thumbnail.src}`"
            class="img-view"
            :style="`background-image:url(${cdnurl}${scope.row.game.thumbnail.src});`"
          ></a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" prop="thumbnail">
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
      <el-table-column align="center" label="线注" prop="line"></el-table-column>
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
      <el-table-column label="备注" prop="description">
        <template slot-scope="scope">{{scope.row.game.description}}</template>
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
    <el-dialog
      title="从系统导入游戏"
      :visible.sync="dialogFormVisible"
      width="900px"
      :close-on-click-modal="false"
      v-if="gameList.length>0"
    >
      <div>
        <el-button type="danger" @click="addItems" icon="el-icon-edit">添加</el-button>
      </div>
      <div class="game-list">
        <div
          v-for="game in gameList"
          :key="game._id"
          class="games"
          @click="handleClick(game._id)"
          v-if="!oldList.includes(game._id)"
        >
          <div :class="{active:selectGames.includes(game._id)}">
            <div
              class="img-view"
              :style="`background-image:url(${cdnurl}${game.thumbnail.src});`"
              v-if="game.thumbnail&&game.thumbnail.src"
            ></div>
            <div v-else class="img-view"></div>
            <div>{{game.name}}</div>
            <div>{{game.eName}}</div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchList } from "@/api/article";
import { getGames } from "@/api/games";
import { getItems, addItems, deleteItems } from "@/api/items";
import Sortable from "sortablejs";
import { getPlatforms } from "@/api/platforms";
import { getToken, setToken, removeToken } from "@/utils/auth";
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
      oldList: [],
      newList: [],
      //搜索条件
      filterData: {
        device: getToken("SiteDevice"),
        platform: "DT"
      },
      // 游戏平台类型
      platformList: [],
      dialogFormVisible: false,
      dialogInsertVisible: false,
      gameList: [],
      // 选中的游戏
      selectGames: []
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
      this.dialogFormVisible = true;
      this.getGames();
    },
    // 查询用户列表
    getGames() {
      let search = Object.assign({}, this.filterData);
      search.online = true;
      getGames(search)
        .then(res => {
          this.gameList = res.data;
        })
        .catch(err => {});
    },
    // 点击游戏按钮
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
        })
        .catch(err => {});
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
    getList() {
      this.listLoading = true;
      getItems(this.filterData).then(response => {
        this.list = response.data;
        this.listLoading = false;
        this.oldList = this.list.map(v => v.game._id);
        this.newList = this.oldList.slice();
        this.$nextTick(() => {
          this.setSort();
        });
      });
    },
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
    }
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

      > div {
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
