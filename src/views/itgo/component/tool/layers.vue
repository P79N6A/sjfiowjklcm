<template>
  <div class="layers-show">
    <div class="layer-control">
      <el-button-group>
        <el-tooltip class="item" effect="dark" content="当前图层设置" placement="top">
          <el-button type="primary" icon="el-icon-setting"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="复制当前图层" placement="top">
          <el-button type="primary" icon="el-icon-printer"></el-button>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="删除当前图层" placement="top">
          <el-button type="danger" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </el-button-group>
    </div>
    <div class="layer-show">
      <div
        class="layers"
        v-for="(item,i) in layers"
        :key="i"
        :class="{active:activeLayer==item}"
        @click="activeLayer=item"
      >
        <i
          :class="item.isShow?'el-icon-view':'el-icon-circle-close-outline'"
          @click="layers[i].isShow=!layers[i].isShow"
        ></i>
        <i
          :class="item.isLock?'el-icon-circle-check':'el-icon-circle-close'"
          @click="layers[i].isLock=!layers[i].isLock"
        ></i>
        <input v-model="layers[i].title">
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
export default {
  name: "Layers",

  data() {
    return {
      activeLayer: null,
      layers: [
        {
          isShow: true,
          isLock: true,
          title: "title1"
        },
        {
          isShow: true,
          isLock: false,
          title: "title2"
        },
        {
          isShow: false,
          isLock: true,
          title: "title3"
        },
        {
          isShow: false,
          isLock: false,
          title: "title4"
        }
      ]
    };
  },
  methods: {
    setSort() {
      const el = document.querySelectorAll(".layer-show")[0];
      Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: evt => {
          const targetRow = this.layers.splice(evt.oldIndex, 1)[0];
          this.layers.splice(evt.newIndex, 0, targetRow);
          // ，强制渲染当前列表
          const newArray = this.layers.slice(0);
          this.layers = [];
          // dom变化后再次刷新
          this.$nextTick(() => {
            this.layers = newArray;
          });
        }
      });
    }
  },
  mounted() {
    this.setSort();
  },
  created() {}
};
</script>

<style scoped lang="scss">
.layers-show {
  min-width: 220px;

  .layer-control {
    text-align: center;
    margin: 20px 0;
  }

  .layer-show {
    .layers {
      display: flex;
      justify-content: start;
      padding: 10px;
      border-top: solid 1px #eee;
      cursor: pointer;

      &:last-child {
        border-bottom: solid 1px #eee;
      }

      i {
        margin: 0 5px;
      }

      input {
        border: none;
        outline: 0;
        background: none;
      }

      &.active {
        background: #eee;
        color: #409eff;
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
