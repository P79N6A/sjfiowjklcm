<template>
  <div class="app-container">
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
            :value="item.platform"
            v-for="item in platformList"
            :key="item.platform"
          ></el-option>
        </el-select>
      </span>
      <span>
        <el-button type="warning" icon="el-icon-search" @click="getGames">搜索</el-button>
      </span>
      <span>
        <el-button type="danger" @click="handleCreate" icon="el-icon-edit">添加</el-button>
      </span>
      <span>
        <el-button type="danger" @click="dialogInsertVisible=true" icon="el-icon-edit">导出</el-button>
      </span>
      <!-- <span> -->
      <!-- <el-button type="danger" @click="handleCreate" icon="el-icon-edit">导出</el-button> -->
      <!-- </span> -->
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
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="icon-star"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="scope">
          <svg-icon class="drag-handler" icon-class="drag"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="show-d">{{ $t('table.dragTips1') }} : &nbsp; {{ oldList }}</div>
    <div class="show-d">{{ $t('table.dragTips2') }} : {{ newList }}</div>
  </div>
</template>

<script>
import { fetchList } from "@/api/article";
import Sortable from "sortablejs";

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
        device: "PC",
        platform: "DT"
      },
      // 游戏平台类型
      platformList: [
        {
          platform: "PT",
          name: "PT老虎机"
        },
        {
          platform: "PT2TIGER",
          name: "PT老虎机(新)"
        },
        {
          platform: "DT",
          name: "DT老虎机"
        },
        {
          platform: "MG",
          name: "MG老虎机"
        },
        {
          platform: "QT",
          name: "QT老虎机"
        },
        {
          platform: "TTG",
          name: "TTG老虎机"
        },
        {
          platform: "NT",
          name: "NT老虎机"
        },
        {
          platform: "PNG",
          name: "PNG老虎机"
        },
        {
          platform: "SW",
          name: "SW老虎机"
        },
        {
          platform: "TGP",
          name: "申博老虎机"
        },
        {
          platform: "CQ9",
          name: "CQ9老虎机"
        },
        {
          platform: "RTG",
          name: "RTG老虎机"
        },
        {
          platform: "AMEBA",
          name: "AMEBA老虎机"
        },
        {
          platform: "PG",
          name: "PG老虎机"
        },
        {
          platform: "MWSLOT",
          name: "MWSLOT老虎机"
        },
        {
          platform: "MWQP",
          name: "MW棋牌"
        },
        {
          platform: "BBSLOT",
          name: "BBSLOT老虎机"
        },
        {
          platform: "YGG",
          name: "YGG老虎机"
        },
        {
          platform: "JDBSLOT",
          name: "JDB老虎机"
        },
        {
          platform: "JDBFISH",
          name: "JDB捕鱼"
        }
      ],
      dialogInsertVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCreate() {},
    getGames() {},
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
        this.oldList = this.list.map(v => v.id);
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
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        }
      });
    }
  }
};
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
