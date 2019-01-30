<template>
  <div class="pages-show">
    <div class="page-control">
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="当前页设置" placement="top">
          <el-button type="primary" icon="el-icon-setting" @click="$bus.$emit('openPageSet')"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="添加普通页" placement="top">
          <el-button type="primary" icon="el-icon-plus"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="复制当前页" placement="top">
          <el-button type="primary" icon="el-icon-printer"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="删除当前页" placement="top">
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="page-show">
      <div
        v-for="(item,i) in pages"
        :key="i"
        class="page-list"
        :class="{active:activePage==item}"
        @click="activePage=item"
      >
        <span class="num">{{i+1}}</span>
        <div class="title">
          <input v-model="pages[i]">
        </div>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" style="cursor:pointer;">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="pageCreate">新建页面</el-dropdown-item>
            <el-dropdown-item command="pageCopy">复制页面</el-dropdown-item>
            <el-dropdown-item command="pageDelete">删除页面</el-dropdown-item>
            <el-dropdown-item command="pageSave">存为模板</el-dropdown-item>
            <el-dropdown-item command="pageSet">页面设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="page-add" style="padding:5px;">
      <el-button type="primary" size="medium" icon="el-icon-plus" style="width:100%;">添加页面</el-button>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "Pages",

  data() {
    return {
      activePage: 3,
      pages: [
        1,
        2,
        3,
        14,
        32,
        23,
        23,
        23,
        354,
        9,
        32,
        39,
        83,
        23,
        23,
        32,
        84,
        54,
        15,
        9,
        97,
        165,
        87,
        19,
        56
      ]
    };
  },
  methods: {
    setSort() {
      const el = document.querySelectorAll(".page-show")[0];
      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.pages.splice(evt.oldIndex, 1)[0];
          this.pages.splice(evt.newIndex, 0, targetRow);
          // ，强制渲染当前列表
          const newArray = this.pages.slice(0);
          this.pages = [];
          // dom变化后再次刷新
          this.$nextTick(() => {
            this.pages = newArray;
          });
        }
      });
    },
    handleCommand(command) {
      console.log(command);
      switch (command) {
        case "pageCreate":
          alert("pageCreate");
          break;
        case "pageCopy":
          alert("pageCopy");
          break;
        case "pageDelete":
          alert("pageDelete");
          break;
        case "pageSave":
          alert("pageSave");
          break;
        case "pageSet":
          this.$bus.$emit("openPageSet");
          break;
        default:
      }
    }
  },
  mounted() {
    this.setSort();
  }
};
</script>

<style scoped lang="scss">
.pages-show {
  min-width: 220px;

  .page-control {
    text-align: center;
    margin: 20px 0;
  }

  .page-show {
    overflow: hidden;
  }

  .page-list {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-top: solid 1px #eee;
    cursor: pointer;

    &:last-child {
      border-bottom: solid 1px #eee;
    }

    .num {
      display: inline-block;
      width: 24px;
      height: 24px;
      text-align: center;
      background: #ccc;
      color: #fff;
      line-height: 25px;
      border-radius: 20em;
    }

    .title {
      input {
        border: none;
        outline: 0;
        background: none;
      }
    }

    &.active {
      background: #eee;

      .num {
        background: #409eff;
        color: #fff;
      }
    }
  }
}

.sortable-ghost {
  opacity: 0.6;
  color: #fff !important;
  background: #409eff !important;
}
</style>
